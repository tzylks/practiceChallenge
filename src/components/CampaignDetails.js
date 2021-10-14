import React from 'react'
import Numeral from 'numeral'
import { connect } from 'react-redux'

import { makeGetCampaignContributionsTotalById } from '../modules'

import ProgressBar from './ProgressBar'

function CampaignDetails({ campaign, total }) {
	const {
		name,
		goal,
		image
	} = campaign

	return <div className="CampaignInfo-details">
        <div className="CampaignInfo-logo">
          <div className="Campaign-image" style={{backgroundImage: `url('${ image }')`}} />
        </div>
        <h3>{ name }</h3>
        <ProgressBar progress={ total / goal } />
        <div className="CampaignInfo-raised">{ Numeral(total).format('$0,0.00') } raised</div>
	</div>
}

const mapStateToProps = function(state, { campaign }) {
	const getCampaignContributionsTotalById = makeGetCampaignContributionsTotalById(state)

  return {
    total: getCampaignContributionsTotalById(campaign.id)
  }
}

export default connect(mapStateToProps)(CampaignDetails)
