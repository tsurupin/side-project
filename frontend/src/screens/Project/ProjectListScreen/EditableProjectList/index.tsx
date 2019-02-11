import * as React from 'react';
import { View, Alert } from 'react-native';
import { EditableProjectListQuery } from '../../../../queries/projects';
import { ProjectCore, MinimumOutput } from '../../../../interfaces';
import { ProjectList } from '../../../../components/Project/Common';
import { LoadingIndicator } from '../../../../components/Common';

type Props = {
  onPress: (id: string) => void;
};

type EditableProjectListOutput = {
  data: { editableProjects: ProjectCore[] };
} & MinimumOutput;

const EditableProjectList: React.SFC<Props> = (props) => {
  const { onPress } = props;
  return (
    <View>
      <EditableProjectListQuery>
        {({ data, loading, error }: EditableProjectListOutput) => {
          if (loading) return <LoadingIndicator />;
          if (error) {
            Alert.alert(error.message);
            return <View />;
          }
          const projects: ProjectCore[] = data.editableProjects;

          return <ProjectList projects={projects} onPress={onPress} />;
        }}
      </EditableProjectListQuery>
    </View>
  );
};

export default EditableProjectList;
