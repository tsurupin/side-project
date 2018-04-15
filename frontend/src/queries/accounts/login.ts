import { graphql, NamedProps, QueryProps } from 'react-apollo';
import * as LOGIN_MUTATION from '../../graphql/accounts/loginMutation.graphql';

type Response = {}
type InputProps = {logined: boolean};

const login  = graphql<Response, InputProps>(LOGIN_MUTATION, {
  name: 'login',
  options: { variables: { logined: true }}
})

export default login;
