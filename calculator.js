//html elementide valimine
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
const body = document.querySelector('body')

//vajalikud muutujad arvutuste jaoks
var total = 0;
var gains = 0;
var totalInterest = 0;

//calculate nupu hover selectori sees oleva muutuja nimega --hover1 muutmine
butn.style.setProperty('--hover1', 'rgb(13, 179, 13)');

// Chart.js library graafiku jaoks https://www.chartjs.org/
//graafiku genereerimine, algselt ilma andmedeta
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

//funktsioon calculate nupu hover selectori varvi muutmiseks
function changeHover(color) {
    butn.style.setProperty('--hover1', color);
}

//pohifunktsioon arvutamiseks ja graafikule andmete edastamiseks, kutsutakse valja kui koik sisendi valjad on taidetud ja vajutatud calculate nupule
function calculate() {

    //pohiarvutused: investeerigute koguvaartus ja mitmekordne tous vorreldes algse investeeriguga
    total = investment.value * ((1 + interest.value / 100) ** years.value);
    gains = total / investment.value;


    //arvutusvaartuste limiteerimine, et arvud mahuksid vastavasse konteinerisse ilusti sisse (isegi limiteeriguga on vaartus kordades rohkem kui maailmas on raha)
    if (total >= 999999999999999999999999) {
        window.alert('Maximum value exceeded.')
        return
    }

    //tulemuste formaat (US formaat loetavuse jaoks, et suuri arve paremini eristada + kui vaartus on suurem kui triljon, siis teisendatakse vaartus triljoniteks)
    //html elementidele vaartuste sisestamine
    if (investment.value >= 1000000000000) {
        var t = (investment.value / 1000000000000).toLocaleString('en-US', { maximumFractionDigits: 2 });
        start.innerHTML = t + 'T $';
    } else {
        start.innerHTML = (investment.value - 0).toLocaleString('en-US', { maximumFractionDigits: 2 }) + '$';
    }

    if ((total - investment.value) >= 1000000000000) {
        tInt.innerHTML = ((total - investment.value) / 1000000000000).toLocaleString('en-US', { maximumFractionDigits: 2 }) + 'T $';
    } else {
        tInt.innerHTML = (total - investment.value).toLocaleString('en-US', { maximumFractionDigits: 2 }) + '$';
    }

    if (total >= 1000000000000) {
        value.innerHTML = (total / 1000000000000).toLocaleString('en-US', { maximumFractionDigits: 2 }) + 'T $';
    } else {
        value.innerHTML = total.toLocaleString('en-US', { maximumFractionDigits: 2 }) + '$';
    }

    if (gains >= 1000000000000) {
        g.innerHTML = (gains / 1000000000000).toLocaleString('en-US', { maximumFractionDigits: 2 }) + 'T x';
    } else {
        g.innerHTML = gains.toLocaleString('en-US', { maximumFractionDigits: 2 }) + 'x';
    }


    //graafiku jaoks andmete genereerimine
    labelYears = [];
    values = [];

    //loop arvutab samm-sammult iga aasta investeerigu vaartuse ja salvestab aasta arvud ja vaartused jarjenditesse
    for (let i = 1; i <= years.value; i++) {
        a = (investment.value * ((1 + interest.value / 100) ** i)).toFixed(2);
        labelYears.push(i);
        values.push(a);
    }

    //lehekulje elementide varvi muutmine vastavalt arvutuse tulemusele
    if (interest.value < 0) {
        value.style.color = 'red';
        g.style.color = 'red';
        tInt.style.color = 'red';
        start.style.color = 'red';
        myChart.data.datasets[0].backgroundColor = 'red';
        butn.style.backgroundColor = 'red';
        body.style.backgroundImage = 'linear-gradient(to right,rgb(104, 98, 98) 0%,rgb(241, 71, 71) 100%)';

    } else if (interest.value == 0) {
        value.style.color = 'white';
        g.style.color = 'white';
        tInt.style.color = 'white';
        start.style.color = 'white';
        myChart.data.datasets[0].backgroundColor = 'white';
        butn.style.backgroundColor = 'green';
        body.style.backgroundImage = 'linear-gradient(to right,rgb(104, 98, 98) 0%,rgb(201, 236, 193) 100%)';
    } else {
        value.style.color = 'green';
        g.style.color = 'green';
        tInt.style.color = 'green';
        start.style.color = 'green';
        myChart.data.datasets[0].backgroundColor = 'green';
        butn.style.backgroundColor = 'green';
        body.style.backgroundImage = 'linear-gradient(to right,rgb(104, 98, 98) 0%,rgb(90, 156, 150) 100%)';
    }

    //algselt on tulemused peidetud, sest puuduvad arvud, mille jargi arvutada
    //kui kutsutakse valja Calculate() funktsioon, siis on tulemused olemas ja need tehakse nahtavaks
    val.style.visibility = 'visible';

    //graafikule andmete sisestamine ja varskendamine
    myChart.data.datasets[0].data = values;
    myChart.data.labels = labelYears;
    myChart.update()
}


// funktsioon koikide kasutaja sisendite kustutamiseks, mis samuti kustutab ka graafiku andmed ja peidab tulemused
function clearInputs() {
    investment.value = ''
    interest.value = ''
    years.value = ''
    val.style.visibility = 'hidden';
    myChart.data.datasets[0].data = [];
    myChart.data.labels = [];
    myChart.update()
}

// koodi kirjutasime koos, saime deltas kokku > jagasime ideid > proovisime erinevaid motteid > koos otsisime erinevatele probleemidele lahendusi