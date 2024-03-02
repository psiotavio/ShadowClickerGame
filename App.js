import React, { useState, useEffect } from "react";
import { Audio } from 'expo-av';
import { Asset } from "expo-asset";
import { StatusBar } from "expo-status-bar";
import { ProgressBar, MD3Colors } from "react-native-paper";
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
  Alert,
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
import CardSlot from "./components/CardSlot";
import { getPacks } from "./pack";
import { getCards } from "./card";

import ModalCard from "./components/CardsModal";
import Card from "./components/Card";

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [PackModalVisible, setPackModalVisible] = useState(false);
  const [click, setClick] = useState(1.0);
  const [coins, setCoins] = useState(0.0);
  const [coinsPS, setCoinsPS] = useState(0.0);
  const [powerUp, setPowerUp] = useState(1.0);
  const [coinsPSbefore, setCoinsPSBefore] = useState(0.0);
  const [itemQuantities, setItemQuantities] = useState({});
  const formattedCoins = coins % 1 === 0 ? coins.toFixed(0) : coins.toFixed(2);
  const displayCoins = parseFloat(formattedCoins).toString();


  const [fontLoaded, setFontLoaded] = useState(false);
  const [assetLoaded, setAssetLoaded] = useState(false);
  const [flashVisible, setFlashVisible] = useState(false);
  const [animation] = useState(new Animated.Value(0));
  const [clickedPackColor, setClickedPackColor] = useState(null);

  const [DeckModalVisible, setDeckModalVisible] = useState(false); // Estado para controlar a visibilidade do CardModal
  const [cardModalVisible, setCardModalVisible] = useState(false); // Estado para controlar a visibilidade do CardModal
  const [selectedCards, setSelectedCards] = useState([]); // Estado para armazenar as cartas sorteadas
  const [cardsList, setCardsList] = useState([]);


  const [slots, setSlots] = useState(Array(3).fill(null)); // Inicializa os slots como vazios

  // const putCard = (card) => {
  //   // Verifica se o cartão já está presente em algum slot
  //   const isCardAlreadyInSlot = slots.includes(card);
  //   console.log("Cartão já está em um slot?", isCardAlreadyInSlot);

  //   // Encontra o primeiro slot vazio
  //   const emptySlotIndex = slots.findIndex((slot) => slot === null);
  //   console.log("Índice do primeiro slot vazio:", emptySlotIndex);

  //   // Verifica se o usuário possui a carta e se o slot está vazio
  //   if (card && card.owned && emptySlotIndex !== -1) {
  //     const updatedSlots = [...slots];
  //     updatedSlots[emptySlotIndex] = card;
  //     setSlots(updatedSlots);
  //     console.log("Cartão adicionado ao slot");
  //   } else {
  //     // Caso contrário, exibe uma mensagem de alerta
  //     alert("Você não possui essa carta ainda. Compre mais pacotes na loja.");
  //   }
  // };

  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardPress = (card) => {
    console.log(card.owned);
    if (card.owned == true) {
      setPowerUp(card.multiplicador); // Atualize o estado de powerUp
      console.log("MULTIPLICADOR: ", card.multiplicador, powerUp);
      Alert.alert("Tinha essa carta");
      setCoinsPSBefore(coinsPS);
      setCoinsPS(coinsPS * card.multiplicador); // Use card.multiplicador diretamente
      setSelectedCard(card);
    } else {
      Alert.alert("Compra mais cartas trouxinha");
    }

  };
  

  const handleSlotPress = () => {
    setCoinsPS(coinsPSbefore);
    setPowerUp(1.0)
    setSelectedCard(null);
  };

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
        Animated.delay(1500),
      ]).start(() => {
        setFlashVisible(false);
        setCardModalVisible(true);
      });
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
    console.log("CARREGOU");
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
          require("./assets/game_imgs/cards/AlterEgo.png"),
          
          require("./assets/game_imgs/cards/Blood Marry.png"),
          require("./assets/game_imgs/cards/Blood Witch.png"),
          require("./assets/game_imgs/cards/BloodPrinces.png"),
          require("./assets/game_imgs/cards/Dark Vampyra.png"),
          require("./assets/game_imgs/cards/Drakula.png"),
          require("./assets/game_imgs/cards/Red Witch.png"),
          require("./assets/game_imgs/cards/Subman.png"),
          require("./assets/game_imgs/cards/Vampyra.png")
        ]);
        console.log("VOU FAZER UMA MERDINHA AQUI ");

        // Aqui você pode incluir a lógica para carregar e reproduzir o áudio
        const soundObject = new Audio.Sound();
    
        try {
          // Carregar o arquivo de áudio
          await soundObject.loadAsync(require("./assets/sounds/gameMusic.mp3"));
    
          // Definir loop para true para reprodução em loop
          await soundObject.setIsLoopingAsync(true);

          await soundObject.setVolumeAsync(0.2);
    
          // Iniciar a reprodução do áudio
          await soundObject.playAsync();
        } catch (error) {
          console.log('Erro ao reproduzir o áudio:', error);
        }
    
        // Chame a função para carregar as cartas depois de carregar as imagens e o áudio
        getCards();
    
        // Indique que todos os ativos foram carregados
        setAssetLoaded(true);
    }

    loadAssets();
  }, []);


  // useEffect(() => {
  //   // Função para carregar e reproduzir o áudio
  //   async function playSound() {
  //     const soundObject = new Audio.Sound();

  //     try {
  //       // Carregar o arquivo de áudio
  //       await soundObject.loadAsync(require('./assets/sounds/gameMusic.mp3'));

  //       // Definir loop para true para reprodução em loop
  //       await soundObject.setIsLoopingAsync(true);

  

  //       // Iniciar a reprodução do áudio
  //       await soundObject.playAsync();
  //     } catch (error) {
  //       console.log('Erro ao reproduzir o áudio:', error);
  //     }
  //   }

  //   // Chamar a função para reproduzir o áudio quando o componente for montado
  //   playSound();

  //   // Retornar uma função de limpeza para interromper a reprodução ao desmontar o componente
  //   return () => {
  //     soundObject.stopAsync();
  //     soundObject.unloadAsync();
  //   };
  // }, []); // Executar o efeito apenas uma vez, passando um array vazio como segundo argumento

  

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
  }, [click, coins, coinsPS, itemQuantities, cardsList, selectedCard, coinsPSbefore, powerUp]);

  const loadGameState = async () => {
    try {
      const savedClick = await AsyncStorage.getItem("click");
      const savedCoins = await AsyncStorage.getItem("coins");
      const savedCoinsPS = await AsyncStorage.getItem("coinsPS");
      const savedCoinsPSBefore = await AsyncStorage.getItem("coinsPSbefore");
      const savedItemQuantities = await AsyncStorage.getItem("itemQuantities");
      const savedCardsList = await AsyncStorage.getItem("cardsList"); 
      const savedSelectedCard = await AsyncStorage.getItem("selectedCard");
      const savedPowerUp = await AsyncStorage.getItem("powerUp");
      
  
      if (savedClick !== null) {
        setClick(parseFloat(savedClick));
      }
      if (savedCoins !== null) {
        setCoins(parseFloat(savedCoins));
      }
      if (savedCoinsPS !== null) {
        setCoinsPS(parseFloat(savedCoinsPS));
      }
      if (savedCoinsPSBefore !== null) {
        setCoinsPSBefore(parseFloat(savedCoinsPSBefore));
      }
  
      if (savedItemQuantities !== null) {
        setItemQuantities(JSON.parse(savedItemQuantities));
      }
  
      if (savedCardsList !== null) {
        setCardsList(JSON.parse(savedCardsList)); // Alterado para definir a lista de cartas em cache
      }
      
      if (savedSelectedCard !== null) {
        setSelectedCard(JSON.parse(savedSelectedCard));
      }
      if (savedPowerUp !== null) {
        console.log("DEU CERTO O CARREGAMENTO", savedPowerUp)
        setPowerUp(parseFloat(savedPowerUp));
      }
    } catch (error) {
      console.error("Erro ao carregar dados do AsyncStorage: ", error);
    }
  };
  
  
 
const saveGameState = async () => {
  try {
    await AsyncStorage.setItem("click", click.toString());
    await AsyncStorage.setItem("coins", coins.toString());
    await AsyncStorage.setItem("coinsPS", coinsPS.toString());
    await AsyncStorage.setItem("powerUp", powerUp.toString());
    console.log("SALVOU ESSe power:", powerUp); 
    await AsyncStorage.setItem("coinsPSbefore", coinsPSbefore.toString());
    await AsyncStorage.setItem("itemQuantities", JSON.stringify(itemQuantities));
    await AsyncStorage.setItem("cardsList", JSON.stringify(cardsList));
    await AsyncStorage.setItem("selectedCard", JSON.stringify(selectedCard));

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
    setCardsList(cardsList.map((card) => ({ ...card, owned: false }))); // Define todas as cartas como 'owned = false'
    console.log("!! RESETOU TUDO !!");
  };

  const magicButton = () => {
    setCoins(1000);
    console.log("!! GANHOU TUDO !!");
  };

  const openModal = async () => {
    const clickSound = new Audio.Sound();

    try {
      await clickSound.loadAsync(require('./assets/sounds/click.mp3'));
      await clickSound.setStatusAsync({ positionMillis: 310 });
      await clickSound.setVolumeAsync(1);
      await clickSound.playAsync();
    } catch (error) {
      console.error('Erro ao reproduzir o som:', error);
    }

    setModalVisible(true);
  };

  const closeModal = async () => {
    const clickSound = new Audio.Sound();

    try {
      await clickSound.loadAsync(require('./assets/sounds/click.mp3'));
      await clickSound.setStatusAsync({ positionMillis: 310 });
      await clickSound.setVolumeAsync(1);
      await clickSound.playAsync();
    } catch (error) {
      console.error('Erro ao reproduzir o som:', error);
    }
    setModalVisible(false);
  };

  const openPacksModal  = async () => {
    const clickSound = new Audio.Sound();

    try {
      await clickSound.loadAsync(require('./assets/sounds/click.mp3'));
      await clickSound.setStatusAsync({ positionMillis: 310 });
      await clickSound.setVolumeAsync(1);
      await clickSound.playAsync();
    } catch (error) {
      console.error('Erro ao reproduzir o som:', error);
    }
    setPackModalVisible(true);
  };

  const packsModalClose  = async () => {
    const clickSound = new Audio.Sound();

    try {
      await clickSound.loadAsync(require('./assets/sounds/click.mp3'));
      await clickSound.setStatusAsync({ positionMillis: 310 });
      await clickSound.setVolumeAsync(1);
      await clickSound.playAsync();
    } catch (error) {
      console.error('Erro ao reproduzir o som:', error);
    }
    setPackModalVisible(false);
  };

  const openDeckModal = async () => {
    const clickSound = new Audio.Sound();

    try {
      await clickSound.loadAsync(require('./assets/sounds/click.mp3'));
      await clickSound.setStatusAsync({ positionMillis: 310 });
      await clickSound.setVolumeAsync(1);
      await clickSound.playAsync();
    } catch (error) {
      console.error('Erro ao reproduzir o som:', error);
    }
    setDeckModalVisible(true);
  };

  const DeckModalClose  = async () => {
    const clickSound = new Audio.Sound();

    try {
      await clickSound.loadAsync(require('./assets/sounds/click.mp3'));
      await clickSound.setStatusAsync({ positionMillis: 310 });
      await clickSound.setVolumeAsync(1);
      await clickSound.playAsync();
    } catch (error) {
      console.error('Erro ao reproduzir o som:', error);
    }
    setDeckModalVisible(false);
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


  function getCardsList() {
    if (!cardsList.length) { // Verifica se todos os cards têm owned como falso
        const cards = getCards();
        const newList = Object.keys(cards).map((key) => ({ ...cards[key], id: key }));
        setCardsList(newList); // Set the state of cardsList
        return newList;
    }
    return cardsList;
}


  
  function setCards(newList) {
      setCardsList(newList);
      cardsList = newList; // Atualiza a lista de cartas em cache
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

  // Função para sortear cartas
  function shuffle(array) {
    const shuffledArray = array.slice(); // Copiando o array para não modificar o original
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  }

  const buyPack = (itemId, itemCost, numberOfCards) => {
    if (coins >= itemCost) {
      console.log(".");
      console.log("COMPROU O ITEM: " + itemId);
      console.log("QUE CUSTA: " + itemCost);
      console.log(".");
      setCoins(coins - itemCost);
      handleFlashEffect(); // Chama o efeito de flash após a compra bem-sucedida

      // Sortear as cartas ao comprar o pacote
      const cards = getCardsList();
      const allCards = Object.values(cards);
      const shuffledCards = shuffle(allCards);
      const selectedCards = shuffledCards.slice(0, numberOfCards);

      // Atualizar as cartas na lista para 'owned = true'
      const updatedCardList = cardsList.map((card) => {
        if (selectedCards.some((selectedCard) => selectedCard.id === card.id)) {
          return {
            ...card,
            owned: true,
          };
        } else {
          return card;
        }
      });

      // Atualizar o estado das cartas
      setCardsList(updatedCardList);
      setSelectedCards(selectedCards);

      // Aqui você pode fazer algo com as cartas selecionadas, como exibir para o jogador
      console.log("Cartas selecionadas:", selectedCards);
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
        <StatusBar hidden />
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
          <ProgressBar
            progress={0.75}
            color={MD3Colors.error50}
            style={{
              height: 7,
              width: 250,
              borderRadius: 10,
              marginBottom: 20,
            }}
          />

          <Text style={{ color: "white", fontWeight: "bold" }}>
            Carregando...
          </Text>
        </LinearGradient>
      </View>
    );
  }

  if (!assetLoaded) {
    // Renderiza a tela de carregamento enquanto as imagens estão sendo carregadas
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <StatusBar hidden />
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
          <ProgressBar
            progress={0.9}
            color={MD3Colors.error50}
            style={{
              height: 7,
              width: 250,
              borderRadius: 10,
              marginBottom: 20,
            }}
          />

          <Text style={{ color: "white", fontWeight: "bold" }}>
            Carregando...
          </Text>
        </LinearGradient>
      </View>
    );
  }

  return (
    
    <View style={styles.container}>
      <StatusBar hidden />
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

        <TouchableOpacity onPress={openPacksModal}>
          <Icon name="shopping-cart" size={60} color="#f2f2f2" />
        </TouchableOpacity>

        <TouchableOpacity onPress={openDeckModal}>
          <Icon name="shopping-cart" size={60} color="#f2f2f2" />
        </TouchableOpacity>
      </View>

      {/* MODAL DE LOJA  */}

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

      {/* MODAL DOS PACOTES  */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={PackModalVisible}
        onRequestClose={packsModalClose}
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
            <TouchableOpacity onPress={packsModalClose} style={styles.close}>
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
                            pack.numberOfCards,
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
          <ModalCard
            visible={cardModalVisible}
            onClose={() => setCardModalVisible(false)}
            cards={selectedCards}
          />
        </View>
      </Modal>

      {/* MODAL DAS CARTAS  */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={DeckModalVisible}
        onRequestClose={DeckModalClose}
      >
        <View style={styles.modalContainer}>
          <LinearGradient
            colors={["#303030", "#000"]}
            style={styles.ModalHeader}
          >
            <RNText style={styles.textModalShop}>
              {displayCoins} Evil Coins!
            </RNText>
            <TouchableOpacity onPress={DeckModalClose} style={styles.close}>
              <Icon name="close" size={25} color="#000" />
            </TouchableOpacity>
          </LinearGradient>

          <ScrollView style={styles.scrollContainerCards}>
            <ImageBackground
              source={BackgroundStorePacks}
              resizeMode="cover"
              style={styles.BackgroundStores}
            >
              <TouchableOpacity
                style={styles.containerSlot}
                onPress={handleSlotPress}
              >
                <CardSlot
                  card={selectedCard}
                  onPress={() => handleSlotPress(selectedCard)}
                />
              </TouchableOpacity>

              <View style={styles.CardsSection}>
                {/* Renderiza os cards */}
                {getCardsList().map((card) => {
                  const opacity = card.owned ? 1 : 0.5;

                  return (
                    <TouchableOpacity
                      key={card.id}
                      onPress={() => handleCardPress(card)}
                      style={{ opacity: opacity }}
                    >
                      <View>
                        <Card
                          itemId={card.id}
                          image={card.image}
                          title={card.title}
                          owned={card.owned}
                          style={styles.cardStyle}
                          cardSize={styles.cardSize}
                          styleFont={styles.styleFont}
                          onPress={() => handleCardPress(card)}
                        />
                      </View>
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
    paddingVertical: 30,
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
    marginTop: 50,
    display: "flex",
    justifyContent: "center",
    gap: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
  },
  containerSlot:{
     display:"flex",
     justifyContent:"center",
     alignSelf:"center",
     paddingBottom: 70
  },
  CardsSection: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
  },
  cardSlots: {
    padding: 20,
    display: "flex",
    flexDirection: "row",
    gap: 15,
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 30,
  },
  cardSize: {
    width: 110,
    height: 190,
  },
  styleFont: {
    fontSize: 20,
  },
  cardStyle: {
    width: 130,
  },

  scrollContainerCards: {
    width: "100%",
    maxHeight: "100%",
    backgroundColor: "#272727",
  },
});
