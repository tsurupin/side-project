import { changeLoginStatus } from "./accounts";
import { updateUserSearchParams } from "./users";
import { updateProjectSearchParams } from "./projects";

const resolvers = {
  Query: {},
  Mutation: {
    changeLoginStatus: () => console.log("change login coming"),
    updateUserSearchParams,
    updateProjectSearchParams
  }
};

export default resolvers;
