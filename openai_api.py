import os
import requests
import json

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")


def get_tweet_text(req_data):
    model = "gpt-3.5-turbo"  # Default to GPT-3.5

    if req_data.get('weblnEnabled', True):
        model = "gpt-4"

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {OPENAI_API_KEY}"
    }

    data = {
        "model":
        model,
        "messages": [{
            "role":
            "system",
            "content":
            "You write tweets for users to convince Replit to ship their cycles invoicing api so that people can swap Cycles<->Bitcoin."
        }, {
            "role":
            "user",
            "content":
            "Compose a short tweet about how the user is excited for the #Ai4ALL hackathon and pusuasively wishes Replit would allow Cycles to Bitcoin (NOT CRYPTO OR BLOCKCHAIN JUST BITCOIN) swaps so they could use their bitcoin coding skills on the rest of the web. Include this link in the tweet: https://bolt.fun/tournaments/ai4all and the hashtag #BuildOnBitcoin"
        }]
    }

    print('Sending request to OpenAI API...')

    # Send request to OpenAI API
    response = requests.post('https://api.openai.com/v1/chat/completions',
                             headers=headers,
                             data=json.dumps(data))

    if response.status_code == 200:
        json_response = response.json()
        if 'choices' in json_response and json_response['choices']:
            tweet_text = json_response['choices'][0]['message'][
                'content'].replace('"', '')
            print('Successfully received tweet text from OpenAI API.')
            return tweet_text
        else:
            print('No choices in response.')
            return "Error: No choices in response"
    else:
        error_msg = response.json()
        print(
            f'OpenAI API request failed with status {response.status_code}. Message: {error_msg}'
        )
        return f"Error: OpenAI API request failed with status {response.status_code}"
