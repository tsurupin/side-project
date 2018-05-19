import { graphql, NamedProps, QueryProps } from "react-apollo";
import { PROJECT_QUERY } from "../../graphql/projects";

type User = {
  id: number;
  displayName: string;
  mainPhotoUrl: string;
};

type Genre = {
  id: number;
  name: string;
};

type Skill = {
  id: number;
  name: string;
};

type Photo = {
  imageUrl: string;
};

type Response = {
  id: number;
  name: string;
  leadSentence: string;
  status: string;
  motivation: string | null;
  requirement: string | null;
  owner: User;
  genre: Genre;
  skills: Skill[];
  photos: Photo[];
};

type InputProps = {
  id: number;
};

type Variables = {
  id: number;
};

const fetchProjectDetail = graphql<InputProps, Response, Variables, Response>(
  PROJECT_QUERY,
  {
    name: "fetchProjectDetail",
    options: props => ({
      variables: {
        id: props.id
      }
    }),
    props: ({
      fetchProjectDetail
    }: NamedProps<
      { fetchProjectDetail: QueryProps & Response },
      InputProps
    >): Response => {
      return fetchProjectDetail;
    }
  }
);

export default fetchProjectDetail;
