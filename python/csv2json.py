import json
import csv


json_list = []


with open('all.csv', 'r', encoding='utf-8') as f:
    for row in csv.DictReader(f):
        json_list.append(row)

with open('all.json', 'w', encoding='utf-8') as f:
    json.dump(json_list, f, ensure_ascii=False)
