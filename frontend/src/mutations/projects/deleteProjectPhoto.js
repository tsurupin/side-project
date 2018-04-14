// @flow
import { graphql } from "react-apollo";
import type { OperationComponent } from "react-apollo";
import DELETE_PROJECT_PHOTO from "../../graphql/projects/deleteProjectPhotoMutation.graphql";


type InputProps = {
  photoId: number
};

const deleteProjectPhoto: OperationComponent<null, InputProps> = graphql(DELETE_PROJECT_PHOTO, {
  name: "deleteProjectPhoto",
  options: props => ({
    variables: {
      photoId: props.photoId
    }
  })
});

export default deleteProjectPhoto;
