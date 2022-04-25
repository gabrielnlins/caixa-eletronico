const inquirer = require('inquirer');
const chalk = require('chalk');
const fs = require('fs');

function customerOperations() {
    inquirer.prompt([{
        type: 'list',
        name: 'action',
        message: 'O que você deseja fazer?',
        choices: [
            'Criar conta',
            'Consultar saldo',
            'Depositar',
            'Sacar',
            'Sair'
        ]
    }]).then((answer) => {
        const userChoice = answer['action']

        switch (userChoice) {
            case 'Criar conta':
                buildAccount()
                break;
            case 'Consultar saldo':
                getAccountBalance()
                break;
            case 'Depositar':
                answersAndDeposit()
                break;
            case 'Sacar':
                withdraw()
                break;
            case 'Sair':
                exit()
            default:
                console.log(`Desculpe, mas nenhuma ação escolhida. \nEncerrando...`)
        }
    }).catch((e) => console.log(e))
}


// criar método para chamar a criação de conta
function createAccount(accountName) {
    const lowerCaseName = accountName.toLowerCase()
    if (!fs.existsSync('accounts')) {
        fs.mkdirSync('accounts')
    } else if (!checkIfValidAccount(lowerCaseName) || !lowerCaseName) {
        return 409;
    } else {
        //TODO
        //ao executar os testes sem a pasta accounts já criada, o teste para contas já criadas acaba falhando
        //pensar em uma solução para isso. Talvez utilizar async/await, mas irei refatorar se ainda sobrar tempo.
        //quando o diretório accounts já estiver criado e vazio, ele consegue passar em todos os testes.
        //quando o diretório accounts não existe, os dois testes para criar conta ou verificar conflito de nome passam com status 201
        //e, portanto, o teste para validar conflitos acaba falhando 
        fs.writeFileSync(`accounts/${lowerCaseName}.json`, '{"balance": 0}', function (e) {
            console.log(e)
        })
        console.log(chalk.bgGreen.black('Parabéns por escolher nosso banco!'))
    }

    return 201;
}

function checkIfValidAccount(accountName) {
    if (fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(chalk.bgRed.black('Nome indisponível, escolha outro!'))
        return false
    }
    return true
}

//criar função para abrir uma conta
function buildAccount() {
    inquirer.prompt([{
        name: 'accountName',
        message: 'Digite um nome para a sua conta:'
    }]).then((answer) => {
        const accountName = answer['accountName'].toLowerCase()

        createAccount(accountName)
        return customerOperations();
    }).catch(e => console.log(e))
}

// criar função para realizar depósitos
function deposit(accountName, amount) {
    const lowerCaseName = accountName.toLowerCase()
    if (!checkAccount(lowerCaseName)) {
        return 404;
    }
    return addAmount(lowerCaseName, amount)
}

function answersAndDeposit() {
    inquirer.prompt([{
        name: 'accountName',
        message: 'Qual o nome da sua conta?'
    }
    ])
        .then(answer => {
            const accountName = answer['accountName'].toLowerCase()
            inquirer.prompt([{
                name: 'amount',
                message: 'Quanto você deseja depositar?'
            }]).then(answer => {
                const amount = answer['amount']
                deposit(accountName, amount)
                return customerOperations()
            })
                .catch(e => console.log(e))
        })
        .catch(e => console.log(e))
}

function checkAccount(accountName) {
    if (!fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(chalk.bgRed.black('Esta conta não existe, escolha outro nome!'))
        return false
    }
    return true
}

//criar função para fazer o cálculo do depósito
function addAmount(accountName, amount) {
    const newAmount = parseFloat(amount);
    //criar tratamento para inserts de strings, números negativos ou símbolos
    if (!newAmount || !typeof newAmount === Number) {
        console.log(chalk.bgRed.black('Ocorreu um erro, tente novamente mais tarde.'))
        return 400;
    } else if (newAmount <= 0) {
        console.log(chalk.bgRed.black("Informe um valor válido."))
        return 400;
    }
    const accountData = getAccount(accountName)
    util(accountData, accountName)
    accountData.balance = newAmount + parseFloat(accountData.balance)

    fs.writeFileSync(`accounts/${accountName}.json`, JSON.stringify(accountData),
        e => console.log(e))
    console.log(chalk.bgGreen.black(`Foi depositado o valor de R$${amount} na sua conta!`))
    return accountData.balance;
}
//criar função para fazer busca de contas disponíveis
function getAccount(accountName) {
    const lowerCaseName = accountName.toLowerCase()
    const account = fs.readFileSync(`accounts/${lowerCaseName}.json`, {
        encoding: 'utf8',
        flag: 'r'
    })
    return JSON.parse(account)
}

//criar função para consultar o saldo
function accountBalance(accountName) {
    const lowerCaseName = accountName.toLowerCase()
    if (!checkAccount(lowerCaseName)) {
        return 404;
    }
    const accountData = getAccount(lowerCaseName)
    util(accountData, lowerCaseName)

    console.log(chalk.bgBlue.black(`Olá ${accountName.charAt(0).toUpperCase() + accountName.slice(1)}, o saldo da sua conta é de R$${accountData.balance}`))
    return 200;
}

function getAccountBalance() {
    inquirer.prompt([{
        name: 'accountName',
        message: 'Qual o nome da sua conta?'
    }]).then(answer => {
        const accountName = answer['accountName'].toLowerCase()
        accountBalance(accountName);

        return customerOperations()
    }).catch(e => console.log(e))
}
//criar função para saque
function checkWithdraw(accountName, amount) {
    if (!accountName || !checkAccount(accountName)) return customerOperations()

    return withdrawAndReturnToMenu(accountName, amount);
}

function withdraw() {
    inquirer.prompt([{
        name: 'accountName',
        message: 'Qual o nome da sua conta?'
    }]).then(answer => {
        const accountName = answer['accountName'].toLowerCase()

        inquirer.prompt([{
            name: 'amount',
            message: 'Quanto você deseja sacar?'
        }]).then(answer => {
            const amount = answer['amount']
            checkWithdraw(accountName, amount)
            return 200;
        })
    }).catch(e => console.log(e))
}
//criar função que busca o usuário e subtrai o balance passado na opção saque
function withdrawAndReturnToMenu(accountName, amount) {
    const lowerCaseName = accountName.toLowerCase()
    removeAmount(lowerCaseName, amount)
    return customerOperations()
}

function removeAmount(accountName, amount) {
//TODO
//se houver tempo, criar método que permite remover valores apenas múltiplos de 10
    const newAmount = parseFloat(amount)
    if (!typeof newAmount === Number || !newAmount) {
        console.log(chalk.bgRed.black('Valor inválido.'))
        return 400;
    } else if (newAmount <= 0) {
        console.log(chalk.bgRed.black('Valor inválido.'))
        return 400;
    }
    const accountData = getAccount(accountName)
    util(accountData, accountName)
    const parseStringToNumber = parseToNumber(amount)
    const operation = parseInt(accountData.balance) - parseInt(parseStringToNumber)
    if (operation < 0) {
        console.log(chalk.bgBlue.black(`Valor indisponível para saque. Total em conta: R$${accountData.balance}.`))
        fs.writeFileSync(`accounts/${accountName}.json`, `{"balance": ${accountData.balance}}`,
            e => console.log(e))
        return customerOperations()
    }
    fs.writeFileSync(`accounts/${accountName}.json`, `{"balance": ${operation}}`,
        e => console.log(e))
    notes(parseStringToNumber)
    return 200;
}
//criar função para encerrar as operações do usuário
function exit() {
    process.exit()
}

function parseToNumber(amount) {
    return parseInt(amount)
}

//função para consertar valores null ou undefined no balance do cliente
//se houver tempo, pensar numa solução para evitar isso
function util(accountData, accountName) {
    if (accountData.balance === null || accountData.balance === undefined) {
        accountData.balance = 0
        fs.writeFileSync(`accounts/${accountName}.json`, JSON.stringify(accountData),
            e => console.log(e))
    }
}

// criar função que irá calcular as notas a serem utilizadas
const noteValues = [100, 50, 20, 10];
let newMessage = [];
const notes = (amount) => {
    const initialAmount = amount;
    for (let i = 0; i < noteValues.length; i++) {
        if (amount >= noteValues[i]) {
            const result = parseInt(amount / noteValues[i])
            if(result > 1) {
                newMessage.push(`${result} notas de R$${noteValues[i]},00`)    
            } else {
                newMessage.push(`${result} nota de R$${noteValues[i]},00`)
            }
            
            amount = amount % noteValues[i];
        }
    }

    if (newMessage.length === 1) {

        console.log(chalk.bgGreen.black(`Valor do Saque: R$ ${initialAmount},00 - Entregar: ${newMessage.join()}.`));

    } else if (newMessage.length === 2) {

        console.log(chalk.bgGreen.black(`Valor do Saque: R$ ${initialAmount},00 - Entregar: ${newMessage.join(" e ")}.`));

    } else if (newMessage.length === 3) {

        const splicedMessage = newMessage.splice(0, 2)
        console.log(chalk.bgGreen.black(`Valor do Saque: R$ ${initialAmount},00 - Entregar: ${splicedMessage.join(", ")} e ${newMessage}.`));

    } else if (newMessage.length === 4) {
        const splicedMessage = newMessage.splice(0, 3)
        console.log(chalk.bgGreen.black(`Valor do Saque: R$ ${initialAmount},00 - Entregar: ${splicedMessage.join(", ")} e ${newMessage}.`));

    }
    newMessage = [];
}

module.exports = {
    createAccount,
    deposit,
    getAccount,
    accountBalance,
    removeAmount,
    buildAccount,
    getAccountBalance,
    answersAndDeposit,
    withdraw,
    customerOperations
}