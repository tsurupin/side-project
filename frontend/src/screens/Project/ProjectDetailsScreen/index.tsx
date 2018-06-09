import * as React from "react";
import { View, TouchableOpacity, Text, Button } from "react-native";
import { ProjectDetailsQuery } from "../../../queries/projects";

import styles from "./styles";

type Props = {
  id: string;
  navigator: any;
};

type State = {};
// ADD action sheet when clicking right nav buttons
// edit(author), withdrawlike
// add like button for newcomer
class ProjectDetailsScreen extends React.Component<Props, State> {
  
  constructor(props) {
    super(props);
  }
  render() {
    const { id } = this.props;
    return (
      <ProjectDetailsQuery variables={{ id }}>
        {({ data, loading, error }) => {
          console.log(error);
          if (loading)
            return (
              <View>
                <Text> Text</Text>
              </View>
            );
          if (error)
            return (
              <View>
                <Text> Error</Text>
              </View>
            );

          const { projectDetails } = data;
          return <View><Text>{projectDetails.id}</Text></View>;
        }}
      </ProjectDetailsQuery>
    );
  }
}

export default ProjectDetailsScreen;
