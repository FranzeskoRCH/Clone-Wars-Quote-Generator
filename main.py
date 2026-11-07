from flask import Flask, jsonify
from flask_cors import CORS
import os
import sqlite3
import random

import create_database as db


app = Flask(__name__)

allowed_origins = ["http://localhost:5173", "http://127.0.0.1:5173"]
# Vercel creates a new preview hostname for each deployment. Match only this
# frontend project under the user's Vercel team so previews do not need to be
# added one by one to FRONTEND_ORIGINS.
allowed_origins.append(
    r"^https://clone-wars-quote-generator(?:-[a-z0-9]+)+-franche1\.vercel\.app$"
)
allowed_origins.extend(
    origin.strip().rstrip("/")
    for origin in os.environ.get("FRONTEND_ORIGINS", "").split(",")
    if origin.strip()
)
CORS(app, origins=allowed_origins)

DATABASE_PATH = db.create_database()

def get_db_connection():
    conn = sqlite3.connect(DATABASE_PATH)
    conn.row_factory = sqlite3.Row
    return conn

# all quotes

@app.route('/quotes', methods=['GET'])
def get_quotes():
    conn = get_db_connection()
    quotes = conn.execute('SELECT * FROM CLONE_WARS_QUOTES').fetchall()
    conn.close()
    quotes_list = [dict(quote) for quote in quotes]
    return jsonify(quotes_list)


#create a quotes by language method

@app.route('/quotes/<language>', methods=['GET'])
def get_quotes_by_language(language):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Obtener el id del idioma
    cursor.execute('SELECT id FROM LANGUAGES WHERE language = ?', (language,))
    language_row = cursor.fetchone()
    
    if language_row is None:
        return jsonify({"error": "Language not found"}), 404
    
    language_id = language_row['id']
    
    # Obtener las citas en el idioma especificado
    cursor.execute('SELECT * FROM CLONE_WARS_QUOTES WHERE language_id = ?', (language_id,))
    quotes = cursor.fetchall()
    conn.close()
    
    quotes_list = [dict(quote) for quote in quotes]
    return jsonify(quotes_list)


# quotes by id

@app.route('/quotes/<int:quote_id>', methods=['GET'])
def get_id_quote(quote_id):
    conn = get_db_connection()
    quote = conn.execute('SELECT * FROM CLONE_WARS_QUOTES WHERE id = ?', (quote_id,)).fetchone()
    conn.close()
    if not quote:
        return jsonify({'error': 'No quotes found'}), 404
    return jsonify(dict(quote))


#create random quotes by language method

@app.route('/quotes/random/<language>', methods=['GET'])
def get_random_quotes_by_language(language):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Obtener el id del idioma
    cursor.execute('SELECT id FROM LANGUAGES WHERE language = ?', (language,))
    language_row = cursor.fetchone()
    
    if language_row is None:
        return jsonify({"error": "Language not found"}), 404
    
    language_id = language_row['id']
    
    # Obtener las citas en el idioma especificado
    cursor.execute('SELECT * FROM CLONE_WARS_QUOTES WHERE language_id = ?', (language_id,))
    quotes = cursor.fetchall()
    conn.close()

    random_quote = random.choice(quotes)
    return jsonify(dict(random_quote))


#languages list

@app.route('/languages', methods=['GET'])
def languages_list():
    conn = get_db_connection()
    quotes = conn.execute('SELECT * FROM LANGUAGES').fetchall()
    conn.close()
    quotes_list = [dict(quote) for quote in quotes]
    return jsonify(quotes_list)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', '5000')), debug=False)
