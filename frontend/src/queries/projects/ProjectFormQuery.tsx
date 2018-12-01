import * as React from 'react';
import { Query } from 'react-apollo';
import { PROJECT_FORM_QUERY } from '../../graphql/projects';
interface Props {
  children: any;
}

const ProjectFormQuery = (props: Props) => {
  const { children } = props;
  return (
    <Query
      query={PROJECT_FORM_QUERY}
      context={{ needAuth: true }}
      notifyOnNetworkStatusChange
    >
      {({ data, error, loading }) => {
        return children({
          data,
          loading,
          error,
        });
      }}
    </Query>
  );
};

export default ProjectFormQuery;
