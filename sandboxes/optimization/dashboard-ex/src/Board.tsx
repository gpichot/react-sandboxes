import React from "react";
import classnames from "classnames";

import styles from "./Board.module.scss";

function uuid() {
  return Math.ceil(Math.random() * 1000 * 1000 * 1000 * 1000).toString(10);
}

type Card = {
  id: string;
  title: string;
  description: string;
};

type CurrentCardContextType = {
  currentCard: Card | null;
  setCurrentCard: (card: Card | null) => void;
};

const CurrentCardContext = React.createContext<
  CurrentCardContextType | undefined
>(undefined);

function useCurrentCardContext() {
  const context = React.useContext(CurrentCardContext);
  if (context === undefined) {
    throw new Error(
      `useCurrentCardContext must be used within a CurrentCardProvider`
    );
  }
  return context;
}

function CurrentCardProvider({ children }: { children: React.ReactNode }) {
  const [currentCard, setCurrentCard] = React.useState<Card | null>(null);

  return (
    <CurrentCardContext.Provider value={{ currentCard, setCurrentCard }}>
      {children}
    </CurrentCardContext.Provider>
  );
}

type ICardColumn = {
  week: number;
  cards: Card[];
};

function createCards({ count }: { count: number }): Card[] {
  const cards: Card[] = [];
  for (let i = 0; i < count; i++) {
    cards.push({
      id: uuid(),
      title: `Card ${i}`,
      description: `Description of card ${i}`,
    });
  }
  return cards;
}

function createCardColumns({ columns }: { columns: number }): ICardColumn[] {
  const cardColumns: ICardColumn[] = [];
  for (let i = 0; i < columns; i++) {
    cardColumns.push({
      week: i + 1,
      cards: createCards({ count: Math.ceil(Math.random() * 10) }),
    });
  }
  return cardColumns;
}

export default function Board() {
  const [columns, setColumns] = React.useState<ICardColumn[]>(() =>
    createCardColumns({ columns: 40 })
  );
  return (
    <div>
      <CurrentCardProvider>
        <div>
          <h1>Board</h1>
          <div className={styles.board}>
            {columns.map(({ week, cards }) => (
              <CardColumn key={week} cards={cards} week={week} />
            ))}
          </div>
        </div>
      </CurrentCardProvider>
    </div>
  );
}

function CardColumn({ week, cards }: { week: number; cards: Card[] }) {
  return (
    <div className={styles.column}>
      {cards.map((card) => (
        <CardBox key={card.title} card={card} />
      ))}
    </div>
  );
}

function useCostlyFunction() {
  const wakeUpTime = new Date().getTime() + 1;
  while (new Date().getTime() < wakeUpTime);
}

function CardBox({ card }: { card: Card }) {
  const { currentCard, setCurrentCard } = useCurrentCardContext();
  // useCostlyFunction();

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      setCurrentCard(card);
    }
  };
  return (
    <div
      onClick={() => {
        setCurrentCard(card);
      }}
      role="button"
      onKeyDown={handleKeyPress}
      tabIndex={0}
      className={classnames(styles.card, {
        [styles.cardSelected]: currentCard?.id === card.id,
      })}
    >
      {card.title}
    </div>
  );
}
