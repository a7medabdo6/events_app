import React, { Fragment, useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import AnimatedList from "../../components/AnimatedFlateList";

export default function AnimatedFlatList({ navigation, route }) {
  return (
    <Fragment>
      <SafeAreaView style={{ height: "100%" }}>
        <AnimatedList />
      </SafeAreaView>
    </Fragment>
  );
}
