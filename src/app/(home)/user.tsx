import { useEffect, useState } from "react";
import { Text, FlatList } from "react-native";
import { supabase } from "../../lib/supabase";

export default function UserScreen() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      let { data: profiles, error } = await supabase
        .from("profiles")
        .select("*");
        setUsers(profiles);
    };
    fetchUsers();
  });

  return (
    <FlatList
      data={users}
      renderItem={({ item }) => <Text>{item.full_name}</Text>}
    />
  );
}
