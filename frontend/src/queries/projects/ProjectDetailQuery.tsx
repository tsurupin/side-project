import * as React from 'react';
import { Query } from 'react-apollo';
import { PROJECT_DETAIL_QUERY } from '../../graphql/projects';

type Props = {
  variables: { id: string };
  children: any;
};

const ProjectDetailQuery = (props: Props) => {
  const { variables, children } = props;
  return (
    <Query query={PROJECT_DETAIL_QUERY} variables={variables} context={{ needAuth: true }} notifyOnNetworkStatusChange>
      {({ data, loading, error }) => children({ data, loading, error })}
    </Query>
  );
};

export default ProjectDetailQuery;
