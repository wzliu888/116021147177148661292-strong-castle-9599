import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState<number | null>(null)
  const [operation, setOperation] = useState<string | null>(null)
  const [waitingForNewValue, setWaitingForNewValue] = useState(false)

  const inputNumber = (num: string) => {
    if (waitingForNewValue) {
      setDisplay(num)
      setWaitingForNewValue(false)
    } else {
      setDisplay(display === '0' ? num : display + num)
    }
  }

  const inputOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      const currentValue = previousValue || 0
      const newValue = calculate(currentValue, inputValue, operation)

      setDisplay(String(newValue))
      setPreviousValue(newValue)
    }

    setWaitingForNewValue(true)
    setOperation(nextOperation)
  }

  const calculate = (firstValue: number, secondValue: number, operation: string) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue
      case '-':
        return firstValue - secondValue
      case '×':
        return firstValue * secondValue
      case '÷':
        return firstValue / secondValue
      default:
        return secondValue
    }
  }

  const performCalculation = () => {
    const inputValue = parseFloat(display)

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation)
      setDisplay(String(newValue))
      setPreviousValue(null)
      setOperation(null)
      setWaitingForNewValue(true)
    }
  }

  const clearAll = () => {
    setDisplay('0')
    setPreviousValue(null)
    setOperation(null)
    setWaitingForNewValue(false)
  }

  const clearDisplay = () => {
    setDisplay('0')
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">Calculator</h1>
        
        <div className="bg-gray-900 text-white p-4 rounded-lg mb-4">
          <div className="text-right text-3xl font-mono">{display}</div>
        </div>
        
        <div className="grid grid-cols-4 gap-2">
          <button onClick={clearAll} className="col-span-2 bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded">
            AC
          </button>
          <button onClick={clearDisplay} className="bg-red-400 hover:bg-red-500 text-white font-bold py-3 px-4 rounded">
            C
          </button>
          <button onClick={() => inputOperation('÷')} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded">
            ÷
          </button>
          
          <button onClick={() => inputNumber('7')} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded">
            7
          </button>
          <button onClick={() => inputNumber('8')} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded">
            8
          </button>
          <button onClick={() => inputNumber('9')} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded">
            9
          </button>
          <button onClick={() => inputOperation('×')} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded">
            ×
          </button>
          
          <button onClick={() => inputNumber('4')} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded">
            4
          </button>
          <button onClick={() => inputNumber('5')} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded">
            5
          </button>
          <button onClick={() => inputNumber('6')} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded">
            6
          </button>
          <button onClick={() => inputOperation('-')} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded">
            -
          </button>
          
          <button onClick={() => inputNumber('1')} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded">
            1
          </button>
          <button onClick={() => inputNumber('2')} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded">
            2
          </button>
          <button onClick={() => inputNumber('3')} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded">
            3
          </button>
          <button onClick={() => inputOperation('+')} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded">
            +
          </button>
          
          <button onClick={() => inputNumber('0')} className="col-span-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded">
            0
          </button>
          <button onClick={() => inputNumber('.')} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded">
            .
          </button>
          <button onClick={performCalculation} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded">
            =
          </button>
        </div>
      </div>
    </div>
  )
}
