let prevNumber=''
let calculationOperator=''
let currentNumber=''
let a = 0;
let historyPrevNumber=''
let historyCalculationOperator=''
let historyCurrentNumber=''

const inputNumber= (number)=>{
    if(a===1){
        currentNumber = number
        historyCurrentNumber = number
        a=0
    }else{
        if(currentNumber==='0'){
            currentNumber=number
            historyCurrentNumber = number
        }else{
            currentNumber += number
            historyCurrentNumber += number
        }
    }
}

const calculatorScreenHistory =document.querySelector('.calculator-screen-history')

const updateScreenHistory = (number) => {
    calculatorScreenHistory.value=number
}

const calculatorScreen = document.querySelector(".calculator-screen")

const updateScreen = (number)=>{
    calculatorScreen.value = number
}

const numbers =document.querySelectorAll(".number")

numbers.forEach((number)=>{
    number.addEventListener("click",()=>{
        inputNumber(event.target.value)
        updateScreen(currentNumber)
    })
})

const operators = document.querySelectorAll(".operator")

operators.forEach((operator)=>{
    operator.addEventListener("click",(event)=>{
        inputOperator(event.target.value)
        updateScreenHistory(historyPrevNumber+ ' ' + historyCalculationOperator+ ' ')
    })
})

const inputOperator = (operator) =>{
    if(calculationOperator===''){
        prevNumber = currentNumber
    }
    calculationOperator = operator
    currentNumber = prevNumber
    a=1
    historyCalculationOperator = operator
    historyPrevNumber = prevNumber
}

const equalSign = document.querySelector('.equal-sign')

equalSign.addEventListener('click',()=>{
    calculate()
    a=1
    updateScreen(currentNumber)
    updateScreenHistory(historyPrevNumber + ' ' + historyCalculationOperator + ' ' +historyCurrentNumber + " = " )
    
    historyPrevNumber=''
    historyCalculationOperator=''
    historyCurrentNumber = currentNumber
})

const calculate= ()=>{
    let result = ''
    switch(calculationOperator){
        case '+' :
            result = parseFloat(prevNumber) + parseFloat(currentNumber)
            break;
        case '-' :
            result = parseFloat(prevNumber) - parseFloat(currentNumber)
            break;
        case '*' :
            result = parseFloat(prevNumber) * parseFloat(currentNumber)
            break;
        case '/' :
            result = parseFloat(prevNumber) / parseFloat(currentNumber)
            break;
        default:
            return
    }
    historyCurrentNumber = currentNumber
    currentNumber = result
    calculationOperator = ''
}

const decimal = document.querySelector('.decimal')

const inputDecimal = (dot)=>{
    if(currentNumber.includes('.')){
        return
    }
    currentNumber += dot
    
}

decimal.addEventListener('click',(event)=>{
    inputDecimal(event.target.value)
    updateScreen(currentNumber)
})

const percentage = document.querySelector('.percentage')

percentage.addEventListener('click',(event)=>{
    updatePercentage();
    updateScreen(currentNumber) 
    updateScreenHistory(historyCurrentNumber + historyCalculationOperator + " = ")
    historyCalculationOperator = ''
    a=1
})

const updatePercentage = ()=>{
    historyCurrentNumber = currentNumber
    currentNumber = parseFloat(currentNumber)/100
    historyCalculationOperator = '%'
    calculationOperator =''
}

const clearBtn = document.querySelector('.all-clear')

clearBtn.addEventListener('click',()=>{
    clearAll()
    updateScreen(currentNumber)
    updateScreenHistory('')
})

const clearAll = ()=>{
    prevNumber =''
    calculationOperator =''
    currentNumber = '0'
    historyPrevNumber=''
    historyCurrentNumber=''
    historyCalculationOperator=''
}
