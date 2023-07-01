import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { nativeStackConfig } from "./nativeStackConfig";

import Routes from "./routes";
import {
  Home,
  Login,
  SignUp,
  Profile,
  AnimatedFlatList,
} from "@calendar/screens";
import { useStore } from "@calendar/store";
import UploadScreen from "../screens/TestCards";
import Preview from "../screens/preview";

const Stack = createStackNavigator();

function MainNavigatorWrapper() {
  return (
    <Stack.Navigator {...nativeStackConfig}>
      <Stack.Screen component={AnimatedFlatList} name={"AnimatedFlatList"} />
      <Stack.Screen component={Profile} name={"Profile"} />
      <Stack.Screen component={UploadScreen} name={"upload"} />
      <Stack.Screen component={Preview} name={"preview"} />

      {/* <Stack.Screen component={Profile} name={Routes.Profile} /> */}
      {/* <Stack.Screen component={AnimatedFlatList} name={Routes.AnimatedFlatList} /> */}
    </Stack.Navigator>
  );
}

const AppContainer = React.forwardRef((props, ref) => (
  <MainNavigatorWrapper initialRoute={props.initialRoute} />
));

AppContainer.displayName = "AppContainer";

export default React.memo(AppContainer);
