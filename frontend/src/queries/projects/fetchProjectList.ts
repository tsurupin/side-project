import { graphql, NamedProps, QueryProps } from 'react-apollo';
import FETCH_PROJECT_LIST from "../../graphql/projects/projectsQuery.graphql";

type Genre = {
  id: number,
  name: string
};

type Response = {
  id: number,
  name: string,
  leadSentence: string,
  mainPhotoUrl: string | null,
  genre: Genre
};

type InputProps = {
  genreId: number,
  skillIds: number[]
};


const fetchProjectList = graphql<Response, InputProps>(FETCH_PROJECT_LIST, {
  name: "fetchProjectList",
  options: props => ({
    variables: {
      genreId: props.genreId,
      skillIds: props.skillIds
    }
  }),
  props: ({fetchProjectList}: NamedProps<{fetchProjectList: QueryProps & Response}, InputProps>): Response => {
    return fetchProjectList;
  }
});

export default fetchProjectList;
