//upi
let balance = 0;
let upi_history = JSON.parse(localStorage.getItem('upi_history')) || [];
let upi = {
    balance: function(){
        document.getElementById('upi_balance').innerText = `Balance: ${balance}`;
    },
    updateUPI: function (message) {
        let statusDiv = document.querySelector('.upi_transc');
        let newMessage = document.createElement('div');
        newMessage.innerText = message;
        newMessage.classList.add('status-message');
        statusDiv.appendChild(newMessage); 
        this.localHistory();
    },
    deposit: function(amount){
        if (isNaN(amount) || amount <= 0) {
            alert("Enter a valid amount.");
        } else {
            balance += amount;
            this.updateUPI(`Amount deposited: ${amount}`);
            upi_history.push(`Amount deposited: ${amount}`);
            this.balance();
        }
    },
    withdraw: function (amount) {
        if (isNaN(amount) || amount <= 0) {
            alert("Enter a valid amount.");
        } else if (amount > balance) {
            this.updateUPI("Insufficient balance.");
        } else {
            balance -= amount;
            this.updateUPI(`Withdrawn amount: ${amount}`);
            upi_history.push(`Withdrawn amount: ${amount}`);
            this.balance();
        }
    },
    localHistory: function () {
        localStorage.setItem('upi_history', JSON.stringify(upi_history));
    }
    // upi_transaction: function () {
    //     this.updateUPI(`UPI Transaction History:-\n${upi_history.join("\n")}`);
    // }
};

//creditcard
let creditLimit = 10000;
let creditBalance = 10000;
let bill = 0;
let cc_history = JSON.parse(localStorage.getItem('cc_history')) || [];
let creditCard = {
    updateCC: function(message) {
        let statusDiv = document.querySelector('.cc_transc');
        let newMessage = document.createElement('div');
        newMessage.innerText = message;
        newMessage.classList.add('status-message'); 
        statusDiv.appendChild(newMessage);
        this.localHistory();
    },
    check_limit: function () {
        this.updateCC(`Checked credit card limit: ${creditLimit}`);
        cc_history.push(`Checked credit card limit: ${creditLimit}`);
    },
    pay_bill: function (amount) {
        if (isNaN(amount) || amount <= 0) {
            alert("Enter a valid amount.");
        } else if (amount > bill) {
            this.updateCC("Payment exceeds available amount.");
        } else {
            creditBalance += amount;
            bill -= amount;
            this.updateCC(`Bill paid: ${amount}`);
            cc_history.push(`Bill paid: ${amount}`);
            this.update_balance();
        }
    },
    buy: function (amount) {
        if (isNaN(amount) || amount <= 0) {
            alert("Enter a valid amount.");
        } else if (amount > creditBalance) {
            this.updateCC("Exceeds credit card balance.");
        } else {
            creditBalance -= amount;
            bill += amount;
            this.updateCC(`Amount bought: ${amount}`);
            cc_history.push(`Amount bought: ${amount}`);
            this.update_balance();
        }
    },
    update_balance: function () {
        document.getElementById('cc_balance').innerText = `Balance: ${creditBalance}`;
    },
    localHistory: function () {
        localStorage.setItem('cc_history', JSON.stringify(cc_history));
    }
    // cc_transaction: function () {
    //     this.updateCC(`Credit Card Transaction History:-\n${cc_history.join("\n")}`);
    // }
};

//eventListener on click
document.getElementById('dep_bttn').addEventListener('click', () => {
    let amount = parseFloat(document.getElementById('upi_deposit').value);
    upi.deposit(amount);
    clearInputs();
});

document.getElementById('wit_bttn').addEventListener('click', () => {
    let amount = parseFloat(document.getElementById('upi_withdraw').value);
    upi.withdraw(amount);
    clearInputs();
});

document.getElementById('upi_transaction').addEventListener('click', () => {
    upi.upi_transaction();
    clearInputs();
});

document.getElementById('buy_bttn').addEventListener('click', () => {
    let amount = parseFloat(document.getElementById('cc_buy').value);
    creditCard.buy(amount);
    clearInputs();
});

document.getElementById('pay_bttn').addEventListener('click', () => {
    let amount = parseFloat(document.getElementById('cc_pay').value);
    creditCard.pay_bill(amount);
    clearInputs();
});

document.getElementById('cc_transaction').addEventListener('click', () => {
    creditCard.cc_transaction();
    clearInputs();
});

upi.balance();
creditCard.update_balance();

//logout
document.getElementById('logout').addEventListener('click', function() {
    document.querySelector('.container').classList.add('hide');
    document.querySelector('.login_page').classList.remove('hide');
});

//login
document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
    let loginId = document.getElementById('login').value;
    let password = document.getElementById('password').value;
    let storedLogin = localStorage.getItem('loginId');
    let storedPassword = localStorage.getItem('password');

    if (loginId === storedLogin && password === storedPassword) {
        document.querySelector('.login_page').classList.add('hide');
        document.querySelector('.container').classList.remove('hide');
        clearInputs();
    } else {
        let passwordError = document.querySelector('.error');
        passwordError.classList.remove('hide');
    }
});
localStorage.setItem('loginId', 'admin@gmail.com');
localStorage.setItem('password', 'admin123');

//clear inputs
function clearInputs() {
    document.querySelectorAll('input').forEach(input => input.value = '');
}
clearInputs();

//timer
let logoutTimer;
let timer = 120000;
function startlogout() {
    clearTimeout(logoutTimer);
    logoutTimer = setTimeout(() => {
        document.querySelector('.container').classList.add('hide');
        document.querySelector('.login_page').classList.remove('hide');
        document.getElementById('logout').style.display = 'none';
        clearInputs();
    }, timer);
}
function resetTimer() {
    startlogout();
}
startlogout();
window.addEventListener('mousemove', resetTimer);
window.addEventListener('keydown', resetTimer);
window.addEventListener('click', resetTimer);

//eventListener on keydown
document.getElementById('upi_deposit').addEventListener('keydown', function(event){
    if (event.key === 'Enter'){
        let amount = parseInt(this.value);
        upi.deposit(amount);
        clearInputs();
    }
});
document.getElementById('upi_withdraw').addEventListener('keydown', function(event){
    if (event.key === 'Enter'){
        let amount = parseInt(this.value);
        upi.withdraw(amount);
        clearInputs();
    }
});
document.getElementById('cc_buy').addEventListener('keydown', function(event){
    if (event.key === 'Enter'){
        let amount = parseInt(this.value);
        creditCard.buy(amount);
        clearInputs();
    }
});
document.getElementById('cc_pay').addEventListener('keydown', function(event){
    if (event.key === 'Enter'){
        let amount = parseInt(this.value);
        creditCard.pay_bill(amount);
        clearInputs();
    }
});