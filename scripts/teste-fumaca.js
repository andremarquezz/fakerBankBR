'use strict';

const assert = require('assert');
const {
  criarContaBancaria,
  criarContasBancarias,
  listarBancos,
} = require('../index');

function validarEstruturaConta(conta) {
  assert.ok(conta, 'conta obrigatoria');
  assert.ok(conta.banco, 'banco obrigatorio');
  assert.ok(conta.banco.codigo, 'banco.codigo obrigatorio');
  assert.ok(conta.banco.nome, 'banco.nome obrigatorio');
  assert.ok(conta.agencia, 'agencia obrigatoria');
  assert.ok(conta.agencia.numero, 'agencia.numero obrigatorio');
  assert.ok(conta.conta, 'conta obrigatoria');
  assert.ok(conta.conta.numero, 'conta.numero obrigatorio');
}

try {
  const bancos = listarBancos();
  assert.ok(Array.isArray(bancos), 'listarBancos deve retornar um array');
  assert.ok(bancos.length > 0, 'listarBancos nao pode retornar vazio');

  const unica = criarContaBancaria({ semente: 123, codigoBanco: bancos[0].codigo });
  validarEstruturaConta(unica);

  const lote = criarContasBancarias(3, { semente: 456 });
  assert.strictEqual(lote.length, 3);
  lote.forEach(validarEstruturaConta);

  const deterministicaA = criarContaBancaria({ semente: 'abc', codigoBanco: '001' });
  const deterministicaB = criarContaBancaria({ semente: 'abc', codigoBanco: '001' });
  assert.deepStrictEqual(deterministicaA, deterministicaB);

  console.log('Teste de fumaca passou.');
} catch (erro) {
  console.error('Teste de fumaca falhou.');
  console.error(erro);
  process.exit(1);
}
