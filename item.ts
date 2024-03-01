export function getItems() {
  return {
    livroDasMoedas: {
      title: "Livro das Moedas",
      image:require("./assets/game_imgs/storeItems/coinBook.jpeg"),
      initialCost: 100,
      plusClick: 0.3,
    },
    castelo: {
      title: "Castelo",
      image: require("./assets/game_imgs/storeItems/Castle.jpeg"),
      initialCost: 500,
      plusClick: 0.5,
    },
    oColecionador: {
      title: "O Colecionador",
      image: require("./assets/game_imgs/storeItems/Collector.jpeg"),
      initialCost: 1000,
      plusClick: 1,
    },
    deepFactory: {
      title: "Fábrica das Profundezas",
      image: require("./assets/game_imgs/storeItems/DeeperFactory.jpeg"),
      initialCost: 10000,
      plusClick: 1,
    },
    sHellFactory: {
      title: "Fábrica do Inferno P",
      image: require("./assets/game_imgs/storeItems/S-HellFactory.jpeg"),
      initialCost: 50000,
      plusClick: 1,
    },
    mHellFactory: {
      title: "Fábrica do Inferno M",
      image: require("./assets/game_imgs/storeItems/M-HellFactory.jpeg"),
      initialCost: 200000,
      plusClick: 1,
    },
    xHellFactory: {
      title: "Fábrica do Inferno G",
      image: require("./assets/game_imgs/storeItems/X-HellFactory.jpeg"),
      initialCost: 500000,
      plusClick: 1,
    },
    dementador: {
      title: "Dementador",
      image: require("./assets/game_imgs/storeItems/Dementor.jpeg"),
      initialCost: 1000000,
      plusClick: 1,
    },
    guardian: {
      title: "Guardião",
      image: require("./assets/game_imgs/storeItems/Guardian.jpeg"),
      initialCost: 5000000,
      plusClick: 1,
    },
    hacker: {
      title: "Hacker do Inferno",
      image: require("./assets/game_imgs/storeItems/Hacker.jpeg"),
      initialCost: 30000000,
      plusClick: 1,
    },
    krampus: {
      title: "Krampus",
      image: require("./assets/game_imgs/storeItems/Krampus.jpeg"),
      initialCost: 70000000,
      plusClick: 1,
    },
    skelleton: {
      title: "Morte das Moedas",
      image: require("./assets/game_imgs/storeItems/Skelleton.jpeg"),
      initialCost: 70000000,
      plusClick: 1,
    },
  };
}
