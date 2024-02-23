import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const Header = ({ coinse }) => {
  const formattedCoins = coinse % 1 === 0 ? coinse.toFixed(0) : coinse.toFixed(2);
  const displayCoins = parseFloat(formattedCoins).toString();
  
  return (
    <View style={styles.container}>
      <Text style={[styles.text, { fontSize: displayCoins.length > 6 ? 28 : 45 }]}>
        {displayCoins} Evil Coins!
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
  },
});

export default Header;
