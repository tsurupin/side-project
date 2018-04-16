import { graphql, NamedProps, QueryProps } from 'react-apollo';
import { DELTE_PROJECT_PHOTO_MUTATION } from '../../graphql/projects';


type InputProps = {
  photoId: number
};

type Variables = {
  photoId: number
};


type Response = {};

const deleteProjectPhoto = graphql<InputProps, Response, Variables, Response>(DELTE_PROJECT_PHOTO_MUTATION, {
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
