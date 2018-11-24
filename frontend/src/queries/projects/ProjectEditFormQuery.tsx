import * as React from "react";
import { Query } from "react-apollo";
import { PROJECT_EDIT_FORM_QUERY } from "../../graphql/projects";

type Props = {
  variables: { id: string };
  children: any;
};


const ProjectEditFormQuery = (props: Props) => {
  const { variables, children } = props;
  return (
    <Query
      query={PROJECT_EDIT_FORM_QUERY}
      variables={variables}
      context={{ needAuth: true }}
      notifyOnNetworkStatusChange
    >
      {({ data, error, loading }) => {
        return children({
          data,
          loading,
          error
        });
      }}
    </Query>
  );
};

export default ProjectEditFormQuery;

