'use strict';

function hashFnv1a(entrada) {
  const texto = String(entrada);
  let hash = 2166136261;

  for (let i = 0; i < texto.length; i += 1) {
    hash ^= texto.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}

function criarGeradorComSemente(semente) {
  let estado = hashFnv1a(semente);

  return function gerador() {
    estado = (estado + 0x6d2b79f5) | 0;
    let t = Math.imul(estado ^ (estado >>> 15), 1 | estado);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function inteiroAleatorio(gerador, minimo, maximo) {
  return Math.floor(gerador() * (maximo - minimo + 1)) + minimo;
}

function escolherAleatorio(gerador, lista) {
  return lista[inteiroAleatorio(gerador, 0, lista.length - 1)];
}

module.exports = {
  criarGeradorComSemente,
  inteiroAleatorio,
  escolherAleatorio,
};
