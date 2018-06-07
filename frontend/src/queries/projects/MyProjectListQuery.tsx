import * as React from "react";
import { Query } from "react-apollo";
import { PROJECT_LIST_QUERY } from "../../graphql/projects";

type Props = {
   children: any;
};

const ProjectListQuery = (props: Props) => {
  const { children } = props;
  return (
    <Query
      query={PROJECT_LIST_QUERY}
      context={{ needAuth: true }}
      notifyOnNetworkStatusChange
    >
      {({ data, loading, error }) => children({ data, loading, error })}
    </Query>
  );
};

export default ProjectListQuery;
