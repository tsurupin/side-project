import { graphql, NamedProps, QueryProps } from 'react-apollo';
import LOGOUT_MUTATION from '../../graphql/accounts/logoutMutation.graphql';


type Response = {};

type InputProps = {
  logined: boolean
};

const logout  = graphql<Response, InputProps>(LOGOUT_MUTATION, {
  name: 'logout',
  options: { variables: { logined: false }}
})

export default logout;
