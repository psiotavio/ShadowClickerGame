import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Font from 'expo-font';

const Header = ({ coinse, coinsPS }) => {
  const formattedCoins =
    coinse % 1 === 0 ? coinse.toFixed(0) : coinse.toFixed(2);
  const displayCoins = parseFloat(formattedCoins).toString();

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'ProtestRevolution-Regular': require('../assets/fonts/ProtestRevolution-Regular.ttf'),
      });
    }

    loadFonts();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {displayCoins} Evil Coins!
      </Text>
      <Text style={styles.text2}>
        {coinsPS} Cps
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
  },
  text: {
    color: "#f2f2f2",
    fontWeight: "bold",
    fontSize: 32,
    fontFamily: "ProtestRevolution-Regular",
  },
  text2:{
    marginTop: 10,
    fontSize: 20,
    color: "#f2f2f2",
    fontWeight: "bold",
    fontFamily: "ProtestRevolution-Regular",
  }
});

export default Header;
