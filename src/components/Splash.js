import './Splash.css'

import React from 'react'
import Numeral from 'numeral'
import { connect } from 'react-redux'

import {
  makeGetCampaignsCount,
  makeGetUsersCount,
  makeGetCampaignContributionsCount,
  makeGetCampaignContributionsTotal
} from '../modules'

function Splash({ campaignsCount, usersCount, contributionsCount, contributionsTotal }) {
  function formatCount(count) {
    return Numeral(count).format('0,0')
  }

  function formatTotal(total) {
    return Numeral(total).format('$0,0.00')
  }

  const divProps = {
    className: "Splash"
  }

  return (
    <div {...divProps}>
      <h1>Please select a campaign above to begin.</h1>
      <h2>We've helped raise <strong>{formatTotal(contributionsTotal)}!</strong></h2>
      <h3>
        <strong>{formatCount(usersCount)}</strong> people have donated{` `}
        <strong>{formatCount(contributionsCount)}</strong> times to{` `}
        <strong>{formatCount(campaignsCount)}</strong> campaigns.
      </h3>
    </div>
  )
}

const mapStateToProps = function(state, props) {
  const getCampaignsCount = makeGetCampaignsCount(state)
  const getUsersCount = makeGetUsersCount(state)
  const getCampaignContributionsCount = makeGetCampaignContributionsCount(state)
  const getCampaignContributionsTotal = makeGetCampaignContributionsTotal(state)

  return {
    campaignsCount: getCampaignsCount(),
    usersCount: getUsersCount(),
    contributionsTotal: getCampaignContributionsTotal(),
    contributionsCount: getCampaignContributionsCount()
  }
}

export default connect(mapStateToProps)(Splash)
