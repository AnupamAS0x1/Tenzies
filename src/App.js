import React from "react";
import Die from "./component/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti"

/**
 * Challenge:
 *
 * Write a function (allNewDice) that returns an array
 * of 10 random numbers between 1-6 inclusive.
 *
 * Log the array of numbers to the console for now
 */

function App() {





  const newDice = () => {
    return {
      value: Math.floor(Math.random() * 6 + 1),
      isHeld: false,
      id: nanoid(),
    };
  };

  const allNewDice = () => {
    const ramdice = [];
    for (let i = 1; i <= 10; i++) {
      ramdice.push(newDice());
    }
    return ramdice;
  };
  const [dice, setnewdice] = React.useState(allNewDice());
  
  const [tenzies, setTenzies] = React.useState(false)

  React.useEffect(() => {
    const allheld = dice.every(die => die.isHeld)
    const firstvalue = dice[0].value
    const samevalue = dice.every(die => die.value === firstvalue)
    if (allheld && samevalue ){
      setTenzies(true)
      console.log("you won")
    }
}, [dice])
  console.log(allNewDice());

  const rollnewdice = () => {
   if(!tenzies) {setnewdice((oldice) =>
      oldice.map((die) => {
        return die.isHeld ? die : newDice();
      }))
   } else {
     setTenzies(false)
     setnewdice(allNewDice())
   }
   
  };

  const holdDice = (id) => {
    console.log(id);
    setnewdice((oldice) =>
      oldice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  };

  const diceElement = dice.map((die) => (
    <Die
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  return (
    <main>
         {tenzies && <Confetti />}

      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{diceElement}</div>
      <button className="roll-dice" onClick={rollnewdice}>
      {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}

export default App;
