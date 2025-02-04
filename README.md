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

### Async/Await

```javascript
const { createFakeBankAccount } = require('fakerbankbr');

// Gerar uma única conta bancária
// Retorna uma Promise, portanto deve estar dentro de uma função assíncrona
async () => {
  const conta = await createFakeBankAccount();
  // Utilização
};

// Gerar múltiplas contas bancárias (de 1 a 10)
// Retorna uma Promise, portanto deve estar dentro de uma função assíncrona
async () => {
  const contas = await createFakeBankAccount(5);
  // Utilização
};
```

### Then

```javascript
const { createFakeBankAccount } = require('fakerbankbr');

// Gerar uma única conta bancária
createFakeBankAccount().then((conta) => {
  // Utilização
});

// Gerar múltiplas contas bancárias (de 1 a 10)
createFakeBankAccount(5).then((contas) => {
  // Utilização
});
```

### Exemplo de Resposta

#### Quando é gerada uma única conta:

```json
{
  "account_number": "252258",
  "verification_digit": "6",
  "agency": "4282",
  "bank": "Banco do Brasil"
}
```

#### Quando são geradas múltiplas contas:

```json
[
  {
    "account_number": "09988239",
    "verification_digit": "3",
    "agency": "1091",
    "bank": "Santander"
  },
  {
    "account_number": "84156",
    "verification_digit": "1",
    "agency": "3010",
    "bank": "Itaú"
  }
]
```

## API

### `createFakeBankAccount(quantity)`

- `quantity`: (Opcional) Número de contas bancárias a serem geradas. O padrão é **1 e o máximo é 10**.

Retorna uma promise que resolve com um objeto de conta bancária ou um array de objetos de conta bancária, dependendo do parâmetro `quantity`.
