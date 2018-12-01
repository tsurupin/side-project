import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { ErrorMessage, LoadingIndicator } from '../../../components/Common';
import { EditForm } from '../../../components/Project/Common';
import { BACK_BUTTON } from '../../../constants/buttons';
import { PROJECT_DETAILS_SCREEN } from '../../../constants/screens';
import { ProjectEditParams } from '../../../interfaces';
import { CreateProjectMutation } from '../../../mutations/projects';
import { ProjectFormQuery } from '../../../queries/projects';
import styles from './styles';

interface Props {
  navigator: any;
}

class ProjectNewScreen extends React.Component<Props> {
  constructor(props) {
    super(props);
  }

  public render() {
    return (
      <ProjectFormQuery>
        {({ data, loading, error }) => {
          if (loading) { return <LoadingIndicator />; }
          if (error) { return <ErrorMessage {...error} />; }

          const projectFormData = data.projectForm;
          return (
            <View style={styles.container}>
              <ScrollView
                alwaysBounceVertical={true}
                showsVerticalScrollIndicator={false}
                style={styles.innerContainer}
              >
                <CreateProjectMutation>
                  {({ createProjectMutation, data, loading, error }) => {
                    if (loading) { return <LoadingIndicator />; }
                    if (error) { return <ErrorMessage {...error} />; }
                    if (data) {
                      this.props.navigator.dismissAllModals({
                        animationType: 'none',
                      });
                      this.props.navigator.push({
                        screen: PROJECT_DETAILS_SCREEN,
                        passProps: { id: data.createProject.id },
                        navigatorButtons: {
                          leftButtons: [
                            {
                              title: 'Back',
                              id: BACK_BUTTON,
                            },
                          ],
                        },
                      });
                    }

                    return (
                      <EditForm
                        onSubmit={(projectEditParams: ProjectEditParams) =>
                          this.handleSubmit(
                            projectEditParams,
                            createProjectMutation,
                          )
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

  private handleSubmit = (
    variables: ProjectEditParams,
    createProjectMutation: any,
  ) => {
    createProjectMutation({ variables });
  }
}

export default ProjectNewScreen;
