import json
import bson

def read_json(filePath):
    with open(filePath, 'r') as infile:
        jsonData = json.load(infile)
        return jsonData

def strip_invalid(jsonData):
    returnList = []

    for x in jsonData:
        ## Strip out single quotes
        if '\'' in x:
            continue

        ## Strip out too small
        if len(x) < 3:
            continue

        returnList.append(x)
    return returnList

def format_json(jsonData):
    formatedJson = {'short': [], 'medium': [], 'long': []}
    for x in jsonData:
        if 3 <= len(x) <= 4:
            formatedJson['short'].append(x)
        elif 5 <= len(x) <= 8:
            formatedJson['medium'].append(x)
        else:
            formatedJson['long'].append(x)
    return formatedJson

def write_json(filePath, data):
    with open(filePath, 'w') as outfile:
        json.dump(data, outfile)

def main():
    jsonData = read_json('./wordlist.json')
    jsonData = format_json(strip_invalid(jsonData))
    write_json('../src/common/wordlist.json', jsonData)

main()