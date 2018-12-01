import * as React from 'react';
import { View } from 'react-native';
import { City, Genre, Skill } from '../../../interfaces';
import { UpdateProjectSearchParamsMutation } from '../../../mutations/projects';
import { ProjectSearchFormQuery } from '../../../queries/projects';
import SearchForm from './SearchForm';

import { ErrorMessage, LoadingIndicator } from '../../../components/Common';
import styles from './styles';

interface ProjectSearchParams {
  genreId: string | undefined;
  city: City | undefined;
  skills: Skill[];
}

interface Props {
  navigator: any;
  onSubmit: (searchParams: ProjectSearchParams) => void;
}

class ProjectSearchFormScreen extends React.Component<Props> {
  constructor(props) {
    super(props);
  }

  public render() {
    return (
      <ProjectSearchFormQuery>
        {({ data, loading, error }) => {
          if (loading) {
            return <LoadingIndicator />;
          }

          if (error) {
            return <ErrorMessage {...error} />;
          }

          const {
            projectSearchForm: { genres },
            projectSearchParams,
          } = data;

          console.log('current search', projectSearchParams);
          return (
            <UpdateProjectSearchParamsMutation>
              {({ updateProjectSearchParamsMutation, error }) => {
                if (error) {
                  return <ErrorMessage {...error} />;
                }

                return (
                  <SearchForm
                    {...projectSearchParams}
                    genres={genres}
                    navigator={this.props.navigator}
                    onSubmit={(searchParams: ProjectSearchParams) =>
                      this.onSubmit(
                        searchParams,
                        updateProjectSearchParamsMutation,
                      )
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

  private onSubmit = (
    searchParams: ProjectSearchParams,
    updateProjectSearchParamsMutation,
  ) => {
    console.log('OnSubmit', searchParams);
    updateProjectSearchParamsMutation({ variables: searchParams });
    this.props.onSubmit(searchParams);
  }
}

export default ProjectSearchFormScreen;
