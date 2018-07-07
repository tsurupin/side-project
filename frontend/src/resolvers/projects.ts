import { PROJECT_SEARCH_PARAMS_QUERY } from "../graphql/projects";

const updateProjectSearchParams =  (_prev, { projectSearchParams }, { cache }) => {
  let data = cache.readQuery({ query: PROJECT_SEARCH_PARAMS_QUERY });
 
  for (let [k, v] of Object.entries(projectSearchParams)) {
    if (k === "city") {
  
      data.projectSearchParams[k] = {
        ...data.projectSearchParams[k],
        ...v
      };
    } else {
      data.projectSearchParams[k] = v;
    }
  }
  cache.writeQuery({
    query: PROJECT_SEARCH_PARAMS_QUERY,
    data: {
      projectSearchParams: data.projectSearchParams
    }
  });

  return null;
}

export {
  updateProjectSearchParams
}