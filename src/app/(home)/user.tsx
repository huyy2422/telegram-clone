import { useEffect, useState } from "react";
import { Text, FlatList } from "react-native";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../providers/AuthProvider";
import UserListItem from "../../providers/UserListItem";

export default function UserScreen() {
  const [users, setUsers] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      let { data: profiles, error } = await supabase
        .from("profiles")
        .select("*")
        .neq("id", user.id);
        setUsers(profiles);
    };
    fetchUsers();
  });

  return (
    <FlatList
      data={users}
      contentContainerStyle={{gap: 5}}
      renderItem={({ item }) => <UserListItem user={item}/>}
    />
  );
}
