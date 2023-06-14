'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
    owner: 'Nikhil Kumar Sahu',
    movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
    interestRate: 1.2, // %
    pin: 1111,

    movementsDates: [
        '2022-11-19T21:31:17.178Z',
        '2022-12-23T07:42:02.383Z',
        '2023-01-28T09:15:04.904Z',
        '2023-04-01T10:17:24.185Z',
        '2023-05-08T14:11:59.604Z',
        '2023-05-27T17:01:17.194Z',
        '2023-06-11T23:36:17.929Z',
        '2023-06-13T10:51:36.790Z',
    ],
    currency: 'INR',
    locale: 'en-IN',
};

const account2 = {
    owner: 'Riya Singh',
    movements: [5000, 3400, -150.47, -790, -2210, -1000, 9500, -30],
    interestRate: 1.5,
    pin: 2222,

    movementsDates: [
        '2022-11-01T13:15:33.035Z',
        '2022-11-30T09:48:16.867Z',
        '2022-12-25T06:04:23.907Z',
        '2023-01-25T14:18:46.235Z',
        '2023-02-05T16:33:06.386Z',
        '2023-04-10T14:43:26.374Z',
        '2023-06-25T18:49:59.371Z',
        '2023-06-10T12:01:20.894Z',
    ],
    currency: 'USD',
    locale: 'hi-IN',
};

const account3 = {
    owner: 'Sandeep Mahto',
    movements: [6000, 830.12, 1200, -670.55, -200, 900.5, 1200, 1245],
    interestRate: 1.1,
    pin: 3333,

    movementsDates: [
        '2022-09-01T13:15:33.035Z',
        '2022-10-30T09:48:16.867Z',
        '2022-11-25T06:04:23.907Z',
        '2023-01-25T14:18:46.235Z',
        '2023-02-05T16:33:06.386Z',
        '2023-02-10T14:43:26.374Z',
        '2023-04-23T18:49:59.371Z',
        '2023-06-09T12:01:20.894Z',
    ],
    currency: 'EUR',
    locale: 'en-US',
};

const account4 = {
    owner: 'Usha Devi',
    movements: [5000, 3400, -150.45, -790, -3210.5, -1000, 8500.33, -30],
    interestRate: 1.2,
    pin: 4444,

    movementsDates: [
        '2022-10-12T13:15:33.035Z',
        '2022-11-30T09:48:16.867Z',
        '2022-12-25T06:04:23.907Z',
        '2023-01-01T14:18:46.235Z',
        '2023-01-05T16:33:06.386Z',
        '2023-04-10T14:43:26.374Z',
        '2023-06-25T18:49:59.371Z',
        '2023-06-11T12:01:20.894Z',
    ],
    currency: 'USD',
    locale: 'en-IN',
};

const account5 = {
    owner: 'Nidhi Kumari',
    movements: [400, 1424.45, -560, -100, 1200.23, 640, -1200, 7750.45],
    interestRate: 1.1,
    pin: 5555,

    movementsDates: [
        '2022-11-01T12:11:33.025Z',
        '2022-11-30T03:08:16.867Z',
        '2022-12-15T07:05:23.907Z',
        '2023-01-10T11:18:46.230Z',
        '2023-02-22T16:33:06.386Z',
        '2023-04-21T10:43:26.374Z',
        '2023-06-29T18:49:59.371Z',
        '2023-07-12T11:01:20.894Z',
    ],
    currency: 'INR',
    locale: 'hi-IN',
}

const accounts = [account1, account2, account3, account4, account5];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const formatMovementDate = function (date, locale) {
    const calcDaysPassed = (date1, date2) => {
        return Math.round(
            Math.abs(
                (date2 - date1) / (1000 * 60 * 60 * 24)
            )
        );
    }
    const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    const daysPassed = calcDaysPassed(new Date(), date);
    if (daysPassed === 0) return `Today ${time}`;
    if (daysPassed === 1) return `YesterDay ${time}`;
    if (daysPassed <= 7) return `${daysPassed} days ago ${time}`;

    return new Intl.DateTimeFormat(locale).format(date) + ` ${time}`;
    // const day = `${date.getDate()}`.padStart(2, 0);
    // const month = `${date.getMonth() + 1}`.padStart(2, 0);
    // const year = date.getFullYear();
    // return `${day}/${month}/${year}, ${time}`

}

const formatCurrency = function (value, locale, currency) {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
    }).format(value);
}

const displayMovements = function (acc, sort = false) {
    containerMovements.innerHTML = ``; //innHTML returns the whole div class with their tags.. the whole html
    // containerMovements.textContent = ``; //it only returns the text inside the tags

    const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;

    movs.forEach(function (mov, i) {
        const trancDate = new Date(acc.movementsDates[i]);
        const displayDate = formatMovementDate(trancDate, acc.locale);

        const transferType = mov > 0 ? 'deposit' : 'withdrawal';
        const formattedMov = formatCurrency(mov, acc.locale, acc.currency)
        const movmentHtmlRow = `
        <div class="movements__row">
            <div class="movements__type movements__type--${transferType}">${i + 1} ${transferType}</div>
            <div class="movements__date">${displayDate}</div>
            <div class="movements__value">${formattedMov}</div>
        </div>`;

        containerMovements.insertAdjacentHTML('afterbegin', movmentHtmlRow);

    })
}

const createUsernames = function (accs) {
    accs.forEach(function (acc) {
        acc.username = acc.owner
            .toLowerCase()
            .split(' ')
            .map(n => n.at(0))
            .join('');
    })
}
createUsernames(accounts);

const calcDisplayBalance = function (acc) {
    acc.balance = acc.movements.reduce(function (acc, cur) {
        return acc + cur;
    }, 0);
    const formattedBalance = formatCurrency(acc.balance, acc.locale, acc.currency);

    labelBalance.textContent = `${formattedBalance}`;
}


const calcDisplaySummary = function (account) {
    const income = account.movements
        .filter(mov => mov > 0)
        .reduce((acc, curMov) => acc + curMov, 0);
    labelSumIn.textContent = `${formatCurrency(income, account.locale, account.currency)}`;

    const outcome = account.movements
        .filter(mov => mov < 0)
        .reduce((acc, curMov) => acc + curMov, 0);
    labelSumOut.textContent = formatCurrency(outcome, account.locale, account.currency);

    const interest = account.movements
        .filter(mov => mov > 0)
        .map(deposit => (deposit * account.interestRate) / 100)
        .filter(interest => interest > 1)
        .reduce((acc, deposit) => acc + deposit, 0)
    labelSumInterest.textContent = formatCurrency(interest, account.locale, account.currency)
}

const updateUI = function (acc) {
    // Display movements
    displayMovements(acc);

    // Display Balance
    calcDisplayBalance(acc);

    // Display Summary
    calcDisplaySummary(acc);
}

// Event Listener
let currentAccount;

btnLogin.addEventListener('click', function (e) {
    // Prevent form from submitting and refreshing again
    e.preventDefault();
    // console.log('LOGINED');
    currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
    if (Number(inputLoginPin.value) === currentAccount?.pin) {
        // console.log(`LOGINED AS ${currentAccount.owner}`);

        // Display UI and message
        labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ').at(0)}👋`;
        containerApp.style.opacity = 100;

        // Create current Date Time INTL
        const options = {
            hour: 'numeric',
            minute: 'numeric',
            day: 'numeric',
            month: '2-digit',
            // month: 'long',
            year: 'numeric',
            weekday: 'short',
        };
        const now = new Date();
        const formattedDateTime = `${new Intl.DateTimeFormat(currentAccount.locale, options).format(now)}`;
        labelDate.textContent = formattedDateTime.slice(0, -7) + '⏲️' + formattedDateTime.slice(-7);

        // UpdateUI
        updateUI(currentAccount);

        // Clear input Username PIN
        inputLoginUsername.value = inputLoginPin.value = ``;
        // Remove the cursor from the PIN input
        inputLoginPin.blur();


    } else {
        alert(`Wrong Username or PIN. Try Again`);
        containerApp.style.opacity = 0;
        inputLoginPin.value = inputLoginUsername.value = ``;
        labelWelcome.textContent = `Log in to get started`;
        inputLoginUsername.focus();
    }
});


///////////////////// Implementing Transfers ///////////////////////////

btnTransfer.addEventListener('click', function (e) {
    e.preventDefault();
    const transferAmount = inputTransferAmount.value;
    const recieverAccount = accounts.find(acc => inputTransferTo.value === acc.username)

    inputTransferAmount.value = inputTransferTo.value = ``;
    inputTransferAmount.blur();

    if (transferAmount > 0
        && recieverAccount
        && currentAccount.balance >= transferAmount
        && recieverAccount.username !== currentAccount.username
    ) {
        currentAccount.movements.push(Number(-transferAmount));
        recieverAccount.movements.push(Number(transferAmount));

        // Add time
        currentAccount.movementsDates.push(new Date().toISOString());
        recieverAccount.movementsDates.push(new Date().toISOString());

        // Update UI
        updateUI(currentAccount);
        // console.log(accounts);

        alert(`Amount of ${transferAmount} has been successfully transfered to ${recieverAccount.owner}.💸`)

    } else {
        if (!recieverAccount) {
            alert(`Reciever ${inputTransferTo.value}does NOT exist in Bankist.🚫`)
        } else if (currentAccount.balance < transferAmount) {
            alert(`Unsufficient balance.📉`)
        } else if (recieverAccount.username === currentAccount.username) {
            alert(`You can't transfer your money to yourself.🚫`)
        }

    }

});


///////////////////// The find Method /////////////////////////

btnClose.addEventListener('click', function (e) {
    e.preventDefault();

    if (inputCloseUsername.value === currentAccount.username && Number(inputClosePin.value) === currentAccount.pin) {
        alert(`You are about to delete this account..!`)
        const index = accounts.findIndex(acc => acc.username === currentAccount.username);

        // Delete account
        accounts.splice(index, 1);

        // Hide UI
        containerApp.style.opacity = 0;

        // Clear close inputs
        inputCloseUsername.value = inputClosePin.value = ``;

        // Set up LOGIN welcome
        labelWelcome.textContent = `Log in to get started`;

    }
})

// // Project Request Loan

btnLoan.addEventListener('click', function (e) {
    e.preventDefault();

    const loanAmount = Math.floor(inputLoanAmount.value);

    if (loanAmount > 0 && currentAccount.movements.some(mov => mov > loanAmount * 0.1)) {

        alert(`Amount of ${loanAmount}€ is successfully granted to your account..💰`)
        // Add positive movements
        currentAccount.movements.push(loanAmount);

        // Add time
        currentAccount.movementsDates.push(new Date().toISOString());

        // Update UI
        updateUI(currentAccount);

        // Clear input field
        inputLoanAmount.value = ``;
        inputLoanAmount.blur();


    }
})

///// Sorting Movements
let sorted = false;

btnSort.addEventListener('click', function (e) {
    e.preventDefault();
    displayMovements(currentAccount, !sorted);
    sorted = !sorted;
});

// Date
// const now = new Date();
// const day = `${now.getDate()}`.padStart(2, 0);
// const month = `${now.getMonth() + 1}`.padStart(2, 0);
// const year = now.getFullYear();
// const hour = `${now.getHours()}`.padStart(2, 0);
// const min = `${now.getMinutes()}`.padStart(2, 0);

// labelDate.textContent = `${day}/${month}/${year} ⏲️${hour}:${min}`;


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////// LECTURES WITH PROJECTS HANDLING //////////////////////////////

// ///////////////////////// Converting And Checking Numbers /////////////////////////////

// console.log(23 === 23.0);

// // Base 10 -> 0 to 9. 1/10 = 0.1 3/10 = 3.3333333
// // Binary base 2 -> 0 1
// console.log(0.1 + 0.2);
// console.log(0.1 + 0.2 === 0.3);

// // Conversion
// console.log(Number('23'));
// console.log(+'32'); // can also convert but not recemended

// // Parsing Int
// console.log(Number.parseInt('12', 10));
// console.log(Number.parseInt('12.23'));

// console.log(Number.parseInt('23rem'));
// console.log(Number.parseInt(' 29.34px '));

// // Parsing float
// console.log(Number.parseFloat('12.23'));
// console.log(Number.parseFloat('23.34px  '));

// // isNAN only to check NOT A NUMBER
// console.log(Number.isNaN(20));
// console.log(Number.isNaN(undefined + 3)); //NAN operation-->true
// console.log(Number.isNaN(23 / 0));


// // isFinite to check whether a number or not
// console.log(Number.isFinite(20));
// console.log(Number.isFinite('23'));
// console.log(Number.isFinite(34 / 0)); //infinity

// // isInteger only to check Integer
// console.log(Number.isInteger(34));
// console.log(Number.isInteger(12.23));


// /////////////////////////// Math and Rounding //////////////////////
// console.log(Math.sqrt(25));
// console.log(25 ** (1 / 2));
// console.log(8 ** (1 / 3));

// console.log(Math.max(12, 2, 34, 5, 11));

// console.log(Math.min(5, 12, 18, 23, 13));

// console.log(Math.E); //euler's number
// console.log(Math.PI);
// console.log((Math.PI * Number.parseFloat('5px') ** 2).toFixed(2));


// console.log(Math.trunc(Math.random() * 6) + 1);

// // 5 to 10 --> from (0...4)+1(5)=> 6,7,8,9,10

// const randomInt = function (to, till) {
//     return Math.trunc(Math.random() * (till - to)) + 1 + to;
// }
// console.log(randomInt(5, 10));

// // Rounding Integers
// console.log(Math.trunc(23.45));

// console.log(Math.round(23.14));
// console.log(Math.round(23.9));

// console.log(Math.ceil(23.14));
// console.log(Math.ceil(23.9));

// console.log(Math.floor(23.14));
// console.log(Math.floor('23.9')); //also convert input to the number

// // diff b/w trunc and floor
// console.log(Math.trunc(-23.12));
// console.log(Math.floor(-23.12));

// // Rounding decimals --> **returns in string
// console.log((23.19).toFixed());
// console.log((2.7953531).toFixed(2));
// console.log((Math.PI).toFixed(2));

// console.log(+(2.345).toFixed(2)); //changed to Number type


//////////// Remainder Operator, Numeric Seperator and Working with BigInt() /////////////

// // Remainder Operator
// labelBalance.addEventListener('click', function () {
//     console.log('clicked');
//     [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
//         if (i % 2 === 0) row.style.backgroundColor = 'orangered';
//         if (i % 3 === 0) row.style.backgroundColor = 'yellow';
//     });
// })

// // Numeric separator
// const diameter = 324_345_341_000_000;
// console.log(diameter);

// const price = 12_60;
// console.log(price);

// const PI = 3.141_5234;
// console.log(PI);


// // BigInt

// console.log(2 ** 53 - 1); // safe integer // 64 bits for number but only 53 uses
// // and rest use for sign symbols and other value
// // Every bit contains two binary digits

// console.log(Number.MAX_SAFE_INTEGER);

// console.log(24385726091789575897943975349975430n); //bigint
// console.log(BigInt(7589365890765890476895046950));

// console.log(BigInt(9898990879807598809634786597) * BigInt(5870978569307896508695087469306890));

// console.log(Number.MAX_SAFE_INTEGER + 2); //inaccurate result occur
// console.log(typeof 20n);

// console.log(11 / 3);
// console.log(11n / 3n);


//////////////////////// Creating Dates //////////////////////

// const now = new Date();
// console.log(now);

// console.log(new Date('Jun 14 2023'));
// console.log(new Date('Dec 25 2023'));

// console.log(new Date(2027, 10, 19, 9, 15, 23))

// console.log(new Date(0))
// console.log(new Date(3 * 24 * 60 * 60 * 1000));

// // Working with Dates
// const future = new Date(2027, 10, 19, 9, 15, 23, 123);
// console.log(future);
// console.log(future.getFullYear());
// console.log(future.getMonth()); // 0 based
// console.log(future.getDate());
// console.log(future.getDay()); // day count
// console.log(future.getHours());
// console.log(future.getMinutes());
// console.log(future.getSeconds());
// console.log(future.getMilliseconds());

// console.log(future.toDateString());
// console.log(future.toISOString()); //Standard format

// console.log(future.getTime());
// console.log(new Date(1826595923123)); //count from 1jan1970

// future.setFullYear(2040); // mutate
// console.log(future);


///////////////// Operations With Dates and Time ////////////////////
// const future = new Date(2037, 1, 10, 1, 7);
// console.log(+future); //converted to numbers in miliSec from 1-1-1970

// const calcDaysPassed = (date1, date2) => {
//     return Math.round(
//         Math.abs(
//             (date2 - date1) / (1000 * 60 * 60 * 24)
//         )
//     );
// }

// console.log(calcDaysPassed(2118080220000, 2117821020000));


//////////////////// Internationalising Dates (Intl) //////////////////
// Fake logins
// containerApp.style.opacity = 100;
// currentAccount = account1;
// updateUI(currentAccount);

// Intl API
// const nowEx = new Date();
// const options = {
//     hour: 'numeric',
//     minute: 'numeric',
//     day: 'numeric',
//     // month: '2-digit',
//     month: 'long',
//     year: 'numeric'
// };
// const locale = navigator.language;
// console.log(locale); //en-IN

// labelDate.textContent = new Intl.DateTimeFormat('hi-IN', options).format(nowEx)
// labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(nowEx)

// Feel Free to READ MDN INTL API , there are many more features on this


/////////////////// Internationalizing Numbers(Intl) ////////////////

// const num = 2352100.34;

// const options = {
//     style: 'unit',
//     // style: 'currency',
//     // currency: 'EUR',
//     // currency: 'INR',
//     // style: 'percent',
//     unit: 'kilometer-per-hour',
//     // unit: 'celsius',
//     // useGrouping: false, //remove the numeric separator

// }


// const numINR = new Intl.NumberFormat('hi-IN', options).format(num);
// console.log('INR:  ', numINR);

// const numUSD = new Intl.NumberFormat('en-US', options).format(num);
// console.log('USD:  ', numUSD);
// console.log('Germany:  ', new Intl.NumberFormat('de-DE', options).format(num));
// console.log(`${navigator.language}:  `, new Intl.NumberFormat(navigator.language, options).format(num));
