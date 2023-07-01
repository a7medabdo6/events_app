import React, { useEffect, useState } from "react";
import { View, Text, Touchable, TouchableOpacity, Share } from "react-native";
import Btn from "../../components/Btn";
import { darkGreen } from "../../components/Constants";
import Field from "../../components/Field";
import useStore from "../../store/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
const MyInfo = ({ setModalVisible, modalVisible }) => {
  const [email, setemail] = useState("");
  const [code, setcode] = useState(null);
  const [username, setusername] = useState("");
  const [phone, setphone] = useState("");
  const navigation = useNavigation();

  const [value, setValue] = useState(null);
  const { error, createUser } = useStore((state) => ({
    error: state.error,
    createUser: state.createuser,
  }));

  const [user, setUser] = useState(null);

  const getuser = async () => {
    const userjson = await AsyncStorage.getItem("user");
    console.log(userjson, "useerrrrr");
    setUser(JSON.parse(userjson));
  };
  useEffect(() => {
    getuser();
    return () => {};
  }, []);

  useEffect(() => {
    console.log(user, "user useerrrrr");

    if (user) {
      setemail(user?.email);
      setusername(user?.username);
      setphone(user?.phone);
    }
  }, [user]);
  const UpdateUser = async () => {
    let formdata = new FormData();
    formdata.append("image", {
      uri: uri, // this is the path to your file. see Expo ImagePicker or React Native ImagePicker
      type: type, // example: image/jpg
      name: name, // example: upload.jpg
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
  return (
    <View
      style={{
        alignItems: "center",
        display: "flex",
        width: "100%",
        height: "50%",
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
