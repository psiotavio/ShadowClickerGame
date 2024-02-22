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

const StoreItem = ({
  image,
  title,
  description,
  cost,
  coins,
  plusClick,
  setCoins,
  buyItem, // Recebendo a função buyItem como uma propriedade
  itemId, // Recebendo o ID do item como uma propriedade
  quantity, // Recebendo a quantidade como uma propriedade
}) => {
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const { width, height } = Dimensions.get("window");
    const aspectRatio = height / width;
    setIsTablet(aspectRatio < 1.6); // Se o aspect ratio for menor que 1.6, é considerado um tablet
  }, []);

  return (
    <TouchableOpacity
      onPress={() => buyItem(itemId, cost, plusClick)}
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
                <Text style={styles.cost}>{cost}</Text>
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
  cost: PropTypes.number.isRequired,
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
    backgroundColor: "#0C0C0C",
    marginBottom: 8,
    borderRadius: 10,
  },
  itemBuyTablet: {
    marginBottom: 20,
    backgroundColor: "#1a1a1a", // Estilos específicos para tablets
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 70,
    height: 70,
    marginRight: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  imageTablet: {
    width: 140, // Tamanho da imagem para tablets
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
  },
  cost: {
    fontSize: 16,
    marginTop: 5,
    color: "#f2f2f2",
    fontWeight: "bold",
  },
  quantity: {
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
