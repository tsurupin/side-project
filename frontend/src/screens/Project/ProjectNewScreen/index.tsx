import * as React from 'react';
import { View, ScrollView } from 'react-native';
import { ErrorMessage, LoadingIndicator } from '../../../components/Common';
import { EditForm } from '../../../components/Project/Common';
import { ProjectCreateParams, Genre, MinimumOutput } from '../../../interfaces';
import { ProjectFormQuery } from '../../../queries/projects';
import { CreateProjectMutation } from '../../../mutations/projects';
import { PROJECT_DETAILS_SCREEN } from '../../../constants/screens';
import { BACK_BUTTON } from '../../../constants/buttons';
import styles from './styles';

type Props = {
  navigator: any;
};

type DefaultProps = {
  genres: Genre[];
};

type ProjectFormOutput = {
  data: { projectForm: DefaultProps };
} & MinimumOutput;

type CreateProjectOutput = {
  createProjectMutation: (input: { variables: ProjectCreateParams }) => void;
  data: { createProject: { id: string } };
} & MinimumOutput;

class ProjectNewScreen extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  private handleSubmit = (
    variables: ProjectCreateParams,
    createProjectMutation: (input: { variables: ProjectCreateParams }) => void
  ) => {
    createProjectMutation({ variables });
  };

  render() {
    return (
      <ProjectFormQuery>
        {({ data, loading, error }: ProjectFormOutput) => {
          if (loading) return <LoadingIndicator />;
          if (error) return <ErrorMessage {...error} />;

          const projectFormData = data.projectForm;
          return (
            <View style={styles.container}>
              <ScrollView
                alwaysBounceVertical={true}
                showsVerticalScrollIndicator={false}
                style={styles.innerContainer}
              >
                <CreateProjectMutation>
                  {({ createProjectMutation, data, loading, error }: CreateProjectOutput) => {
                    if (loading) return <LoadingIndicator />;
                    if (error) return <ErrorMessage {...error} />;
                    if (data) {
                      this.props.navigator.dismissAllModals({
                        animationType: 'none'
                      });
                      this.props.navigator.push({
                        screen: PROJECT_DETAILS_SCREEN,
                        passProps: { id: data.createProject.id },
                        navigatorButtons: {
                          leftButtons: [
                            {
                              title: 'Back',
                              id: BACK_BUTTON
                            }
                          ]
                        }
                      });
                    }

                    return (
                      <EditForm
                        onSubmit={(projectCreateParams: ProjectCreateParams) =>
                          this.handleSubmit(projectCreateParams, createProjectMutation)
                        }
                        genres={projectFormData.genres}
                        loading={loading}
                        error={error}
                        navigator={this.props.navigator}
                      />
                    );
                  }}
                </CreateProjectMutation>
              </ScrollView>
            </View>
          );
        }}
      </ProjectFormQuery>
    );
  }
}

export default ProjectNewScreen;
