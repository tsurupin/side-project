import { graphql, NamedProps, QueryProps } from 'react-apollo';
import { LOGIN_MUTATION } from '../../graphql/accounts';

type Response = {}
type InputProps = {logined: boolean};

const login  = graphql<Response, InputProps>(LOGIN_MUTATION, {
  name: 'login',
  options: { variables: { logined: true }}
})

export default login;
