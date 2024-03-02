import React, { useState } from 'react';
import { TouchableWithoutFeedback, Image, StyleSheet, Dimensions, Text } from 'react-native';
import { Audio } from 'expo-av';

const windowWidth = Dimensions.get('window').width;

const Coin = ({ incrementCoins }) => {
  const [coinSize, setCoinSize] = useState(windowWidth > 600 ? windowWidth * 0.45 : windowWidth * 0.6);
  const [displayText, setDisplayText] = useState('');

  const handlePressIn = () => {
    setCoinSize(coinSize * 0.95); // Aumenta o tamanho em 5%
  };

  const handlePressOut = () => {
    setCoinSize(windowWidth > 600 ? windowWidth * 0.45 : windowWidth * 0.6); // Retorna ao tamanho original
  };

  const handleClick = async () => {
    // Carregar o som
    const clickSound = new Audio.Sound();

    try {
      await clickSound.loadAsync(require('../assets/sounds/click.mp3'));
      await clickSound.setStatusAsync({ positionMillis: 310 });
      await clickSound.setVolumeAsync(1);
      await clickSound.playAsync();
    } catch (error) {
      console.error('Erro ao reproduzir o som:', error);
    }

    // Sua lógica de manipulação do clique
    incrementCoins();

    // Não descarregue o som aqui para que ele continue tocando até o final
  };

  return (
    <TouchableWithoutFeedback onPress={handleClick} onPressIn={handlePressIn} onPressOut={handlePressOut} style={styles.container}>
      <Image source={require('../assets/game_imgs/coin.png')} style={[styles.coinImage, { width: coinSize, height: coinSize}]} />
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  coinImage: {
    resizeMode: 'contain',
  },
  
});

export default Coin;
