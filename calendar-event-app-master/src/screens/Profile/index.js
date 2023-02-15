import React, { useEffect } from "react";
import {
  View,
  Text,
  Touchable,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
} from "react-native";

import Card from "../../components/Card";
import Cards from "../../components/Cards";
import useStore from "../../store/store";
import { useIsFocused, useNavigation } from "@react-navigation/native";

const Profile = ({ route }) => {
  const user = route?.params?.user;
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { getAllUsers, allusers } = useStore((state) => ({
    getAllUsers: state.getAllUsers,
    allusers: state.allusers,
  }));
  const { admin } = useStore((state) => ({
    admin: state.admin,
  }));
  useEffect(() => {
    getAllUsers();
    return () => {};
  }, [isFocused]);

  return (
    <>
      <View
        style={{
          height: 50,
          width: "100%",
          backgroundColor: "#2196f3",
          borderBottomEndRadius: 30,
          borderBottomStartRadius: 30,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontSize: 22, fontWeight: "bold" }}>
          My Profile
        </Text>
      </View>
      <ScrollView>
        <View
          style={{
            alignItems: "center",
            display: "flex",
            width: "100%",
            backgroundColor: "#e9e9e9",
          }}
        >
          <Cards user={user} />
          <Cards user={admin} />

          <View
            style={{
              width: "90%",
              marginVertical: 10,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "black", fontWeight: "bold", fontSize: 19 }}>
              Check List
            </Text>
          </View>
          <Card user={user} />
        </View>
      </ScrollView>
      {/* <TouchableOpacity
        style={styles.viewTask}
      >
        <Image
          source={require("../../../assets/plus.png")}
          style={{
            height: 30,
            width: 30,
          }}
        />
      </TouchableOpacity> */}
    </>
  );
};
const styles = StyleSheet.create({
  viewTask: {
    position: "absolute",
    bottom: 40,
    right: 17,
    height: 60,
    width: 60,
    backgroundColor: "#2196f3",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#2196f3",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: 30,
    shadowOpacity: 0.5,
    elevation: 5,
    zIndex: 999,
  },
});
export default Profile;
