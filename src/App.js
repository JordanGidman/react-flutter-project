import "./App.css";
import "./queries.css";
import Die from "./components/Die";
import Bet from "./components/Bet";
import React from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  const holdDice = function (id) {
    setDice((prevDice) =>
      prevDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  };

  const allNewDice = function () {
    let arr = [];

    for (let i = 0; i < 10; i++) {
      arr.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
        holdDice: holdDice,
      });
    }

    return arr;
  };

  const [dice, setDice] = React.useState(allNewDice());
  const [flutter, setFlutter] = React.useState(false);
  const [rollCount, setRollCount] = React.useState(0);
  const [money, setMoney] = React.useState({
    userMoney: 1000,
    userBet: "",
    userNumber: "",
  });
  const [notification, setNotification] = React.useState("");

  // const checkBetWin = function () {

  // };

  React.useEffect(() => {
    const val = dice[0].value;
    const allHeld = dice.every((die) => die.isHeld);
    const allSame = dice.every((die) => die.value === val);

    if (allHeld && !allSame) {
      setNotification(`Game Lost. All numbers Held But are not ALL Matching`);
      setMoney((prevMoney) => ({
        ...prevMoney,
        userBet: "",
        userNumber: "",
      }));
      setDice(allNewDice);
      setRollCount(0);
    }

    if (allHeld && allSame) {
      if (rollCount === money.userNumber) {
        setNotification(`Game Over! Won ${money.userBet}`);
        setMoney((prevMoney) => ({
          ...prevMoney,
          userMoney: (money.userMoney += money.userBet * 2),
          userBet: "",
          userNumber: "",
        }));
      }
      if (rollCount !== money.userNumber) {
        setNotification(`Game Over! No Bet Win`);
        setMoney((prevMoney) => ({
          ...prevMoney,
          userBet: "",
          userNumber: "",
        }));
      }
      setFlutter(true);
    }
  }, [dice]);

  const diceEls = dice.map((num) => {
    return <Die props={num} key={num.id} />;
  });

  const rollDice = () => {
    if (flutter) {
      setFlutter((prevFlutter) => !prevFlutter);
      setDice(allNewDice);
      setRollCount(0);
    } else {
      setRollCount((prevCount) => (prevCount += 1));
      setDice((prevDice) => {
        let newDice = allNewDice();

        prevDice.forEach((die, i) => {
          if (die.isHeld === true) newDice[i] = die;
        });
        return newDice;
      });
    }
  };

  return (
    <div className="App">
      {flutter && <Confetti />}
      <main className="tenzies-container">
        <h1 className="money">Wallet: £{money.userMoney}</h1>
        <div className="user-bet">
          <h1>Your Bet: £{money.userBet || 0}</h1>
          <h1>Your Number: {money.userNumber || ""}</h1>
        </div>
        <h1 className="title">{flutter ? "Game Over!" : "Flutter"}</h1>
        <p className="instructions">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls. <br /> Bet on the number of rolls you
          think it will take. 2:1 odds if you win.
        </p>
        <div className="dice-container">{diceEls}</div>
        <div className="roll-dice-btn" onClick={rollDice}>
          {flutter === true ? "New Game" : "Roll Dice"}
        </div>
        <h2 className="roll-count">Rolls: {rollCount}</h2>
        <Bet
          money={money}
          setMoney={setMoney}
          rollCount={rollCount}
          notification={notification}
          setNotification={setNotification}
        />
      </main>
    </div>
  );
}

export default App;
