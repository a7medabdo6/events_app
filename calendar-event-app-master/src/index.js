import React, { Component, useEffect, useState } from "react";
import { Platform, StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppWrapper } from "@calendar/components";
import { CalendarNavigation } from "@calendar/navigation";
import BottomNav from "./navigation/BottomNav";
import * as Calendar from "expo-calendar";
import AuthStack from "./navigation/AuthStack";

import {
  CreateTask,
  Home,
  Login,
  SignUp,
  Profile,
  AnimatedFlatList,
} from "@calendar/screens";
import { NavigationContainer } from "@react-navigation/native";
import { useStore } from "@calendar/store";
const App = () => {
  const { isAuth } = useStore((state) => ({ isAuth: state.isAuth }));
  // async componentDidMount() {
  //   await this._askForCalendarPermissions();
  //   await this._askForReminderPermissions();

  //   StatusBar.pushStackEntry({
  //     animated: true,
  //     barStyle: "dark-content",
  //   });
  // }

  useEffect(async () => {
    await _askForCalendarPermissions();
    await _askForReminderPermissions();

    StatusBar.pushStackEntry({
      animated: true,
      barStyle: "dark-content",
    });
  }, []);

  const _askForCalendarPermissions = async () => {
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    if (status === "granted") {
      const calendars = await Calendar.getCalendarsAsync(
        Calendar.EntityTypes.EVENT,
      );
      console.log("Here are all your calendars:");
      console.log({ calendars });
    }
  };

  const _askForReminderPermissions = async () => {
    if (Platform.OS === "android") {
      return true;
    }

    const { status } = await Calendar.requestRemindersPermissionsAsync();
    if (status === "granted") {
      const calendars = await Calendar.getRemindersPermissionsAsync(
        Calendar.EntityTypes.REMINDER,
      );
      // console.log("Here are all your calendars:");
      // console.log({ calendars });
    }
  };
  return (
    <SafeAreaProvider style={{ backgroundColor: "#2196f3" }}>
      <AppWrapper>
        {/* <BottomNav /> */}
        {/* {console.log(isAuth, "isAuth")} */}
        {/* <AuthStack /> */}
        {isAuth && <BottomNav />}
        {!isAuth && <AuthStack />}
      </AppWrapper>
    </SafeAreaProvider>
  );
};

export default App;
