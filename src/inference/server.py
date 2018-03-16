from flask import Flask
from flask import request
import json

# Create the Server
app = Flask(__name__)

@app.route("/predict", methods=["GET", "POST"])
def predict():
    if request.method == "POST":
        body = request.form
        print(json.dumps(dict(body)))
    return json.dumps({ 'prediction': 100, 'team': 10}), 200

@app.route("/")
def main():
   return "AI Final Project - CSC 480", 200


if __name__ == "__main__":
   app.debug = True
   app.run(threaded=True)
