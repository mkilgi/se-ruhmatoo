const investment = document.querySelector('#investment');
const interest = document.querySelector('#interest');
const years = document.querySelector('#years');
const submit = document.querySelector('#calculate');

var total = 0;

function calculate() {
    total = investment.value * ((1 + interest.value / 100) ** years.value);
    console.log(total);
    const value = document.querySelector('#value')
    value.innerHTML = total.toFixed(2) + '$'

    var values = []
    var labelYears = []

    for (let i = 1; i <= years.value; i++) {
        a = investment.value * ((1 + interest.value / 100) ** i);
        labelYears.push(i)
        values.push(a)
    }

    console.log(values)
    console.log(labelYears)

    var myChart = new Chart("myChart", {
        type: "bar",
        data: {
            labels: labelYears,
            datasets: [{
                backgroundColor:'white',
                data: values
            }]
        },
        options: {}
      });
}


