# Teste-backend - Caixa eletrônico
Teste para vaga NodeJS

# Como a solução foi desenvolvida
  Decidi utilizar a biblioteca Inquirer para simular um bot e disponibilizar as funcionalidades aos usuários de modo que consigam selecioná-las teclando 
as setas cima ou baixo e depois teclando ENTER para selecionar a opção desejada. Estruturei perguntas e respostas no Inquirer e segui para a implementação
do código. Utilizei a biblioteca Chalk para dar destaque às mensagens enviadas aos usuários. Também utilizei o fs para criar o diretório accounts e armazenar um json para cada usuário cadastrado, e seus respectivos saldos em conta. Criei alguns testes unitários com o framework Jestjs, que consegue aprovar sucessos ou falhas apenas executando o script test.

# Requisitos
É necessário ter um editor de código (VSCode por exemplo) e o NodeJS instalados no seu computador.

# Métodos de uso
Digite no terminal o comando "npm install" para instalar as dependências e, em seguida, digite "npm start" para inciar a aplicação.
Serão mostradas algumas opções que disponibilizarão funcionalidades como a de criar conta, consultar saldo, fazer depósitos e saques, e etc...
Também há a opcão de usar o comando "npm test" para rodar os testes. 

1. Opção "Criar conta"
permite o usuário digitar um nome para criar sua conta. É bem simples e precisa apenas do nome. Em seguida é mostrado a ele novamente o menu
inicial para que possa escolher outras funcionalidades. Não é possível criar usuários com nomes repetidos.

2. Opção "Consultar saldo"
solicita ao usuário que digite o nome de sua conta para fazer a consulta. Em seguida é disparada uma mensagem informando ao mesmo o seu saldo.

3. Opção "Depositar"
solicita ao usuário o nome da conta e um valor para depósito. Mas existem algumas restrições de que letras e símbolos não podem ser passados,
assim como strings vazias.

4. Opção "Sacar"
solicita ao usuário o nome da conta e um valor para saque. Números negativos, letras e símbolos não são permitidos.
Ao final, é disparada uma mensagem informando o valor do saque e quantas notas dentre as disponíveis o caixa eletrônico irá entregar a ele.
Seguindo o padrão: Valor do Saque: R$ 30,00 – Resultado Esperado: Entregar 1 nota de R$20,00 e 1 nota de R$ 10,00.

5. Opção "Sair"
apenas encerra a sessão.
