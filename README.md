<div align="center">
  <img src="https://images.squarespace-cdn.com/content/v1/603a992bcf34a07d765e1085/1f51c872-40a9-4dfe-8d3e-c8868e05f2d7/16247556_9729.jpg" width="200"/>
  <h1>FakerBankBR</h1>
  <p>FakerBankBR é uma biblioteca que permite a geração de dados falsos, porém realistas, de contas bancárias brasileiras. É ideal para testes e desenvolvimento de aplicações que requerem dados bancários fictícios.</p>
  
[![npm version](https://badgen.net/npm/v/fakerbankbr)](https://www.npmjs.com/package/fakerbankbr)

</div>

## 📦Instalação

Para usar o FakerBankBR, você pode instalá-lo via npm:

```bash
npm install --save-dev fakerbankbr
```

## 🪄Uso

```javascript
const { createFakeBankAccount } = require('fakerbankbr');

// Gerar uma única conta bancária
createFakeBankAccount().then((conta) => {
  //utilização
});

// Gerar múltiplas contas bancárias (de 1 a 10)
createFakeBankAccount(5).then((contas) => {
  //utilização
});
```

### Exemplo de Resposta

#### Quando é gerada uma única conta:

```json
{
  "account_number": "123456",
  "verification_digit": "7",
  "agency": "1234",
  "bank": "Banco do Brasil"
}
```

#### Quando são geradas múltiplas contas:

```json
[
  {
    "account_number": "123456",
    "verification_digit": "7",
    "agency": "1234",
    "bank": "Banco do Brasil"
  },
  {
    "account_number": "654321",
    "verification_digit": "9",
    "agency": "5678",
    "bank": "Santander"
  },
  {
    "account_number": "987654",
    "verification_digit": "2",
    "agency": "9012",
    "bank": "Bradesco"
  }
]
```

## API

### `createFakeBankAccount(quantity)`

- `quantity`: (Opcional) Número de contas bancárias a serem geradas. O padrão é **1 e o máximo é 10**.

Retorna uma promise que resolve com um objeto de conta bancária ou um array de objetos de conta bancária, dependendo do parâmetro `quantity`.

## Créditos

- Esta biblioteca utiliza o site do 4Devs para gerar informações falsas de contas bancárias brasileiras.

## Licença

Este projeto é licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.
