import { graphql, NamedProps, QueryProps } from 'react-apollo';
import { LOGOUT_MUTATION } from '../../graphql/accounts';


type Response = {};

type InputProps = {
  logined: boolean
};

type Variables = {
  logined: boolean
};

const logout = graphql<InputProps, Response, Variables>(LOGOUT_MUTATION, {
  name: 'logout',
  options: { variables: { logined: false }}
})

export default logout;
