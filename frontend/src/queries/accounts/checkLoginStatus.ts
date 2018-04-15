import { graphql, NamedProps, QueryProps } from 'react-apollo';
import * as LOGIN_STATUS_QUERY from '../../graphql/accounts/loginStatusQuery.graphql';

type Response = {
  logined: boolean
}
type InputProps = {};

const checkLoginStatus = graphql<Response, InputProps>(LOGIN_STATUS_QUERY,
  {name: 'loginStatus'}
);

export default checkLoginStatus;
