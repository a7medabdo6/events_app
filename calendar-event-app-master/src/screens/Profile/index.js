import React from "react";
import {
  View,
  Text,
  Touchable,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";

import Card from "../../components/Card";
import Cards from "../../components/Cards";
const Profile = (props) => {
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
          <Cards />

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
          <Card />
        </View>
      </ScrollView>
    </>
  );
};

export default Profile;
