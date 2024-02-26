import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Modal,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  Text,
} from "react-native";
import Background from "./assets/game_imgs/backgroundGame.jpg";
import Coin from "./components/Coin";
import Header from "./components/Header";
import Icon from "react-native-vector-icons/FontAwesome";
import StoreItem from "./components/StoreItems";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";

// const windowWidth = Dimensions.get("window").width;
// const windowHeight = Dimensions.get("window").height;

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [click, setClick] = useState(1.0);
  const [coins, setCoins] = useState(0.0);
  const [coinsPS, setCoinsPS] = useState(0.0);
  const [itemQuantities, setItemQuantities] = useState({});
  const formattedCoins = coins % 1 === 0 ? coins.toFixed(0) : coins.toFixed(2);
  const displayCoins = parseFloat(formattedCoins).toString();
  let fontSize = 24;

  if (displayCoins.length > 6) {
    fontSize = 18; 
  }

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
      console.log("SLAVOU: " + click.toString())
      console.log("SLAVOU: " + coins.toString())
      console.log("SLAVOU: " + coinsPS.toString())
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

  // const addClick = (value) => {
  //   setClick(click + value);
  // };

  const buyItem = (itemId, itemCost, plusClick) => {
    final = (itemCost * (1.3 * itemQuantities[itemId] || 0) || itemCost);
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
          <LinearGradient
            colors={["#5c0000", "#1c0000"]}
            style={styles.ModalHeader}
          >
            <Text style={[styles.textModalShop, { fontSize }]}>
              {displayCoins} Evil Coins!
            </Text>
            <TouchableOpacity onPress={closeModal} style={styles.close}>
              <Icon name="close" size={25} color="#000" />
            </TouchableOpacity>
          </LinearGradient>
          <ScrollView style={styles.scrollContainer}>
            <TouchableOpacity>
              <StoreItem
                itemId="livro-das-moedas"
                image={require("./assets/game_imgs/storeItems/coinBook.jpeg")}
                title="Livro das Moedas"
                initialCost={100}
                coins={coins}
                plusClick={0.3}
                quantity={itemQuantities["livro-das-moedas"] || 0}
                setCoins={setCoins}
                buyItem={buyItem}
              />
            </TouchableOpacity>

            <TouchableOpacity>
              <StoreItem
                itemId="castelo"
                image={require("./assets/game_imgs/storeItems/Castle.jpeg")}
                title="Castelo"
                initialCost={500}
                coins={coins}
                plusClick={0.5}
                quantity={itemQuantities["castelo"] || 0}
                setCoins={setCoins}
                buyItem={(itemId, itemCost, plusClick) =>
                  buyItem(itemId, itemCost, plusClick)
                }
              />
            </TouchableOpacity>

            <TouchableOpacity>
              <StoreItem
                itemId="o-colecionador"
                image={require("./assets/game_imgs/storeItems/Collector.jpeg")}
                title="O Colecionador"
                initialCost={1000}
                coins={coins}
                plusClick={1}
                quantity={itemQuantities["o-colecionador"] || 0}
                setCoins={setCoins}
                buyItem={(itemId, itemCost, plusClick) =>
                  buyItem(itemId, itemCost, plusClick)
                }
              />
            </TouchableOpacity>

            <TouchableOpacity>
              <StoreItem
                itemId="deep-factory"
                image={require("./assets/game_imgs/storeItems/DeeperFactory.jpeg")}
                title="Fábrica das Profundezas"
                initialCost={10000}
                coins={coins}
                plusClick={1}
                quantity={itemQuantities["deep-factory"] || 0}
                setCoins={setCoins}
                buyItem={(itemId, itemCost, plusClick) =>
                  buyItem(itemId, itemCost, plusClick)
                }
              />
            </TouchableOpacity>

            <TouchableOpacity>
              <StoreItem
                itemId="s-hell-factory"
                image={require("./assets/game_imgs/storeItems/S-HellFactory.jpeg")}
                title="Fábrica do Inferno P"
                initialCost={50000}
                coins={coins}
                plusClick={1}
                quantity={itemQuantities["s-hell-factory"] || 0}
                setCoins={setCoins}
                buyItem={(itemId, itemCost, plusClick) =>
                  buyItem(itemId, itemCost, plusClick)
                }
              />
            </TouchableOpacity>

            <TouchableOpacity>
              <StoreItem
                itemId="m-hell-factory"
                image={require("./assets/game_imgs/storeItems/M-HellFactory.jpeg")}
                title="Fábrica do Inferno M"
                initialCost={200000}
                coins={coins}
                plusClick={1}
                quantity={itemQuantities["m-hell-factory"] || 0}
                setCoins={setCoins}
                buyItem={(itemId, itemCost, plusClick) =>
                  buyItem(itemId, itemCost, plusClick)
                }
              />
            </TouchableOpacity>

            <TouchableOpacity>
              <StoreItem
                itemId="x-hell-factory"
                image={require("./assets/game_imgs/storeItems/X-HellFactory.jpeg")}
                title="Fábrica do Inferno G"
                initialCost={500000}
                coins={coins}
                plusClick={1}
                quantity={itemQuantities["x-hell-factory"] || 0}
                setCoins={setCoins}
                buyItem={(itemId, itemCost, plusClick) =>
                  buyItem(itemId, itemCost, plusClick)
                }
              />
            </TouchableOpacity>

            <TouchableOpacity>
              <StoreItem
                itemId="dementador"
                image={require("./assets/game_imgs/storeItems/Dementor.jpeg")}
                title="Dementador"
                initialCost={1000000}
                coins={coins}
                plusClick={1}
                quantity={itemQuantities["dementador"] || 0}
                setCoins={setCoins}
                buyItem={(itemId, itemCost, plusClick) =>
                  buyItem(itemId, itemCost, plusClick)
                }
              />
            </TouchableOpacity>

            <TouchableOpacity>
              <StoreItem
                itemId="guardian"
                image={require("./assets/game_imgs/storeItems/Guardian.jpeg")}
                title="Guardião"
                initialCost={5000000}
                coins={coins}
                plusClick={1}
                quantity={itemQuantities["guardian"] || 0}
                setCoins={setCoins}
                buyItem={(itemId, itemCost, plusClick) =>
                  buyItem(itemId, itemCost, plusClick)
                }
              />
            </TouchableOpacity>

            <TouchableOpacity>
              <StoreItem
                itemId="hacker"
                image={require("./assets/game_imgs/storeItems/Hacker.jpeg")}
                title="Hacker do Inferno"
                initialCost={30000000}
                coins={coins}
                plusClick={1}
                quantity={itemQuantities["hacker"] || 0}
                setCoins={setCoins}
                buyItem={(itemId, itemCost, plusClick) =>
                  buyItem(itemId, itemCost, plusClick)
                }
              />
            </TouchableOpacity>

            <TouchableOpacity>
              <StoreItem
                itemId="krampus"
                image={require("./assets/game_imgs/storeItems/Krampus.jpeg")}
                title="Krampus"
                initialCost={70000000}
                coins={coins}
                plusClick={1}
                quantity={itemQuantities["krampus"] || 0}
                setCoins={setCoins}
                buyItem={(itemId, itemCost, plusClick) =>
                  buyItem(itemId, itemCost, plusClick)
                }
              />
            </TouchableOpacity>

            <TouchableOpacity>
              <StoreItem
                itemId="skelleton"
                image={require("./assets/game_imgs/storeItems/Skelleton.jpeg")}
                title="Morte das Moedas"
                initialCost={70000000}
                coins={coins}
                plusClick={1}
                quantity={itemQuantities["skelleton"] || 0}
                setCoins={setCoins}
                buyItem={(itemId, itemCost, plusClick) =>
                  buyItem(itemId, itemCost, plusClick)
                }
              />
            </TouchableOpacity>
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
