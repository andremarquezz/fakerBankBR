# FakerBankBR

FakerBankBR e uma biblioteca para gerar dados falsos de contas bancarias brasileiras sem depender de servicos externos.
Ela gera banco, agencia e conta com digitos verificadores usando algoritmos locais.

Todas as funcoes sao sincronas.

## Instalacao

```bash
npm install fakerbankbr
```

## Uso

```javascript
const {
  criarContaBancaria,
  criarContasBancarias,
  listarBancos,
} = require('fakerbankbr');

const conta = criarContaBancaria();
const contas = criarContasBancarias(3, { semente: 123 });
const contaBanco = criarContaBancaria({ codigoBanco: '001' });

console.log(conta);
console.log(contas.length);
console.log(listarBancos());
```

### Exemplo de resposta

```json
{
  "banco": {
    "codigo": "001",
    "nome": "Banco do Brasil"
  },
  "agencia": {
    "numero": "1234",
    "digito": "5",
    "completo": "1234-5"
  },
  "conta": {
    "numero": "12345678",
    "digito": "9",
    "completo": "12345678-9"
  }
}
```

## API

### criarContaBancaria(opcoes)

Gera uma conta bancaria.

Opcoes:
- codigoBanco: codigo do banco (ex: "001")
- nomeBanco: nome do banco (ex: "Itau")
- semente: numero ou string para resultados deterministas
- tamanhoAgencia: tamanho da agencia
- tamanhoConta: tamanho da conta
- incluirDigitoAgencia: boolean (default true)
- incluirDigitoConta: boolean (default true)
- permitirZeroEsquerda: boolean (default false)

### criarContasBancarias(quantidade, opcoes)

Gera varias contas bancarias. quantidade deve ser um numero positivo.

### listarBancos()

Retorna a lista de bancos disponiveis com metadados de geracao.

## Ajuste de regras por banco

As regras de tamanho e algoritmos ficam em `lib/bancos.js`. Voce pode ajustar os pesos,
substituicoes e algoritmos (mod10/mod11) para aumentar a fidelidade por instituicao.
