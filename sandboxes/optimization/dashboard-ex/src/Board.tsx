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
  const [currentCard, setCurrentCard] = React.useState<Card | null>(null);
  return (
    <div>
      <div>
        <h1>Board</h1>
        <div className={styles.board}>
          {columns.map(({ week, cards }) => (
            <CardColumn key={week} week={week}>
              {cards.map((card) => (
                <MemoizedCardBox
                  key={card.title}
                  card={card}
                  selected={card.id === currentCard?.id}
                  onClick={setCurrentCard}
                />
              ))}
            </CardColumn>
          ))}
        </div>
      </div>
    </div>
  );
}

function CardColumn({
  week,
  children,
}: {
  week: number;
  children: React.ReactNode;
}) {
  return <div className={styles.column}>{children}</div>;
}

function useCostlyFunction() {
  const wakeUpTime = new Date().getTime() + 1;
  while (new Date().getTime() < wakeUpTime);
}

function CardBox({
  card,
  selected,
  onClick,
}: {
  card: Card;
  selected: boolean;
  onClick: (card: Card) => void;
}) {
  // useCostlyFunction();

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      onClick(card);
    }
  };
  return (
    <div
      onClick={() => {
        onClick(card);
      }}
      role="button"
      onKeyDown={handleKeyPress}
      tabIndex={0}
      className={classnames(styles.card, {
        [styles.cardSelected]: selected,
      })}
    >
      {card.title}
    </div>
  );
}

const MemoizedCardBox = React.memo(CardBox);
