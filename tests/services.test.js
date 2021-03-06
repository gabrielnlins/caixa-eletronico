const { getAccount, deposit, createAccount, accountBalance, removeAmount } = require('../src/services');

test('should create account for a new user', () => {
    const accountName = 'GABRIEL'

    expect(createAccount(accountName)).toBe(201);

})

test('should try to create an account for a user that just exists and receive an error message', () => {
    const accountName = 'gabriel'

    expect(createAccount(accountName)).toBe(409);

})

test('should throw an error that means the system not found the user account to deposit', () => {
    const accountName = 'João Fulano da Silva'
    const amount = 100000
    expect(deposit(accountName, amount)).toBe(404)
})

test('should verify if account exists and then add value to user account balance', () => {
    const accountName = 'GABRIEL'
    const amount = 100000
    const accountData = getAccount(accountName)

    expect(deposit(accountName, amount)).toBe(accountData.balance + amount)

})

test('should return the balance of user account', () => {
    const accountName = 'gabriel'
    expect(accountBalance(accountName)).toBe(200)
})

test('should throw an error because the name passed in does not exists', () => {
    const accountName = 'João Fulano da Silva'
    expect(accountBalance(accountName)).toBe(404)
})

test('should do withdraw and remove the amount value passed', () => {
    const accountName = 'gabriel'
    const amount = 80
    expect(removeAmount(accountName, amount)).toBe(200)
})

test('should send error message because of invalid amount', () => {
    const accountName = 'gabriel'
    const amount = 'abc'
    expect(removeAmount(accountName, amount)).toBe(400)
})