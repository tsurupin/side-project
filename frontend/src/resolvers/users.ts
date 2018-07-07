import { USER_SEARCH_PARAMS_QUERY } from "../graphql/users";

const updateUserSearchParams = (_prev, { userSearchParams }, { cache }) => {
  let data = cache.readQuery({ query: USER_SEARCH_PARAMS_QUERY });

  for (let [k, v] of Object.entries(userSearchParams)) {
    if (k === "location") {
      data.userSearchParams[k] = { ...data.userSearchParams[k], ...v };
    } else {
      data.userSearchParams[k] = v;
    }
  }
  cache.writeQuery({
    query: USER_SEARCH_PARAMS_QUERY,
    data: {
      userSearchParams: data.userSearchParams
    }
  });

  return null;
};

export { updateUserSearchParams };
