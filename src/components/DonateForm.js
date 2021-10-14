import './DonateForm.css'

import React, { useState } from 'react'
import { connect } from 'react-redux'
import { getSessionUser, addContribution } from '../modules'

function DonateForm ({ campaign, user, addContribution }) {
	const [amount, setAmount] = useState('')
	const [message, setMessage] = useState('')
	const [error, setError] = useState(null)

	const amountInputProps = {
		className: 'Donate-amount',
		value: amount,
		placeholder: 'Amount',
		type: 'Number',
		onChange: ({ target: { value } }) => setAmount(value)
	}

	const messageInputProps = {
		className: 'Donate-message',
		value: message,
		placeholder: 'Message',
		onChange: ({ target: { value } }) => setMessage(value)
	}

	const buttonProps = {
		className: 'Donate-button',
		onClick: (event) => {
			if( amount === '' ){
				setError('Please enter an amount.')
			}else if(amount <= 0) {
				setError('Invalid donation amount.')
			}else if(amount > user.balance){
				setError('Insufficent funds.')
			}else{
				addContribution(amount, message, campaign.id)
				resetForm()
			}
		}
	}

	const resetForm = () => {
		setAmount('')
		setMessage('')
		setError(null)
	}

	const errorMessage = error && (
		<div className="Donate-error">{ error }</div>
	)

	return <div className="Donate-form">
		<h2>Donate to { campaign.name }</h2>
		<input { ...amountInputProps } />
		<input { ...messageInputProps } />
		{ errorMessage }
		<button { ...buttonProps }>Donate</button>
	</div>
}

const mapStateToProps = function(state) {
	return {
		user: getSessionUser(state),
		addContribution
	}
}

const mapDispatchToProps = {
  addContribution
}

export default connect(mapStateToProps, mapDispatchToProps)(DonateForm)
