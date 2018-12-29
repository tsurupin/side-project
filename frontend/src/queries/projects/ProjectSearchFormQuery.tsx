import * as React from 'react';
import { Query } from 'react-apollo';
import { PROJECT_SEARCH_FORM_QUERY, PROJECT_SEARCH_PARAMS_QUERY } from '../../graphql/projects';

type Props = {
  children: any;
};

const ProjectSearchFormQuery = (props: Props) => {
  const { children } = props;
  return (
    <Query query={PROJECT_SEARCH_FORM_QUERY} context={{ needAuth: true }} notifyOnNetworkStatusChange>
      {({ data, error, loading }) => {
        const formData = data;
        return (
          <Query query={PROJECT_SEARCH_PARAMS_QUERY}>
            {({ data }) => {
              return children({
                data: { ...data, ...formData },
                loading,
                error
              });
            }}
          </Query>
        );
      }}
    </Query>
  );
};

export default ProjectSearchFormQuery;
