import { USER_SEARCH_PARAMS_QUERY } from '../graphql/users';
import { UserSearchParams } from '../interfaces';
type InputData = {
  userSearchParams: UserSearchParams;
};

type CacheData = {
  cache: any;
};

const updateUserSearchParams = (_, { userSearchParams }: InputData, { cache }: CacheData) => {
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
      userSearchParams: data.userSearchParams
    }
  });

  return undefined;
};

export { updateUserSearchParams };
