import client from '../client';
import { signUp } from 'mutations/accounts';

export signUp = (prociderId, uid) => {
  client.mutation({
    query: signUp,
    
  })
}
export function fetchAds() {
	return (dispatch, getState) => {
		const state = getState();
		dispatch({ type: 'FETCH_ADS' });
		client.query({
			query: adsQuery,
			variables: { first: state.Filter.limit }
