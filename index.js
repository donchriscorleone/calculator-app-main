window.addEventListener('load', (e) => {
    checkboxes.item(0).checked = true;
    body.classList.add('theme-1');
})

const body = document.querySelector('body');

const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const labels = document.querySelectorAll('label');
checkboxes.forEach((c, index) => {
    c.addEventListener('change', (e) => {
        const bodyClass = body.classList;
        bodyClass.add(`theme-${index + 1}`);
         checkboxes.forEach((x, i) => {
            if (x !== c) {
                x.checked = false;
                bodyClass.remove(`theme-${i + 1}`);
            }
         })
    })
})

const screen = document.querySelector('input[type="number"]');
const numberWrapper = document.querySelector('.number-formatted-wrapper');

const buttonNumbers = document.querySelectorAll('button.btn-number');
buttonNumbers.forEach(b => {
    b.addEventListener('click', (e) => {
        let res;
        let result;
        const x = numberWrapper.innerHTML.includes('.');
        if (numberWrapper.innerHTML.includes('.')) {
            res = parseFloat(numberWrapper.innerHTML + b.dataset.number.toString());
            result = res.toLocaleString();
        } else {
            res = parseInt(screen.value.toString() + b.dataset.number.toString());
            result = res.toLocaleString();
        }
        screen.value = res;
        numberWrapper.innerHTML = result;
    })
})

const btnReset = document.querySelector('.btn-reset');
btnReset.addEventListener('click', (e) => {
    reset();
    operations = [];
    values = [];
})

const btnDel = document.querySelector('.btn-del');
btnDel.addEventListener('click', (e) => {
    if (screen.value.toString().length <= 1) {
        reset();
        return;
    }

    const currentValue = screen.value.toString();
    const sliced = currentValue.slice(0, currentValue.length - 1);
    const converted = parseInt(sliced)

    screen.value = converted;
    const result = Number(converted).toLocaleString();
    numberWrapper.innerHTML = result;
})

const btnEq = document.querySelector('.btn-equals');
btnEq.addEventListener('click', (e) => {
    const currentOperation = operations.pop();
    if (!currentOperation) return;

    const currentValue = values.pop();
    if (currentValue && !!screen.value) {
        appearNumberOnScreen(currentValue, currentOperation);
    }
})

const btnDot = document.querySelector('.btn-dot');
btnDot.addEventListener('click', (e) => {
    if (screen.value.toString().includes('.')) return;

    const res = screen.value.toString() + '.';
    screen.value = parseFloat(res);
    numberWrapper.innerHTML = res.toLocaleString();
})


let operations = [];
let values = [];
const btnOperations = document.querySelectorAll('.btn-operation');
btnOperations.forEach(o => {
    o.addEventListener('click', (e) => {
        if (!screen.value) return;

        const currentOperation = operations.pop();
        const currentValue = values.pop();

        switch (o.dataset.operation) {
            case '+':
                calculate(currentOperation, currentValue, '+');
                break;
            case '-':
                calculate(currentOperation, currentValue, '-');
                break;
            case '*':
                calculate(currentOperation, currentValue, '*');
                break;
            case '/':
                calculate(currentOperation, currentValue, '/');
                break;
        }
    })
})

function appearNumberOnScreen(newValue, operator) {
    let res;
    switch (operator) {
        case '+':
            res = parseFloat(newValue) + parseFloat(screen.value);
            break;
        case '-':
            res = parseFloat(screen.value) - parseFloat(newValue);
            break;
        case '/':
            res = parseFloat(newValue) / parseFloat(screen.value);
            break;
        case '*':
            res = parseFloat(screen.value) * parseFloat(newValue);
            break;
        default:
            return;
    }

    screen.value = res;
    const result = Number(res).toLocaleString();
    numberWrapper.innerHTML = result;
}

function calculateLater(operation) {
    values.push(screen.value);
    operations.push(operation)
    reset();
}

function calculate(currentOperation, newValue, operation) {
    if (!currentOperation) {
        calculateLater(operation);
    } else {
        appearNumberOnScreen(newValue, currentOperation);
        operations = [];
        values = [];
    }
}

function reset() {
    screen.value = '';
    numberWrapper.innerHTML = '';
}