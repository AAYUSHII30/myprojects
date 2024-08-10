let balance = 0;
let upi_history = [];
let upi = {
    balance: function(){
        document.getElementById('upi_balance').innerText = `Balance: ${balance}`;
    },
    deposit: function(amount){
        if (isNaN(amount) || amount <= 0) {
            alert("Enter a valid amount.");
        } else {
            balance += amount;
            alert(`Amount deposited: ${amount}`);
            upi_history.push(`Amount deposited: ${amount}`);
            this.balance();
        }
    },
    withdraw: function (amount) {
        if (isNaN(amount) || amount <= 0) {
            alert("Enter a valid amount.");
        } else if (amount > balance) {
            alert("Insufficient balance.");
        } else {
            balance -= amount;
            alert(`Withdrawn amount: ${amount}`);
            upi_history.push(`Withdrawn amount: ${amount}`);
            this.balance();
        }
    },
    upi_transaction: function () {
        alert(`UPI Transaction History:\n${upi_history.join("\n")}`);
    }
};

let creditLimit = 10000;
let creditBalance = 10000;
let bill = 0;
let cc_history = [];
let creditCard = {
    check_limit: function () {
        cc_history.push(`Checked credit card limit: ${creditLimit}`);
    },
    pay_bill: function (amount) {
        if (isNaN(amount) || amount <= 0) {
            alert("Enter a valid amount.");
        } else if (amount > bill) {
            alert("Payment exceeds available amount.");
        } else {
            creditBalance += amount;
            bill -= amount;
            alert(`Bill paid: ${amount}`);
            cc_history.push(`Bill paid: ${amount}`);
            this.update_balance();
        }
    },
    buy: function (amount) {
        if (isNaN(amount) || amount <= 0) {
            alert("Enter a valid amount.");
        } else if (amount > creditBalance) {
            alert("Exceeds credit card balance.");
        } else {
            creditBalance -= amount;
            bill += amount;
            alert(`Amount bought: ${amount}`);
            cc_history.push(`Amount bought: ${amount}`);
            this.update_balance();
        }
    },
    update_balance: function () {
        document.getElementById('cc_balance').innerText = `Balance: ${creditBalance}`;
    },
    cc_transaction: function () {
        alert(`Credit Card Transaction History:\n${cc_history.join("\n")}`);
    }
};

document.getElementById('dep_bttn').addEventListener('click', () => {
    let amount = parseFloat(document.getElementById('upi_deposit').value);
    upi.deposit(amount);
});

document.getElementById('wit_bttn').addEventListener('click', () => {
    let amount = parseFloat(document.getElementById('upi_withdraw').value);
    upi.withdraw(amount);
});

document.getElementById('upi_transaction').addEventListener('click', () => {
    upi.upi_transaction();
});

document.getElementById('buy_bttn').addEventListener('click', () => {
    let amount = parseFloat(document.getElementById('cc_buy').value);
    creditCard.buy(amount);
});

document.getElementById('pay_bttn').addEventListener('click', () => {
    let amount = parseFloat(document.getElementById('cc_pay').value);
    creditCard.pay_bill(amount);
});

document.getElementById('cc_transaction').addEventListener('click', () => {
    creditCard.cc_transaction();
});

upi.balance();
creditCard.update_balance();