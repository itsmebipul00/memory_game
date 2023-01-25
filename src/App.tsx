import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import classNames from "classnames";
import { nanoid } from "nanoid";

interface randomNumType {
  number: number;
  numHidden: boolean;
  uuid: string;
  cardHidden: boolean;
}
const generateNos = () => {
  const num1 = new Set();
  const num2 = new Set();
  while (num1.size !== 18) {
    num1.add(Math.floor(Math.random() * 18) + 1);
  }
  while (num2.size !== 18) {
    num2.add(Math.floor(Math.random() * 18) + 1);
  }
  const allRandomNo = [...num1, ...num2].map((no) => ({
    number: no,
    numHidden: true,
    cardHidden: false,
    uuid: nanoid(),
  })) as randomNumType[];

  return allRandomNo;
};

function App() {
  const allNos = generateNos();

  const [allRandomNos, setAllRandomNos] = useState<randomNumType[]>([]);
  const [reveleadNo, setRevealedNo] = useState<randomNumType>();

  const handleClickCard = (id: string) => {
    setAllRandomNos((prev) =>
      prev.map((num) => (num.uuid === id ? { ...num, numHidden: false } : num))
    );
    const reveledRandNo = allRandomNos.find((no) => no.uuid === id);

    if (reveleadNo) {
      if (reveleadNo.number === reveledRandNo?.number) {
        console.log("match");
        setTimeout(() => {
          setAllRandomNos((prev) =>
            prev.map((array) =>
              array.uuid === reveleadNo.uuid || array.uuid === id
                ? { ...array, cardHidden: true }
                : array
            )
          );
        }, 2000);
      } else {
        setTimeout(() => {
          setAllRandomNos((prev) =>
            prev.map((array) =>
              array.uuid === reveleadNo.uuid || array.uuid === id
                ? { ...array, numHidden: true }
                : array
            )
          );
        }, 2000);
      }
      setRevealedNo(undefined);
    } else {
      setRevealedNo(reveledRandNo);
    }
  };
  const isDisabled =
    allRandomNos.filter(
      (no) => no.numHidden === false && no.cardHidden === false
    ).length === 2;

  const playAgain =
    allRandomNos.length > 0 && allRandomNos.every((no) => no.cardHidden);

  const handlePlayAgain = () => {
    setAllRandomNos(allNos);
  };

  const handleStartGame = () => {
    setAllRandomNos(allNos);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="grid grid-cols-6 gap-2">
        {allRandomNos.length > 0 ? (
          allRandomNos?.map((no, idx) => (
            <button
              key={idx}
              className={classNames(
                "h-20 w-20 gap-2  border  border-black flex items-center justify-center cursor-pointer",
                {
                  invisible: no.cardHidden,
                  visible: !no.cardHidden,
                }
              )}
              onClick={() => handleClickCard(no.uuid)}
              disabled={isDisabled}
            >
              <span
                className={classNames({
                  hidden: no.numHidden,
                  inline: !no.numHidden,
                })}
              >
                {no.number}
              </span>
            </button>
          ))
        ) : (
          <button
            onClick={handleStartGame}
            className="absolute px-4 py-2 border border-black"
          >
            Start Game
          </button>
        )}
      </div>
      {playAgain && (
        <button
          onClick={handlePlayAgain}
          className="absolute px-4 py-2 border border-black"
        >
          Play Again
        </button>
      )}
    </div>
  );
}

export default App;
