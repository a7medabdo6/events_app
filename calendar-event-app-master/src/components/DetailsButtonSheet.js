import React from "react";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const DetailsButtonSheet = ({ user }) => {
  return (
    <View
      style={{
        display: "flex",
        justifyContent: "flex-start",
        backgroundColor: "white",
        flex: 1,
        width: "100%",
        marginHorizontal: 20,
      }}
    >
      <View style={{ borderColor: "grey", borderBottomWidth: 2, padding: 5 }}>
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>
          {user?.username}
        </Text>
        <Text style={{ color: "grey" }}>{user?.role}</Text>
      </View>

      <View
        style={{
          display: "flex",
          justifyContent: "flex-start",
          flexDirection: "row",
          borderColor: "grey",
          borderBottomWidth: 1,
          padding: 5,
        }}
      >
        <View style={{ display: "flex", justifyContent: "center" }}>
          <Ionicons name="call-outline" size={24} color="black" />
        </View>
        <View style={{ marginLeft: 30 }}>
          <Text>CALL</Text>
          <Text style={{ color: "grey" }}>(321) 765-38369</Text>
        </View>
      </View>

      <View
        style={{
          display: "flex",
          justifyContent: "flex-start",
          flexDirection: "row",
          borderColor: "grey",
          borderBottomWidth: 1,
          padding: 5,
        }}
      >
        <View style={{ display: "flex", justifyContent: "center" }}>
          <Ionicons name="mail-outline" size={24} color="black" />
        </View>
        <View style={{ marginLeft: 30 }}>
          <Text>EMAIL</Text>
          <Text style={{ color: "grey" }}>{user?.email}</Text>
        </View>
      </View>

      {/* <View
        style={{
          display: "flex",
          justifyContent: "flex-start",
          flexDirection: "row",
          borderColor: "grey",
          borderBottomWidth: 1,
          padding: 5,
        }}
      >
        <View style={{ display: "flex", justifyContent: "center" }}>
          <MaterialCommunityIcons name="file-export" size={24} color="black" />
        </View>
        <View style={{ marginLeft: 30 }}>
          <Text>ExXPORT CONTACT</Text>
        </View>
      </View> */}
    </View>
  );
};

export default DetailsButtonSheet;
