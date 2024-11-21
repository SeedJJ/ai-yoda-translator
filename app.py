import openai
from flask import Flask, request, jsonify, render_template
import os

# Load OpenAI API key from environment variable
openai.api_key = os.getenv("OPEN_AI_KEY")

# Ensure the API key is set
if not openai.api_key:
    raise ValueError("OpenAI API key not set in environment variables.")

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/translate', methods=['POST'])
def translate():
    data = request.get_json()
    text_to_translate = data.get("text", "")
    target_language = data.get("language", "")

    if not text_to_translate or not target_language:
        return jsonify({"error": "Missing text or language"}), 400

    try:
        # Modify the prompt if "Yoda Style" is selected
        if target_language == "Yoda Style":
            prompt = (
                f"Transform the following text into a Yoda-like speaking style:\n\n{text_to_translate}"
            )
        else:
            prompt = (
                f"Translate the following text into {target_language}:\n\n{text_to_translate}"
            )

        # Call OpenAI API
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a translation assistant."},
                {"role": "user", "content": prompt},
            ],
            temperature=0.7,  # Slightly increase temperature for more creative Yoda-like output
        )

        translation = response["choices"][0]["message"]["content"].strip()
        return jsonify({"translation": translation})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Ensure the app runs locally for testing
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
