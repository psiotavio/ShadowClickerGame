import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import PropTypes from "prop-types";

const Pack = ({
  image,
  title,
  initialCost,
  plusClick,
  buyPack,
  itemId,
}) => {
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const { width, height } = Dimensions.get("window");
    const aspectRatio = height / width;
    setIsTablet(aspectRatio < 1.6);
  }, []);

  return (
    <TouchableOpacity
      onPress={() => buyPack(itemId, initialCost, plusClick)}
      style={[styles.itemBuy, isTablet && styles.itemBuyTablet]}
    >
      <View style={styles.container}>
        <Image
          source={image}
          style={[styles.image, isTablet && styles.imageTablet]}
        />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.cost}>11,99$</Text>
        <Text style={styles.cost}>{initialCost}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemBuy: {
    marginBottom: 20,
  },
  itemBuyTablet: {
    marginBottom: 25,
  },
  container: {
    flexDirection: "column",
    alignItems: "center",
  },
  image: {
    objectFit: "contain",
    width: 170,
    height: 220,
    marginRight: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 5,
    shadowOpacity:1,
  },
  imageTablet: {
    width: "50%",
    height: 240,
  },
  title: {
    fontSize: 27,
    fontWeight: "bold",
    color: "#f2f2f2",
    fontFamily: "ProtestRevolution-Regular",
  },
  cost: {
    fontFamily: "ProtestRevolution-Regular",
    fontSize: 20,
    marginTop: 5,
    color: "#f2f2f2",
    fontWeight: "bold",
  },
});

export default Pack;
