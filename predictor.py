import pandas as pd

string = """
[{
    "rank": "II",
        "wins": 64,
        "losses": 59,
        "tier": "DIAMOND",
        "leaguePoints": -3,
        "champion": 12,
        "summonerName": "Shk",
        "teamId": 2
}, {
    "rank": "III",
        "wins": 81,
        "losses": 74,
        "tier": "DIAMOND",
        "leaguePoints": 100,
        "champion": 30,
        "summonerName": "Self Destructive",
        "teamId": 2
}, {
    "rank": "III",
        "wins": 84,
        "losses": 74,
        "tier": "DIAMOND",
        "leaguePoints": 84,
        "champion": 145,
        "summonerName": "StoneW0lf",
        "teamId": 2
}, {
    "rank": "I",
        "wins": 182,
        "losses": 167,
        "tier": "DIAMOND",
        "leaguePoints": 32,
        "champion": 267,
        "summonerName": "Genocidal Genera",
        "teamId": 2
}, {
    "rank": "II",
        "wins": 82,
        "losses": 76,
        "tier": "DIAMOND",
        "leaguePoints": 70,
        "champion": 54,
        "summonerName": "Kryous",
        "teamId": 2
}, {
    "rank": "II",
        "wins": 111,
        "losses": 107,
        "tier": "DIAMOND",
        "leaguePoints": 12,
        "champion": 96,
        "summonerName": "Hardstuck Skinny",
        "teamId": 1
}, {
    "rank": "III",
        "wins": 27,
        "losses": 20,
        "tier": "PLATINUM",
        "leaguePoints": 30,
        "champion": 136,
        "summonerName": "Penelo",
        "teamId": 1
}, {
    "rank": "I",
        "wins": 131,
        "losses": 125,
        "tier": "DIAMOND",
        "leaguePoints": 27,
        "champion": 238,
        "summonerName": "Voyboy",
        "teamId": 1
}, {
    "rank": "III",
        "wins": 78,
        "losses": 69,
        "tier": "DIAMOND",
        "leaguePoints": 65,
        "champion": 20,
        "summonerName": "aSilverDragon",
        "teamId": 1
}, {
    "rank": "II",
        "wins": 198,
        "losses": 172,
        "tier": "DIAMOND",
        "leaguePoints": 100,
        "champion": 23,
        "summonerName": "niga",
        "teamId": 1
}]
"""

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
    confidence = 1 - 1/(1 + prediction)
    return int(avgTier.idxmax()), confidence


print(findWinner(string))

