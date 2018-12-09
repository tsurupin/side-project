import { PROJECT_SEARCH_PARAMS_QUERY } from '../graphql/projects';
import { ProjectSearchParams } from '../interfaces';
type InputData = {
  projectSearchParams: ProjectSearchParams;
};

type CacheData = {
  cache: any;
};

const updateProjectSearchParams = (_: any, { projectSearchParams }: InputData, { cache }: CacheData) => {
  const data = cache.readQuery({ query: PROJECT_SEARCH_PARAMS_QUERY });

  for (const [k, v] of Object.entries(projectSearchParams)) {
    if (k === 'city') {
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

  return undefined;
};

export { updateProjectSearchParams };
