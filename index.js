'use strict';
const https = require('https');
const querystring = require('querystring');
const cheerio = require('cheerio');
const httpcodes = require('./codes.json');

exports.createFakeBankAccount = (quantity = 1) => {
  return new Promise((resolve, reject) => {
    if (quantity > 10) {
      quantity = 10;
    }

    let body = querystring.stringify({
      acao: 'gerar_conta_bancaria',
      txt_qtde: quantity,
    });

    let options = {
      hostname: 'www.4devs.com.br',
      path: '/ferramentas_online.php',
      method: 'POST',
      headers: {
        authority: 'www.4devs.com.br',
        accept: '*/*',
        'accept-language': 'en-US,en;q=0.9,pt;q=0.8',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': body.length,
      },
    };

    try {
      const requests = [];

      for (let i = 0; i < quantity; i++) {
        requests.push(makeRequest(options, body));
      }

      Promise.all(requests)
        .then((responses) => {
          let accounts = [];

          responses.forEach((response) => {
            if (!response.error && response.data) {
              if (Array.isArray(response.data)) {
                accounts = accounts.concat(response.data);
              } else {
                accounts.push(response.data);
              }
            }
          });

          // Determine what to return based on quantity
          if (quantity === 1) {
            resolve(accounts.length > 0 ? accounts[0] : null);
          } else {
            resolve(accounts);
          }
        })
        .catch((error) => {
          reject(error);
        });
    } catch (error) {
      reject(error);
    }
  });
};

function makeRequest(options, body) {
  return new Promise((resolve, reject) => {
    let data = '';

    const req = https.request(options, function (res) {
      res.on('data', function (chunk) {
        data += chunk;
      });

      res.on('end', function () {
        try {
          let response = parseResponse(res, data);
          resolve(response);
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on('error', function (err) {
      reject(err);
    });

    req.write(body);
    req.end();
  });
}

function parseResponse(res, data) {
  let response = {
    error: true,
    code: res.statusCode,
    explain: httpcodes[res.statusCode],
    headers: res.headers,
    date: new Date().toLocaleString(),
    error_msg: null,
    dev_msg: null,
    data: null,
  };

  if (data.trim().startsWith('<')) {
    const $ = cheerio.load(data);

    let full_account_number = $('#conta_corrente').text().trim();
    let account_number = full_account_number.split('-')[0];
    let verification_digit = full_account_number.split('-')[1];

    let extractedData = {
      account_number: account_number,
      verification_digit: verification_digit,
      agency: $('#agencia').text().trim(),
      bank: $('#banco').text().trim(),
    };

    response.error = false;
    response.data = extractedData;
  } else {
    let Four_Devs = JSON.parse(data);

    if (res.statusCode !== 200 || !Four_Devs) {
      response.dev_msg =
        'You may have been blocked by the server. Make sure you are not using a proxy or something similar and try on another machine.';
    } else {
      response.error = false;
      response.data = Four_Devs;
    }
  }

  return response;
}
