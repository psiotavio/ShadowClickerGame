export function getPacks() {
    return {
      SmallPack: {
        title: "Small Pack",
        image: require("./assets/game_imgs/packCards/pack1.png"),
        numberOfCards: 4,
        initialCost:1,
        color: "#9FAEB1"
      },
      MediumPack: {
        title: "Medium Pack",
        image: require("./assets/game_imgs/packCards/pack2.png"),
        numberOfCards: 6,
        initialCost:1,
        color: "#FF2121"
      },
      LargePack: {
        title: "Large Pack",
        image: require("./assets/game_imgs/packCards/pack3.png"),
        numberOfCards: 8,
        initialCost:1,
        color: "#6F2AA0"
      },
      UltraPack: {
        title: "Ultra Pack",
        image: require("./assets/game_imgs/packCards/pack4.png"),
        numberOfCards: 16,
        initialCost:1,
        color: "#0095CC"
      },
    };
  }
  