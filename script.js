const bill = document.querySelector('#bill');
const tipBtns = document.querySelectorAll('.tip-buttons button');
const customTip = document.querySelector('#custom');
const people = document.querySelector('#people');
const amount = document.querySelector('.amount');
const total = document.querySelector('.total');
const resetBtn = document.querySelector('#reset-btn');
let billValue, peopleValue, amountValue;
let tipValue = 0;


function setAmount() {
    billValue = bill.value; 
    amountValue = (billValue * tipValue).toFixed(2);
    if (billValue === 0 || tipValue === 0) {
        amount.innerText = "$0.00";
    } else {
        amount.innerText = "$" + amountValue;
    }              
    resetBtn.removeAttribute('disabled');
};

tipBtns.forEach(btn => btn.addEventListener('click', () => {
    document.querySelector('.selected')?.classList.remove('selected')
    btn.classList.add('selected');
    tipValue = btn.dataset.percent;       
    setAmount();
    resetBtn.removeAttribute('disabled');
}));

function setCustomTip() {
    tipBtns.forEach(btn => {
        document.querySelector('.selected')?.classList.remove('selected')
    })
    if (parseInt(this.value) > 100) {
        this.value = "";
        alert("Cannot be greater than 100%");
    } 
    tipValue = this.value * 0.01; 
    setAmount();
    resetBtn.removeAttribute('disabled');
};

function error() {
    if (people.value <= "0") {
        people.classList.add('error');
        people.parentElement.querySelector('span').style.display = 'inline-block';
    } else {
        people.classList.remove('error');
        people.parentElement.querySelector('span').style.display = 'none';
    } 
}

function setTotal() {
    peopleValue = this.value;
    let totalValue = (amountValue / peopleValue).toFixed(2);
    if (totalValue === "NaN" || peopleValue <= 0) {
        total.innerText = "$0.00";
    } else {
        total.innerText = "$" + totalValue;
    } 
    resetBtn.removeAttribute('disabled');    
}

function reset() {
    bill.value = "";
    tipBtns.forEach(btn => {
        document.querySelector('.selected')?.classList.remove('selected');
    });
    customTip.value = "";
    people.value = "";
    people.classList.remove('error');
            people.parentElement.querySelector('span').style.display = 'none';
    amount.innerText = "$0.00";
    total.innerText = "$0.00";   
}


bill.addEventListener('input', setAmount);
customTip.addEventListener('input', setCustomTip);
people.addEventListener('blur', error);
people.addEventListener('input', setTotal);
resetBtn.addEventListener('click', reset);



