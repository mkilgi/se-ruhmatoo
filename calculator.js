const investment = document.querySelector('#investment');
const interest = document.querySelector('#interest');
const years = document.querySelector('#years');
const submit = document.querySelector('#calculate');
const myChart1 = document.querySelector('#myChart');
const graph = document.querySelector('.graph');
const stats = document.querySelector('.stats');
const clearBtn = document.querySelector('#clear');
const value = document.querySelector('#value');
const g = document.querySelector('#gains');
const tInt = document.querySelector('#totalInterest');
const start = document.querySelector('#start');
const butn = document.querySelector('#submit');
const val = document.querySelector('.values');


var total = 0;
var gains = 0;
var totalInterest = 0;

var myChart = new Chart("myChart", {
    type: "bar",
    data: {
        labels: [],
        datasets: [{
            backgroundColor: 'green',
            data: []
        }]
    },
    options: {
        responsive: true,
        legend: {
            display: false
        },
        tooltips: {
            enabled: true
        }

    }
});

function calculate() {
    total = investment.value * ((1 + interest.value / 100) ** years.value);
    gains = total / investment.value

    //Results
    value.innerHTML = total.toLocaleString('en-US', { maximumFractionDigits: 2 }) + '$';
    g.innerHTML = gains.toLocaleString('en-US', { maximumFractionDigits: 2 }) + 'x';
    tInt.innerHTML = (total - investment.value).toLocaleString('en-US', { maximumFractionDigits: 2 }) + '$';
    start.innerHTML = (investment.value - 0).toLocaleString('en-US', { maximumFractionDigits: 2 }) + '$';

    labelYears = [];
    values = [];

    for (let i = 1; i <= years.value; i++) {
        a = (investment.value * ((1 + interest.value / 100) ** i)).toFixed(2);
        labelYears.push(i);
        values.push(a);
    }

    //Colors based on investment returs
    if (interest.value < 0) {
        value.style.color = 'red';
        g.style.color = 'red';
        tInt.style.color = 'red';
        start.style.color = 'red';
        myChart.data.datasets[0].backgroundColor = 'red';
        butn.style.backgroundColor = 'red';

    } else if (interest.value == 0) {
        value.style.color = 'white';
        g.style.color = 'white';
        tInt.style.color = 'white';
        start.style.color = 'white';
        myChart.data.datasets[0].backgroundColor = 'white';
        butn.style.backgroundColor = 'green';
    } else {
        value.style.color = 'green';
        g.style.color = 'green';
        tInt.style.color = 'green';
        start.style.color = 'green';
        myChart.data.datasets[0].backgroundColor = 'green';
        butn.style.backgroundColor = 'green';
    }

    val.style.visibility = 'visible';

    myChart.data.datasets[0].data = values;
    myChart.data.labels = labelYears;
    myChart.update()
}

function clearInputs() {
    investment.value = ''
    interest.value = ''
    years.value = ''
    val.style.visibility = 'hidden';
    myChart.data.datasets[0].data = [];
    myChart.data.labels = [];
    myChart.update()
}