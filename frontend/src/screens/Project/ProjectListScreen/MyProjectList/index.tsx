import * as React from 'react';
import { View } from 'react-native';
import { MyProjectListQuery } from '../../../../queries/projects';
import { ProjectCore, MinimumOutput } from '../../../../interfaces';
import { ProjectList } from '../../../../components/Project/Common';
import { LoadingIndicator, ErrorMessage } from '../../../../components/Common';

type Props = {
  onPress: (id: string) => void;
};

type MyProjectOutput = {
  data: { myProjects: ProjectCore[] };
} & MinimumOutput;

const MyProjectList: React.SFC<Props> = (props) => {
  const { onPress } = props;
  return (
    <View>
      <MyProjectListQuery>
        {({ data, loading, error }: MyProjectOutput) => {
          if (loading) return <LoadingIndicator />;
          if (error) return <ErrorMessage {...error} />;

          const projects: ProjectCore[] = data.myProjects;

          return <ProjectList projects={projects} onPress={onPress} />;
        }}
      </MyProjectListQuery>
    </View>
  );
};

export default MyProjectList;
