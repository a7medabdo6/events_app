import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Touchable,
  TouchableOpacity,
  Share,
  Image,
  Button,
} from "react-native";
import Btn from "../../components/Btn";
import { darkGreen } from "../../components/Constants";
import Field from "../../components/Field";
import useStore from "../../store/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

const MyInfo = ({ setModalVisible, modalVisible }) => {
  const [email, setemail] = useState("");
  const [code, setcode] = useState(null);
  const [username, setusername] = useState("");
  const [phone, setphone] = useState("");
  const navigation = useNavigation();

  const [uri, seturi] = useState("");
  const [name, setname] = useState("");
  const [type, settype] = useState("");
  const [value, setValue] = useState(null);
  const { error, createUser } = useStore((state) => ({
    error: state.error,
    createUser: state.createuser,
  }));

  const [user, setUser] = useState(null);

  const getuser = async () => {
    const userjson = await AsyncStorage.getItem("user");
    // console.log(userjson, "useerrrrr");
    setUser(JSON.parse(userjson));
  };
  useEffect(() => {
    getuser();
    return () => {};
  }, []);

  useEffect(() => {
    // console.log(user, "user useerrrrr");

    if (user) {
      setemail(user?.email);
      setusername(user?.username);
      setphone(user?.phone);
    }
  }, [user]);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result?.cancelled) {
      const fileExtension = result.uri.split(".").pop(); // Extract file extension from URI
      const fileName = `${Date.now()}.${fileExtension}`; // Generate unique file name
      seturi(result.uri);
      setname(fileName);
    }
  };
  const UpdateUser = async () => {
    let formdata = new FormData();
    formdata.append("image", {
      uri: uri, // this is the path to your file. see Expo ImagePicker or React Native ImagePicker
      name: name,
      type: "image/jpeg",
    });
    formdata.append("email", email);
    formdata.append("phone", phone);
    formdata.append("username", username);

    try {
      const res = await axios.patch(
        `http://207.154.251.59/api/users/${user?.id}`,
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res.data, "ressssssssssssssssss");
      // const res = await axios({
      //   method: "post",
      //   url: "http://207.154.251.59/api/docs/create",
      //   data: data,
      // });

      // console.log(res.data, "res create");

      // set({ isAuth: true, role: res.data.role });
      navigation.push("AnimatedFlatList");
    } catch (error) {
      console.log(error, "errorr");
    }
  };
  useEffect(() => {
    console.log(user, "user info");
  }, [user]);
  return (
    <View
      style={{
        alignItems: "center",
        display: "flex",
        width: "100%",
        height: "100%",
        // backgroundColor: "red",
      }}
    >
      <Text
        style={{
          color: "black",
          fontSize: 15,
          fontWeight: "bold",
          marginVertical: 20,
        }}
      >
        Update My Info
      </Text>
      <View
        style={{
          backgroundColor: "white",
          width: "100%",

          alignItems: "center",
        }}
      >
        <View
          style={{
            width: "90%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <Field
            onChangeText={(e) => setemail(e)}
            placeholder="Email / Username"
            keyboardType={"text"}
            value={email}
          />
          <Field
            onChangeText={(e) => setusername(e)}
            placeholder="Email / Username"
            keyboardType={"text"}
            value={username}
          />
          <Field
            onChangeText={(e) => setphone(e)}
            placeholder="phone"
            keyboardType={"text"}
            value={phone}
          />
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            {uri && (
              <Image
                source={{ uri: uri }}
                style={{ width: 200, height: 200 }}
              />
            )}
            <Button
              title="Pick an image from camera roll"
              onPress={pickImage}
            />
          </View>
          <Btn
            textColor="white"
            bgColor={darkGreen}
            btnLabel="Update"
            padding={20}
            Press={() => UpdateUser()}
          />
        </View>
      </View>
    </View>
  );
};

export default MyInfo;
