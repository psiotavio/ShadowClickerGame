import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const Header = ({ coinse }) => {
  const formattedCoins =
    coinse % 1 === 0 ? coinse.toFixed(0) : coinse.toFixed(2);
  const displayCoins = parseFloat(formattedCoins).toString();
  let fontSize = 45; // Tamanho da fonte padrão

  if (displayCoins.length > 20) {
    // Se a quantidade de dígitos for maior que 20
    fontSize = 24; // Reduza o tamanho da fonte ainda mais
  } else if (displayCoins.length > 6) {
    // Se tiver mais de 6 dígitos
    fontSize = 28; // Reduza o tamanho da fonte
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { fontSize }]}>
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
