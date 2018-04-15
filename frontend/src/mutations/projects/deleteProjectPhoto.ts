import { graphql, NamedProps, QueryProps } from 'react-apollo';
import * as DELETE_PROJECT_PHOTO from "../../graphql/projects/deleteProjectPhotoMutation.graphql";


type InputProps = {
  photoId: number
};

type Variables = {
  photoId: number
};


type Response = {};

const deleteProjectPhoto = graphql<InputProps, Response, Variables, Response>(DELETE_PROJECT_PHOTO, {
  name: "deleteProjectPhoto",
  options: props => ({
    variables: {
      photoId: props.photoId
    }
  }),
  props: ({deleteProjectPhoto}: NamedProps<{deleteProjectPhoto: QueryProps & Response}, InputProps>): Response => {
    return {};
  }
});

export default deleteProjectPhoto;
