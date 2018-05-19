import * as React from "react";
import { Query } from "react-apollo";
import { SKILLS_QUERY } from "../../graphql/skills";

type Props = {
  variables: { name: string };
  children: any;
};

const SkillsQuery = (props: Props) => {
  const { variables, children } = props;
  return (
    <Query
      query={SKILLS_QUERY}
      variables={variables}
      skip={!variables.name}
      notifyOnNetworkStatusChange
    >
      {({ error, loading, data }) => {
        return children({ data, error, loading });
      }}
    </Query>
  );
};

export default SkillsQuery;
