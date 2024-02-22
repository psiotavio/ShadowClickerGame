import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import Background from "./assets/game_imgs/backgroundGame.jpg";
import Coin from "./components/Coin";
import Header from "./components/Header";
import Icon from "react-native-vector-icons/FontAwesome";
import StoreItem from "./components/StoreItems";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [click, setClick] = useState(1.0); // Valor inicial como float
  const [coins, setCoins] = useState(0.0); // Valor inicial como float
  const [itemQuantities, setItemQuantities] = useState({}); // Estado para armazenar as quantidades dos itens comprados

  const incrementCoins = () => {
    setCoins(coins + click);
    console.log("CLICOU GANHOU: + " + click)
  };

  const resetCoins = () => {
    setCoins(0.0); // Reinicia para 0.0
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const addClick = (value) => {
    setClick(click + value);
  };

  const buyItem = (itemId, itemCost, plusClick) => {
    if (coins >= itemCost) {
      console.log(".");
      console.log("COMPROU O ITEM: " + itemId);
      console.log("QUE CUSTA: " + itemCost);
      console.log("E O CLIQUE AUMENTOU: " + plusClick);
      console.log(".");
      setCoins(coins - itemCost);
      setClick(click + plusClick); // Aumenta o click ao comprar
      setItemQuantities((prevQuantities) => ({
        ...prevQuantities,
        [itemId]: (prevQuantities[itemId] || 0) + 1,
      }));
    } else {
      alert("Você não tem moedas suficientes para comprar este item!");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={Background} style={styles.backgroundImage} />
      <View style={styles.header}>
        <Header coinse={coins} />
      </View>
      <Coin incrementCoins={incrementCoins} />
      <TouchableOpacity onPress={resetCoins}>
        <Icon name="circle" size={60} color="green" />
      </TouchableOpacity>

      <View style={styles.bottomBar}>
        <TouchableOpacity onPress={openModal}>
          <Icon name="shopping-bag" size={60} color="#f2f2f2" />
        </TouchableOpacity>

        <TouchableOpacity>
          <Icon name="shopping-cart" size={60} color="#f2f2f2" />
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <ScrollView style={styles.scrollContainer}>
            <TouchableOpacity onPress={closeModal} style={styles.close}>
              <Icon name="close" size={25} color="#000" />
            </TouchableOpacity>

            <TouchableOpacity>
              <StoreItem
                itemId="livro-das-moedas"
                image={require("./assets/game_imgs/storeItems/coinBook.jpeg")}
                title="Livro das Moedas"
                cost={50}
                coins={coins}
                plusClick={0.2}
                quantity={itemQuantities["Olho-da-morte"] || 0}
                setCoins={setCoins}
                buyItem={buyItem} 
              />
            </TouchableOpacity>

            <TouchableOpacity>
              <StoreItem
                itemId="castelo"
                image={require("./assets/game_imgs/storeItems/Castle.jpeg")}
                title="Castelo"
                cost={100}
                coins={coins}
                plusClick={0.5}
                quantity={itemQuantities["zombie"] || 0}
                setCoins={setCoins}
                buyItem={(itemId, itemCost, plusClick) =>
                  buyItem(itemId, itemCost, plusClick)
                } // Passa a função buyItem e o valor de plusClick
              />
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    position: "absolute",
    top: 0,
    paddingTop: 55,
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.95)",
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "rgba(30, 0, 0, 0.9)",
    position: "absolute",
    bottom: 0,
    padding: 30,
    width: "100%",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)", // cor de fundo transparente
  },
  scrollContainer: {
    width: "95%",
    maxHeight: "70%",
    backgroundColor: "rgba(30,10,10,0.95)",
    borderRadius: 10,
    padding: 20,
  },
  close: {
    marginBottom: 25,
    opacity: 0.7,
    alignSelf: "flex-end",
    width: 35,
    height: 35,
    borderRadius: "100%",
    backgroundColor: "#d1d1d1",
    justifyContent: "center",
    alignItems: "center",
  },
});