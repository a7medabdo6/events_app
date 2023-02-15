import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import useStore from "../store/store";
import * as FileSystem from "expo-file-system";

const SendDoc = ({ route }) => {
  const item = route?.params?.item;
  const user = route?.params?.user;
  const [uri, seturi] = useState("");
  const [name, setname] = useState("");
  const [type, settype] = useState("");
  const { setUploadDoc } = useStore((state) => ({
    setUploadDoc: state.setUploadDoc,
  }));

  const _pickDocument = async () => {
    console.log(item, "item");

    let result = await DocumentPicker.getDocumentAsync({
      base64: true,
    });

    alert(result.uri);
    settype(result.mimeType);
    setname(result.name);
    seturi(result.uri);
    console.log(result);
    if (result.type != "cancel") {
      const resultBase64 = await FileSystem.readAsStringAsync(result.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      // console.log(resultBase64, "resultBase64");

      setUploadDoc({
        user: user?.id,
        type: item,
        doc: resultBase64,
        typeOfFile: result.mimeType,
      });
    }
  };
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
        <TouchableOpacity onPress={() => _pickDocument()}>
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
        </TouchableOpacity>
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
