import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Item = ({ item, onEdit, onDelete }) => {
  const handleLongPress = () => {
    Alert.alert(
      "Options",
      "What would you like to do?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Edit",
          onPress: () => onEdit(item), // Pass the item to the edit function
        },
        {
          text: "Delete",
          onPress: () => onDelete(item.id),
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <TouchableOpacity
      onPress={() =>
        alert(`Username: ${item.username}
Email: ${item.email} 
Password: ${item.password}`)
      }
      onLongPress={handleLongPress}
    >
      <View style={styles.item}>
        <Text style={styles.title}>{item.username}</Text>
      </View>
    </TouchableOpacity>
  );
};

const Home = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [items, setItems] = useState([]);

  const fetchData = async () => {
    try {
      const storedData = await AsyncStorage.getItem("userData");
      if (storedData !== null) {
        setItems(JSON.parse(storedData));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });

    return unsubscribe;
  }, [navigation]);

  const handleEdit = (editedItem) => {
    navigation.navigate("Edit", { item: editedItem, updateItem: updateItem });
  };

  const addItem = async (newItem) => {
    try {
      const updatedItems = [...items, newItem];
      await AsyncStorage.setItem("userData", JSON.stringify(updatedItems));
      console.log("AsyncStorage updated with new item:", updatedItems);
      setItems(updatedItems);
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const logout = () => {
    navigation.navigate('Login', { userData: items });
  };

  const handleDelete = async (itemId) => {
    try {
      const updatedItems = items.filter(item => item.id !== itemId);
      await AsyncStorage.setItem("userData", JSON.stringify(updatedItems));
      setItems(updatedItems);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const updateItem = async (editedItem) => {
    try {
      const updatedItems = items.map(item =>
        item.id === editedItem.id ? editedItem : item
      );
      await AsyncStorage.setItem("userData", JSON.stringify(updatedItems));
      setItems(updatedItems);
    } catch (error) {
      console.error("Error editing item:", error);
    }
  };

  const filteredData = items.filter((item) =>
    item.username && item.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search by username"
        onChangeText={(text) => setSearch(text)}
        value={search}
      />
      <FlatList
        data={filteredData}
        renderItem={({ item }) => <Item item={item} onEdit={handleEdit} onDelete={handleDelete} />}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("Add", { addItem })}
        >
          <Text style={styles.buttonText}>ADD USER</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={logout}
        >
          <Text style={styles.buttonText}>LOGOUT</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    paddingHorizontal: 10,
    backgroundColor: "#FDF7E4",
  },
  item: {
    backgroundColor: "#C6DCBA",
    borderRadius: 20,
    padding: 20,
    marginVertical: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  addButton: {
    flex:1,
    backgroundColor: "#436850",
    paddingVertical: 12,
    paddingHorizontal: 30,
    marginHorizontal: 5,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  logoutButton: {
    flex:1,
    backgroundColor: "#9B4444",
    paddingVertical: 12,
    paddingHorizontal: 30,
     marginHorizontal: 5,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
});

export default Home;
