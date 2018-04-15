import { graphql, NamedProps, QueryProps } from 'react-apollo';
import * as USER_QUERY from '../../graphql/users/userQuery.graphql';

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
  displayName: string | null,
  schoolName: string | null,
  companyName: string | null,
  introduction: string | null,
  status: string | null,
  areaName: string | null,
  genre: Genre | null,
  occupationType: OccupationType | null,
  skills: Skill[],
  photos: Photo[]
}

type InputProps = {
  id: number
};

type Variables = {
  id: number
};


const fetchUserDetail = graphql<InputProps, Response, Variables, Response>(USER_QUERY,{
  name: 'fetchUserDetail',
  options: props => ({
    variables: { id: props.id }
  }),
  props: ({fetchUserDetail}: NamedProps<{fetchUserDetail: QueryProps & Response}, InputProps>): Response => {
    return fetchUserDetail;
  }
});

export default fetchUserDetail;
