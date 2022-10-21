import { useEffect, useState } from "react";
import "./App.css";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
    }
  }, [dice]);
  //random number generator and returning it as object
  function allNewDice() {
    const randomnums = new Array(10).fill(1);
    console.log(randomnums);

    const result = randomnums.map((item, i) => {
      return {
        value: item * Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
      };
    });

    console.log(result);

    return result;
  }
  // Displaying randomnumber generated values
  console.log(dice);
  const diceElements = dice.map((item, i) => {
    return (
      <Die
        key={item.id}
        value={item.value}
        isHeld={item.isHeld}
        id={item.id}
        holdDice={() => holdDice(item.id)}
      />
    );
  });

  //
  function rollDice() {
    setCount(count + 1);
    if (!tenzies) {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld
            ? die
            : {
                value: Math.ceil(Math.random() * 6),
                isHeld: false,
                id: nanoid(),
              };
        })
      );
    } else {
      setTenzies(false);
      setDice(allNewDice());
      setCount(0);
    }
  }

  // function to hold values in dice
  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  return (
    <div className="mainContainer">
      <div className="container">
        {tenzies && <Confetti />}
        <h1>TENZIES</h1>

        <h5>
          {tenzies
            ? "C O N G R A T U L A T I O N S !!!"
            : "Roll untill add dice are the same. Click each dice to freeze it at its current value between rolls"}
        </h5>
        <div className="dice-container">{diceElements}</div>
        <div className="rollCount">Dice Count: {count}</div>
        <button onClick={rollDice}>{tenzies ? "NEW GAME" : "ROLL"}</button>
      </div>
    </div>
  );
}

export default App;
