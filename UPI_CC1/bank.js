let balance = 0;
let upi_history = []; 
let upi = {
    balance : function(){
        alert(`Available Balance: ${balance}`);
        upi_history.push(`Available Balance: ${balance}`);
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
        upi_history.push(`Amount deposited: ${deposit}`);
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
        upi_history.push(`Withdrawn amount: ${withdraw}`);
    },    
    upi_transaction : function(){
        alert(`UPI Transaction History:\n
${upi_history.join("\n")}`);
    }
}


let creditLimit = 10000;
let creditBalance = 10000;
let bill = 0;
let cc_history = [];
let creditCard = {
    check_limit : function(){
        alert(`Available Credit Card Limit: ${creditLimit}`);
        cc_history.push(`Checked credit card limit: ${creditLimit}`);
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
            alert(`Bill paid: ${amt}`);
            cc_history.push(`Bill paid: ${amt}`);
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
            cc_history.push(`Amount bought: ${amount}`);
        }
    },
    cc_balance : function(){
        alert(`Credit Card Balance: ${creditBalance}`);
        cc_history.push(`Available balance: ${creditBalance}`);
    },
    cc_transaction : function(){
        alert(`Credit Card Transaction History:\n
${cc_history.join("\n")}`);
    }
}