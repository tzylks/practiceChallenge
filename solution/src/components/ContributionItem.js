import './ContributionItem.css'

import React from 'react'
import Numeral from 'numeral'
import Moment from 'moment'
import { connect } from 'react-redux'

import { makeGetUserById } from '../modules'

function ContributionItem({ contribution, user }) {
  // If the user is null / undefined, skip this item...
  if (!user) {
    return null
  }

  const {
    amount,
    message,
    date
  } = contribution

  const {
    first_name,
    last_name,
    image
  } = user

  return (
    <div className="ContributionInfo">
      <img alt="User Icon" className="UserImage" src={ image } />
      <div className="ContributionInfo-user">
        <strong>{ first_name } { last_name }</strong>
        <div>{ Numeral(amount).format('$0,0.00') } donated</div>
        <em>{ message }</em>
        <div className="ContributionInfo-date">{ Moment(date).format('MMM DD, YYYY') }</div>
      </div>
    </div>
  )
}

const makeMapStateToProps = function(state, { contribution }) {
  const getUserById = makeGetUserById(state);
  return {
    user: getUserById(contribution.userId)
  }
}

export default connect(makeMapStateToProps)(ContributionItem)
