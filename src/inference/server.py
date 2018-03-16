from flask import Flask
from flask import request
import json
import pandas as pd

def findWinner(json):
    df = pd.read_json(json)
    tierDict = {'BRONZE': 0, 'SILVER': 1, 'GOLD': 2, 'PLATINUM': 3, 'DIAMOND': 4, 'MASTER': 5, 'CHALLENGER': 6}
    rankDict = {'V': 0, 'IV': 1, 'III': 2, 'II': 3, 'I': 4}
    df['tier'] = df['tier'].map(tierDict)
    df['rank'] = df['rank'].map(rankDict)
    df['winrate'] = df['wins']/df['losses']
    df['rating'] = (10* df['tier'] + df['rank'] + .01 * df['leaguePoints'])*df['winrate']
    avgTier = df.groupby('teamId')['rating'].mean()
    #print(avgTier)
    #print(df)
    prediction = avgTier.iloc[1] - avgTier.iloc[0]
    #print(avgTier.axes[0][0])
    confidence = 1 - 1/(1 + abs(prediction))
    return int(avgTier.idxmax()), confidence

# Create the Server
app = Flask(__name__)

@app.route("/predict", methods=["GET", "POST"])
def predict():
    if request.method == "POST":
        body = request.form
        # { 'summoners': [...] }
        prediction = findWinner(json.dumps(json.loads(dict(body)['data'][0])['summoners']))
        return json.dumps({ 'prediction': prediction[1], 'team': prediction[0]}), 200
    else:
        return json.dumps({})

@app.route("/")
def main():
   return "AI Final Project - CSC 480", 200


if __name__ == "__main__":
   app.debug = True
   app.run(threaded=True)
