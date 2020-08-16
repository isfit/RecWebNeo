import requests
import pandas as pd
import glob, os
import csv

positionFiles = ['positions15.txt', 'positions21.txt', 'positions8.txt', 'positions19.txt', '23.txt', 'positions5.txt', 'positions11.txt', 'positions14.txt', 'positions12.txt', 'positions9.txt', 'positions18.txt', 'positions16.txt', 'positions24.txt', 'positions17.txt', 'positions10.txt', 'positions7.txt', 'positions2.txt', 'positions13.txt', 'positions20.txt', 'positions3.txt', 'positions6.txt', 'positions4.txt', 'positions25.txt', 'positions22.txt', 'positions1.txt']

"""
os.chdir("./positionfiles")
for file in glob.glob("*.txt"):
    positionFiles.append(file)
print(positionFiles)
"""

apiUri = "http://localhost:5000"
token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjVmMzgwMmUxY2JjZDg4ODkwM2VlMDUwMiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzYW5kZXIuay5raWxlbkBnbWFpbC5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOlsic3VwZXJ1c2VyIiwiYWRtaW4iXSwiZXhwIjoxNTk3NjY0OTMwLCJpc3MiOiJpc3N1ZXIiLCJhdWQiOiJhdWRpZW5jZSJ9.SC2l0ursTTTswRg-4yZiUCs12rh_WJV_EmLcyh54azY"
headers = {"Authorization": "Bearer "+token}

def createAdmissionPeriodeMutation():
    pass

def createSectionMutation():
    mutation = """
        mutation createSection($input: CreateSectionInput!) {
            createSection(input: $input) {
                id
            }
        }
    """
    return mutation

def generateSectionInput(name, description, organization):
    createSectionInput = {
    "input": {
        "name": name,
        "description": description,
        "organization": organization
        }
    }
    return createSectionInput

def createTeamMutation():
    mutation = """
        mutation createTeam($input: CreateTeamInput){
        createTeam(input: $input) {
            id
        }
        }
    """
    return mutation

def generateTeamInput(name, description, section):
    createTeamInput = {
    "input": {
        "name": name,
        "description": description,
        "section": section
        }
    }
    return createTeamInput


def createPositionMutation():
    mutation = """
        mutation CreatePosition($input: CreatePositionInput){
            createPosition(input: $input) {
                id
            }
        }
    """
    return mutation

def generatePositionInput(name, description, admisionPeriode, section, team, tags):
    createSectionInput = {
        "input": {
            "name": name,
            "description": description,
            "admisionPeriode": admisionPeriode,
            "section": section,
            "team": team,
            "tags": tags
        }
    }
    return createSectionInput

def runQuery(query, variables):
    request = requests.post(apiUri, json={'query': query, 'variables': variables}, headers=headers)
    if request.status_code == 200:
        return request.json()
    else:
        raise Exception("Query failed, " + request.status_code)



# Values
organization = "5f380639ba25d491c993092e"
admisionPeriode = "5f380907c09ad297d71146ea"
sections = {}
teams = {}
positions = {}


with open('positionfiles/Positions.csv') as csv_file:
    csv_reader = csv.DictReader(csv_file)
    line_count = 0
    for row in csv_file:
        if (line_count == 0):
            pass
        else:
            row_data_list = row.replace('\n', '').replace(" ", '').split(",")
            if (not row_data_list[0] in sections ):
                input_variables = generateSectionInput(row_data_list[0], "An isfit2021 section", organization)
                mutation_string = createSectionMutation()
                response = runQuery(mutation_string, input_variables)
                if (not "error" in response):
                    sectionId = response['data']['createSection']['id']
                    sections[row_data_list[0]] = sectionId

            if (not row_data_list[0] in teams):
                input_variables = generateTeamInput(row_data_list[1], "An isfit2021 team", sections[row_data_list[0]])
                mutation_string = createTeamMutation()
                response = runQuery(mutation_string, input_variables)
                if (not "error" in response):
                    teamId = response['data']['createTeam']['id']
                    if (not row_data_list[0] in teams):
                        teams[row_data_list[0]] = {}
                    teams[row_data_list[0]][row_data_list[1]] = teamId
            else:
                if (not row_data_list[1] in teams[row_data_list[0]]):
                    input_variables = generateTeamInput(row_data_list[1], "An isfit2021 team", sections[row_data_list[0]])
                    mutation_string = createTeamMutation()
                    response = runQuery(mutation_string, input_variables)
                    if (not "error" in response):
                        teamId = response['data']['createTeam']['id']
                        if (not row_data_list[0] in teams):
                            teams[row_data_list[0]] = {}
                        teams[row_data_list[0]][row_data_list[1]] = teamId
            positions[row_data_list[2]] = {"Section": sections[row_data_list[0]], "Team": teams[row_data_list[0]][row_data_list[1]]}

        line_count += 1



for positionFile in positionFiles:
    f = open("positionfiles/"+positionFile, "r")
    data = f.read()
    positions_data = data.split("Title:")[1:]
    for position_data in positions_data:
        position = position_data.split("Description:")
        position_name = position[0].replace('\n', '').replace(" ", '')
        position_description = position[1].lstrip(' ').rstrip('\n').rstrip(' ')
        # Create mutation input
        input_variables = generatePositionInput(
            position_name,
            position_description,
            admisionPeriode,
            positions[position_name]["Section"],
            positions[position_name]["Team"],
            ["ISFIT2021"]
            )
        mutation_string = createPositionMutation()
        response = runQuery(mutation_string, input_variables)
        if ("data" in response):
            print("Created position", position_name)
        elif("error" in response):
            print("Failed to create position", position_name)


