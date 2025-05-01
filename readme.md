# Validador de Cartão de Crédito

Este projeto contém uma função em JavaScript para validar números de cartões de crédito. A validação inclui a identificação da bandeira do cartão e a verificação de validade usando o algoritmo de Luhn.

## Funcionalidades

- **Identificação da Bandeira do Cartão**:
  A função identifica as seguintes bandeiras de cartão de crédito:
  - Visa: Começa com o número `4`.
  - MasterCard: Começa com dígitos entre `51` e `55` ou entre `2221` e `2720`.
  - Elo: Pode começar com vários intervalos, como `4011`, `4312`, `4389`, entre outros.
  - American Express: Inicia com `34` ou `37`.
  - Discover: Começa com `6011`, `65` ou na faixa de `644` a `649`.
  - Hipercard: Geralmente começa com `6062`.
  - Diners Club: Começa com `3` e tem 14 dígitos.
  - enRoute: Começa com `2` e tem 15 dígitos.
  - JCB: Começa com `35` e tem 16 dígitos.
  - Voyager: Começa com `86` e tem 15 dígitos.

- **Validação do Número do Cartão**:
  A função utiliza o algoritmo de Luhn para verificar se o número do cartão é válido.

## Como Usar

1. Insira o número do cartão de crédito na função `validarCartao`.
2. A função retornará um objeto com as seguintes informações:
   - `bandeira`: A bandeira do cartão identificada.
   - `valido`: Um valor booleano indicando se o número do cartão é válido.

### Exemplo de Uso

```javascript
const resultado = validarCartao('4111111111111111');
console.log(`Bandeira: ${resultado.bandeira}, Válido: ${resultado.valido}`);