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
        '2023-07-11T23:36:17.929Z',
        '2023-07-7T10:51:36.790Z',
    ],
    currency: 'EUR',
    locale: 'pt-PT', // de-DE
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
        '2023-07-10T12:01:20.894Z',
    ],
    currency: 'USD',
    locale: 'en-US',
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
        '2023-07-9T12:01:20.894Z',
    ],
    currency: 'USD',
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
        '2023-07-11T12:01:20.894Z',
    ],
    currency: 'USD',
    locale: 'en-US',
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
    currency: 'USD',
    locale: 'en-US',
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

const displayMovements = function (movements, sort = false) {
    containerMovements.innerHTML = ``; //innHTML returns the whole div class with their tags.. the whole html
    // containerMovements.textContent = ``; //it only returns the text inside the tags

    const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

    movs.forEach(function (mov, i) {
        const transferType = mov > 0 ? 'deposit' : 'withdrawal';
        const movmentHtmlRow = `
        <div class="movements__row">
            <div class="movements__type movements__type--${transferType}">${i + 1} ${transferType}</div>
            <div class="movements__value">${mov}€</div>
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
    labelBalance.textContent = `${acc.balance}€`;
}


const calcDisplaySummary = function (account) {
    const income = account.movements
        .filter(mov => mov > 0)
        .reduce((acc, curMov) => acc + curMov, 0);
    labelSumIn.textContent = `${income}€`;

    const outcome = account.movements
        .filter(mov => mov < 0)
        .reduce((acc, curMov) => acc + curMov, 0);
    labelSumOut.textContent = `${Math.abs(outcome)}€`;

    const interest = account.movements
        .filter(mov => mov > 0)
        .map(deposit => (deposit * account.interestRate) / 100)
        .filter(interest => interest > 1)
        .reduce((acc, deposit) => acc + deposit, 0)
    labelSumInterest.textContent = `${(interest)}€`
}

const updateUI = function (acc) {
    // Display movements
    displayMovements(acc.movements);

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

    const loanAmount = Number(inputLoanAmount.value);

    if (loanAmount > 0 && currentAccount.movements.some(mov => mov > loanAmount * 0.1)) {

        alert(`Amount of ${loanAmount}€ is successfully granted to your account..💰`)
        // Add positive movements
        currentAccount.movements.push(loanAmount);

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
    displayMovements(currentAccount.movements, !sorted);
    sorted = !sorted;
});


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////// LECTURES WITH PROJECTS HANDLING //////////////////////////////

