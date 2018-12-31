import * as React from 'react';
import { Navigation } from 'react-native-navigation';
import { Skill, City, Genre, GraphQLErrorMessage } from '../../../interfaces';
import { ProjectSearchFormQuery } from '../../../queries/projects';
import { UpdateProjectSearchParamsMutation } from '../../../mutations/projects';
import SearchForm from './SearchForm';

import { ErrorMessage, LoadingIndicator } from '../../../components/Common';

type ProjectSearchParams = {
  genreId: string | undefined;
  city: City | undefined;
  skills: Skill[];
};

type Props = {
  navigator: any;
  onSubmit: (searchParams: ProjectSearchParams) => void;
};

type ProjectSearchFormOutput = {
  loading: boolean;
  error: GraphQLErrorMessage | undefined;
  data: {
    projectSearchForm: { genres: Genre[] };
    projectSearchParams: ProjectSearchParams;
  };
};

type UpdateProjectSearchOutput = {
  error: GraphQLErrorMessage | undefined;
  updateProjectSearchParamsMutation: (input: { variables: ProjectSearchParams }) => void;
};

class ProjectSearchFormScreen extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  private onSubmit = (
    searchParams: ProjectSearchParams,
    mutation: (input: { variables: ProjectSearchParams }) => void
  ) => {
    mutation({ variables: searchParams });
    this.props.onSubmit(searchParams);
  };

  render() {
    return (
      <ProjectSearchFormQuery>
        {({ data, loading, error }: ProjectSearchFormOutput) => {
          if (loading) {
            return <LoadingIndicator />;
          }

          if (error) {
            return <ErrorMessage {...error} />;
          }

          const {
            projectSearchForm: { genres },
            projectSearchParams
          } = data;

          return (
            <UpdateProjectSearchParamsMutation>
              {({ updateProjectSearchParamsMutation, error }: UpdateProjectSearchOutput) => {
                if (error) {
                  return <ErrorMessage {...error} />;
                }

                return (
                  <SearchForm
                    {...projectSearchParams}
                    genres={genres}
                    navigator={this.props.navigator}
                    onSubmit={(searchParams: ProjectSearchParams) =>
                      this.onSubmit(searchParams, updateProjectSearchParamsMutation)
                    }
                  />
                );
              }}
            </UpdateProjectSearchParamsMutation>
          );
        }}
      </ProjectSearchFormQuery>
    );
  }
}

export default ProjectSearchFormScreen;
