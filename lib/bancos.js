'use strict';

const PESOS_MOD11_PADRAO = [2, 3, 4, 5, 6, 7, 8, 9];
const PESOS_MOD11_CURTO = [2, 3, 4, 5, 6, 7];
const PESOS_MOD10_PADRAO = [2, 1];
const SUBSTITUICAO_MOD11_ZERO = { 10: '0', 11: '0' };

module.exports = [
  {
    codigo: '001',
    nome: 'Banco do Brasil',
    agencia: {
      tamanho: 4,
      digito: {
        algoritmo: 'mod11',
        pesos: PESOS_MOD11_PADRAO,
        substituicoes: SUBSTITUICAO_MOD11_ZERO,
      },
    },
    conta: {
      tamanho: 8,
      digito: {
        algoritmo: 'mod11',
        pesos: PESOS_MOD11_PADRAO,
        substituicoes: SUBSTITUICAO_MOD11_ZERO,
      },
    },
  },
  {
    codigo: '003',
    nome: 'Banco da Amazonia',
    agencia: {
      tamanho: 4,
      digito: {
        algoritmo: 'mod11',
        pesos: PESOS_MOD11_PADRAO,
        substituicoes: SUBSTITUICAO_MOD11_ZERO,
      },
    },
    conta: {
      tamanho: 8,
      digito: {
        algoritmo: 'mod11',
        pesos: PESOS_MOD11_PADRAO,
        substituicoes: SUBSTITUICAO_MOD11_ZERO,
      },
    },
  },
  {
    codigo: '004',
    nome: 'Banco do Nordeste',
    agencia: {
      tamanho: 4,
      digito: {
        algoritmo: 'mod11',
        pesos: PESOS_MOD11_PADRAO,
        substituicoes: SUBSTITUICAO_MOD11_ZERO,
      },
    },
    conta: {
      tamanho: 8,
      digito: {
        algoritmo: 'mod11',
        pesos: PESOS_MOD11_PADRAO,
        substituicoes: SUBSTITUICAO_MOD11_ZERO,
      },
    },
  },
  {
    codigo: '033',
    nome: 'Santander',
    agencia: {
      tamanho: 4,
      digito: {
        algoritmo: 'mod11',
        pesos: PESOS_MOD11_PADRAO,
        substituicoes: SUBSTITUICAO_MOD11_ZERO,
      },
    },
    conta: {
      tamanho: 8,
      digito: {
        algoritmo: 'mod11',
        pesos: PESOS_MOD11_PADRAO,
        substituicoes: SUBSTITUICAO_MOD11_ZERO,
      },
    },
  },
  {
    codigo: '077',
    nome: 'Banco Inter',
    agencia: {
      tamanho: 4,
      digito: {
        algoritmo: 'mod11',
        pesos: PESOS_MOD11_PADRAO,
        substituicoes: SUBSTITUICAO_MOD11_ZERO,
      },
    },
    conta: {
      tamanho: 8,
      digito: {
        algoritmo: 'mod11',
        pesos: PESOS_MOD11_PADRAO,
        substituicoes: SUBSTITUICAO_MOD11_ZERO,
      },
    },
  },
  {
    codigo: '104',
    nome: 'Caixa Economica Federal',
    agencia: {
      tamanho: 4,
      digito: {
        algoritmo: 'mod11',
        pesos: PESOS_MOD11_PADRAO,
        substituicoes: SUBSTITUICAO_MOD11_ZERO,
      },
    },
    conta: {
      tamanho: 9,
      digito: {
        algoritmo: 'mod11',
        pesos: PESOS_MOD11_PADRAO,
        substituicoes: SUBSTITUICAO_MOD11_ZERO,
      },
    },
  },
  {
    codigo: '208',
    nome: 'BTG Pactual',
    agencia: {
      tamanho: 4,
      digito: {
        algoritmo: 'mod11',
        pesos: PESOS_MOD11_PADRAO,
        substituicoes: SUBSTITUICAO_MOD11_ZERO,
      },
    },
    conta: {
      tamanho: 8,
      digito: {
        algoritmo: 'mod11',
        pesos: PESOS_MOD11_PADRAO,
        substituicoes: SUBSTITUICAO_MOD11_ZERO,
      },
    },
  },
  {
    codigo: '212',
    nome: 'Banco Original',
    agencia: {
      tamanho: 4,
      digito: {
        algoritmo: 'mod11',
        pesos: PESOS_MOD11_PADRAO,
        substituicoes: SUBSTITUICAO_MOD11_ZERO,
      },
    },
    conta: {
      tamanho: 8,
      digito: {
        algoritmo: 'mod11',
        pesos: PESOS_MOD11_PADRAO,
        substituicoes: SUBSTITUICAO_MOD11_ZERO,
      },
    },
  },
  {
    codigo: '237',
    nome: 'Bradesco',
    agencia: {
      tamanho: 4,
      digito: {
        algoritmo: 'mod11',
        pesos: PESOS_MOD11_CURTO,
        substituicoes: SUBSTITUICAO_MOD11_ZERO,
      },
    },
    conta: {
      tamanho: 7,
      digito: {
        algoritmo: 'mod11',
        pesos: PESOS_MOD11_CURTO,
        substituicoes: SUBSTITUICAO_MOD11_ZERO,
      },
    },
  },
  {
    codigo: '260',
    nome: 'Nubank',
    agencia: {
      tamanho: 4,
      digito: {
        algoritmo: 'mod11',
        pesos: PESOS_MOD11_PADRAO,
        substituicoes: SUBSTITUICAO_MOD11_ZERO,
      },
    },
    conta: {
      tamanho: 9,
      digito: {
        algoritmo: 'mod11',
        pesos: PESOS_MOD11_PADRAO,
        substituicoes: SUBSTITUICAO_MOD11_ZERO,
      },
    },
  },
  {
    codigo: '336',
    nome: 'C6 Bank',
    agencia: {
      tamanho: 4,
      digito: {
        algoritmo: 'mod11',
        pesos: PESOS_MOD11_PADRAO,
        substituicoes: SUBSTITUICAO_MOD11_ZERO,
      },
    },
    conta: {
      tamanho: 8,
      digito: {
        algoritmo: 'mod11',
        pesos: PESOS_MOD11_PADRAO,
        substituicoes: SUBSTITUICAO_MOD11_ZERO,
      },
    },
  },
  {
    codigo: '341',
    nome: 'Itau',
    agencia: {
      tamanho: 4,
      digito: {
        algoritmo: 'mod11',
        pesos: PESOS_MOD11_CURTO,
        substituicoes: SUBSTITUICAO_MOD11_ZERO,
      },
    },
    conta: {
      tamanho: 5,
      digito: {
        algoritmo: 'mod10',
        pesos: PESOS_MOD10_PADRAO,
      },
    },
  },
  {
    codigo: '422',
    nome: 'Banco Safra',
    agencia: {
      tamanho: 4,
      digito: {
        algoritmo: 'mod11',
        pesos: PESOS_MOD11_PADRAO,
        substituicoes: SUBSTITUICAO_MOD11_ZERO,
      },
    },
    conta: {
      tamanho: 8,
      digito: {
        algoritmo: 'mod11',
        pesos: PESOS_MOD11_PADRAO,
        substituicoes: SUBSTITUICAO_MOD11_ZERO,
      },
    },
  },
  {
    codigo: '623',
    nome: 'Banco Pan',
    agencia: {
      tamanho: 4,
      digito: {
        algoritmo: 'mod11',
        pesos: PESOS_MOD11_PADRAO,
        substituicoes: SUBSTITUICAO_MOD11_ZERO,
      },
    },
    conta: {
      tamanho: 8,
      digito: {
        algoritmo: 'mod11',
        pesos: PESOS_MOD11_PADRAO,
        substituicoes: SUBSTITUICAO_MOD11_ZERO,
      },
    },
  },
  {
    codigo: '655',
    nome: 'Banco Votorantim',
    agencia: {
      tamanho: 4,
      digito: {
        algoritmo: 'mod11',
        pesos: PESOS_MOD11_CURTO,
        substituicoes: SUBSTITUICAO_MOD11_ZERO,
      },
    },
    conta: {
      tamanho: 7,
      digito: {
        algoritmo: 'mod11',
        pesos: PESOS_MOD11_CURTO,
        substituicoes: SUBSTITUICAO_MOD11_ZERO,
      },
    },
  },
  {
    codigo: '707',
    nome: 'Banco Daycoval',
    agencia: {
      tamanho: 4,
      digito: {
        algoritmo: 'mod11',
        pesos: PESOS_MOD11_CURTO,
        substituicoes: SUBSTITUICAO_MOD11_ZERO,
      },
    },
    conta: {
      tamanho: 7,
      digito: {
        algoritmo: 'mod11',
        pesos: PESOS_MOD11_CURTO,
        substituicoes: SUBSTITUICAO_MOD11_ZERO,
      },
    },
  },
];
