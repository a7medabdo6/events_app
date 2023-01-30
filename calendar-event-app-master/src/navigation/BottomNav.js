import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

import {
  CreateTask,
  Home,
  Login,
  SignUp,
  Profile,
  AnimatedFlatList,
} from "@calendar/screens";
import StackNav from "./StackNav";
import TestCards from "../screens/TestCards";
const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="HomeMain"
        screenOptions={{
          tabBarActiveTintColor: "#e91e63",
          tabBarStyle: { borderTopEndRadius: 30, borderTopStartRadius: 30 },
          backgroundColor: "transparent",
        }}
      >
        <Tab.Screen
          name="HomeMain"
          component={StackNav}
          options={{
            headerShown: false,

            tabBarLabel: "",
            tabBarIcon: ({ color, size, focused }) => (
              <View style={focused && styles.activeBack}>
                <Ionicons
                  name="home-outline"
                  style={focused && styles.active}
                  size={24}
                  color={color}
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="AnimatedFlatList"
          component={AnimatedFlatList}
          options={{
            headerShown: false,
            tabBarLabel: "",
            tabBarIcon: ({ color, size, focused }) => (
              <View style={focused && styles.activeBack}>
                <Ionicons
                  name="people"
                  style={focused && styles.active}
                  size={24}
                  color={color}
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            headerShown: false,

            tabBarLabel: "",
            tabBarIcon: ({ color, size, focused }) => (
              <View style={focused && styles.activeBack}>
                <MaterialCommunityIcons
                  name="account-circle-outline"
                  size={24}
                  color={color}
                  style={focused && styles.active}
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Upload"
          component={TestCards}
          options={{
            headerShown: false,

            tabBarLabel: "",
            tabBarIcon: ({ color, size, focused }) => (
              <View style={focused && styles.activeBack}>
                <Entypo
                  name="upload"
                  size={24}
                  color={color}
                  style={focused && styles.active}
                />
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  taskListContent: {
    height: 100,
    width: 327,
    alignSelf: "center",
    borderRadius: 10,
    shadowColor: "#2196f3",
    backgroundColor: "#ffffff",
    marginTop: 10,
    marginBottom: 10,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 0.2,
    elevation: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  viewTask: {
    position: "absolute",
    bottom: 40,
    right: 17,
    height: 60,
    width: 60,
    backgroundColor: "#2196f3",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#2196f3",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: 30,
    shadowOpacity: 0.5,
    elevation: 5,
    zIndex: 999,
  },
  deleteButton: {
    backgroundColor: "blue",
    width: 100,
    height: 38,
    alignSelf: "center",
    marginTop: 40,
    borderRadius: 5,
    justifyContent: "center",
  },
  updateButton: {
    backgroundColor: "#2196f3",
    width: 100,
    height: 38,
    alignSelf: "center",
    marginTop: 40,
    borderRadius: 5,
    justifyContent: "center",
    marginRight: 20,
  },
  separator: {
    height: 0.5,
    width: "100%",
    backgroundColor: "#979797",
    alignSelf: "center",
    marginVertical: 20,
  },
  notesContent: {
    height: 0.5,
    width: "100%",
    backgroundColor: "#979797",
    alignSelf: "center",
    marginVertical: 20,
  },
  learn: {
    height: 23,
    width: 51,
    backgroundColor: "#F8D557",
    justifyContent: "center",
    borderRadius: 5,
  },
  design: {
    height: 23,
    width: 59,
    backgroundColor: "#2196f3",
    justifyContent: "center",
    borderRadius: 5,
    marginRight: 7,
  },
  readBook: {
    height: 23,
    width: 83,
    backgroundColor: "#4CD565",
    justifyContent: "center",
    borderRadius: 5,
    marginRight: 7,
  },
  title: {
    height: 25,
    borderColor: "#5DD976",
    borderLeftWidth: 1,
    paddingLeft: 8,
    fontSize: 19,
  },
  taskContainer: {
    height: 475,
    width: 327,
    alignSelf: "center",
    borderRadius: 20,
    shadowColor: "#2196f3",
    backgroundColor: "#ffffff",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowRadius: 20,
    shadowOpacity: 0.2,
    elevation: 5,
    padding: 22,
  },
  active: {
    fontSize: 30,

    color: "white",
  },
  activeBack: {
    backgroundColor: "#2196f3",
    padding: 5,
    position: "absolute",
    top: -20,
    borderRadius: 50,
    borderColor: "#2196f3",
    borderWidth: 2,
    width: 50,
    height: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
