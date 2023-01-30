import React from "react";
import { View, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

const SendDoc = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#016BA7",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: 50,
      }}
    >
      <View>
        <Text
          style={{
            color: "white",
            fontSize: 30,
            width: 200,
            letterSpacing: 2,
            textAlign: "center",
            fontWeight: "normal",
          }}
        >
          Send docs securely
        </Text>
      </View>

      <View
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "80%",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            paddingTop: 20,
            width: 250,
          }}
        >
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              width: 60,
              height: 60,
              borderColor: "white",
              borderRadius: 50,
              borderWidth: 2,
              alignItems: "center",
            }}
          >
            <AntDesign name="scan1" size={24} color="white" />
          </View>

          <View
            style={{
              display: "flex",
              justifyContent: "center",
              paddingStart: 20,
              height: 60,
            }}
          >
            <Text style={{ color: "white", fontSize: 20 }}>
              Scan a Document
            </Text>
          </View>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            paddingTop: 20,
            width: 250,
          }}
        >
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              width: 60,
              height: 60,
              borderColor: "white",
              borderRadius: 50,
              borderWidth: 2,
              alignItems: "center",
            }}
          >
            <Feather name="send" size={24} color="white" />
          </View>

          <View
            style={{
              display: "flex",
              justifyContent: "center",
              paddingStart: 20,
              height: 60,
            }}
          >
            <Text style={{ color: "white", fontSize: 20 }}>send a File</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SendDoc;
