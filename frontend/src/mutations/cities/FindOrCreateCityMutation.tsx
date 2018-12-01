import * as React from 'react';
import { Mutation } from 'react-apollo';
import { FIND_OR_CREATE_CITY_MUTATION } from '../../graphql/cities';

interface Props {
  children: any;
}

const FindOrCreateCityMutation = (props: Props) => {
  const { children } = props;

  return (
    <Mutation
      mutation={FIND_OR_CREATE_CITY_MUTATION}
      context={{ needAuth: true }}
    >
      {(findOrCreateCityMutation, { loading, error, data }) => {
        return children({ findOrCreateCityMutation, loading, error, data });
      }}
    </Mutation>
  );
};

export default FindOrCreateCityMutation;
