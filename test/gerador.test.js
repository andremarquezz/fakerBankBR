'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const {
  criarContaBancaria,
  criarContasBancarias,
  listarBancos,
} = require('../index');

function calcularDigitoMod11(numero, pesos, substituicoes) {
  let soma = 0;
  let indice = 0;

  for (let i = numero.length - 1; i >= 0; i -= 1) {
    soma += Number(numero[i]) * pesos[indice];
    indice = (indice + 1) % pesos.length;
  }

  const resto = soma % 11;
  const digito = 11 - resto;

  if (
    substituicoes &&
    Object.prototype.hasOwnProperty.call(substituicoes, digito)
  ) {
    return String(substituicoes[digito]);
  }

  if (digito === 10 || digito === 11) {
    return '0';
  }

  return String(digito);
}

function calcularDigitoMod10(numero, pesos) {
  let soma = 0;
  let indice = 0;

  for (let i = numero.length - 1; i >= 0; i -= 1) {
    let produto = Number(numero[i]) * pesos[indice];
    if (produto > 9) {
      produto = Math.floor(produto / 10) + (produto % 10);
    }
    soma += produto;
    indice = (indice + 1) % pesos.length;
  }

  const resto = soma % 10;
  const digito = (10 - resto) % 10;
  return String(digito);
}

test('listarBancos retorna copia independente', () => {
  const bancos = listarBancos();
  assert.ok(Array.isArray(bancos));
  assert.ok(bancos.length > 0);

  bancos[0].codigo = '999';
  const bancosNovamente = listarBancos();
  assert.notEqual(bancosNovamente[0].codigo, '999');
});

test('criarContaBancaria gera dados basicos', () => {
  const conta = criarContaBancaria({ semente: 123 });

  assert.ok(conta.banco);
  assert.ok(conta.banco.codigo);
  assert.ok(conta.banco.nome);
  assert.ok(conta.agencia.numero);
  assert.ok(conta.conta.numero);
  assert.notEqual(conta.agencia.numero[0], '0');
  assert.notEqual(conta.conta.numero[0], '0');
});

test('criarContasBancarias gera quantidade esperada', () => {
  const contas = criarContasBancarias(4, { semente: 456 });
  assert.equal(contas.length, 4);
});

test('quantidade invalida gera erro', () => {
  assert.throws(() => criarContasBancarias(0), /quantidade/);
  assert.throws(() => criarContasBancarias(-2), /quantidade/);
  assert.throws(() => criarContasBancarias('abc'), /quantidade/);
});

test('codigoBanco e nomeBanco invalidos geram erro', () => {
  assert.throws(() => criarContaBancaria({ codigoBanco: '999' }), /codigoBanco/);
  assert.throws(() => criarContaBancaria({ nomeBanco: 'inexistente' }), /nomeBanco/);
});

test('nomeBanco parcial encontra o banco', () => {
  const conta = criarContaBancaria({ nomeBanco: 'brasil', semente: 7 });
  assert.equal(conta.banco.codigo, '001');
});

test('digitos podem ser omitidos', () => {
  const conta = criarContaBancaria({
    semente: 9,
    incluirDigitoAgencia: false,
    incluirDigitoConta: false,
  });

  assert.equal(conta.agencia.digito, null);
  assert.equal(conta.conta.digito, null);
  assert.equal(conta.agencia.completo, conta.agencia.numero);
  assert.equal(conta.conta.completo, conta.conta.numero);
});

test('digitos seguem regras do banco', () => {
  const bancos = listarBancos();
  const itau = bancos.find((banco) => banco.codigo === '341');
  assert.ok(itau);

  const conta = criarContaBancaria({ codigoBanco: '341', semente: 42 });
  const digitoAgencia = calcularDigitoMod11(
    conta.agencia.numero,
    itau.agencia.digito.pesos,
    itau.agencia.digito.substituicoes
  );
  const digitoConta = calcularDigitoMod10(
    conta.conta.numero,
    itau.conta.digito.pesos
  );

  assert.equal(conta.agencia.digito, digitoAgencia);
  assert.equal(conta.conta.digito, digitoConta);
});

test('semente gera resultados deterministas', () => {
  const a = criarContaBancaria({ codigoBanco: '001', semente: 'abc' });
  const b = criarContaBancaria({ codigoBanco: '001', semente: 'abc' });
  assert.deepEqual(a, b);
});
