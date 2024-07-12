'use strict';
const https = require('https');
const querystring = require('querystring');
const cheerio = require('cheerio');
const httpcodes = require('./codes.json');

exports.createFakeBankAccount = (quantity = '1', commas = 'N') => {
  return new Promise((resolve, reject) => {
    if (quantity > 10) {
      quantity = '10';
    }

    let body = querystring.stringify({
      acao: 'gerar_conta_bancaria',
      pontuacao: commas,
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
      let data = '';

      const req = https.request(options, function (res) {
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

        res.on('data', function (chunk) {
          data += chunk;
        });

        req.on('error', function (err) {
          response.error = true;
          response.code = err.code;
          response.error_msg = err.message;
          reject(response);
        });

        res.on('end', function () {
          try {
            if (data.trim().startsWith('<')) {
              const $ = cheerio.load(data);

              let conta_corrente_completa = $('#conta_corrente').text().trim();
              let conta_corrente = conta_corrente_completa.split('-')[0];
              let digito_verificador = conta_corrente_completa.split('-')[1];

              let extractedData = {
                account_number: conta_corrente,
                verification_digit: digito_verificador,
                agency: $('#agencia').text().trim(),
                bank: $('#banco').text().trim(),
              };

              response.error = false;
              response.data = extractedData;
              resolve(response.data);
            } else {
              let Four_Devs = JSON.parse(data);

              if (response.code !== 200 || !Four_Devs) {
                response.error = true;
                response.dev_msg =
                  'Talvez você tenha sido bloqueado pelo servidor. Certifique-se de que não está usando proxy ou algo similar e tente em outra máquina.';
              } else {
                response.error = false;
                response.data = Four_Devs;
              }
              resolve(response.data);
            }
          } catch (error) {
            response.error = true;
            response.error_msg =
              'Erro ao analisar a resposta JSON: ' + error.message;
            reject(response);
          }
        });
      });

      req.on('error', function (err) {
        let response = {
          error: true,
          code: err.code,
          error_msg: err.message,
          data: null,
        };
        reject(response);
      });

      req.write(body);
      req.end();
    } catch (error) {
      let response = {
        error: true,
        code: error.code,
        error_msg: error.message,
        data: null,
      };
      reject(response);
    }
  });
};
