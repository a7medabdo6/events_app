import React from "react";
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

const Signup = (props) => {
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
              <Field placeholder="First and Last Name" />
              <Field
                placeholder="Email / Username"
                keyboardType={"email-address"}
              />
              <Field placeholder="Contact Number" keyboardType={"number"} />
              <Field placeholder="Password" secureTextEntry={true} />
              <Field placeholder="Confirm Password" secureTextEntry={true} />
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
                <Text style={{ color: "grey", fontSize: 15 }}>
                  By signing in, you agree to our{" "}
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
                  alert("Accoutn created");
                  props.navigation.navigate("login");
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
                Already have an account ?{" "}
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
