// Copyright (c) 2023 YA-androidapp(https://github.com/yzkn) All rights reserved.


const generateFaker = _ => {
    let countFaker = document.getElementById('countFaker').value;

    let array = jsonData.slice(0, countFaker * 3);
    for (i = array.length; 1 < i; i--) {
        k = Math.floor(Math.random() * i);
        [array[k], array[i - 1]] = [array[i - 1], array[k]];
    }

    var listFaker = new List(
        'listFaker',
        {
            valueNames: valueNames
        },
        array.slice(0, countFaker)
    );

    document.getElementById('recordCountFaker').innerText = Array.from(document.getElementById('tableFaker').rows).length - 2;

    document.getElementById('saveFaker').removeAttribute('disabled');
};

const clearFaker = _ => {
    let htmlString = '<table><tbody class="list" id="tableFaker"><tr><td></td>'; // 行番号の1セル

    valueNames.forEach((value) => {
        htmlString += '<td class="' + value + '"></td>';
    });

    htmlString += '</tr><tr><th>#</th>';

    valueDisplayNames.forEach((value) => {
        htmlString += '<th>' + value + '</th>';
    });

    htmlString += '</tr></tbody></table>';

    document.getElementById('listFaker').innerHTML = htmlString;

    document.getElementById('saveFaker').setAttribute('disabled', 'disabled');
};

const saveFaker = _ => {
    const bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
    const tableFaker = document.getElementById('tableFaker');

    let csv = [], rowNumber = 0;

    csv.push(valueNames.join(','));
    Array.from(tableFaker.rows).forEach(rowItem => {
        if (rowNumber > 1) {
            let row = [];
            Array.from(rowItem.cells).forEach(cellItem => {
                if (cellItem.className !== '') {
                    let field = cellItem.textContent;
                    row.push(/,|\r?\n|\r|"/.test(field) ? '"' + field.replace(/"/g, '""') + '"' : field);
                }
            });
            csv.push(row.join(','));
        }

        rowNumber++;
    });

    let blob = new Blob([bom, csv.join('\n')], { 'type': 'text/csv' });
    let url = window.URL.createObjectURL(blob);

    let a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.download = "faker.csv";
    a.click();
    window.URL.revokeObjectURL(url);
};


window.addEventListener('DOMContentLoaded', _ => {
    document.getElementById('generateFaker').addEventListener('click', generateFaker);
    document.getElementById('clearFaker').addEventListener('click', clearFaker);
    document.getElementById('saveFaker').addEventListener('click', saveFaker);

    clearFaker();

    document.getElementById('generateFaker').removeAttribute('disabled');
    document.getElementById('clearFaker').removeAttribute('disabled');
});
