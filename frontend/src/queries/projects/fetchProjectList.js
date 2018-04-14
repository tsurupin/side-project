// @flow
import { graphql } from "react-apollo";
import type { OperationComponent } from "react-apollo";
import FETCH_PROJECT_LIST from "../../graphql/projects/projectQuery.graphql";

type Genre = {
  id: number,
  name: string
};

type Response = {
  id: number,
  name: string,
  leadSentence: string,
  mainPhotoUrl: ?string.
  genre: Genre
};

type InputProps = {
  genreId: number,
  skillIds: ?Array<number>
};


const fetchProjectList: OperationComponent<Response, InputProps> = graphql(FETCH_PROJECT_LIST, {
  name: "fetchProjectList",
  options: props => ({
    variables: {
      genreId: props.genreId,
      skillIds: props.skillIds
    }
  })
});

export default fetchProjectList;
