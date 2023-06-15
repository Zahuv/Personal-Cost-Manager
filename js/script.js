'use strict';

let startCalculating = document.getElementById('start'),
    budgetResult = document.getElementsByClassName('budget-value')[0],
    dayBudgetResult = document.getElementsByClassName('daybudget-value')[0],
    incomeLevelResult = document.getElementsByClassName('level-value')[0],
    mainExpensesResult = document.getElementsByClassName('expenses-value')[0],
    optExpensesResult = document.getElementsByClassName('optionalexpenses-value')[0],
    additionalIncomeResult = document.getElementsByClassName('income-value')[0],
    monthSavingsResult = document.getElementsByClassName('monthsavings-value')[0],
    yearSavingsResult = document.getElementsByClassName('yearsavings-value')[0],

    mainExpenses = document.getElementsByClassName('expenses-item'),
    approveMainExpenses = document.getElementsByTagName('button')[0],
    approveOptExpenses = document.getElementsByTagName('button')[1],
    calculateDayBudget = document.getElementsByTagName('button')[2],
    optExpenses = document.querySelectorAll('.optionalexpenses-item'),
    potentialIncome = document.querySelector('.choose-income'),
    checkSavings = document.querySelector('#savings'),
    chooseSum = document.querySelector('.choose-sum'),
    choosePercent = document.querySelector('.choose-percent'),
    yearValue = document.querySelector('.year-value'),
    monthValue = document.querySelector('.month-value'),
    dayValue = document.querySelector('.day-value');

let money, time;

//СПРАШИВАЕМ БЮДЖЕТ НА МЕСЯЦ И ДАТУ ПРИ КЛИКЕ
startCalculating.addEventListener('click', function() {
    time = prompt('Введите дату в формате YYYY-MM-DD');
    money = +prompt('Ваш бюджет на месяц?');

    while(isNaN(money) || money == "" || money == null) {
        money = +prompt('Ваш бюджет на месяц?');
    }
    appData.budget = money;
    appData.timeData = time;
    budgetResult.textContent = money.toFixed();
    yearValue.value = new Date(Date.parse(time)).getFullYear();
    monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
    dayValue.value = new Date(Date.parse(time)).getDate();
});

//СПРАШИВАЕМ СТАТЬИ РАСХОДОВ И БЮДЖЕТ НА НИХ, ПОДСЧИТЫВАЕМ РЕЗУЛЬТАТЫ ПРИ НАЖАТИИ НА КНОПКУ
approveMainExpenses.addEventListener('click', function() {
    let sum = 0;
    for (let i = 0; i < mainExpenses.length; i++) {
        let a = mainExpenses[i].value,
            b = mainExpenses[++i].value;
    
        if ((typeof(a) === 'string') && (typeof(a)) != null && (typeof(b)) != null 
            && a != '' && b != '' && a.length < 30) {
    
            appData.expenses[a] = b;
            sum += +b;
        }   else {
            i = i - 1;
        }
    }
    mainExpensesResult.textContent = sum;
});

//СПРАШИВАЕМ СТАТЬИ НЕОБЯЗАТЕЛЬНЫХ РАСХОДОВ И ВЫВОДИМ ИХ ПРИ НАЖАТИИ НА КНОПКУ
approveOptExpenses.addEventListener('click', function(){
    for (let i = 0; i < optExpenses.length; i++) {
        let opt = optExpenses[i].value;

        if ((typeof(opt) == 'string') && (typeof(opt)) != null && opt != '' && opt.length < 30) {
            appData.optionalExpenses[i] = opt;
            optExpensesResult.textContent +=  appData.optionalExpenses[i] + '; ';

        }   else {
            alert('Вы заполнили не все поля');
        }
    }   
});

//ОПРЕДЕЛЯЕМ ДНЕВНОЙ БЮДЖЕТ
calculateDayBudget.addEventListener('click', function() {

    if (appData.budget != undefined) {
        appData.moneyPerDay = ((appData.budget - mainExpensesResult.textContent) / 30).toFixed();
        dayBudgetResult.textContent = appData.moneyPerDay;

    //РАССЧИТЫВАЕМ УРОВЕНЬ ДОСТАТКА
        if (appData.moneyPerDay <= 1500) {
            incomeLevelResult.textContent = "Минимальный уровень достатка";
        } else if (appData.moneyPerDay > 1500 && appData.moneyPerDay < 4000) {
                incomeLevelResult.textContent = "Средний уровень достатка";
        } else if (appData.moneyPerDay >= 4000) {
                incomeLevelResult.textContent = "Высокий уровень достатка";
        } else {
                alert("Произошла ошибка");
        }
    } else {
        dayBudgetResult.textContent = "Необходимо указать доход";
    }
});

//ВЫВОДИМ СТАТЬИ ВОЗМОЖНОГО ДОХОДА
potentialIncome.addEventListener('change', function() {
    let items = potentialIncome.value;
    appData.income = items.split(', ');
    additionalIncomeResult.textContent = appData.income;
});

//СТАВИМ И УБИРАЕМ ГАЛОЧКУ НА ЧЕКБОКСЕ
checkSavings.addEventListener('click', function() {
    if (appData.savings == true) {
        appData.savings = false;
    } else {
        appData.savings = true;
    }
});

//РАССЧИТЫВАЕМ ПРОЦЕНТ С НАКОПЛЕНИЙ
chooseSum.addEventListener('input', function() {
    if(appData.savings == true) {
        let sum = +chooseSum.value,
            percent = +choosePercent.value;
        appData.monthIncome = sum/100/12*percent;
        appData.yearIncome = sum/100*percent;
        monthSavingsResult.textContent = appData.monthIncome.toFixed(1);
        yearSavingsResult.textContent = appData.yearIncome.toFixed(1);
    }
});

choosePercent.addEventListener('input', function() {
    if(appData.savings == true) {
        let sum = +chooseSum.value,
            percent = +choosePercent.value;
        appData.monthIncome = sum/100/12*percent;
        appData.yearIncome = sum/100*percent;
        monthSavingsResult.textContent = appData.monthIncome.toFixed(1);
        yearSavingsResult.textContent = appData.yearIncome.toFixed(1);
    }
});

//ЗАДАЕМ ПЕРЕМЕННЫЕ
let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false,

    showDatabase: function() {
        for(let data in appData) {
            console.log('Наша программа включает в себя данные: ' + data + ' - ' + appData[data]);
        }
    },
    // chooseIncome: function() {
    //     let items = prompt('Что принесет дополнительный доход? (Перечислите через запятую)', '');

    //     /*while(!isNaN(items) || items == "" || items == null) {
    //         items = prompt('Что принесет дополнительный доход? (Перечислите через запятую)', '');
    //     }*/

    //     if (typeof(items) != "string" || items == "" || typeof(items) == null) {
    //         console.log('Вы ввели некорректные данные или не ввели их вовсе!');
    //     } else {
    //         appData.income = items.split(', ');
    //         appData.income.push(prompt('Может что-то еще?'));
    //         appData.income.sort();
    //     }

    //     appData.income.forEach(function(item, i) {
    //         alert('Способы доп заработка: ' + (i+1) + ': ' + item);
    //     });
    // }
};

