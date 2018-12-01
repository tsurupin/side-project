import * as React from 'react';
import { Query } from 'react-apollo';
import { PROJECT_LIST_QUERY } from '../../graphql/projects';
import { ProjectSearchSubmitParams } from '../../interfaces';

interface Props {
  variables: ProjectSearchSubmitParams;
  children: any;
}

const ProjectListQuery = (props: Props) => {
  const { variables, children } = props;
  return (
    <Query
      query={PROJECT_LIST_QUERY}
      variables={variables}
      context={{ needAuth: true }}
      notifyOnNetworkStatusChange
    >
      {({ data, loading, error }) => children({ data, loading, error })}
    </Query>
  );
};

export default ProjectListQuery;
