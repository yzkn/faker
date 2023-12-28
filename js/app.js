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
    document.getElementById('listFaker').innerHTML = '<table><tbody class="list" id="tableFaker"><tr><td></td><td class="Surname"></td><td class="GivenName"></td><td class="SurnameKana"></td><td class="GivenNameKana"></td><td class="SurnameRome"></td><td class="GivenNameRome"></td><td class="Sex"></td><td class="Phone11"></td><td class="Phone12"></td><td class="Phone13"></td><td class="FAX11"></td><td class="FAX12"></td><td class="FAX13"></td><td class="MobilePhone11"></td><td class="MobilePhone12"></td><td class="MobilePhone13"></td><td class="MailAddress"></td><td class="PostalCode"></td><td class="Address11"></td><td class="Address12"></td><td class="Address13"></td><td class="Address14"></td><td class="Address15"></td><td class="AddressKana11"></td><td class="AddressKana12"></td><td class="AddressKana13"></td><td class="AddressKana14"></td><td class="AddressKana15"></td><td class="AddressRome11"></td><td class="AddressRome12"></td><td class="AddressRome13"></td><td class="AddressRome14"></td><td class="AddressRome15"></td><td class="DateOfBirth"></td><td class="Birthplace"></td><td class="BloodType"></td><td class="RandomNumber"></td><td class="Password"></td></tr>' +
        '<tr><th>#</th><th>姓</th><th>名</th><th>せい</th><th>めい</th><th>Surname</th><th>Given name</th><th>性</th><th colspan="3">電話番号</th><th colspan="3">FAX</th><th colspan="3">携帯番号</th><th>Eメール</th><th>郵便番号</th><th colspan="5">住所</th><th colspan="5">じゅうしょ</th><th colspan="5">Address</th><th>誕生日</th><th>出生地</th><th>血液型</th><th>乱数</th><th>パスワード</th></tr></tbody></table>';

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
