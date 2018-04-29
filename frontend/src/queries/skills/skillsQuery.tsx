import * as React from 'react';
import { Query } from 'react-apollo';
import { SKILLS_QUERY } from "../../graphql/skills";

const SkillsQuery = (variables: {name: string}, parentProps, ChildComponent) => (
    <Query 
      query={SKILLS_QUERY}
      variables={variables}
      skip={!variables.name}
      notifyOnNetworkStatusChange
    >
      {(data) => {
          return <ChildComponent data={data} parentProps={parentProps} /> 
      }}
    </Query>
);

export default SkillsQuery;
