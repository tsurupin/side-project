import { graphql, NamedProps, QueryProps } from 'react-apollo';
import { UPLOAD_USER_PHOTO_MUTATION } from "../../graphql/users";

type Response = {};
  
type InputProps = {
    photo: any,
    isMain: boolean,
    rank: number,
};

type Variables = {
    photo: any,
    isMain: boolean,
    rank: number,
};

const uploadUserPhoto = graphql<InputProps, Response, Variables, Response>(UPLOAD_USER_PHOTO_MUTATION,{
    name: 'uploadUserPhoto',
    options: ({photo, isMain, rank}) => ({
      variables: {
        photo,
        isMain,
        rank
       }
    }),
    props: ({uploadUserPhoto}: NamedProps<{ uploadUserPhoto: QueryProps & Response}, InputProps>): Response => {
      return {};
    },
  });
  
  export default uploadUserPhoto;
  