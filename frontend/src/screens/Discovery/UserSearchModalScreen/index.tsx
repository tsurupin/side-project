import * as React from 'react';
import { View } from 'react-native';
import { OccupationType, Genre, Skill, Location, MinimumOutput } from '../../../interfaces';
import { UserSearchFormQuery } from '../../../queries/users';
import { UpdateUserSearchParamsMutation } from '../../../mutations/users';
import SearchForm from './SearchForm';
import { LoadingIndicator, ErrorMessage } from '../../../components/Common';

type UserSearchParams = {
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

type UserSearchFormOutput = {
  data: {
    userSearchForm: {
      genres: Genre[];
      occupationTypes: OccupationType[];
    };
    userSearchParams: UserSearchParams;
  };
} & MinimumOutput;

type UpdateUserSearchOutput = {
  updateUserSearchParamsMutation: (input: { variables: UserSearchParams }) => void;
} & MinimumOutput;

class UserSearchFormScreen extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  private onSubmit = (searchParams: UserSearchParams, mutation: (input: { variables: UserSearchParams }) => void) => {
    mutation({ variables: searchParams });
    this.props.onSubmit(searchParams);
  };

  render() {
    return (
      <UserSearchFormQuery>
        {({ data, loading, error }: UserSearchFormOutput) => {
          if (loading) return <LoadingIndicator />;

          if (error) return <ErrorMessage {...error} />;
          const {
            userSearchForm: { genres, occupationTypes },
            userSearchParams
          } = data;

          return (
            <UpdateUserSearchParamsMutation>
              {({ updateUserSearchParamsMutation, error }: UpdateUserSearchOutput) => {
                if (error) {
                  console.log(error);
                  return <ErrorMessage {...error} />;
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
