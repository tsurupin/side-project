import client from '../../../client';
import { signUp } from 'mutations/accounts';
import { SIGN_UP_SUCCESS , SIGN_UP_FAILURE} from '../../constants';

export const signUp = (prociderId, uid) => {
  client.mutation({
    query: signUp,
    variables: {providerId, uid}
  }).then(resp => {
    if (resp.data) {
      dispatch(signUpSuccess(resp.data)
    }
  }).catch(err =>
    dispatch(signUpFailure(err))
  )
}

const signUpSuccess = ({providerId, uid}) => {
  return {
    type: SIGN_UP_SUCCESS,
    payload: {providerId, uid}
  }
}

const signUpFailure = (error) =>{
  return {
    type: SIGN_UP_FAILURE,
    payload: { error }
  }
}
