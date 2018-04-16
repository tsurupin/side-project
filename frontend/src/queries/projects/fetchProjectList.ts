import { graphql, NamedProps, QueryProps } from 'react-apollo';
import { PROJECTS_QUERY }from "../../graphql/projects";

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

type Variables = {
  genreId: number,
  skillIds: number[]
};



const fetchProjectList = graphql<InputProps, Response, Variables, Response>(PROJECTS_QUERY, {
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
