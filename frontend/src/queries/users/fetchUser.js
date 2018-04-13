import { graphql } from "react-apollo";
import type { OperationComponent } from "react-apollo";

import USER_QUERY from '../../graphql/accounts/userQuery.graphql';

type Genre = {
  id: string,
  name: string
}

type OccupationType = {
  id: string,
  name: string
}

type Skill = {
  id: string,
  name: string
}

type Photo = {
  imageUrl: string
}

type Response = {
  id: string,
  displayName?: string,
  schoolName?: string,
  companyName?: string,
  introduction?: string,
  status?: string,
  areaName?: string,
  genre?: Genre,
  occupationType?: OccupationType
  skills: Array<Skill>
  photos: Array<Photo>
}

type InputProps = {
  id: string
};

const fetchUserDetail: OperationComponent<Response, InputProps> = graphql(USER_QUERY,{
  name: 'fetchUserDetail',
  options: props => ({
    variables: { id: props.id }
  })
});

export default fetchUserDetail;
