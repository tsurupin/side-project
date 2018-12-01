import * as React from 'react';
import { Query } from 'react-apollo';
import { PROJECT_SEARCH_FORM_QUERY } from '../../graphql/projects';
import { PROJECT_SEARCH_PARAMS_QUERY } from '../../graphql/projects';

interface Props {
  children: any;
}

const ProjectSearchFormQuery = (props: Props) => {
  const { children } = props;
  return (
    <Query
      query={PROJECT_SEARCH_FORM_QUERY}
      context={{ needAuth: true }}
      notifyOnNetworkStatusChange
    >
      {({ data, error, loading }) => {
        const formData = data;
        return (
          <Query query={PROJECT_SEARCH_PARAMS_QUERY}>
            {({ data }) => {
              console.log('search params', { ...data, ...formData });
              return children({
                data: { ...data, ...formData },
                loading,
                error,
              });
            }}
          </Query>
        );
      }}
    </Query>
  );
};

export default ProjectSearchFormQuery;
