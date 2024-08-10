let balance = 0;
let upi = {
    balance : function(){
        alert(`Available Balance: ${balance}`);
    },
    deposit : function(){
        let deposit = prompt("Amount to be deposited: ");
        deposit = parseInt(deposit);
        if(isNaN(deposit)){
            alert("Enter a valid amount.");
        } else{
            balance += deposit;
            alert(`Amount deposited: ${deposit}`);
        }
    },
    withdraw : function(){
        let withdraw = prompt("Enter amount to withdraw: ");
        withdraw = parseInt(withdraw);
        if(isNaN(withdraw)){
            alert("Enter a valid amount.");
        } else if (withdraw > balance){
            alert("Insufficient balance.");
        } else {
            balance -= withdraw;
            alert(`Withdrawn amount: ${withdraw}`);
        }
    }    
}


let creditLimit = 10000;
let creditBalance = 10000;
let bill = 0;
let creditCard = {
    check_limit : function(){
        alert(`Available Credit Card Limit: ${creditLimit}`);
    },
    pay_bill : function(){
        let amt = prompt("Enter amount to pay: ");
        amt = parseInt(amt);
        if(isNaN(amt)){
            alert("Enter a valid amount.");
        } else if (amt > bill){
            alert("Payment exceeds available amount.");
        } else {
            creditBalance += amt;
            bill -= amt;
            alert(`Bill paid: ${bill}`);
        }
    },
    buy : function(){
        let amount = prompt("Enter amount to buy: ");
        amount = parseInt(amount);
        if(isNaN(amount)){
            alert("Enter a valid amount.");
        } else if (amount > creditLimit){
            alert("Exceeds credit card limit.");
        } else {
            creditBalance -= amount;
            bill += amount;
            alert(`Amount bought: ${amount}`);
        }
    },
    cc_balance : function(){
        alert(`Credit Card Balance: ${creditBalance}`);
    }
}


