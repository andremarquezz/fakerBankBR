const {
  criarContaBancaria,
  criarContasBancarias,
} = require('../../index');

describe('criarContaBancaria', () => {
  it('gera uma conta bancaria', () => {
    const conta = criarContaBancaria({ semente: 123, codigoBanco: '001' });

    expect(conta).to.be.an('object');
    expect(conta).to.have.property('banco');
    expect(conta).to.have.property('agencia');
    expect(conta).to.have.property('conta');
  });

  it('gera varias contas bancarias quando quantidade > 1', () => {
    const quantidade = 3;
    const contas = criarContasBancarias(quantidade, { semente: 456 });

    expect(contas).to.be.an('array').to.have.lengthOf(quantidade);
    contas.forEach((conta) => {
      expect(conta).to.be.an('object');
      expect(conta).to.have.property('banco');
      expect(conta).to.have.property('agencia');
      expect(conta).to.have.property('conta');
    });
  });

  it('gera contas deterministicas com a mesma semente', () => {
    const a = criarContaBancaria({ semente: 'abc', codigoBanco: '001' });
    const b = criarContaBancaria({ semente: 'abc', codigoBanco: '001' });

    expect(a).to.deep.equal(b);
  });
});
