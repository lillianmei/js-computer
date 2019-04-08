//選取各類元素
const num = document.querySelectorAll('.number');
const dot = document.querySelector('.dot');
const func = document.querySelectorAll('.func');
const calc = document.querySelector('.calc');
const total = document.querySelector('.total');
const back = document.querySelector('.back');
const clear = document.querySelector('.clear');
const keyValue = document.querySelectorAll('.cal-min button');

let tempCalc = []; //上方顯示過程的陣列
let tempResult = '0'; //最終計算結果顯示的字串
let condition = '';//表示狀態用於顯示使用

/**
 * @function
 * @param {string} num - 計算結果字串
 * @param {number} [precision=12] - 取得浮點數內多少個整數（12個）
 */
function isNumber(num) {
    return Number.parseFloat(num).toPrecision(8);
}


/**
 * @function
 * @param {string} num - 計算結果字串
 * @description 判斷計算計算結果長度大於3，並且沒有小數點，就加入千分位顯示
 */
function isPrice(num) {
    num = String(num);
    const dotCheck = num.indexOf('.');
    if (dotCheck !== -1) {
        return isNumber(num);
    }
    if (num.length > 3 && dotCheck === -1) {
        //replace會返回新字串
        return num.replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
    } else {
        return num;
    }
}

/**
 * @function
 * @param {object} event - 監聽事件
 * @description 根據不同按鈕做相對應的處理
 */
function isCalculation(e) {
    let calcBtn = e.target.classList.value;
    let calcValue = e.target.innerHTML;
    switch (calcBtn) {
        case 'number':
            if (condition === 'clear') {
                condition = '';
                tempCalc = [];
                tempResult = '0';
            }
            if (tempCalc.length === 0 && calcValue === 0) {
                return
            };
            tempCalc.push(calcValue);
            break;

        case 'func':
            if (tempCalc.length === 0 && calcValue === 0) {
                return
            };
            tempCalc.push(calcValue);
            break;

        case 'dot':
            if (tempCalc.indexOf(".") >= 0) {
                return
            };
            if (tempCalc.length === 0) {
                tempCalc.push(0)
            }
            tempCalc.push(calcValue);
            break;

        case 'back':
            if (tempCalc.length > 0) {
                tempCalc.splice(tempCalc.length - 1, 1);
            }
            if(tempCalc.length ===0){
                condition = 'clear'
                tempCalc = [];
                tempResult = '0'
            }
            break;

        case 'sum':
            const sumArr = [];
            tempCalc.map(e => {
                if (e === '÷') {
                    e = '/'
                } else if (e === 'x') {
                    e = '*'
                } else if (e === '-') {
                    e = '-'
                } else if (e === '+') {
                    e = '+'
                }
                sumArr.push(e)
            });
            tempResult = eval(sumArr.join(''));
            condition = 'clear'
            break;
        case 'clear':
            tempCalc = [];
            tempResult = '0';
            condition = '';
            break;

    }

    calc.innerHTML = tempCalc.join('');
    //calc.textContent = tempCalc.join('');
    total.innerHTML = isPrice(tempResult);



}

//監聽按鈕 滑鼠點下 事件，觸發處理函示
keyValue.forEach(e => {
    e.addEventListener('mousedown', isCalculation)
});
//監聽按鈕 鍵盤按下 事件，觸發處理函示
