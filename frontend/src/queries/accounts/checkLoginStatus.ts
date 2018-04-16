import { graphql, NamedProps, QueryProps } from 'react-apollo';
import { LOGIN_STATUS_QUERY } from '../../graphql/accounts';

type Response = {
  logined: boolean
}
type InputProps = {};

const checkLoginStatus = graphql<Response, InputProps>(LOGIN_STATUS_QUERY,
  {name: 'loginStatus'}
);

export default checkLoginStatus;
