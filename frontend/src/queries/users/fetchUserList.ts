import { graphql, NamedProps, QueryProps } from 'react-apollo';
import { USERS_QUERY } from '../../graphql/users';

type Genre = {
  id: number,
  name: string
}

type OccupationType = {
  id: number,
  name: string
};

type User = {
  id: number,
  displayname: string,
  schoolName: string,
  companyName: string,
  introduction: string,
  areaName: string,
  genre: Genre,
  occupationType: OccupationType,
  mainPhotoUrl: string
};

type Response = {
  users: User[]
};

type InputProps = {
  occupationTypeId?: number,
  genreId?: number,
  distance?: number,
  isActive?: boolean,
  skillIds?: number[],
};

type Variables = {
  occupationTypeId?: number,
  genreId?: number,
  distance?: number,
  isActive?: boolean,
  skillIds?: number[],
};


const fetchUserList = graphql<InputProps, Response, Variables, Response>(USERS_QUERY,{
  name: 'fetchUserList',
  options: ({occupationTypeId, genreId, distance, isActive, skillIds}) => ({
    variables: { 
      occupationTypeId, 
      genreId, 
      distance, 
      isActive, 
      skillIds
    }
  }),
  props: ({fetchUserList}: NamedProps<{fetchUserList: QueryProps & Response}, InputProps>): Response => {
    return fetchUserList;
  }
});

export default fetchUserList;
