import './UserBalance.css'

import React from 'react'
import { connect } from 'react-redux'
import Numeral from 'numeral'

import { getSessionUser } from '../modules'

function UserBalance({user}) {
	return <div className="UserBalance">
		<div className="UserBalance-amount">{ Numeral(user.balance).format('$0,0.00') }</div>
		<label>Available</label>
	</div>
}


const mapStateToProps = function(state) {
  return {
    user: getSessionUser(state)
  }
}

export default connect(mapStateToProps)(UserBalance)
