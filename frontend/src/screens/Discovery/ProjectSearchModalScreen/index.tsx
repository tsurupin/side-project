import * as React from "react";
import { View } from "react-native";
import { Genre, Skill, City } from "../../../interfaces";
import { ProjectSearchFormQuery } from "../../../queries/projects";
import { UpdateProjectSearchParamsMutation } from "../../../mutations/projects";
import SearchForm from "./SearchForm";

import styles from "./styles";

type ProjectSearchParams = {
  genreId: string | undefined;
  city: City | undefined;
  skills: Skill[];
};

type Props = {
  navigator: any;
  onSubmit: (searchParams: ProjectSearchParams) => void;
};

class ProjectSearchFormScreen extends React.Component<Props> {
  constructor(props) {
    super(props);
  }

  private onSubmit = (
    searchParams: ProjectSearchParams,
    updateProjectSearchParamsMutation
  ) => {
    console.log("OnSubmit", searchParams);
    updateProjectSearchParamsMutation({ variables: searchParams });
    this.props.onSubmit(searchParams);
  };

  render() {
    return (
      <ProjectSearchFormQuery>
        {({ data, loading, error }) => {
          if (loading) {
            console.log("loading");
            return <View />;
          }

          if (error) {
            console.log(error);
            return <View />;
          }

          const { projectSearchForm: {genres}, projectSearchParams} = data;


          console.log("current search", projectSearchParams);
          return (
            <UpdateProjectSearchParamsMutation>
              {({ updateProjectSearchParamsMutation, error }) => {
                if (error) {
                  console.log(error);
                  return <View />;
                }

                return (
                  <SearchForm
                    {...projectSearchParams}
                    genres={genres}
                    navigator={this.props.navigator}
                    onSubmit={(searchParams: ProjectSearchParams) =>
                      this.onSubmit(
                        searchParams,
                        updateProjectSearchParamsMutation
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
}

export default ProjectSearchFormScreen;
