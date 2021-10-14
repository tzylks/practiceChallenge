import './CampaignInfo.css'

import React from 'react'
import { connect } from 'react-redux'
import { makeGetCampaignById, makeGetCampaignContributionsSorted } from '../modules'

import DonateForm from './DonateForm'
import Contributions from './CampaignContributions'
import CampaignDetails from './CampaignDetails'

function CampaignInfo({ campaign, contributions }) {
  const divProps = {
    key: `campaign-${ campaign.id }`,
    className: "CampaignInfo"
  }

  return (
    <div {...divProps}>
      <CampaignDetails campaign={ campaign } />
      <Contributions contributions={ contributions } />
      <DonateForm campaign={ campaign } />
    </div>
  )
}

const mapStateToProps = function(state, props) {
  const { id } = props
  const getCampaignById = makeGetCampaignById(state)
  const getCampaignContributionsSorted = makeGetCampaignContributionsSorted(state)

  return {
    campaign: getCampaignById(id),
    contributions: getCampaignContributionsSorted(id)
  }
}

export default connect(mapStateToProps)(CampaignInfo)
