export function getPacks() {
    return {
      SmallPack: {
        title: "Small Pack",
        image: require("./assets/game_imgs/packCards/pack1.png"),
        numberOfCards: 4,
      },
      MediumPack: {
        title: "Medium Pack",
        image: require("./assets/game_imgs/packCards/pack2.png"),
        numberOfCards: 4,
      },
      LargePack: {
        title: "Large Pack",
        image: require("./assets/game_imgs/packCards/pack3.png"),
        numberOfCards: 4,
      },
      UltraPack: {
        title: "Ultra Pack",
        image: require("./assets/game_imgs/packCards/pack4.png"),
        numberOfCards: 4,
      },
    };
  }
  