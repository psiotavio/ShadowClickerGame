import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";

const Card = ({
  image,
  title,
  style,
  styleFont,
  cardSize,
  onPress
}) => {
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const { width, height } = Dimensions.get("window");
    const aspectRatio = height / width;
    setIsTablet(aspectRatio < 1.6);
  }, []);

  return (
    <TouchableOpacity
      style={[styles.itemBuy, isTablet && styles.itemBuyTablet, style]}
      onPress={onPress}
    >
      <View style={styles.container}>
        <Image
          source={image}
          style={[styles.image, isTablet && styles.imageTablet, cardSize]}
        />
        <Text style={[styles.title, styleFont]}>{title}</Text>
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
    width: 170,
    height: 220,
    marginRight: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 5,
    shadowOpacity: 1,
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
});

export default Card;
