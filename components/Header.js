import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = ({ coinse }) => {
  const [coins, setCoins] = useState(0.0);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{coinse}  $$</Text>
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
