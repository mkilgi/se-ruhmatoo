const investment = document.querySelector('#investment');
const interest = document.querySelector('#interest');
const years = document.querySelector('#years');
const submit = document.querySelector('#submit');

var total = 0;

function calculate() {
    total = investment.value * ((1 + interest.value / 100) ** years.value);
    console.log(total);


    const value = document.createElement('span');
    value.setAttribute('class', 'value');
    value.innerText = total;

    const container = document.createElement('div');
    container.setAttribute('class', 'container');
    document.body.appendChild(container);
    container.appendChild(value);
}

function InvestmentChart() {
    return;
}