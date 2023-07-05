import sqlite3
from sqlite3 import Error
from flask import g

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect('user_tweet_counts.db')
    return db

def close_connection(exception=None):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

def create_connection():
    conn = None
    try:
        conn = sqlite3.connect('user_tweet_counts.db')
        print("Successfully connected to SQLite database.")
        return conn
    except Error as e:
        print(e)


def create_table(conn):
    try:
        sql_create_table = """ CREATE TABLE IF NOT EXISTS user_tweet_counts (
                                        user_id text PRIMARY KEY,
                                        count integer NOT NULL
                                    ); """
        c = conn.cursor()
        c.execute(sql_create_table)
        print("Table user_tweet_counts created successfully.")
    except Error as e:
        print(e)


def increase_tweet_count(conn, user_id):
    cur = conn.cursor()
    cur.execute(
        "INSERT OR IGNORE INTO user_tweet_counts (user_id, count) VALUES (?, 0)",
        (user_id, ))
    print(f"Inserted (or ignored) user: {user_id} with count: 0")
    cur.execute(
        "UPDATE user_tweet_counts SET count = count + 1 WHERE user_id = ?",
        (user_id, ))
    print(f"Increased count for user: {user_id}")
    conn.commit()


def get_tweet_count(conn, user_id):
    cur = conn.cursor()
    cur.execute("SELECT count FROM user_tweet_counts WHERE user_id = ?",
                (user_id, ))
    rows = cur.fetchall()
    print(
        f"Retrieved count for user: {user_id} - {rows[0][0] if rows else 'None'}"
    )
    return rows[0][0] if rows else None
