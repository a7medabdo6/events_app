import React, { useState } from "react";
import { View, Text, Touchable, TouchableOpacity } from "react-native";
import Background from "../../components/Background";
import Btn from "../../components/Btn";
import { darkGreen } from "../../components/Constants";
import Field from "../../components/Field";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import useStore from "../../store/store";
import DropDownPicker from "react-native-dropdown-picker";
const CreateUser = (props) => {
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
  const { setCreateUser, error } = useStore((state) => ({
    setCreateUser: state.setCreateUser,
    error: state.error,
  }));
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
