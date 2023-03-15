import React, { useState } from "react";
import { View, Text, Touchable, TouchableOpacity } from "react-native";
import Background from "../../components/Background";
import Btn from "../../components/Btn";
import { darkGreen } from "../../components/Constants";
import Field from "../../components/Field";
import { useNavigation } from "@react-navigation/native";
import useStore from "../../store/store";
const Login = (props) => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const { setLogin, error } = useStore((state) => ({
    setLogin: state.setLogin,
    error: state.error,
  }));
  return (
    <Background>
      <View
        style={{
          alignItems: "center",
          display: "flex",
          width: "100%",
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 64,
            fontWeight: "bold",
            marginVertical: 20,
          }}
        >
          Log In
        </Text>
        <View
          style={{
            backgroundColor: "white",
            height: 700,
            width: "100%",
            borderTopLeftRadius: 130,
            paddingTop: 100,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 40, color: darkGreen, fontWeight: "bold" }}>
            Welcome Back
          </Text>
          <Text
            style={{
              color: "grey",
              fontSize: 19,
              fontWeight: "bold",
              marginBottom: 20,
            }}
          >
            Login to your account
          </Text>
          <View
            style={{
              backgroundColor: "white",
              width: "90%",
            }}
          >
            <Field
              onChangeText={(e) => setemail(e)}
              placeholder="Email / Username"
              keyboardType={"email-address"}
            />
            <Field
              placeholder="Password"
              onChangeText={(e) => setpassword(e)}
              secureTextEntry={true}
            />
            <View
              style={{
                width: "78%",
                paddingRight: 16,
                marginBottom: 100,
              }}
            >
              {error && (
                <Text
                  style={{ color: "red", fontWeight: "bold", fontSize: 16 }}
                >
                  {error}
                </Text>
              )}
              <Text
                style={{ color: darkGreen, fontWeight: "bold", fontSize: 16 }}
              >
                Forgot Password ?
              </Text>
            </View>
            <Btn
              textColor="white"
              bgColor={darkGreen}
              btnLabel="Login"
              Press={() => setLogin({ email, password })}
            />
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                Don't have an account ?{" "}
              </Text>
              <TouchableOpacity
                onPress={() => props.navigation.navigate("SignUp")}
              >
                <Text
                  style={{ color: darkGreen, fontWeight: "bold", fontSize: 16 }}
                >
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Background>
  );
};

export default Login;
