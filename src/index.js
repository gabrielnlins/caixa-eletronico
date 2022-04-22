const { customerOperations } = require('./services');
/** 
 * TODO
 * 
Desenvolva um programa que simule a entrega de notas quando um cliente efetuar um saque em um caixa eletrônico. Os requisitos básicos são os seguintes:

OK - Entregar o menor número de notas;
OK - É possível sacar o valor solicitado com as notas disponíveis;
OK - Saldo do cliente infinito;
IN PROGRESS [ DECIDINDO SE VOU FAZER UMA QUANTIDADE FINITA DE NOTAS OU NÃO. ] - Quantidade de notas infinito 
(pode-se colocar um valor finito de cédulas para aumentar a dificuldade do problema);
OK - Notas disponíveis de R$ 100,00; R$ 50,00; R$ 20,00 e R$ 10,00
OK - Exemplos:

Valor do Saque: R$ 30,00 – Resultado Esperado: Entregar 1 nota de R$20,00 e 1 nota de R$ 10,00.
Valor do Saque: R$ 80,00 – Resultado Esperado: Entregar 1 nota de R$50,00 1 nota de R$ 20,00 e 1 nota de R$ 10,00.

//TODO
DESENVOLVER TESTES

pesquisar shutdown hook ou graceful shutdown
*/
customerOperations()