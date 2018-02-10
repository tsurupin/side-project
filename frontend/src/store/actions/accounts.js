import client from '../../../client';
import { signUpMutation } from 'mutations/accounts';
import { SIGN_UP_SUCCESS , SIGN_UP_FAILURE } from '../../constants/actions';

export const signUp = (prociderId, uid) => {
  return (dispatch, getState) => {
    client.mutation({
      query: signUpMutation,
      variables: {providerId, uid}
    }).then(resp => {
      if (resp.data) {
        dispatch(signUpSuccess(resp.data));
      }
    }).catch(err => {
      dispatch(signUpFailure(err));
    })
  }

}

const signUpSuccess = ({providerId, uid}) => {
  return {
    type: SIGN_UP_SUCCESS,
    payload: {providerId, uid}
  }
}

const signUpFailure = (error) => {
  return {
    type: SIGN_UP_FAILURE,
    payload: { error }
  }
}

// https://medium.com/netscape/how-to-integrate-graphql-with-redux-in-react-native-c1912bf33120
// https://codeburst.io/learning-graphql-with-firebase-part-3-34f8f5ee9a28
