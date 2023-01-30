import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { nativeStackConfig } from "./nativeStackConfig";

import Routes from "./routes";
import {
  CreateTask,
  Home,
  Login,
  SignUp,
  Profile,
  AnimatedFlatList,
} from "@calendar/screens";
import { useStore } from "@calendar/store";

const Stack = createStackNavigator();

function MainNavigatorWrapper() {
  return (
    <NavigationContainer>
      <Stack.Navigator {...nativeStackConfig}>
        <Stack.Screen component={Login} name={Routes.Login} />
        <Stack.Screen component={SignUp} name={Routes.SignUp} />
        {/* <Stack.Screen component={Profile} name={Routes.Profile} /> */}
        {/* <Stack.Screen component={AnimatedFlatList} name={Routes.AnimatedFlatList} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const AppContainer = React.forwardRef((props, ref) => (
  <MainNavigatorWrapper initialRoute={props.initialRoute} />
));

AppContainer.displayName = "AppContainer";

export default React.memo(AppContainer);
