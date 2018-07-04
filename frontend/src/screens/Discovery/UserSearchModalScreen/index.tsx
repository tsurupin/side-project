import * as React from "react";
import { View } from "react-native";
import {
  UserSearchParams,
  OccupationType,
  Genre,
  Skill,
  Location,
} from "../../../interfaces";
import { UserSearchFormQuery } from "../../../queries/users";
import { UpdateUserSearchParamsMutation } from "../../../mutations/users";
import SearchForm from "./SearchForm";

import styles from "./styles";

type UserSearchForm = {
  genres: Genre[];
  occupationTypes: OccupationType[];
  occupationTypeId: string | undefined;
  genreId: string | undefined;
  location: Location | undefined;
  isActive: boolean | undefined;
  skills: Skill[];
};
type Props = {
  navigator: any;
  onSubmit: (searchParams: UserSearchParams) => void;
};

class UserSearchFormScreen extends React.Component<Props> {
  constructor(props) {
    super(props);
  }

  private onSubmit = (
    searchParams: UserSearchParams,
    updateUserSearchParamsMutation
  ) => {
    updateUserSearchParamsMutation({ variables: searchParams });
    this.props.onSubmit(searchParams);
  };

  render() {
    return (
      <UserSearchFormQuery>
        {({ data, loading, error }) => {
          if (loading) {
            console.log("loading");
            return <View />;
          }

          if (error) {
            console.log(error);
            return <View />;
          }

          const userSearchForm: UserSearchForm = data.userSearchForm;
          <UpdateUserSearchParamsMutation>
            {({ updateUserSearchParamsMutation, error }) => {
              
              if (error) {
                console.log(error);
                return <View />;
              }

              return (
                <SearchForm
                  {...userSearchForm}
                  navigator={this.props.navigator}
                  onSubmit={(searchParams: UserSearchParams) => this.onSubmit(searchParams, updateUserSearchParamsMutation)}
                />
              );
            }}
          </UpdateUserSearchParamsMutation>;
        }}
      </UserSearchFormQuery>
    );
  }
}

export default UserSearchFormScreen;
