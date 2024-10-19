import * as React from "react";
import { produce } from "immer";
import type { FC } from "react";
import { memo, useCallback, useState } from "react";
import { useDrop } from "react-dnd";

import { PhotoCard } from "./PhotoCard";
import { ItemTypes } from "../types/scrTypes";

const style = {
  width: 400,
};

export interface ContainerState {
  cards: any[];
}

const ITEMS = [
  {
    id: 1,
    text: "Write a cool JS library",
  },
  {
    id: 2,
    text: "Make it generic enough",
  },
  {
    id: 3,
    text: "Write README",
  },
  {
    id: 4,
    text: "Create some examples",
  },
  {
    id: 5,
    text: "Spam in Twitter and IRC to promote it",
  },
  {
    id: 6,
    text: "???",
  },
  {
    id: 7,
    text: "PROFIT",
  },
];

export const PhotoList: FC = memo(function PhotoList() {
  const [cards, setCards] = useState(ITEMS);

  const findCard = useCallback(
    (id: string) => {
      const card = cards.filter((c) => `${c.id}` === id)[0] as {
        id: number;
        text: string;
      };
      return {
        card,
        index: cards.indexOf(card),
      };
    },
    [cards]
  );

  const moveCard = useCallback(
    (id: string, targetIndex: number) => {
      const { card, index: draggedIndex } = findCard(id); // dragged item
      setCards(
        produce(cards, (draft) => {
          draft[draggedIndex] = draft.splice(targetIndex, 1, card)[0];
        })
      );
    },
    [findCard, cards, setCards]
  );

  const [, drop] = useDrop(() => ({ accept: ItemTypes.CARD }));
  console.log(cards);
  return (
    <div ref={drop} style={style}>
      {cards.map((card) => (
        <PhotoCard
          key={card.id}
          id={`${card.id}`}
          text={card.text}
          moveCard={moveCard}
          findCard={findCard}
        />
      ))}
    </div>
  );
});

export default PhotoList;
