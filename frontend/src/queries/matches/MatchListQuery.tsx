import * as React from "react";
import { Query } from "react-apollo";
import { MATCH_LIST_QUERY } from "../../graphql/matches";

type Props = {
  children: any;
};

const MatchListQuery = (props: Props) => {
  const { children } = props;

  return (
    <Query
      query={MATCH_LIST_QUERY}
      context={{ needAuth: true }}
      notifyOnNetworkStatusChange
    >
      {({ error, loading, data }) => {
        return children({ data, error, loading });
      }}
    </Query>
  );
};

export default MatchListQuery;
