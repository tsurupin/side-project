import { changeLoginStatus } from './accounts';
import { updateProjectSearchParams } from './projects';
import { updateUserSearchParams } from './users';

const resolvers = {
  Query: {},
  Mutation: {
    changeLoginStatus,
    updateUserSearchParams,
    updateProjectSearchParams,
  },
};

export default resolvers;
