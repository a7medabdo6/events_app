import React, { useEffect, useState } from "react";
import { View, Text, Touchable, TouchableOpacity, Share } from "react-native";
import Background from "../../components/Background";
import Btn from "../../components/Btn";
import { darkGreen } from "../../components/Constants";
import Field from "../../components/Field";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import useStore from "../../store/store";
import DropDownPicker from "react-native-dropdown-picker";
const CreateUser = ({ setModalVisible, modalVisible }) => {
  const [email, setemail] = useState("");
  const [code, setcode] = useState("");
  const [type, settype] = useState("");
  const [Items, setItems] = useState([
    {
      label: "seller",
      value: "seller",
    },
    {
      label: "buyer",
      value: "buyer",
    },
  ]);
  const isFocused = useIsFocused();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const { setCreateUser, error, createUser, setcreteUserEMpty } = useStore(
    (state) => ({
      setCreateUser: state.setCreateUser,
      error: state.error,
      createUser: state.createuser,
      setcreteUserEMpty: state.setcreteUserEMpty,
    }),
  );
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Thank You For Take the First Step To Join Us,
           Please use This Email And Code to Sign Up
           ${email}- ${code}
          
          `,
      });
    } catch (error) {
      Alert.alert(error.message);
    }
  };
  useEffect(() => {
    console.log(createUser, "createUser");
    if (createUser) {
      setModalVisible(false);
      setTimeout(() => {
        setcreteUserEMpty(null);
        onShare();
      }, 1000);
    }
  }, [createUser]);

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
        Create Code For User
      </Text>
      <View
        style={{
          backgroundColor: "white",
          width: "100%",
          // borderTopLeftRadius: 130,
          // paddingTop: 100,
          alignItems: "center",
        }}
      >
        {/* <Text style={{ fontSize: 40, color: darkGreen, fontWeight: "bold" }}>
            Welcome Back
          </Text> */}

        <View
          style={{
            // backgroundColor: "blue",
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
          />
          <Field
            placeholder="Create Code"
            onChangeText={(e) => setcode(e)}
            keyboardType={"text"}
          />
          <DropDownPicker
            open={open}
            value={value}
            items={Items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            style={{ marginVertical: 10 }}
          />
          <View
            style={{
              width: "78%",
              paddingRight: 16,
            }}
          >
            {error && (
              <Text style={{ color: "red", fontWeight: "bold", fontSize: 16 }}>
                {error}
              </Text>
            )}
          </View>
          <Btn
            textColor="white"
            bgColor={darkGreen}
            btnLabel="Create"
            padding={20}
            Press={() => setCreateUser({ email, code, type: value })}
          />
        </View>
      </View>
    </View>
  );
};

export default CreateUser;
