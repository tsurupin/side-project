import * as React from 'react';
import { View } from 'react-native';
import { OccupationType, Genre, Skill, Location } from '../../../interfaces';
import { UserSearchFormQuery } from '../../../queries/users';
import { UpdateUserSearchParamsMutation } from '../../../mutations/users';
import SearchForm from './SearchForm';

import styles from './styles';

type UserSearchParams = {
  occupationTypeId: string | undefined;
  genreId: string | undefined;
  location: Location | undefined;
  isActive: boolean;
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

  private onSubmit = (searchParams: UserSearchParams, updateUserSearchParamsMutation) => {
    console.log('OnSubmit', searchParams);
    updateUserSearchParamsMutation({ variables: searchParams });
    this.props.onSubmit(searchParams);
  }

  render() {
    return (
      <UserSearchFormQuery>
        {({ data, loading, error }) => {
          if (loading) {
            console.log('loading');
            return <View />;
          }

          if (error) {
            console.log(error);
            return <View />;
          }

          const {
            userSearchForm: { genres, occupationTypes },
            userSearchParams
          } = data;

          return (
            <UpdateUserSearchParamsMutation>
              {({ updateUserSearchParamsMutation, error }) => {
                if (error) {
                  console.log(error);
                  return <View />;
                }

                return (
                  <SearchForm
                    {...userSearchParams}
                    genres={genres}
                    occupationTypes={occupationTypes}
                    navigator={this.props.navigator}
                    onSubmit={(searchParams: UserSearchParams) =>
                      this.onSubmit(searchParams, updateUserSearchParamsMutation)
                    }
                  />
                );
              }}
            </UpdateUserSearchParamsMutation>
          );
        }}
      </UserSearchFormQuery>
    );
  }
}

export default UserSearchFormScreen;
