// @flow
import { graphql } from "react-apollo";
import type { OperationComponent } from "react-apollo";

import USER_QUERY from '../../graphql/users/userQuery.graphql';

type Genre = {
  id: number,
  name: string
}

type OccupationType = {
  id: number,
  name: string
}

type Skill = {
  id: number,
  name: string
}

type Photo = {
  imageUrl: string
}

type Response = {
  id: number,
  displayName: ?string,
  schoolName: ?string,
  companyName: ?string,
  introduction: ?string,
  status: ?string,
  areaName: ?string,
  genre: ?Genre,
  occupationType: ?OccupationType,
  skills: ?Array<Skill>,
  photos: ?Array<Photo>
}

type InputProps = {
  id: number
};

const fetchUserDetail: OperationComponent<Response, InputProps> = graphql(USER_QUERY,{
  name: 'fetchUserDetail',
  options: props => ({
    variables: { id: props.id }
  })
});

export default fetchUserDetail;
