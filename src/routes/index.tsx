import { createFileRoute } from '@tanstack/react-router'
 import { useState } from 'react'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
   const [display, setDisplay] = useState('0')
   const [previousValue, setPreviousValue] = useState<number | null>(null)
   const [operation, setOperation] = useState<string | null>(null)
   const [waitingForOperand, setWaitingForOperand] = useState(false)

   const inputNumber = (num: string) => {
     if (waitingForOperand) {
       setDisplay(String(num))
       setWaitingForOperand(false)
     } else {
       setDisplay(display === '0' ? String(num) : display + num)
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

     setWaitingForOperand(true)
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
         return secondValue !== 0 ? firstValue / secondValue : 0
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
       setWaitingForOperand(true)
     }
   }

   const allClear = () => {
     setDisplay('0')
     setPreviousValue(null)
     setOperation(null)
     setWaitingForOperand(false)
   }

   const clearEntry = () => {
     setDisplay('0')
   }

  return (
     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
       <div className="bg-gray-800 rounded-lg shadow-2xl p-6 w-full max-w-xs">
         <div className="mb-4">
           <input
             type="text"
             value={display}
             readOnly
             className="w-full text-right text-white bg-gray-900 border-0 p-4 text-2xl rounded focus:outline-none"
           />
         </div>
         
         <div className="grid grid-cols-4 gap-2">
           <button
             onClick={allClear}
             className="col-span-2 bg-red-600 hover:bg-red-700 text-white p-4 rounded text-lg font-semibold"
           >
             AC
           </button>
           <button
             onClick={clearEntry}
             className="bg-red-600 hover:bg-red-700 text-white p-4 rounded text-lg font-semibold"
           >
             CE
           </button>
           <button
             onClick={() => inputOperation('÷')}
             className="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded text-lg font-semibold"
           >
             ÷
           </button>
           
           <button
             onClick={() => inputNumber('7')}
             className="bg-gray-600 hover:bg-gray-700 text-white p-4 rounded text-lg font-semibold"
           >
             7
           </button>
           <button
             onClick={() => inputNumber('8')}
             className="bg-gray-600 hover:bg-gray-700 text-white p-4 rounded text-lg font-semibold"
           >
             8
           </button>
           <button
             onClick={() => inputNumber('9')}
             className="bg-gray-600 hover:bg-gray-700 text-white p-4 rounded text-lg font-semibold"
           >
             9
           </button>
           <button
             onClick={() => inputOperation('×')}
             className="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded text-lg font-semibold"
           >
             ×
           </button>
           
           <button
             onClick={() => inputNumber('4')}
             className="bg-gray-600 hover:bg-gray-700 text-white p-4 rounded text-lg font-semibold"
           >
             4
           </button>
           <button
             onClick={() => inputNumber('5')}
             className="bg-gray-600 hover:bg-gray-700 text-white p-4 rounded text-lg font-semibold"
           >
             5
           </button>
           <button
             onClick={() => inputNumber('6')}
             className="bg-gray-600 hover:bg-gray-700 text-white p-4 rounded text-lg font-semibold"
           >
             6
           </button>
           <button
             onClick={() => inputOperation('-')}
             className="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded text-lg font-semibold"
           >
             -
           </button>
           
           <button
             onClick={() => inputNumber('1')}
             className="bg-gray-600 hover:bg-gray-700 text-white p-4 rounded text-lg font-semibold"
           >
             1
           </button>
           <button
             onClick={() => inputNumber('2')}
             className="bg-gray-600 hover:bg-gray-700 text-white p-4 rounded text-lg font-semibold"
           >
             2
           </button>
           <button
             onClick={() => inputNumber('3')}
             className="bg-gray-600 hover:bg-gray-700 text-white p-4 rounded text-lg font-semibold"
           >
             3
           </button>
           <button
             onClick={() => inputOperation('+')}
             className="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded text-lg font-semibold"
           >
             +
           </button>
           
           <button
             onClick={() => inputNumber('0')}
             className="col-span-2 bg-gray-600 hover:bg-gray-700 text-white p-4 rounded text-lg font-semibold"
           >
             0
           </button>
           <button
             onClick={() => {
               if (display.indexOf('.') === -1) {
                 setDisplay(display + '.')
               }
             }}
             className="bg-gray-600 hover:bg-gray-700 text-white p-4 rounded text-lg font-semibold"
           >
             .
           </button>
           <button
             onClick={performCalculation}
             className="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded text-lg font-semibold"
           >
             =
           </button>
         </div>
       </div>
    </div>
  )
}
