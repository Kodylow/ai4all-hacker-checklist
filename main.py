from flask import Flask, render_template, request, jsonify, session
import requests
import os
from auth import validL402AuthHeader, generate_macaroon, getLnCallback
import bolt11
from openai_api import get_tweet_text
from db_manager import create_connection, create_table, increase_tweet_count, get_tweet_count, close_connection as dbmanager_close_connection, get_db

# Create a database connection and initialize the table once when starting the app
conn = create_connection()
create_table(conn)

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
MACAROON_SECRET_KEY = os.getenv("MACAROON_SECRET_KEY")
app = Flask('app')
app.secret_key = os.getenv("MACAROON_SECRET_KEY")

lnAddress = "kodylow@getalby.com"
lnCallback = getLnCallback(lnAddress)


@app.route('/')
def hello_world():
    print("Received GET request on / endpoint.")
    print("Request headers:", request.headers)
    session['user_id'] = request.headers.get('X-Replit-User-Id')
    return render_template('index.html',
                           user_id=session['user_id'],
                           user_name=request.headers.get('X-Replit-User-Name'))


@app.route('/gpt-tweet', methods=['POST'])
def gpt_tweet():
    print("Received POST request on /gpt-tweet endpoint.")
    # Get db connection
    conn = get_db()

    # Retrieve data from request
    req_data = request.get_json()
    print("Request data:", req_data)

    user_id = request.headers.get('X-Replit-User-Id')

    # Increase tweet count
    increase_tweet_count(conn, user_id)

    # Check if the user has tweeted more than 5 times
    count = get_tweet_count(conn, user_id)
    if count > 5:
        return jsonify({"error": "You've hit the tweet limit."}), 429

    # If "weblnEnabled" is set to True, check the L402 macaroon in the header
    if req_data.get('weblnEnabled', True):
        print('In weblnEnabled...')
        auth_header = request.headers.get('authorization')
        print(f'Authorization header: {auth_header}')
        if auth_header and validL402AuthHeader(auth_header):
            print("Using GPT-4.")
        else:
            print("Getting invoice for 200 sats...")
            invoice = requests.get(f'{lnCallback}?amount=200000').json()["pr"]
            payment_hash = bolt11.decode(invoice).tags["p"]
            macaroon = generate_macaroon(payment_hash)
            print(f"Generated macaroon: {macaroon}")
            response = jsonify({
                "error": "Payment required",
                "invoice": invoice,
                "macaroon": macaroon
            })
            response.status_code = 402
            response.headers[
                'www-authenticate'] = f'L402 macaroon={macaroon}: invoice={invoice}'
            print("Responding with 402 Payment Required.")
            return response

    print("Getting tweet text from OpenAI API...")
    tweet_text = get_tweet_text(req_data)
    print("Received tweet text:", tweet_text)

    return jsonify({"tweet_text": tweet_text})


@app.teardown_appcontext
def close_connection(exception):
    dbmanager_close_connection(exception)


if __name__ == "__main__":
    print("Starting Flask application...")
    app.run(host='0.0.0.0', port=8080)
