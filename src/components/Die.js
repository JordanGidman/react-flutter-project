import React from "react";
// import dice1 from "../img/dice1.png";
// import dice2 from "../img/dice2.png";
// import dice3 from "../img/dice3.png";
// import dice4 from "../img/dice4.png";
// import dice5 from "../img/dice5.png";
// import dice6 from "../img/dice6.png";

export default function Die(props) {
  const { value, isHeld, id } = props.props;

  const imgPath = require(`../img/dice${value}.png`);

  const styles = {
    backgroundColor: isHeld === true ? "#59e391" : "#fff",
  };

  return (
    <button
      onClick={() => props.props.holdDice(id)}
      className={`die`}
      style={styles}
    >
      <img src={imgPath} alt={`Dice Number ${value}`} className="dice-img" />
    </button>
  );
}
