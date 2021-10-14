import './CampaignNavigation.css'

import React from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import { makeGetCampaignsSorted } from '../modules'

import CampaignItem from './CampaignItem'

function CampaignNavigation({ campaigns, selectedCampaignId }, props) {
  const renderCampaignItem = campaign => {
    const { id } = campaign

    const key = `campaign-${ id }`
    const active = (id === selectedCampaignId)

    const itemProps = {
      active, campaign
    }

    return (
        <Link key={key} to={`/${id}`}>
          <CampaignItem { ...itemProps } />
        </Link>
    )
  }

  return (
    <div className="Campaigns">
    { campaigns.map(renderCampaignItem) }
  </div>
  )
}

const mapStateToProps = function(state, props) {
  const { id } = props
  const getCampaignsSorted = makeGetCampaignsSorted(state)
	return {
		campaigns: getCampaignsSorted(),
		selectedCampaignId: id
	}
}

export default connect(mapStateToProps)(CampaignNavigation)
