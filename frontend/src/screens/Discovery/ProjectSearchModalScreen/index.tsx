import * as React from 'react';
import { Alert } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { Skill, City, Genre, GraphQLErrorMessage } from '../../../interfaces';
import { ProjectSearchFormQuery } from '../../../queries/projects';
import { UpdateProjectSearchParamsMutation } from '../../../mutations/projects';
import SearchForm from './SearchForm';

import { LoadingIndicator } from '../../../components/Common';
import { APPLY_BUTTON, CLOSE_BUTTON } from '../../../constants/buttons';

type ProjectSearchParams = {
  genreId: string | undefined;
  city: City | undefined;
  skills: Skill[];
};

type Props = {
  navigator: any;
  componentId: string;
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
  private form: any;
  constructor(props: Props) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  private navigationButtonPressed = ({ buttonId }: { buttonId: string }) => {
    switch (buttonId) {
      case APPLY_BUTTON:
        this.form.handleSubmit();
        Navigation.dismissModal(this.props.componentId);
        break;

      case CLOSE_BUTTON:
        Navigation.dismissModal(this.props.componentId);
        break;
    }
  };

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
            Alert.alert(error.message);
            return <View />;
          }

          const {
            projectSearchForm: { genres },
            projectSearchParams
          } = data;

          return (
            <UpdateProjectSearchParamsMutation>
              {({ updateProjectSearchParamsMutation, error }: UpdateProjectSearchOutput) => {
                if (error) {
                  Alert.alert(error.message);
                }

                return (
                  <SearchForm
                    {...projectSearchParams}
                    genres={genres}
                    navigator={this.props.navigator}
                    onSubmit={(searchParams: ProjectSearchParams) =>
                      this.onSubmit(searchParams, updateProjectSearchParamsMutation)
                    }
                    ref={(instance) => {
                      this.form = instance;
                    }}
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
