import * as React from "react";
import { Query } from "react-apollo";
import { PROJECT_SEARCH_FORM_QUERY } from "../../graphql/projects";

type Props = {
  children: any;
};

const ProjectSearchFormQuery = (props: Props) => {
  const { children } = props;
  return (
    <Query
      query={PROJECT_SEARCH_FORM_QUERY}
      context={{ needAuth: true }}
      notifyOnNetworkStatusChange
    >
      {({ data, loading, error }) => children({ data, loading, error })}
    </Query>
  );
};

export default ProjectSearchFormQuery;
