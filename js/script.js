'use strict';

let money, time;

//СПРАШИВАЕМ БЮДЖЕТ НА МЕСЯЦ И ДАТУ
function start() {
    money = +prompt('Ваш бюджет на месяц?');
    time = prompt('Введите дату в формате YYYY-MM-DD');

    while(isNaN(money) || money == "" || money == null) {
        money = +prompt('Ваш бюджет на месяц?');
    }
}
start();

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
    chooseExpenses: function() {        //СПРАШИВАЕМ СТАТЬИ РАСХОДОВ И БЮДЖЕТ НА НИХ
        for (let i = 0; i < 2; i++) {
            let a = prompt('Введите обязательную статью расходов в этом месяце', ''),
                b = +prompt('Во сколько обойдется?', '');
        
            if ((typeof(a) === 'string') && (typeof(a)) != null && (typeof(b)) != null 
                && a != '' && b != '' && a.length < 30) {
        
                console.log('done');
                appData.expenses[a] = b;
            }   else {
                i = i - 1;
            }
        }
    },
    detectDayBudget: function() {       //ОПРЕДЕЛЯЕМ ДНЕВНОЙ БЮДЖЕТ
        appData.moneyPerDay = (appData.budget / 30).toFixed();
        alert("Ежедневный бюджет : " + appData.moneyPerDay);
    },
    detectLevel: function() {       //РАССЧИТЫВАЕМ УРОВЕНЬ ДОСТАТКА
        if (appData.moneyPerDay <= 1500) {
        console.log("Минимальный уровень достатка");
        } else if (appData.moneyPerDay > 1500 && appData.moneyPerDay < 4000) {
            console.log("Средний уровень достатка");
        } else if (appData.moneyPerDay >= 4000) {
            console.log("Высокий уровень достатка");
        } else {
            console.log("Произошла ошибка");
        };
    },
    checkSavings: function() {      //РАССЧИТЫВАЕМ ПРОЦЕНТ С НАКОПЛЕНИЙ
         if (appData.savings == true) {
            let save = +prompt("Какова сумма накоплений?"),
                percent = +prompt("Под какой процент?");
            appData.monthIncome = (save/100/12*percent).toFixed();
            alert("Доход в месяц с вашего депозита: " + appData.monthIncome);
        }
    },
    chooseOptExpenses: function() {     //СПРАШИВАЕМ СТАТЬИ НЕОБЯЗАТЕЛЬНЫХ РАСХОДОВ
        for (let i = 1; i < 4; i++) {
            let a = prompt("Статья необязательных расходов?", '');

            if ((typeof(a) === 'string') && (typeof(a)) != null && a != '' && a.length < 30) {
                console.log('done');
                appData.optionalExpenses[i] = a;
            }   else {
                i = i - 1;
            }
        }   
    },
    chooseIncome: function() {
        let items = prompt('Что принесет дополнительный доход? (Перечислите через запятую)', '');

        /*while(!isNaN(items) || items == "" || items == null) {
            items = prompt('Что принесет дополнительный доход? (Перечислите через запятую)', '');
        }*/

        if (typeof(items) != "string" || items == "" || typeof(items) == null) {
            console.log('Вы ввели некорректные данные или не ввели их вовсе!');
        } else {
            appData.income = items.split(', ');
            appData.income.push(prompt('Может что-то еще?'));
            appData.income.sort();
        }

        appData.income.forEach(function(item, i) {
            alert('Способы доп заработка: ' + (i+1) + ': ' + item);
        });
    }
};

