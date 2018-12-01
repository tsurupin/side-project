import * as React from 'react';
import { Text, View } from 'react-native';
import { ErrorMessage, LoadingIndicator } from '../../../../components/Common';
import { ProjectList } from '../../../../components/Project/Common';
import { ProjectCore } from '../../../../interfaces';
import { EditableProjectListQuery } from '../../../../queries/projects';

interface Props {
  onPress: (string) => void;
}

const EditableProjectList: React.SFC<Props> = (props) => {
  const { onPress } = props;
  return (
    <View>
      <EditableProjectListQuery>
        {({ data, loading, error }) => {
          console.log(error, data);
          if (loading) { return <LoadingIndicator />; }
          if (error) { return <ErrorMessage {...error} />; }

          const projects: ProjectCore[] = data.editableProjects;

          return <ProjectList projects={projects} onPress={onPress} />;
        }}
      </EditableProjectListQuery>
    </View>
  );
};

export default EditableProjectList;
