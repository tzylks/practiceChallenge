import './CampaignContributions.css'

import React from 'react'

import ContributionItem from './ContributionItem';

function Contributions({ contributions }) {
  const renderContribution = contribution => {
    const {
      id
    } = contribution

    const key = `contribution-${ id }`

    const itemProps = {
      key, contribution
    }

    return (
      <ContributionItem {...itemProps} />
    )
  }

  return (
    <div className="CampaignInfo-contributions">
      { contributions.map(renderContribution) }
    </div>
  )
}

export default Contributions
