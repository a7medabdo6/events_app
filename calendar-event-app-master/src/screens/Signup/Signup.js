import React, { useState } from "react";
import {
  View,
  Text,
  Touchable,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Btn from "../../components/Btn";
import { darkGreen } from "../../components/Constants";
import Field from "../../components/Field";
import Background from "../../components/Background";
import useStore from "../../store/store";

const Signup = (props) => {
  const [Username, setUsername] = useState(false);

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [Code, setCode] = useState("12345");
  const [role, setrole] = useState("buyer");

  const [ConfirmPass, setConfirmPass] = useState("");
  const [localError, setlocalError] = useState(false);

  const { setSignUp, errorForSignUp, setErrorForSignupEmpty } = useStore(
    (state) => ({
      setSignUp: state.setSignUp,
      errorForSignUp: state.errorForSignUp,
      setErrorForSignupEmpty: state.setErrorForSignupEmpty,
    }),
  );
  return (
    <Background>
      <ScrollView>
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
              marginTop: 20,
            }}
          >
            Register
          </Text>
          {/* <Text
            style={{
              color: "#F46F3A",
              fontSize: 19,
              fontWeight: "bold",
              marginBottom: 10,
              marginTop: 10,
            }}
          >
            Create a new account
          </Text> */}
          <View
            style={{
              backgroundColor: "white",
              height: 700,
              borderTopLeftRadius: 130,
              paddingTop: 30,
              alignItems: "center",
              width: "100%",
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                width: "90%",
                marginTop: 40,
              }}
            >
              <Field
                placeholder="First and Last Name"
                onChangeText={(e) => setUsername(e)}
              />
              <Field
                onChangeText={(e) => setemail(e)}
                placeholder="Email "
                keyboardType={"email-address"}
              />
              <Field
                placeholder="Code"
                onChangeText={(e) => setCode(e)}
                keyboardType={"number"}
              />
              <Field
                placeholder="Password"
                onChangeText={(e) => setpassword(e)}
                secureTextEntry={true}
              />
              <Field
                placeholder="Confirm Password"
                onChangeText={(e) => setConfirmPass(e)}
                secureTextEntry={true}
              />
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  paddingRight: 16,
                  flexWrap: "wrap",
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                {localError && (
                  <Text style={{ color: "red", fontSize: 15 }}>
                    {localError}
                  </Text>
                )}
                {errorForSignUp &&
                  typeof errorForSignUp != "string" &&
                  errorForSignUp?.map((item) => {
                    return (
                      <Text
                        style={{ color: "red", fontSize: 15, width: "100%" }}
                      >
                        {item}
                      </Text>
                    );
                  })}
                {errorForSignUp && typeof errorForSignUp == "string" && (
                  <Text style={{ color: "red", fontSize: 15, width: "100%" }}>
                    {errorForSignUp}
                  </Text>
                )}
                <Text style={{ color: "grey", fontSize: 15 }}>
                  By signing in, you agree to our
                </Text>
                <Text
                  style={{ color: darkGreen, fontWeight: "bold", fontSize: 15 }}
                >
                  Terms & Conditions
                </Text>
              </View>
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                width: "78%",
                paddingRight: 16,
                marginBottom: 10,
              }}
            >
              <Text style={{ color: "grey", fontSize: 16 }}>and </Text>
              <Text
                style={{ color: darkGreen, fontWeight: "bold", fontSize: 16 }}
              >
                Privacy Policy
              </Text>
            </View>
            <View style={{ width: "90%" }}>
              <Btn
                textColor="white"
                bgColor={darkGreen}
                btnLabel="Signup"
                Press={() => {
                  if (password != ConfirmPass) {
                    setErrorForSignupEmpty();
                    setlocalError("password does not match!");
                    return;
                  }
                  setlocalError(false);
                  setSignUp({
                    email,
                    password,
                    code: Code,
                    username: Username,
                    role,
                  });
                  // alert("Accoutn created");
                  // props.navigation.navigate("login");
                }}
              />
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                Already have an account ?
              </Text>
              <TouchableOpacity
                onPress={() => props.navigation.navigate("login")}
              >
                <Text
                  style={{ color: darkGreen, fontWeight: "bold", fontSize: 16 }}
                >
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </Background>
  );
};

export default Signup;
