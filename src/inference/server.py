from flask import Flask

# Create the Server
app = Flask(__name__)

@app.route("/")
def main():
   return "AI Final Project - CSC 480", 200

if __name__ == "__main__":
   app.debug = True
   app.run(threaded=True)
