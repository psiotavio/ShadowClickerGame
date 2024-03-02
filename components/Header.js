import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

const Header = ({ coinse, coinsPS }) => {
  const formattedCoins = coinse % 1 === 0 ? coinse.toFixed(0) : coinse.toFixed(2);
  const displayCoins = parseFloat(formattedCoins).toString();
  
  const formattedCoinsPS = coinsPS % 1 === 0 ? coinsPS.toFixed(0) : coinsPS.toFixed(2);
  const displayCoinsPS = parseFloat(formattedCoinsPS).toString();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {displayCoins} Evil Coins!
      </Text>
      <Text style={styles.text2}>
        {displayCoinsPS} Cps
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
