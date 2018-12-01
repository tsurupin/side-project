import { USER_SEARCH_PARAMS_QUERY } from '../graphql/users';

const updateUserSearchParams = (_prev, { userSearchParams }, { cache }) => {
  const data = cache.readQuery({ query: USER_SEARCH_PARAMS_QUERY });

  for (const [k, v] of Object.entries(userSearchParams)) {
    if (k === 'location') {
      data.userSearchParams[k] = { ...data.userSearchParams[k], ...v };
    } else {
      data.userSearchParams[k] = v;
    }
  }
  cache.writeQuery({
    query: USER_SEARCH_PARAMS_QUERY,
    data: {
      userSearchParams: data.userSearchParams,
    },
  });

  return null;
};

export { updateUserSearchParams };
