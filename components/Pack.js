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
  buyItem,
  itemId,
  quantity,
}) => {
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const { width, height } = Dimensions.get("window");
    const aspectRatio = height / width;
    setIsTablet(aspectRatio < 1.6);
  }, []);

  return (
    <TouchableOpacity
      onPress={() => buyItem(itemId, initialCost, plusClick)}
      style={[styles.itemBuy, isTablet && styles.itemBuyTablet]}
    >
      <View style={styles.container}>
        <Image
          source={image}
          style={[styles.image, isTablet && styles.imageTablet]}
        />
      </View>
    </TouchableOpacity>
  );
};

StoreItem.propTypes = {
  image: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  initialCost: PropTypes.number.isRequired,
  coins: PropTypes.number.isRequired,
  setCoins: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  coin: {
    width: 25,
    height: 25,
    objectFit: "contain",
  },
  custo: {
    flexDirection: "row",
    gap: 10,
  },
  itemBuy: {
    backgroundColor: "#0c0c0c",
    marginBottom: 15,
    borderRadius: 10,
  },
  itemBuyTablet: {
    marginBottom: 20,
    backgroundColor: "#0c0c0c",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 3,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  imageTablet: {
    width: 140,
    height: 140,
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 20,
    padding: 10,
  },
  detailsTablet: {
    marginRight: 50,
  },
  title: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#f2f2f2",
    fontFamily: "ProtestRevolution-Regular",
  },
  cost: {
    fontFamily: "ProtestRevolution-Regular",
    fontSize: 16,
    marginTop: 5,
    color: "#f2f2f2",
    fontWeight: "bold",
  },
  quantity: {
    fontFamily: "ProtestRevolution-Regular",
    fontSize: 16,
    color: "#f2f2f2",
    fontWeight: "bold",
  },
  buySection: {
    alignSelf: "flex-end",
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: "center",
  },
  detailsAndBuy: {
    flexDirection: "column",
    flex: 1,
  },
  twoSide: {
    flexDirection: "column",
    gap: 10,
  },
});

export default Pack;
