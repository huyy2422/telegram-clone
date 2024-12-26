import { useState } from "react";
import { FlatList, Text } from "react-native";

export default function UsersScreen() {
  const [users, setUsers] = useState([]);

  return (
    <FlatList
      data={users}
      renderItem={({ item }) => <Text>{item.full_name}</Text>}
    />
  );
}
