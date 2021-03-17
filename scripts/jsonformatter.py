import json
import bson

def read_json(filePath):
    with open(filePath, 'r') as infile:
        jsonData = json.load(infile)
        return jsonData

def read_text(filePath):
    returnArray = []
    totalLines = 0
    with open(filePath, 'r') as infile:
        for line in infile:
            returnArray.append(line.rstrip())
            totalLines += 1
    print('Reading Words: {}'.format(totalLines))
    return returnArray

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
    formatingData = {'short':0, 'medium': 0, 'long': 0}

    for x in jsonData:
        if 3 <= len(x) <= 4:
            formatedJson['short'].append(x)
            formatingData['short'] += 1
        elif 5 <= len(x) <= 8:
            formatingData['medium'] += 1
            formatedJson['medium'].append(x)
        else:
            formatingData['long'] += 1
            formatedJson['long'].append(x)
    print('Formating Data: {}'.format(formatingData))
    return formatedJson

def write_json(filePath, data):
    with open(filePath, 'w') as outfile:
        json.dump(data, outfile)

def main():
    # jsonData = read_json('./wordlist.json')
    jsonData = read_text('./2of12.txt')
    jsonData = format_json(strip_invalid(jsonData))
    write_json('../src/common/wordlist.json', jsonData)

main()