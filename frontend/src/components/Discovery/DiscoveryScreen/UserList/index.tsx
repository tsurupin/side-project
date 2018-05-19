import * as React from "react";
import { View, Text } from "react-native";
import UserCard from "../UserCard";
import styles from "./styles";

// type User = {
//     id: number,
//     displayName: string,
//     mainPhotoUrl: string,
//     leadSentence?: string
// }

// type User = {

// }

type Props = {
  users: any;
  onPressUserCard: (id: number) => void;
};

class UserList extends React.Component<Props, {}> {
  constructor(props) {
    super(props);
  }

  private renderUserCard = user => {
    return (
      <UserCard
        key={user.id}
        user={user}
        onPressUserCard={this.props.onPressUserCard}
      />
    );
  };

  render() {
    if (this.props.users.length == 0) {
      return (
        <View key={0}>
          <Text>No Users Found</Text>
        </View>
      );
    }
    return (
      <View>
        {this.props.users.map(user => {
          return this.renderUserCard(user);
        })}
      </View>
    );
  }
}

export default UserList;
