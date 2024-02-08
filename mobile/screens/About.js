import { useState, useEffect } from "react";
import { View, Text, StyleSheet} from "react-native";
import { StatusBar } from 'expo-status-bar';


export default function AboutScreen() {
    return (
      <View style={styles.container}>
        <Text>About</Text>
        <StatusBar style="auto" />
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });