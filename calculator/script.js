class Calc {
    constructor(prevElement, currentElement) {
        this.prevElement = prevElement
        this.currentElement = currentElement
        this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.prevOperand = ''
        this.operation = undefined

    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)

    }

    appendNum(number) {
        if (number === "." && this.currentOperand.includes(".")) return
        
        this.currentOperand = this.currentOperand.toString() + number.toString()


    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.prevOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.prevOperand = this.currentOperand
        this.currentOperand = ''

    }

    compute() {
        let computation
        const prev = parseFloat(this.prevOperand)
        const curr = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(curr)) return
        switch (this.operation) {
            case '+':
                computation = prev + curr
                break
            
            case '-':
                computation = prev - curr
                break

            case 'x':
                computation = prev * curr
                break

            case '÷':
                computation = prev / curr
                break

            default:
                return                
        }
        this.currentOperand = computation
        this.operation = undefined
        this.prevOperand = ''   

    }

    getNumber(number) {
        const stringNum = number.toString()
        const intDigits = parseFloat(stringNum.split('.')[0])
        const decimalDigits = stringNum.split('.')[1]
        let intDisplay
        if (isNaN(intDigits)) {
            intDisplay = ''            
        }
        else {
            intDisplay = intDigits.toLocaleString('en', {
            maximumFractionDigits: 0})
        }
        if (decimalDigits != null) {
            return `${intDisplay}.${decimalDigits}`
        }
        else {
            return intDisplay
        }
        
    }
    
    
    
    updateDisplay() {
        this.currentElement.innerText = this.getNumber(this.currentOperand)
        if (this.operation != null) {
            this.prevElement.innerText = 
            `${this.getNumber(this.prevOperand)} ${this.operation}`
        }
        else {
            this.prevElement.innerText = ''
        }
        

    }
}




const numButtons = document.querySelectorAll('[data-number]')
const operButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const delsButton = document.querySelector('[data-delete]')
const acButton = document.querySelector('[data-ac]')
const prevElement = document.querySelector('[data-previous]')
const currentElement = document.querySelector('[data-current]')

const calc = new Calc(prevElement, currentElement)

numButtons.forEach(button => {
    button.addEventListener('click', () => {
        calc.appendNum(button.innerText)
        calc.updateDisplay()
    })
})

operButtons.forEach(button => {
    button.addEventListener('click', () => {
        calc.chooseOperation(button.innerText)
        calc.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calc.compute()
    calc.updateDisplay()
})

acButton.addEventListener('click', button => {
    calc.clear()
    calc.updateDisplay()
})

delsButton.addEventListener('click', button => {
    calc.delete()
    calc.updateDisplay()
})
