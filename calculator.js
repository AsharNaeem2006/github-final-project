function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        throw new Error("Cannot divide by zero");
    }
    return a / b;
}

function clearDisplay() {
    document.getElementById('display').value = '';
}

function appendToDisplay(value) {
    const display = document.getElementById('display');
    const current = display.value;
    const operators = ['+', '-', '*', '/'];

    // Prevent leading operator (except minus for negation)
    if (current === '' && operators.includes(value) && value !== '-') return;

    // Prevent consecutive operators
    if (current !== '' && operators.includes(value) && operators.includes(current.slice(-1))) {
        display.value = current.slice(0, -1) + value;
        return;
    }

    // Prevent multiple decimals in same number segment
    if (value === '.') {
        const parts = current.split(/[\+\-\*\/]/);
        if (parts[parts.length - 1].includes('.')) return;
    }

    display.value = current + value;
}

function deleteLast() {
    const display = document.getElementById('display');
    display.value = display.value.slice(0, -1);
}

function calculateResult() {
    const display = document.getElementById('display');
    const expr = display.value;
    if (expr === '') return;
    try {
        const sanitized = expr.replace(/[^0-9+\-*/().]/g, '');
        const result = Function('"use strict"; return (' + sanitized + ')')();
        display.value = parseFloat(result.toFixed(10)).toString();
    } catch (e) {
        display.value = 'Error';
    }
}

// Keyboard support
document.addEventListener('keydown', function (e) {
    if (e.key >= '0' && e.key <= '9') appendToDisplay(e.key);
    else if (e.key === '+') appendToDisplay('+');
    else if (e.key === '-') appendToDisplay('-');
    else if (e.key === '*') appendToDisplay('*');
    else if (e.key === '/') { e.preventDefault(); appendToDisplay('/'); }
    else if (e.key === '.') appendToDisplay('.');
    else if (e.key === 'Enter' || e.key === '=') calculateResult();
    else if (e.key === 'Backspace') deleteLast();
    else if (e.key === 'Escape') clearDisplay();
});