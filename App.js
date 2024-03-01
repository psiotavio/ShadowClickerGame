import React, { useState, useEffect } from "react";
import { Asset } from 'expo-asset';
import { StatusBar } from "expo-status-bar";
import { ProgressBar,MD3Colors } from "react-native-paper";
import {
  View,
  Modal,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Text as RNText,
  Text,
  Animated,
  ImageBackground,
} from "react-native";
import Background from "./assets/game_imgs/backgroundGame.jpg";
import BackgroundStoreCoin from "./assets/game_imgs/itemStoreBKG.jpg";
import BackgroundStorePacks from "./assets/game_imgs/packStoreBKG.jpg";
import Coin from "./components/Coin";
import Header from "./components/Header";
import Icon from "react-native-vector-icons/FontAwesome";
import StoreItem from "./components/StoreItems";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import * as Font from "expo-font";
import { getItems } from "./item";
import Pack from "./components/Pack";
import { getPacks } from "./pack";

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
  const [assetLoaded, setAssetLoaded] = useState(false);
  const [flashVisible, setFlashVisible] = useState(false);
  const [animation] = useState(new Animated.Value(0));
  const [clickedPackColor, setClickedPackColor] = useState(null);

  const handleFlashEffectWrapper = (color) => () => {
    handleFlashEffect(color);
  };

  const handleFlashEffect = () => {
    console.log("Flash acionado!", clickedPackColor);
    setFlashVisible(true);
    console.log("setFlashVisible(true) chamado");
    setTimeout(() => {
      setFlashVisible(false);
      console.log("setFlashVisible(false) chamado");
    }, 4000);
  };

  useEffect(() => {
    if (flashVisible) {
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.delay(2000),
        Animated.timing(animation, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start(() => setFlashVisible(false));
    }
  }, [flashVisible, animation]);

  useEffect(() => {
    async function loadFonts() {
      await new Promise((resolve) => setTimeout(resolve, 2500));

      await Font.loadAsync({
        "ProtestRevolution-Regular": require("./assets/fonts/ProtestRevolution-Regular.ttf"),
      });

      setFontLoaded(true);
    }

    loadFonts();
    console.log("CARREGOU")
  }, []);

  useEffect(() => {
    async function loadAssets() {
      await new Promise((resolve) => setTimeout(resolve, 4000));
  
      console.log("CARREGOU IMAGEM"),
      await Asset.loadAsync([
        require("./assets/game_imgs/backgroundGame.jpg"),
        require("./assets/game_imgs/coin.png"),
        require("./assets/game_imgs/itemStoreBKG.jpg"),
        require("./assets/game_imgs/packStoreBKG.jpg"),
        require("./assets/game_imgs/packCards/pack1.png"),
        require("./assets/game_imgs/packCards/pack2.png"),
        require("./assets/game_imgs/packCards/pack3.png"),
        require("./assets/game_imgs/packCards/pack4.png"),
        require("./assets/game_imgs/storeItems/Castle.jpeg"),
        require("./assets/game_imgs/storeItems/coinBook.jpeg"),
        require("./assets/game_imgs/storeItems/Collector.jpeg"),
        require("./assets/game_imgs/storeItems/DeeperFactory.jpeg"),
        require("./assets/game_imgs/storeItems/Dementor.jpeg"),
        require("./assets/game_imgs/storeItems/Guardian.jpeg"),
        require("./assets/game_imgs/storeItems/Hacker.jpeg"),
        require("./assets/game_imgs/storeItems/Krampus.jpeg"),
        require("./assets/game_imgs/storeItems/M-HellFactory.jpeg"),
        require("./assets/game_imgs/storeItems/S-HellFactory.jpeg"),
        require("./assets/game_imgs/storeItems/Skelleton.jpeg"),
        require("./assets/game_imgs/storeItems/X-HellFactory.jpeg"),
      ]);
  
      setAssetLoaded(true);
    }
  
    loadAssets();
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

  const cardsModalClose = () => {
    setCardsModalVisible(false);
  };

  // const addClick = (value) => {
  //   setClick(click + value);
  // };

  function getItemsList() {
    const items = getItems();
    return Object.keys(items).map((key) => ({ ...items[key], id: key }));
  }
  function getPacksList() {
    const packs = getPacks();
    return Object.keys(packs).map((key) => ({ ...packs[key], id: key }));
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

  const buyPack = (itemId, itemCost) => {
    if (coins >= itemCost) {
      console.log(".");
      console.log("COMPROU O ITEM: " + itemId);
      console.log("QUE CUSTA: " + itemCost);
      console.log(".");
      setCoins(coins - itemCost);
      handleFlashEffect(); // Chama o efeito de flash após a compra bem-sucedida
    } else {
      alert("Você não tem moedas suficientes para comprar este item!");
    }
  };

  if (!fontLoaded && !assetLoaded) {
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
          <ProgressBar progress={0.9} color={MD3Colors.error50} style={{ height: 7, width: 250, borderRadius: 10, marginBottom:20 }} />

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
            <ImageBackground
              source={BackgroundStoreCoin}
              resizeMode="cover"
              style={styles.BackgroundStores}
            >
              {getItemsList().map((item) => (
                <TouchableOpacity key={item.id}>
                  <StoreItem
                    itemId={item.id}
                    image={item.image}
                    title={item.title}
                    initialCost={item.initialCost}
                    coins={coins}
                    plusClick={item.plusClick}
                    quantity={itemQuantities[item.id] || 0}
                    setCoins={setCoins}
                    buyItem={() =>
                      buyItem(item.id, item.initialCost, item.plusClick)
                    }
                  />
                </TouchableOpacity>
              ))}
              <View style={styles.marginEnd}></View>
            </ImageBackground>
          </ScrollView>
        </View>
      </Modal>

      {/* MODAL DE CARTAS  */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={CardsModalVisible}
        onRequestClose={cardsModalClose}
      >
        {flashVisible && (
          <Animated.View
            style={[
              StyleSheet.absoluteFill,
              {
                display: "flex",
                zIndex: 999,
                backgroundColor: clickedPackColor,
                opacity: animation,
              },
            ]}
          />
        )}

        <View style={styles.modalContainer}>
          <LinearGradient
            colors={["#303030", "#000"]}
            style={styles.ModalHeader}
          >
            <RNText style={styles.textModalShop}>
              {displayCoins} Evil Coins!
            </RNText>
            <TouchableOpacity onPress={cardsModalClose} style={styles.close}>
              <Icon name="close" size={25} color="#000" />
            </TouchableOpacity>
          </LinearGradient>
          <ScrollView style={styles.scrollContainerCards}>
            <ImageBackground
              source={BackgroundStorePacks}
              resizeMode="cover"
              style={styles.BackgroundStores}
            >
              <View style={styles.PacksSection}>
                {getPacksList().map((pack) => {
                  return (
                    <TouchableOpacity key={pack.id} onPress={handleFlashEffect}>
                      <Pack
                        itemId={pack.id}
                        image={pack.image}
                        title={pack.title}
                        initialCost={pack.initialCost}
                        plusClick={0}
                        buyPack={() =>
                          buyPack(
                            pack.id,
                            pack.initialCost,
                            pack.plusClick,
                            setClickedPackColor(pack.color)
                          )
                        }
                      />
                    </TouchableOpacity>
                  );
                })}
              </View>

              <View style={styles.marginEnd}></View>
            </ImageBackground>
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
    backgroundColor: "#360000",
  },
  BackgroundStores: {
    paddingHorizontal: 15,
    paddingVertical: 80,
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
    paddingBottom: 50,
  },
  PacksSection: {
    display: "flex",
    justifyContent: "center",
    gap: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
  },
  scrollContainerCards: {
    width: "100%",
    maxHeight: "100%",
    backgroundColor: "#272727",
  },
});
