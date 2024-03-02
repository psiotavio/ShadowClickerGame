import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";

const CardSlot = ({ card, onPress }) => {
  return (
    <TouchableOpacity style={[styles.container, !card && styles.emptyContainer]} onPress={onPress}>
      {card && <Image source={card.image} style={styles.image} />}
    </TouchableOpacity>
  );
};



const styles = StyleSheet.create({
  container: {
    borderWidth: 3,
    borderColor: "red",
    borderRadius: 10,
    width: 90,
    height: 160,
  },
  emptyContainer: {
    borderWidth: 3,
    borderColor: "#ffffff",
    borderRadius: 10,
    backgroundColor: "transparent",
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 10,
    width: 85,
    height: 190,
    resizeMode: "cover",
    backgroundColor: "purple"
  },
});

export default CardSlot;






 
