import json
import requests
import os
import shutil

from nba_api.stats.endpoints import playercareerstats
from nba_headshot_downloader import headshots

# Collect NBA.com player IDs, and name
playersUrl = "https://stats.nba.com/stats/playerindex"

parameters = {
    "LeagueID": "00",
    "Season": "2024-25"
}

headers = {
    "Host": "stats.nba.com",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64",
    "Accept": "application/json, text/plain, */*",
    "Accept-Language": "en-US,en;q=0.9",
    "Referer": "https://www.nba.com/",
    "Origin": "https://www.nba.com",
    "Connection": "keep-alive"
}

response = requests.get(playersUrl, params=parameters, headers=headers)

if response.status_code == 200:
    data = response.json()

    result_set = data["resultSets"][0]
    headers = result_set["headers"]
    rows = result_set["rowSet"]

    id_index = headers.index("PERSON_ID")
    first_name_index = headers.index("PLAYER_FIRST_NAME")
    last_name_index = headers.index("PLAYER_LAST_NAME")

    players = [
        {
            "playerID": row[id_index],
            "fullName": f"{row[first_name_index]} {row[last_name_index]}"
        }
        for row in rows
    ]

else:
    print(f"Request failed with status code {response.status_code}")

#Collect player data and ID from rest API http://rest.nbaapi.com/index.html
swaggerPlayersUrl = "http://rest.nbaapi.com/api/PlayerDataTotals/season/2025"

response = requests.get(swaggerPlayersUrl)

if response.status_code == 200:
    all_player_data = response.json()

    swagger_players = [
        {
            "playerID": player["id"],
            "fullName": player["playerName"]
        }
        for player in all_player_data
    ]

else:
    print(f"Failed to fetch data. Status code: {response.status_code}")

#Remove duplicate player names from array, keeping player with highest (newest) playerID
def remove_duplicate_players(array):
    unique_players = {}

    for player in array:
        name = player["fullName"]
        if name not in unique_players or player["playerID"] > unique_players[name]["playerID"]:
            unique_players[name] = player
    
    return list(unique_players.values())

#Run remove duplicates on swagger_players
swagger_players = remove_duplicate_players(swagger_players)

#Generate array of players that match names from 2 sources (and store those that don't separately)
matching_players = []
non_matching_players = []

for player in players:
    match_found = False

    for swagger_player in swagger_players:
        if player["fullName"].lower() == swagger_player["fullName"].lower():
            matching_players.append({
                "nba_playerID": player["playerID"],
                "swagger_playerID": swagger_player["playerID"],
                "fullName": player["fullName"]
            })
            match_found = True
            break

    if not match_found:
        non_matching_players.append({
            "nba_playerID": player["playerID"],
            "swagger_playerID": swagger_player["playerID"],
            "nba_fullName": player["fullName"],
            "swagger_fullName": swagger_player["fullName"]
        })

#Download photos for each NBA player without a photo already copied

#folder to save images
output_folder = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "public", "player-images")

#loop through all matching players and download headshot by NBA API ID, only if not previously downloaded
for player in matching_players:
    nba_id = player["nba_playerID"]
    swagger_id = player["swagger_playerID"]
    final_file_path = os.path.join(output_folder, f"{swagger_id}.png")
    temp_file_path = os.path.join(output_folder, f"{nba_id}.png")

    if not os.path.exists(final_file_path):
        try:
            headshots.getHeadshotById(nba_id, output_folder)

            if os.path.exists(temp_file_path):
                shutil.move(temp_file_path, final_file_path)
            else:
                print(f"Expected image not found at {temp_file_path} after download")
        except Exception as e:
            print(f"Failed to download headshot for {player['fullName']} (Swagger ID: {swagger_id}): {e}")
    else:
        print(f"Headshot already exists for {player['fullName']} (Swagger ID: {swagger_id})")