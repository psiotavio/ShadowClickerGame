import React, { useState, useEffect } from "react";
import { Audio } from "expo-av";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import PropTypes from "prop-types";

const StoreItem = ({
  image,
  title,
  initialCost,
  plusClick,
  buyItem,
  itemId,
  quantity,
  finalCosto,
}) => {
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const { width, height } = Dimensions.get("window");
    const aspectRatio = height / width;
    setIsTablet(aspectRatio < 1.6);
  }, []);

  // Calcula o custo final com base no custo inicial e na quantidade comprada
  const finalCost = Math.ceil(
    initialCost * Math.pow(1.3, quantity)
  ).toLocaleString();

  const handleClick = async () => {
    const clickSound = new Audio.Sound();

    try {
      await clickSound.loadAsync(require("../assets/sounds/click.mp3"));
      await clickSound.setStatusAsync({ positionMillis: 310 });
      await clickSound.setVolumeAsync(1);
      await clickSound.playAsync();
    } catch (error) {
      console.error("Erro ao reproduzir o som:", error);
    }
  };

  return (
    <TouchableOpacity
      onPress={() => {
        buyItem(itemId, initialCost, plusClick);
        handleClick();
      }}
      style={[styles.itemBuy, isTablet && styles.itemBuyTablet]}
    >
      <View style={styles.container}>
        <Image
          source={image}
          style={[styles.image, isTablet && styles.imageTablet]}
        />
        <View style={styles.detailsAndBuy}>
          <View style={[styles.details, isTablet && styles.detailsTablet]}>
            <View style={styles.twoSide}>
              <Text style={styles.title}>{title}</Text>

              <View style={styles.custo}>
                <Image
                  source={require("../assets/game_imgs/coin.png")}
                  style={styles.coin}
                />
                <Text style={styles.cost}>{finalCost}</Text>
              </View>
            </View>

            <View style={styles.twoSide}>
              <Text style={styles.quantity}>Level: {quantity}</Text>
              <Text style={styles.cost}>CPS: +{plusClick}</Text>
            </View>
          </View>
        </View>
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

export default StoreItem;
