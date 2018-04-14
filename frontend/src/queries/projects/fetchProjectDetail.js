// @flow
import { graphql } from "react-apollo";
import type { OperationComponent } from "react-apollo";
import FETCH_PROJECT_DETAIL from "../../graphql/projects/projectQuery.graphql";


type User = {
  id: number,
  displayName: string,
  mainPhotoUrl: string
};

type Genre = {
  id: number,
  name: string
};

type Skill = {
  id: number,
  name: string
};

type Photo = {
  imageUrl: string
};

type Response = {
  id: number,
  name: string,
  leadSentence: string,
  status: string,
  motivation: ?string,
  requirement: ?string,
  owner: User,
  genre: Genre,
  skills: Array<Skill>,
  photos: Array<Photo>
};

type InputProps = {
  id: number
};


const fetchProjectDetail: OperationComponent<Response, InputProps> = graphql(FETCH_PROJECT_DETAIL, {
  name: "fetchProjectDetail",
  options: props => ({
    variables: {
      id: props.id
    }
  })
});

export default fetchProjectDetail;
