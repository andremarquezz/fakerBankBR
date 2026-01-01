'use strict';

const bancos = require('./bancos');
const {
  criarGeradorComSemente,
  escolherAleatorio,
  inteiroAleatorio,
} = require('./aleatorio');

const PADROES = {
  agencia: 4,
  conta: 8,
  pesosMod11: [2, 3, 4, 5, 6, 7, 8, 9],
  pesosMod10: [2, 1],
  substituicoesMod11: { 10: '0', 11: '0' },
};

function normalizarOpcoes(opcoes) {
  if (opcoes && typeof opcoes === 'object') {
    return opcoes;
  }

  return {};
}

function normalizarQuantidade(quantidade) {
  const valor = Number(quantidade);
  if (!Number.isFinite(valor) || valor <= 0) {
    throw new Error('quantidade deve ser um numero positivo');
  }

  return Math.floor(valor);
}

function resolverTamanho(valor, fallback, padrao) {
  const tamanho = Number(valor);
  if (Number.isInteger(tamanho) && tamanho > 0) {
    return tamanho;
  }

  if (Number.isInteger(fallback) && fallback > 0) {
    return fallback;
  }

  return padrao;
}

function gerarNumero(gerador, tamanho, permitirZeroEsquerda) {
  if (!Number.isInteger(tamanho) || tamanho <= 0) {
    throw new Error('tamanho deve ser um numero inteiro positivo');
  }

  let resultado = '';
  for (let i = 0; i < tamanho; i += 1) {
    const minimo = i === 0 && !permitirZeroEsquerda ? 1 : 0;
    resultado += String(inteiroAleatorio(gerador, minimo, 9));
  }

  return resultado;
}

function calcularDigitoMod11(numero, regra) {
  const pesos =
    regra && Array.isArray(regra.pesos) && regra.pesos.length > 0
      ? regra.pesos
      : PADROES.pesosMod11;
  const substituicoes =
    regra && regra.substituicoes ? regra.substituicoes : PADROES.substituicoesMod11;

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

function calcularDigitoMod10(numero, regra) {
  const pesos =
    regra && Array.isArray(regra.pesos) && regra.pesos.length > 0
      ? regra.pesos
      : PADROES.pesosMod10;

  let soma = 0;
  let indice = 0;

  for (let i = numero.length - 1; i >= 0; i -= 1) {
    const peso = pesos[indice];
    let produto = Number(numero[i]) * peso;
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

function calcularDigito(numero, regra) {
  if (!regra || regra.ativo === false) {
    return null;
  }

  const algoritmo = regra.algoritmo || 'mod11';

  if (algoritmo === 'nenhum') {
    return null;
  }

  if (algoritmo === 'mod10') {
    return calcularDigitoMod10(numero, regra);
  }

  return calcularDigitoMod11(numero, regra);
}

function encontrarBancoPorCodigo(codigo) {
  const normalizado = String(codigo).trim().padStart(3, '0');
  return bancos.find((banco) => banco.codigo === normalizado);
}

function encontrarBancoPorNome(nome) {
  const normalizado = String(nome).trim().toLowerCase();
  return (
    bancos.find((banco) => banco.nome.toLowerCase() === normalizado) ||
    bancos.find((banco) => banco.nome.toLowerCase().includes(normalizado))
  );
}

function resolverBancoFixo(opcoes) {
  if (opcoes.codigoBanco) {
    const banco = encontrarBancoPorCodigo(opcoes.codigoBanco);
    if (!banco) {
      throw new Error(`codigoBanco nao encontrado: ${opcoes.codigoBanco}`);
    }
    return banco;
  }

  if (opcoes.nomeBanco) {
    const banco = encontrarBancoPorNome(opcoes.nomeBanco);
    if (!banco) {
      throw new Error(`nomeBanco nao encontrado: ${opcoes.nomeBanco}`);
    }
    return banco;
  }

  return null;
}

function montarConta(banco, gerador, opcoes) {
  const tamanhoAgencia = resolverTamanho(
    opcoes.tamanhoAgencia,
    banco.agencia && banco.agencia.tamanho,
    PADROES.agencia
  );
  const tamanhoConta = resolverTamanho(
    opcoes.tamanhoConta,
    banco.conta && banco.conta.tamanho,
    PADROES.conta
  );
  const permitirZeroEsquerda = opcoes.permitirZeroEsquerda === true;
  const incluirDigitoAgencia = opcoes.incluirDigitoAgencia !== false;
  const incluirDigitoConta = opcoes.incluirDigitoConta !== false;

  const numeroAgencia = gerarNumero(gerador, tamanhoAgencia, permitirZeroEsquerda);
  const numeroConta = gerarNumero(gerador, tamanhoConta, permitirZeroEsquerda);
  const regraAgencia = banco.agencia ? banco.agencia.digito : null;
  const regraConta = banco.conta ? banco.conta.digito : null;

  const digitoAgencia = incluirDigitoAgencia
    ? calcularDigito(numeroAgencia, regraAgencia)
    : null;
  const digitoConta = incluirDigitoConta
    ? calcularDigito(numeroConta, regraConta)
    : null;

  return {
    banco: {
      codigo: banco.codigo,
      nome: banco.nome,
    },
    agencia: {
      numero: numeroAgencia,
      digito: digitoAgencia,
      completo:
        digitoAgencia === null ? numeroAgencia : `${numeroAgencia}-${digitoAgencia}`,
    },
    conta: {
      numero: numeroConta,
      digito: digitoConta,
      completo: digitoConta === null ? numeroConta : `${numeroConta}-${digitoConta}`,
    },
  };
}

function criarContasBancarias(quantidade = 1, opcoes = {}) {
  const opcoesNormalizadas = normalizarOpcoes(opcoes);
  const total = normalizarQuantidade(quantidade);
  const gerador =
    opcoesNormalizadas.semente !== undefined
      ? criarGeradorComSemente(opcoesNormalizadas.semente)
      : Math.random;
  const bancoFixo = resolverBancoFixo(opcoesNormalizadas);

  const resultados = new Array(total);
  for (let i = 0; i < total; i += 1) {
    const banco = bancoFixo || escolherAleatorio(gerador, bancos);
    resultados[i] = montarConta(banco, gerador, opcoesNormalizadas);
  }

  return resultados;
}

function criarContaBancaria(opcoes = {}) {
  return criarContasBancarias(1, opcoes)[0];
}

function listarBancos() {
  return JSON.parse(JSON.stringify(bancos));
}

module.exports = {
  criarContaBancaria,
  criarContasBancarias,
  listarBancos,
};
