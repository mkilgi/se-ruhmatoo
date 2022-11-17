const investment = document.querySelector('#investment');
const interest = document.querySelector('#interest');
const years = document.querySelector('#years');
const submit = document.querySelector('#calculate');
const canvas = document.querySelector('#graph')

var total = 0;

function calculate() {
    total = investment.value * ((1 + interest.value / 100) ** years.value);
    console.log(total);
    // const value = document.createElement('span');
    // value.setAttribute('id', 'value');
    // value.innerText = total.toFixed(2);

    // const stats = document.querySelector('.stats')
    // stats.appendChild(value);
    const value = document.querySelector('#value')
    value.innerHTML = total.toFixed(2)
}

var myChart = new Chart("myChart", {
    type: "bar",
    data: {},
    options: {}
  });
