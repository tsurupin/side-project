import * as React from "react";
import { View, FlatList } from "react-native";
import UserListItem from "../UserListItem";
import { UserCore } from "../../../../interfaces";
import styles from './styles';

type Props = {
  users: UserCore[];
};

const renderItem = ({ item }) => {
  console.log(item);
  return <UserListItem user={item} />;
};
const UserList: React.SFC<Props> = (props) => {
  const { users } = props;
  return <FlatList data={users} renderItem={renderItem} />;
};

export default UserList;
