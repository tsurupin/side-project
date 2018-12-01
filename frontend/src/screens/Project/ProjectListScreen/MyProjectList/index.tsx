import * as React from 'react';
import { View } from 'react-native';
import { ErrorMessage, LoadingIndicator } from '../../../../components/Common';
import { ProjectList } from '../../../../components/Project/Common';
import { ProjectCore } from '../../../../interfaces';
import { MyProjectListQuery } from '../../../../queries/projects';

interface Props {
  onPress: (string) => void;
}

const MyProjectList: React.SFC<Props> = (props) => {
  const { onPress } = props;
  return (
    <View>
      <MyProjectListQuery>
        {({ data, loading, error }) => {
          if (loading) { return <LoadingIndicator />; }
          if (error) { return <ErrorMessage {...error} />; }

          const projects: ProjectCore[] = data.myProjects;

          return <ProjectList projects={projects} onPress={onPress} />;
        }}
      </MyProjectListQuery>
    </View>
  );
};

export default MyProjectList;
