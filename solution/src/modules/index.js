import sampleData from './mock_data'

import { createSelector } from 'reselect'
import memoize from 'lodash.memoize'

const initialState = { ...sampleData }

export const MERGE_SESSION = 'app/MERGE_SESSION'
export const ADD_CONTRIBUTION = 'app/ADD_CONTRIBUTION'

//- Redux

export const app = (state = initialState, action) => {
	const { type, payload } = action

	switch (type) {
		case MERGE_SESSION: {
			const session = { ...state.session, ...payload }

			return { ...state, session }
		}

		case ADD_CONTRIBUTION: {
			const { user } = state.session
			const contributions = state.contributions

			const amount = formatAmount(payload.amount)
			const balance = user.balance - amount
			const date = (new Date()).toJSON()

			// Construct new contribution
			const contribution = {
				id:	contributions.length + 1,
				amount,
				campaignId: payload.campaignId,
				date,
				message: payload.message,
				userId: user.id
			}

			// Update user balance (deep copy)
			const session = Object.assign({}, state.session, {user: {...user, balance}})

			return {...state, session: {...state.session, ...session}, contributions: [...contributions, contribution]}
		}

		default: {
			return state
		}
	}
}

//- Utility Methods

function formatAmount(amount) {
	return parseFloat(Number(amount).toFixed(2))
}

function filterContributions(contributions, campaignId){
	return contributions.reduce((array, contribution) => {
		if (contribution.campaignId !== campaignId) {
			return array
		}

		return [...array, contribution]
	}, [])
}

function calculateContributionsTotal(contributions){
	return contributions.reduce((total, { amount }) => {
		return (total + amount)
	}, 0)
}

//- Actions

export const selectCampaignById = campaignId => {
	return {
		type: MERGE_SESSION,
		payload: { selectedCampaignId: campaignId }
	}
}

export const addContribution = (amount, message, campaignId) => {
	return {
		type: ADD_CONTRIBUTION,
		payload: {
			amount, message, campaignId
		}
	}
}

//- Selectors

// Session
export const getSelectedCampaignId = state => {
	return state.app.session.selectedCampaignId
}

export const getSessionUser = state => {
	return state.app.session.user
}

// Contributions
const getContributions = state => {
	return state.app.contributions
}

export const makeGetCampaignContributionsTotal = createSelector(
	getContributions,
	contributions => memoize(
		() => {
			console.log("Reselect.getCampaignContributionsTotal")
			return calculateContributionsTotal(contributions)
		}
	)
)

export const makeGetCampaignContributionsCount = createSelector(
	getContributions,
	contributions => memoize(
		() => {
			console.log("Reselect.getCampaignContributionsCount")
			return contributions.length
		}
	)
)

export const makeGetCampaignContributionsSorted = createSelector(
	getContributions,
	contributions => memoize(
		campaignId => {
			console.log("Reselect.getCampaignContributionsSorted", campaignId)
			return filterContributions(contributions, campaignId).sort((a, b) => {
				return (b.date > a.date) ? 1 : -1
			})
		}
	)
)

export const makeGetCampaignContributionsTotalById = createSelector(
	getContributions,
	contributions => memoize(
		campaignId => {
			console.log("Reselect.getCampaignContributionsTotalById", campaignId)
			return filterContributions(contributions, campaignId).reduce((total, { amount }) => {
				return (total + amount)
			}, 0)
		}
	)
)

// Campaigns
const getCampaigns = state => {
	return state.app.campaigns
}

export const makeGetCampaignsCount = createSelector(
	getCampaigns,
	campaigns => memoize(
		() => {
			console.log("Reselect.getCampaignsCount")
			return campaigns.length
		}
	)
)

export const makeGetCampaignsSorted = createSelector(
	getCampaigns,
	getContributions,
	(campaigns, contributions) => memoize(
		() => {
			console.log("Reselect.getCampaignsSorted")
			return campaigns.reduce((array, campaign) => {
				const filteredContributions = filterContributions(contributions, campaign.id)
				const total = calculateContributionsTotal(filteredContributions)
				const progress = total / campaign.goal
				return [...array, {...campaign, progress}]
			}, [])
			.sort((a, b) => {
				return (b.progress > a.progress) ? 1 : -1
			})
		}
	)
)

export const makeGetCampaignById = createSelector(
	getCampaigns,
	campaigns => memoize(
		campaignId => {
			console.log("Reselect.getCampaignById", campaignId)
			return campaigns.find(campaign => campaign.id === campaignId)
		}
	)
)

// Users
const getUsers = state => {
	return state.app.users
}

export const makeGetUsersCount = createSelector(
	getUsers,
	users => memoize(
		() => {
			console.log("Reselect.getUsersCount")
			return users.length
		}
	)
)

export const makeGetUserById = createSelector(
	getUsers,
	users => memoize(
		userId => {
			console.log("Reselect.getUserById", userId)
			return users.find(user => user.id === userId)
		}
	)
)
