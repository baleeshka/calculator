import React, { useState } from 'react'
import './Calculator.css' // Импорт стилей

const Calculator = () => {
	const [expression, setExpression] = useState('')
	const [showResult, setShowResult] = useState(false)

	const calculateResult = () => {
		const operands = expression.split(/[-+]/)
		const operators = expression.split(/\d+/).filter(Boolean)

		let calculatedResult = parseInt(operands[0], 10)

		for (let i = 1; i < operands.length; i++) {
			const operand = parseInt(operands[i], 10)
			const operator = operators[i - 1]

			if (operator === '+') {
				calculatedResult += operand
			} else if (operator === '-') {
				calculatedResult -= operand
			}
		}

		setExpression(calculatedResult.toString())
		setShowResult(true)
	}

	const handleButtonClick = value => {
		if (value === '=') {
			calculateResult()
		} else if (value === 'C') {
			setExpression('')
			setShowResult(false)
		} else if (value === '+' || value === '-') {
			setShowResult(false)
			setExpression(prevExpression => prevExpression + value)
		} else {
			if (showResult) {
				setExpression(value)
				setShowResult(false)
			} else {
				setExpression(prevExpression => prevExpression + value)
			}
		}
	}

	const buttons = [
		'7',
		'8',
		'9',
		'+',
		'4',
		'5',
		'6',
		'-',
		'1',
		'2',
		'3',
		'=',
		'0',
		'C',
	]

	return (
		<div>
			<input
				type='text'
				value={expression}
				readOnly
				className={`expression-input ${showResult ? 'result' : ''}`}
			/>
			<br />
			<div className='buttons-container'>
				{buttons.map((button, index) => (
					<button
						key={index}
						onClick={() => handleButtonClick(button)}
						className='button'
					>
						{button}
					</button>
				))}
			</div>
		</div>
	)
}

export default Calculator
