import * as React from 'react';
import { Query } from 'react-apollo';
import { EDITABLE_PROJECT_LIST_QUERY } from '../../graphql/projects';

type Props = {
  children: any;
};

const EditableProjectListQuery = (props: Props) => {
  const { children } = props;
  return (
    <Query
      query={EDITABLE_PROJECT_LIST_QUERY}
      context={{ needAuth: true }}
      notifyOnNetworkStatusChange
    >
      {({ data, loading, error }) => children({ data, loading, error })}
    </Query>
  );
};

export default EditableProjectListQuery;
