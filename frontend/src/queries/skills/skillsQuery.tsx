import * as React from 'react';
import { Query } from 'react-apollo';
import { SKILLS_QUERY } from '../../graphql/skills';

interface Props {
  variables: { name: string };
  children: any;
}

const SkillsQuery = (props: Props) => {
  const { variables, children } = props;
  return (
    <Query
      query={SKILLS_QUERY}
      variables={variables}
      skip={!variables.name}
      context={{ needAuth: true }}
      notifyOnNetworkStatusChange
    >
      {({ error, loading, data }) => {
        return children({ data, error, loading });
      }}
    </Query>
  );
};

export default SkillsQuery;
