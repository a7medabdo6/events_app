// Example of Bottom Sheet in React Native
// https://aboutreact.com/react-native-bottom-sheet/

// import React in our code
import React, { useState } from "react";

// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";

//import basic react native components
import { BottomSheet } from "react-native-btr";

//import to show social icons
import Icon from "@expo/vector-icons/FontAwesome";
import DetailsButtonSheet from "./DetailsButtonSheet";
import { AntDesign } from "@expo/vector-icons";

const Cards = ({ user }) => {
  const [visible, setVisible] = useState(false);

  const toggleBottomNavigationView = () => {
    //Toggling the visibility state of the bottom sheet
    setVisible(!visible);
  };

  return (
    <View style={{ marginTop: 20, width: "90%" }}>
      <TouchableOpacity onPress={toggleBottomNavigationView}>
        <View style={[styles.card, styles.shadowProp]}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingTop: 20,
              marginBottom: 13,
            }}
          >
            <View style={{ display: "flex", flexDirection: "row" }}>
              <View style={{ marginHorizontal: 15 }}>
                <Image
                  style={{ width: 100, height: 100, borderRadius: 50 }}
                  source={require("../images/logo.jpg")}
                />
              </View>
              <View
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-start",
                }}
              >
                <Text
                  style={{ color: "black", fontSize: 20, letterSpacing: 1 }}
                >
                  {user?.username}
                </Text>
                <Text>{user?.role}</Text>
                <Text style={{ color: "#78ABC6" }}>View Profile</Text>
              </View>
            </View>

            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingEnd: 30,
              }}
            >
              <Icon name="angle-right" size={30} color="black" />
            </View>
          </View>
        </View>
      </TouchableOpacity>

      {/* <TouchableOpacity onPress={toggleBottomNavigationView}>
        <View style={[styles.card, styles.shadowProp]}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingTop: 20,
              marginBottom: 13,
            }}
          >
            <View style={{ display: "flex", flexDirection: "row" }}>
              <View style={{ marginHorizontal: 15 }}>
                <Image
                  style={{ width: 100, height: 100, borderRadius: 50 }}
                  source={require("../images/logo.jpg")}
                />
              </View>
              <View
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-start",
                }}
              >
                <Text
                  style={{ color: "black", fontSize: 20, letterSpacing: 1 }}
                >
                  Karissa Pendl
                </Text>
                <Text>Partner</Text>
                <Text style={{ color: "#78ABC6" }}>View Profile</Text>
              </View>
            </View>

            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingEnd: 30,
              }}
            >
              <Icon name="angle-right" size={30} color="black" />
            </View>
          </View>
        </View>
      </TouchableOpacity> */}

      {/* <Button
          onPress={toggleBottomNavigationView}
          //on Press of the button bottom sheet will be visible
          title="Show Bottom Sheet"
        /> */}
      <BottomSheet
        visible={visible}
        //setting the visibility state of the bottom shee
        onBackButtonPress={toggleBottomNavigationView}
        //Toggling the visibility state on the click of the back botton
        onBackdropPress={toggleBottomNavigationView}
        //Toggling the visibility state on the clicking out side of the sheet
      >
        {/*Bottom Sheet inner View*/}
        <View style={styles.bottomNavigationView}>
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <TouchableOpacity onPress={toggleBottomNavigationView}>
              <Text
                style={{
                  textAlign: "center",
                  padding: 10,
                  fontSize: 20,
                  backgroundColor: "grey",
                }}
              >
                <AntDesign name="down" size={24} color="black" />
              </Text>
            </TouchableOpacity>

            <View style={{ flex: 1 }}>
              <DetailsButtonSheet user={user} />
            </View>
          </View>
        </View>
      </BottomSheet>
    </View>
  );
};

export default Cards;

const styles = StyleSheet.create({
  bottomNavigationView: {
    backgroundColor: "#fff",
    width: "100%",
    height: 320,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    marginRight: 50,
    width: "100%",
    marginVertical: 8,
  },
  shadowProp: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
});
