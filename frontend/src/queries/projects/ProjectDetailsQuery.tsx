import * as React from 'react';
import { Query } from 'react-apollo';
import { PROJECT_DETAILS_QUERY } from '../../graphql/projects';
import { ProjectSearchParams } from '../../interfaces';

type Props = {
  variables: { id: string };
  children: any;
};

const ProjectDetailsQuery = (props: Props) => {
  const { variables, children } = props;
  return (
    <Query query={PROJECT_DETAILS_QUERY} variables={variables} context={{ needAuth: true }} notifyOnNetworkStatusChange>
      {({ data, loading, error }) => children({ data, loading, error })}
    </Query>
  );
};

export default ProjectDetailsQuery;
