const investment = document.querySelector('#investment');
const interest = document.querySelector('#interest');
const years = document.querySelector('#years');
const submit = document.querySelector('#calculate');
const myChart1 = document.querySelector('#myChart');
const graph = document.querySelector('.graph');

var total = 0;
var gains = 0

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
        responsive: false,
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

    const value = document.querySelector('#value');
    value.innerHTML = total.toFixed(2) + '$';

    const g = document.querySelector('#gains');
    g.innerHTML = gains.toFixed(2) + 'x'

    labelYears = [];
    values = [];

    for (let i = 1; i <= years.value; i++) {
        a = investment.value * ((1 + interest.value / 100) ** i);
        labelYears.push(i);
        values.push(a);
    }

    myChart1.style.visibility = 'visible';
    myChart.data.datasets[0].data = values;
    myChart.data.labels = labelYears;
    myChart.update()
}