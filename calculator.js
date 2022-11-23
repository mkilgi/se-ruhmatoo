const investment = document.querySelector('#investment');
const interest = document.querySelector('#interest');
const years = document.querySelector('#years');
const submit = document.querySelector('#calculate');
const myChart1 = document.querySelector('#myChart');
const graph = document.querySelector('.graph');

var total = 0;
var count = 0;
var gains = 0

function calculate() {
    total = investment.value * ((1 + interest.value / 100) ** years.value);
    gains = total / investment.value

    const value = document.querySelector('#value');
    value.innerHTML = total.toFixed(2) + '$';

    const g = document.querySelector('#gains');
    g.innerHTML = gains.toFixed(2) + 'x'

    var values = [];
    var labelYears = [];

    for (let i = 1; i <= years.value; i++) {
        a = investment.value * ((1 + interest.value / 100) ** i);
        labelYears.push(i);
        values.push(a);
    }


    var myChart = new Chart("myChart", {
        type: "bar",
        data: {
            labels: labelYears,
            datasets: [{
                backgroundColor: 'green',
                data: values
            }]
        },
        options: {
            responsive: false,
            legend: {
                display: false
            },
            tooltips: {
                enabled: false
            }

        }
    });
}


