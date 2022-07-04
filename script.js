const transactionUl = document.querySelector('#transactions')
const incomeDisplay = document.querySelector('#money-plus')
const expenseDisplay = document.querySelector('#money-minus')
const totalDisplay = document.querySelector('#balance')
const form = document.querySelector("#form")
const inputTransactionName = document.querySelector("#text")
const inputTransactionAmount = document.querySelector("#amount")

const localStorageTransactions = JSON.parse(localStorage
  .getItem('transactions'))
let transactions = localStorage
.getItem('transactions') !== null ? localStorageTransactions : []

const removeTransaction = ID => {
  transactions = transactions
  .filter(transaction => transaction.id !== ID)
  updateLocalStorage()
  init()
}

const addTransactionIntoDom = transaction => {
    const operator = transaction.amount < 0 ? '-' : '+'
    const CSSClass = transaction.amount < 0 ? 'minus' : 'plus'
    const amountWithoutOperator = Math.abs(transaction.amount)
    const li = document.createElement('li')

    li.classList.add(CSSClass)
    li.innerHTML = `
    ${transaction.name} 
    <span>${operator} R$ ${amountWithoutOperator}</span>
    <button class="delete-btn" onClick="removeTransaction(${transaction.id})">
    x
    </button>
    `
    transactionUl.prepend(li)

/*   <li class="minus">
    Salário <span>-$400</span>
    <button class="delete-btn">x</button>
  </li>; */
};

const updateBalanceValues = () => {
  const transactionsAmount = transactions.map(transaction => transaction.amount)

  const total = transactionsAmount
    .reduce((accumulator, transaction) => accumulator + transaction, 0)
    .toFixed(2)
  const income = transactionsAmount
    .filter(value => value > 0)
    .reduce((accumulator, value) => accumulator + value, 0)
    .toFixed(2)
  const expense = transactionsAmount
    .filter(value => value < 0)
    .reduce((accumulator, value) => accumulator + value, 0)
    .toFixed(2)

  incomeDisplay.textContent = `R$ ${income}`
  expenseDisplay.textContent = `R$ ${Math.abs(expense).toFixed(2)}`
  totalDisplay.textContent = `R$ ${total}`
  
 /*  incomeDisplay.innerHTML = `+ R$ ${income}`
  expenseDisplay.innerHTML = `- R$ ${Math.abs(expense).toFixed(2)}`
  totalDisplay.innerHTML = `R$ ${total}` */
}

const init = () => {
transactionUl.innerHTML = ''
transactions.forEach(addTransactionIntoDom)
updateBalanceValues()
}

init()

const updateLocalStorage = () => {
  localStorage.setItem('transactions', JSON.stringify(transactions))
}

const generateId = () => Math.round(Math.random() * 1000)

form.addEventListener('submit', event => {
  event.preventDefault()

  const transactionName = inputTransactionName.value.trim()
  const transactionAmount = inputTransactionAmount.value.trim()

  if(transactionName === '' || transactionAmount === ''){
    alert("Atenção: O nome da transação ou o valor não podem ficar em branco!")
    return
  }

  const transaction = { 
    id: generateId(),
    name: transactionName,
    amount: +transactionAmount
  
  }

  transactions.push(transaction)

  init()
  updateLocalStorage()

  inputTransactionName.value = ''
  inputTransactionAmount.value = ''
})