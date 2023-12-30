import json
import csv


json_list = []


with open('ex.csv', 'r', encoding='utf-8') as f:
    for row in csv.DictReader(f):
        json_list.append(row)

with open('ex.js', 'w', encoding='utf-8') as f:
    f.write('const jsonData = ')

with open('ex.js', 'a', encoding='utf-8') as f:
    json.dump(json_list, f, ensure_ascii=False)

with open('ex.js', 'a', encoding='utf-8') as f:
    f.write(';')
