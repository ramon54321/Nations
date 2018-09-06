const gameState = {
  seed: 105,
  size: 20,
  name: "Zelda",
  nations: {
    narnia: {
      name: 'Narnia',
      tiles: [
        [2, 5],
        [2, 6],
        [3, 6],
      ],
    },
    valcom: {
      name: 'Valcom',
      tiles: [
        [6, 2],
        [7, 2],
        [7, 3],
      ],
    },
  },
  tiles: [
    {
      population: {
        narnia: 23,
      },
      resources: {
        iron: 34,
        wood: 120,
        food: 12,
      },
      developments: [
        "mill",
        "market",
      ]
    },
    {
      resources: {
        iron: 34,
        wood: 120,
        food: 12,
      },
      developments: [
        "market",
      ]
    },
    {
      resources: {
        iron: 34,
        wood: 120,
        food: 12,
      },
    },
    {
      population: {
        narnia: 2,
        valcom: 18,
      },
      resources: {
        iron: 34,
        wood: 120,
        food: 12,
      },
    },
  ],
  developments: {
    mill: {
      name: "Mill",
      production: {
        goods: 2 
      },
      comsumption: {
        wood: 4
      }
    },
    market: {
      name: "Market",
      abilities: [
        "trade"
      ]
    }
  }
}
