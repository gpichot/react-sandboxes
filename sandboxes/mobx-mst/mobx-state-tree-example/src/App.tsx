import React from "react";
import { types, onSnapshot } from "mobx-state-tree";
import "./styles.css";
import { useLocalObservable, useObserver } from "mobx-react-lite";
import { formatDistanceToNow } from "date-fns";
import { uuid } from "uuidv4";

const PricePoint = types
  .model("PricePoint", {
    id: types.optional(types.identifier, uuid),
    date: types.Date,
    price: types.number
  })
  .views((self) => ({
    get timeago() {
      return formatDistanceToNow(self.date);
    },
    get humanizedPrice() {
      return `${self.price} BTC`;
    }
  }));

const NFT = types
  .model("NFT", {
    id: types.identifier,
    name: types.string,
    price: types.number,
    description: types.optional(types.maybeNull(types.string), null),
    priceHistory: types.array(PricePoint)
  })
  .actions((self) => ({
    addRandomSellPoint() {
      self.priceHistory.push({
        date: new Date(),
        price: Math.random() * 10
      });
    }
  }));

function createNFT() {
  return NFT.create({
    id: "nft-1",
    name: "MyNFT",
    price: 10
  });
}

export default function App() {
  // const nft = useLocalObservable(createNFT);
  const [nft, setNfT] = React.useState({
    id: "nft-1",
    name: "MyNFT",
    price: 10,
    priceHistory: []
  });

  const addRandomSellPointTo = (nft) => {
    setNfT({
      ...nft,
      priceHistory: [
        ...nft.priceHistory,
        {
          date: new Date(),
          price: Math.random() * 10
        }
      ]
    });
  };

  //React.useEffect(() => {
  //  console.log("listening");
  //  return onSnapshot(nft, console.log);
  //}, [nft]);

  return useObserver(() => (
    <div>
      <ul>
        <li>id: {nft.id}</li>
        <li>name: {nft.name}</li>
      </ul>
      {nft.priceHistory.map((pricepoint) => (
        <li key={pricepoint.id}>
          {pricepoint.timeago}: {pricepoint.humanizedPrice}
        </li>
      ))}
      <button
        onClick={() => {
          addRandomSellPointTo(nft);
        }}
      >
        add price history point
      </button>
    </div>
  ));
}
