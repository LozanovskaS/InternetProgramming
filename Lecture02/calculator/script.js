let display = document.querySelector("input[name='display']");
let buttons = document.querySelectorAll("input[type='button']");
let memory = 0;
let history = [];

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.value;

        if (value === 'MC') {
            memory = 0;
        } else if (value === 'MR') {
            display.value = memory;
        } else if (value === 'M+') {
            memory += parseFloat(display.value) || 0;
        } else if (value === 'M-') {
            memory -= parseFloat(display.value) || 0;
        } else if (value === 'AC') {
            display.value = "";
        } else if (value === 'DE') {
            display.value = display.value.slice(0, -1);
        } else if (value === '=') {
            try {
                const calculation = display.value + '=' + eval(display.value);
                history.unshift(calculation);
                updateHistory();

                display.value = eval(display.value);
            } catch {
                display.value = "Error";
            }
        } else {
            display.value += value;
        }
    });
});

function updateHistory() {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = '';

    const recentHistory = history.slice(0, 5);

    recentHistory.forEach(calc => {
        const li = document.createElement('li');
        li.textContent = calc;
        historyList.appendChild(li);
    });
}

document.addEventListener('keydown', function (event) {
    event.preventDefault();
    const key = event.key;

    if (/[0-9]/.test(key)) {
        display.value += key;
    } else if (['+', '-', '*', '/'].includes(key)) {
        display.value += key;
    } else if (key === '.') {
        display.value += key;
    } else if (key === 'Enter') {
        try {
            const result = eval(display.value);
            const calculation = display.value + '=' + result;
            history.unshift(calculation);
            updateHistory();

            display.value = result;
        } catch {
            display.value = "Error";
        }
    } else if (key === 'Backspace') {
        display.value = display.value.slice(0, -1);
    } else if (key === 'Escape') {
        display.value = "";
    }
});