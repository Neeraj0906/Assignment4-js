let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

document.getElementById('transaction-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const type = document.querySelector('input[name="type"]:checked').value;

    const transaction = { id: Date.now(), description, amount, type };
    transactions.push(transaction);
    updateLocalStorage();
    renderTransactions();
});

function renderTransactions() {
    const filter = document.querySelector('input[name="filter"]:checked').value;
    const filteredTransactions = transactions.filter(transaction => filter === 'all' || transaction.type === filter);

    const transactionsList = document.getElementById('transactions-list');
    transactionsList.innerHTML = '';

    filteredTransactions.forEach(transaction => {
        const li = document.createElement('li');
        li.innerHTML = `${transaction.description} - ₹${transaction.amount} (${transaction.type})
                        <button onclick="editTransaction(${transaction.id})">Edit</button>
                        <button onclick="deleteTransaction(${transaction.id})">Delete</button>`;
        transactionsList.appendChild(li);
    });

    updateTotals();
}

function updateTotals() {
    const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const totalExpense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    const netBalance = totalIncome - totalExpense;

    document.getElementById('total-income').innerText = `₹${totalIncome}`;
    document.getElementById('total-expense').innerText = `₹${totalExpense}`;
    document.getElementById('net-balance').innerText = `₹${netBalance}`;
}

function deleteTransaction(id) {
    transactions = transactions.filter(t => t.id !== id);
    updateLocalStorage();
    renderTransactions();
}

function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

window.onload = renderTransactions;

// let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// document
//   .getElementById("transaction-form")
//   .addEventListener("submit", function (e) {
//     e.preventDefault();

//     const transactionType = document.querySelector(
//       'input[name="transaction-type":checked'
//     ).value;
//     const description = document.getElementById("description").value;
//     const amount = parseFloat(document.getElementById("amuount").value);

//     const transaction = {
//       id: Date.now(),
//       type: transactionType,
//       description: description,
//       amount: amount,
//     };

//     transactions.push(transaction);
//     localStorage.setItem("transactions", JSON.stringify(transactions));
//     displayTransactions();
//   });
