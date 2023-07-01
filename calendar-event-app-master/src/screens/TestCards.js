import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import useStore from "../store/store";
import * as FileSystem from "expo-file-system";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const SendDoc = ({ route }) => {
  const navigation = useNavigation();
  const item = route?.params?.item;
  const user = route?.params?.user;
  const [uri, seturi] = useState("");
  const [name, setname] = useState("");
  const [type, settype] = useState("");
  const [Base64, setresultBase64] = useState(null);
  const { SetUploadDoc } = useStore((state) => ({
    SetUploadDoc: state.SetUploadDoc,
  }));
  const Upload = async (data) => {
    let formdata = new FormData();
    formdata.append("doc", {
      uri: uri, // this is the path to your file. see Expo ImagePicker or React Native ImagePicker
      type: type, // example: image/jpg
      name: name, // example: upload.jpg
    });
    formdata.append("type", item);
    formdata.append("userId", +user?.id);
    formdata.append("typeOfFile", data?.typeOfFile);
    formdata.append("extra", data?.extra);

    try {
      const res = await axios.post(
        "http://207.154.251.59/api/docs/create",
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res, "res");
      // const res = await axios({
      //   method: "post",
      //   url: "http://207.154.251.59/api/docs/create",
      //   data: data,
      // });

      // console.log(res.data, "res create");

      // set({ isAuth: true, role: res.data.role });
      navigation.push("AnimatedFlatList");
    } catch (error) {
      console.log(error.response.data, "errorr");
    }
  };
  const _pickDocument = async () => {
    // console.log(item, "item");

    let result = await DocumentPicker.getDocumentAsync({
      base64: true,
    });

    // alert(result.uri);
    settype(result.mimeType);
    setname(result.name);
    seturi(result.uri);
    // console.log(result, "resuklt");
    if (result.type != "cancel") {
      const resultBase64 = await FileSystem.readAsStringAsync(result.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      setresultBase64(resultBase64);
    }
  };
  useEffect(() => {
    if (Base64 && type) {
      // console.log("testR");
      Upload({
        user: user?.id,
        type: item,
        doc: JSON.stringify(Base64),
        typeOfFile: type,
        extra: "test",
      });
      setresultBase64(null);
      settype(null);
    }
  }, [uri, Base64]);
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
          Upload your documnet
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
                Upload a Document
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        {/* <View
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
        </View> */}
      </View>
    </View>
  );
};

export default SendDoc;
