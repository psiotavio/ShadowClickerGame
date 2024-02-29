import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Modal,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
  Text as RNText,
  Text,
} from "react-native";
import Background from "./assets/game_imgs/backgroundGame.jpg";
import Coin from "./components/Coin";
import Header from "./components/Header";
import Icon from "react-native-vector-icons/FontAwesome";
import StoreItem from "./components/StoreItems";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import * as Font from "expo-font";
import { getItems } from "./getObjects/item";
import Pack from "./components/Pack";
import { getPacks } from "./getObjects/pack";


export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [CardsModalVisible, setCardsModalVisible] = useState(false);
  const [click, setClick] = useState(1.0);
  const [coins, setCoins] = useState(0.0);
  const [coinsPS, setCoinsPS] = useState(0.0);
  const [itemQuantities, setItemQuantities] = useState({});
  const formattedCoins = coins % 1 === 0 ? coins.toFixed(0) : coins.toFixed(2);
  const displayCoins = parseFloat(formattedCoins).toString();

  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await new Promise((resolve) => setTimeout(resolve, 2500));

      await Font.loadAsync({
        "ProtestRevolution-Regular": require("./assets/fonts/ProtestRevolution-Regular.ttf"),
      });

      setFontLoaded(true);
    }

    loadFonts();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCoins(coins + coinsPS);
    }, 1000);

    return () => clearInterval(interval);
  });

  useEffect(() => {
    loadGameState();
  }, []);

  useEffect(() => {
    saveGameState();
  }, [click, coins, itemQuantities]);

  const loadGameState = async () => {
    try {
      const savedClick = await AsyncStorage.getItem("click");
      const savedCoins = await AsyncStorage.getItem("coins");
      const savedCoinsPS = await AsyncStorage.getItem("coinsPS");
      const savedItemQuantities = await AsyncStorage.getItem("itemQuantities");

      if (savedClick !== null) {
        setClick(parseFloat(savedClick));
      }
      if (savedCoins !== null) {
        setCoins(parseFloat(savedCoins));
      }
      if (savedCoinsPS !== null) {
        setCoinsPS(parseFloat(savedCoinsPS));
      }

      if (savedItemQuantities !== null) {
        setItemQuantities(JSON.parse(savedItemQuantities));
      }
    } catch (error) {
      console.error("Erro ao carregar dados do AsyncStorage: ", error);
    }
  };
  // Salvar dados no AsyncStorage
  const saveGameState = async () => {
    try {
      await AsyncStorage.setItem("click", click.toString());
      await AsyncStorage.setItem("coins", coins.toString());
      await AsyncStorage.setItem("coinsPS", coinsPS.toString()); // Salva coinsPS
      console.log("SLAVOU: " + click.toString());
      console.log("SLAVOU: " + coins.toString());
      console.log("SLAVOU: " + coinsPS.toString());
      await AsyncStorage.setItem(
        "itemQuantities",
        JSON.stringify(itemQuantities)
      );
    } catch (error) {
      console.error("Erro ao salvar dados no AsyncStorage: ", error);
    }
  };

  const incrementCoins = () => {
    setCoins(coins + click);
    console.log("CLICOU GANHOU: + " + click);
  };

  const resetCoins = () => {
    setCoinsPS(0.0);
    setCoins(0.0); // Reinicia para 0.0
    setClick(1); // Reinicia para 1.0
    setItemQuantities({}); // Reinicia para um objeto vazio
    console.log("!! RESETOU TUDO !!");
  };

  const magicButton = () => {
    setCoins(1000);
    console.log("!! GANHOU TUDO !!");
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const openCardsModal = () => {
    setCardsModalVisible(true);
  };

  const carsModalClose = () => {
    setCardsModalVisible(false);
  };

  // const addClick = (value) => {
  //   setClick(click + value);
  // };

  function getItemsList() {
    const items = getItems()
    return Object.keys(items).map((key) => ({...items[key], id: key}))
  }

  const buyItem = (itemId, itemCost, plusClick) => {
    final = itemCost * (1.3 * itemQuantities[itemId] || 0) || itemCost;
    if (coins >= final) {
      console.log(".");
      console.log("COMPROU O ITEM: " + itemId);
      console.log("QUE CUSTA: " + final);
      console.log("E O CLIQUE AUMENTOU: " + plusClick);
      console.log("VOCE TEM:" + itemQuantities[itemId]);
      console.log(".");
      setCoins(coins - final);
      setCoinsPS(coinsPS + plusClick);
      setItemQuantities((prevQuantities) => ({
        ...prevQuantities,
        [itemId]: (prevQuantities[itemId] || 0) + 1,
      }));
    } else {
      alert("Você não tem moedas suficientes para comprar este item!");
    }
  };
  if (!fontLoaded) {
    // Renderiza a tela de carregamento enquanto a fonte está sendo carregada
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LinearGradient
          colors={["#242424", "#000"]}
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <ActivityIndicator size="large" color="red" />
          <Text style={{ color: "white", fontWeight: "bold" }}>
            Carregando...
          </Text>
        </LinearGradient>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Image source={Background} style={styles.backgroundImage} />
      <View style={styles.header}>
        <Header coinse={coins} coinsPS={coinsPS} />
      </View>
      <Coin incrementCoins={incrementCoins} />
      <TouchableOpacity onPress={resetCoins}>
        <Icon name="circle" size={60} color="green" />
      </TouchableOpacity>
      <TouchableOpacity onPress={magicButton}>
        <Icon name="circle" size={60} color="blue" />
      </TouchableOpacity>

      <View style={styles.bottomBar}>
        <TouchableOpacity onPress={openModal}>
          <Icon name="shopping-bag" size={60} color="#f2f2f2" />
        </TouchableOpacity>

        <TouchableOpacity onPress={openCardsModal}>
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
          <LinearGradient
            colors={["#5c0000", "#1c0000"]}
            style={styles.ModalHeader}
          >
            <RNText style={styles.textModalShop}>
              {displayCoins} Evil Coins!
            </RNText>
            <TouchableOpacity onPress={closeModal} style={styles.close}>
              <Icon name="close" size={25} color="#000" />
            </TouchableOpacity>
          </LinearGradient>
          <ScrollView style={styles.scrollContainer}>
            {getItemsList().map((item) => (
              <TouchableOpacity key={item.id}>
                {/* {console.log(
                  "Caminho da imagem completa:",
                  itemData[itemId].image
                )} */}

                <StoreItem
                  itemId={item.id}
                  image={item.image}
                  title={item.title}
                  initialCost={item.initialCost}
                  coins={coins}
                  plusClick={item.plusClick}
                  quantity={itemQuantities[item.id] || 0}
                  setCoins={setCoins}
                  buyItem={() => buyItem(item.id, item.initialCost, item.plusClick)}
                />
              </TouchableOpacity>
            ))}
            <View style={styles.marginEnd}></View>
          </ScrollView>
        </View>
      </Modal>


      <Modal
        animationType="slide"
        transparent={true}
        visible={carsModal}
        onRequestClose={carsModalClose}
      >
        <View style={styles.modalContainer}>
          <LinearGradient
            colors={["#5c0000", "#1c0000"]}
            style={styles.ModalHeader}
          >
            <RNText style={styles.textModalShop}>
              {displayCoins} Evil Coins!
            </RNText>
            <TouchableOpacity onPress={carsModalClose} style={styles.close}>
              <Icon name="close" size={25} color="#000" />
            </TouchableOpacity>
          </LinearGradient>
          <ScrollView style={styles.scrollContainer}>
            {getItemsList().map((item) => (
              <TouchableOpacity key={item.id}>
                {/* {console.log(
                  "Caminho da imagem completa:",
                  itemData[itemId].image
                )} */}

                <StoreItem
                  itemId={item.id}
                  image={item.image}
                  title={item.title}
                  initialCost={item.initialCost}
                  coins={coins}
                  plusClick={item.plusClick}
                  quantity={itemQuantities[item.id] || 0}
                  setCoins={setCoins}
                  buyItem={() => buyItem(item.id, item.initialCost, item.plusClick)}
                />
              </TouchableOpacity>
            ))}
            <View style={styles.marginEnd}></View>
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
    justifyContent: "center",
    paddingTop: 40,
    margin: "auto",
    width: "100%",
    height: "18%",
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
  },
  scrollContainer: {
    width: "100%",
    maxHeight: "100%",
    backgroundColor: "#4c0000",
    padding: 15,
  },
  close: {
    opacity: 0.7,
    position: "absolute",
    right: 30,
    top: 65,
    width: 35,
    height: 35,
    borderRadius: 100,
    backgroundColor: "#d1d1d1",
    justifyContent: "center",
    alignItems: "center",
  },
  ModalHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    paddingTop: 50,
    backgroundColor: "#5c0000",
  },
  textModalShop: {
    fontFamily: "ProtestRevolution-Regular",
    alignSelf: "center",
    flex: 1,
    marginTop: 25,
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    padding: 10,
  },
  marginEnd: {
    paddingBottom: 40,
  },
});
