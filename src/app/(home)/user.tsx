import { useEffect, useState } from "react";
import { Text, FlatList, Alert } from "react-native";
import { db } from "../../lib/firebase";
import { useAuth } from "../../providers/AuthProvider";
import UserListItem from "../../providers/UserListItem";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function UserScreen() {
  const [users, setUsers] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (!user) throw new Error("No user on the session!");

        const q = query(collection(db, "profiles"), where("id", "!=", user.uid));
        const querySnapshot = await getDocs(q);
        const profiles = querySnapshot.docs.map((doc) => doc.data());
        setUsers(profiles);
      } catch (error) {
        if (error instanceof Error) {
          Alert.alert(error.message);
        }
      }
    };
    fetchUsers();
  }, [user]);

  return (
    <FlatList
      data={users}
      contentContainerStyle={{ gap: 5 }}
      renderItem={({ item }) => <UserListItem user={item} />}
    />
  );
}
