import { useIsFocused } from "@react-navigation/native";
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
import useStore from "../../store/store";

export default function AnimatedFlatList({ navigation, route }) {
  const isFocused = useIsFocused();
  const { getAllUsers, allusers } = useStore((state) => ({
    getAllUsers: state.getAllUsers,
    allusers: state.allusers,
  }));
  useEffect(() => {
    getAllUsers();

    return () => {};
  }, [isFocused]);

  return (
    <Fragment>
      <SafeAreaView style={{ height: "100%" }}>
        <AnimatedList users={allusers} />
      </SafeAreaView>
    </Fragment>
  );
}
