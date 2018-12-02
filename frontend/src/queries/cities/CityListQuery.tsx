import * as React from 'react';
import { Query } from 'react-apollo';
import { CITY_LIST_QUERY } from '../../graphql/cities';

type Props = {
  variables: { name: string };
  children: any;
};

const CityListQuery = (props: Props) => {
  const { variables, children } = props;
  return (
    <Query
      query={CITY_LIST_QUERY}
      variables={variables}
      skip={!variables.name}
      context={{ needAuth: true }}
      notifyOnNetworkStatusChange
    >
      {({ error, loading, data }) => {
        return children({ data, error, loading });
      }}
    </Query>
  );
};

export default CityListQuery;
