import './CampaignItem.css'

import React from 'react'
import ClassNames from 'classnames'
import { connect } from 'react-redux'

import ProgressBar from './ProgressBar'
import { makeGetCampaignContributionsTotalById } from '../modules'

function CampaignItem({ campaign, total, active, onClick }) {
  const className = ClassNames('Campaign', { active })
  const divProps = { className, onClick }

  const {
    name,
    goal,
    image
  } = campaign

  return <div {...divProps}>
    <div className="Campaign-logo">
      <div className="Campaign-image" style={{backgroundImage: `url('${ image }')`}} />
    </div>
    <div className="Campaign-name">{ name }</div>
    <div style={{flex: 1}} />
    <ProgressBar progress={ total / goal } />
  </div>
}

const mapStateToProps = function(state, { campaign }) {
  const getCampaignContributionsTotalById = makeGetCampaignContributionsTotalById(state)

  return {
    total: getCampaignContributionsTotalById(campaign.id)
  }
}

export default connect(mapStateToProps)(CampaignItem)
