import React from "react";
import {
  View,
  Modal,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const ModalCard = ({ visible, onClose, cards }) => {
  return (
    <Modal transparent={true} visible={visible}>
      <View style={styles.container}>
        <View style={styles.modal}>
          <Text style={styles.text}>Cartas Sorteadas:</Text>
          <ScrollView horizontal={true} contentContainerStyle={styles.ScrollCardView}>
            {cards.map((card, index) => (
              <View key={index} style={styles.cardSection}>
                <Image source={card.image} style={styles.image} />
                <Text style={styles.text}>{card.title}</Text>
              </View>
            ))}
          </ScrollView>
          <TouchableOpacity onPress={onClose} style={styles.close}>
            <Icon name="close" size={15} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modal: {
    backgroundColor: "#0c0c0c",
    padding: 20,
    width: "90%",
    height: "50%",
    borderRadius: 10,

  },
  image: {
    borderRadius: 25,
    height:"75%",
    width: 170,
    resizeMode: "cover", 
  },
  cardSection: {
    gap:20,
    alignItems: "center",
    
  },
  ScrollCardView: {
    gap:15,
    alignItems: "center"
  },
  close: {
    position: "absolute",
    top: 15,
    right: 15,
    padding: 3,
    width: 25,
    height: 25,
    borderRadius: 100,
    backgroundColor: "#d1d1d1",
    justifyContent: "center",
    alignItems: "center",
  },
  text:{
    textAlign:"center",
    fontSize: 32,
    color:"white",
    fontFamily: "ProtestRevolution-Regular",
  }
});

export default ModalCard;
