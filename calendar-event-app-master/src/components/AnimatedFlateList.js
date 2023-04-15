import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  TouchableOpacity,
} from "react-native";
import ModalComponent from "./Modal";

const marginBottomItem = 20;
const paddingItem = 10;
const imgHeight = 100;
const sizeOfItem = imgHeight + paddingItem * 2 + marginBottomItem;

const BASE_URL = "https://dummyapi.io/data/api";
const APP_ID = "6081e1754a7541617d41334a";
const backgroundImg =
  "https://i.pinimg.com/originals/2a/24/74/2a24740658e1910bcfedbbdd83098c4e.jpg";

const App = ({ users }) => {
  const [data, setData] = useState([1, 2, 3]);
  const [isLoading, setIsloading] = useState(true);
  const Yscroll = React.useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const getAllUsers = () => {
    // fetch(`${BASE_URL}/user`, { headers: { "app-id": APP_ID } })
    //   .then((res) => res.json())
    //   .then((resJson) => {
    //     setData([1, 2.3]);
    //   })
    //   .catch(console.error, "err")
    //   .finally(() => setIsloading(false));
  };
  useEffect(() => {
    if (users?.length > 0) {
      setIsloading(false);
    }
    return () => {};
  }, [users]);
  const renderUser = ({ item, index }) => {
    const scale = Yscroll.interpolate({
      inputRange: [-1, 0, sizeOfItem * index, sizeOfItem * (index + 2)],
      outputRange: [1, 1, 1, 0],
    });
    return (
      <TouchableOpacity
        onPress={() => navigation.push("Profile", { user: item })}
      >
        <Animated.View
          style={[
            styles.item,
            {
              transform: [{ scale }],
            },
          ]}
        >
          <Image
            style={styles.image}
            source={require("../../assets/avatar3.png")}
            resizeMode="contain"
            contentContainerStyle={{ padding: 20 }}
          />
          <View style={styles.wrapText}>
            <Text style={styles.fontSize}>{item.username} </Text>
            <Text style={{ fontSize: 19, marginVertical: 3 }}>
              {item.email}
            </Text>
            <View
              style={{
                width: 100,
                backgroundColor: "#2196f3",
                borderRadius: 25,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingVertical: 5,
                marginVertical: 0,
              }}
            >
              <Text
                style={{ fontSize: 19, fontWeight: "bold", color: "white" }}
              >
                {item.role?.toUpperCase()}
              </Text>
            </View>
          </View>
        </Animated.View>
      </TouchableOpacity>
    );
  };
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={StyleSheet.absoluteFillObject} blurRadius={80} />
      <View
        style={{
          height: 50,
          width: "100%",
          backgroundColor: "#2196f3",
          borderBottomEndRadius: 30,
          borderBottomStartRadius: 30,
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Text style={{ color: "white", fontSize: 22, fontWeight: "bold" }}>
          My Clients
        </Text>
        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
          <AntDesign
            name="pluscircleo"
            size={30}
            color={"white"}
            // style={focused && styles.active}
          />
        </TouchableOpacity>
        <ModalComponent
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
        />
      </View>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <Animated.FlatList
          data={users}
          keyExtractor={(item) => `key-${item.id}`}
          renderItem={renderUser}
          contentContainerStyle={{
            padding: 20,
          }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: Yscroll } } }],
            { useNativeDriver: true },
          )}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fontSize: {
    fontSize: 18,
  },
  image: {
    width: 100,
    height: imgHeight,
  },
  wrapText: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
  item: {
    flexDirection: "row",
    marginBottom: marginBottomItem,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 30,
    padding: paddingItem,
  },
  container: {
    flex: 1,
  },
});

export default App;
