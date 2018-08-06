import * as React from "react";
import { View, TouchableOpacity, Text, Button, Alert } from "react-native";
import { ErrorMessage, PhotosEditForm } from "../../../components/Commons";
import { EditForm } from "../../../components/Project/Commons";
import { ProjectFormQuery, ProjectDetailsQuery } from "../../../queries/projects";
import {
  ProjectDetails,
  ProjectEditParams,
  ProjectUploadParams
} from "../../../interfaces";
import { Photo } from "../../../components/Me/UserPhotoEditScreen";
import {
  EditProjectMutation,
  UploadProjectPhotoMutation,
  DeleteProjectPhotoMutation
} from "../../../mutations/projects";
import * as ImagePicker from "react-native-image-picker";
import ImageResizer from "react-native-image-resizer";
import { ReactNativeFile } from "@richeterre/apollo-upload-client";

import styles from "./styles";

type Props = {
  id: string;
  navigator: any;
};

class ProjectEditScreen extends React.Component<Props> {
  constructor(props) {
    super(props);
  }

  private handlePress = (mutation) => {
    ImagePicker.showImagePicker({}, async (response) => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        try {
          const uri = await ImageResizer.createResizedImage(
            response.uri,
            600,
            600,
            "JPEG",
            100
          );
          const photo = new ReactNativeFile({
            uri,
            type: "image/jpeg",
            name: "photo.jpg"
          });

          console.log(photo, mutation);
          const variables: ProjectUploadParams = { photo: photo, rank: 252 };

          console.log(variables);
          mutation({ variables });
        } catch (err) {
          console.log(err);
          return Alert.alert(
            "Unable to resize the photo",
            "Check the console for full the error message"
          );
        }
      }
    });
  };

  handlePressDeletion = (deleteProjectPhotoMutation, photoId: string) => {
    deleteProjectPhotoMutation({ variables: { photoId } });
  };

  handleSubmit = (variables: ProjectEditParams, editProjectMutation: any) => {
    editProjectMutation({ variables });
  };

  render() {
    const { id } = this.props;
    return (
      <ProjectFormQuery>
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
            
            const projectFormData = data.projectForm;
    
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

                  const project: ProjectDetails = data.project;
                  return (
                    <View>
                      <DeleteProjectPhotoMutation>
                        {({ deleteProjectPhotoMutation, data, loading, error }) => {
                          return (
                            <UploadProjectPhotoMutation>
                              {({ uploadProjectPhotoMutation, data, loading, error }) => {
                                console.log("upload project photo", data, loading, error);
                                return (
                                  <PhotosEditForm 
                                    photos={project.photos}
                                    onPressPhoto={(id: string) => this.handlePressDeletion(deleteProjectPhotoMutation, id)}
                                    onPressNewPhoto={() => this.handlePress(uploadProjectPhotoMutation)}
                                  />
                                );
                              }}
                          </UploadProjectPhotoMutation>
                          );
                        }}
                       </DeleteProjectPhotoMutation>; 
                      <EditProjectMutation>
                        {({ editProjectMutation, loading, error, data }) => {
                          if (data) {
                            this.props.navigator.dismissModal();
                            return <View />;
                          }
                          return (
                            <EditForm
                              project={project}
                              onSubmit={(projectEditParams: ProjectEditParams) =>
                                this.handleSubmit(
                                  projectEditParams,
                                  editProjectMutation
                                )
                              }
                              loading={loading}
                              genres={projectFormData.genres}
                              error={error}
                              navigator={this.props.navigator}
                            />
                          );
                        }}
                      </EditProjectMutation>
                    </View>
                  );
                }}
              </ProjectDetailsQuery>
            );
        }}
        </ProjectFormQuery>
        );
  }
}

export default ProjectEditScreen;
