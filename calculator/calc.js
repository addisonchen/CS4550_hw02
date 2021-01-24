(function() {
    "use strict";

    // keep track of state
    // first: the first number in an expression
    // second: the second number in an expression
    // oper: the type of operation for this expression
    // prevAnswer: save the prev answer if user wants to keep doing maths after first exp
    //    - the prevAnswer will be ignored if a num/. is pressed before an operator is pressed after completing an exp.
    let state = {first: null, second: null, oper: null, prevAnswer: null};

    let display = document.getElementById('display');
    let maxLen = 15;

    // equal was pressed, do maths and reset state, store as prevAnswer
    function calculate() {
        // fill in first with prev answer if no new num inputs have been given
        if (state.first === null) {
            state.first = state.prevAnswer;
        }

        let firstNum = Number(state.first);
        let secondNum = Number(state.second);
        let ansNum = 0;

        switch(state.oper) {
            case 'add':
                ansNum = firstNum + secondNum;
                break;
            case 'sub':
                ansNum = firstNum - secondNum;
                break;
            case 'mul':
                ansNum = firstNum * secondNum;
                break;
            case 'div':
                // check for div by zero
                if (secondNum === 0) {
                    console.log("divide by zero!");
                } else {
                    ansNum = firstNum / secondNum
                }
                break;
            default:
                console.log('unknown operator: ' + state.oper)
        }

        let ans = '' + ansNum;
        
        // set new state of calculator
        state.first = null;
        state.second = null;
        state.oper = null;

        // check for overflow
        console.log("return len: " + ans.length)
        if (ans.length > 15) {
            display.innerHTML = "overflow";
            state.prevAnswer = "0"
        } else {
            state.prevAnswer = ans;
            display.innerHTML = ans;
        }
    }

    // called when an operator is clicked
    // do maths!
    function handleOperator(val) {

        if ((val === "add") && (state.oper !== null))  {
            calculate()
        } else {
            state.oper = val
        }
    }

    // called when a decimal button is clicked
    // adds a decimal if theres none yet
    function handleDecimal() {
        // check if cur display is a prevAnswer or not
        let curNum = "0";
        if ((state.first !== null) || (state.second !== null)) {
            curNum = display.innerHTML;
        }

        // do nothing on overflow
        if (curNum.length >= maxLen) {
            return;
        }


        if (!(curNum.includes('.'))) {
            display.innerHTML = curNum.concat('.');

            // still on first num
            if (state.oper === null) {
                state.first = curNum.concat('.');
            }
            // must be the second num
            else {
                state.second = curNum.concat('.');
            }
        } 
        
        else {
            console.log('already a decimal');
        }
    }

    // reset state and display
    function handleClear() {
        state.first = null;
        state.second = null;
        state.oper = null;
        state.prevAnswer = null;
        display.innerHTML = '0';
    }

    // handle a number input, updates display and state
    function handleNumber(val) {
        // check if cur display is a prevAnswer or not
        let curNum = "0";
        if ((state.first !== null) || (state.second !== null)) {
            curNum = display.innerHTML;
        }

        // first num
        if (state.oper === null) {
            // do nothing on overflow
            if (curNum.length >= maxLen) {
                return;
            }

            // new first num
            if (curNum === '0') {
                display.innerHTML = val;
                state.first = val
            } 
            // first num already exists
            else {
                let newNum = curNum.concat(val);
                state.first = newNum;
                display.innerHTML = newNum;
            }
        }
        // new second num
        else if (state.second === null) {
            state.second = val;
            display.innerHTML = val;
        }
        // second num exists already
        else {
            // do nothing on overflow
            if (curNum.length >= maxLen) {
                return;
            }
            let newNum = curNum.concat(val);
            display.innerHTML = newNum;
            state.second = newNum;
        }
    }

    // called when a button is clicked by event listener
    // determine what kind of button was clicked and go from there
    function button_clicked(e) {
        console.log(e.currentTarget.value);
        let val = e.currentTarget.value;

        if ((val === 'add') || (val === 'sub') || (val === 'mul') || (val === 'div')) {
            handleOperator(val);
        }

        else if (val === 'decimal') {
            // TODO ALSO CHECK IF THE FIRST IS AN ANSWER OR NOT
            // IF IT IS AN ANSWER THEN RESET TO THE NEW INPUT (TREAT AS IF WAS 0)
            handleDecimal();
        }

        else if (val === 'clear') {
            handleClear();
        }

        // must be a number
        else {
            // TODO ALSO CHECK IF THE FIRST IS AN ANSWER OR NOT
            // IF IT IS AN ANSWER THEN RESET TO THE NEW INPUT (TREAT AS IF WAS 0)
            handleNumber(val);
        }

        console.log(state);
    }

    // setup all the buttons with event listeners
    function setup_buttons() {
        let btns = document.querySelectorAll('.btn');

        btns.forEach(btn => {
            btn.addEventListener('click', button_clicked, false);
        });
    }

    // setup the buttons once the page is loaded
    window.addEventListener('load', setup_buttons, false);
})();