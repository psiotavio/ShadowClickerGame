import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = ({ coinse }) => {
  const formattedCoins = coinse % 1 === 0 ? coinse.toFixed(0) : coinse.toFixed(2);
  const displayCoins = parseFloat(formattedCoins).toString(); // Remove casas decimais se forem zeros
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{displayCoins} $$</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
    width: "100%",
    marginBottom: 15,
  },
  text:{
    color:"#f2f2f2",
    fontSize: 45,
    fontWeight: "bold",
  }
});

export default Header;
