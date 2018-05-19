import { graphql, NamedProps, QueryProps } from "react-apollo";
import { MATCH_LIST_QUERY } from "../../graphql/matches";

type UserList = {
  displayName: string;
  mainPhotoUrl: string | null;
};

type Chat = {
  id: number;
  name: string;
};

type Response = {
  likedUserList: UserList[];
  chatList: Chat[];
};

const fetchMatchList = graphql<{}, Response, {}, Response>(MATCH_LIST_QUERY, {
  name: "fetchMatchList",
  props: ({
    fetchMatchList
  }: NamedProps<{ fetchMatchList: QueryProps & Response }, {}>): Response => {
    return fetchMatchList;
  }
});

export default fetchMatchList;
