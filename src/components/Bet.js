import React from "react";

export default function Bet(props) {
  const [betData, setBetData] = React.useState({
    amount: "",
    number: "",
  });
  const [notification, setNotification] = React.useState("");
  // update state on each keypress
  const handleChange = function (event) {
    const { name, value, type, checked } = event.target;

    setBetData((prevBetData) => {
      return {
        ...prevBetData,
        [name]: type === "checkbox" ? checked : Number(value),
      };
    });
  };
  //Clear input boxes of previous input
  const clearInputs = function () {
    setBetData((prevBetData) => ({
      ...prevBetData,
      amount: "",
      number: "",
    }));
  };

  const placeBet = function (e) {
    e.preventDefault();

    //validation
    if (props.rollCount > 0) {
      setNotification(`Cant Place. The game is already in progress`);
      clearInputs();
      return;
    }

    if (!betData.amount) {
      setNotification(`Please Enter An Amount to Bet`);

      return;
    }
    if (!betData.number) {
      setNotification(`Please Enter A Number of Rolls`);

      return;
    }
    if (betData.amount > props.money.userMoney) {
      console.log(`Not Enough Money`);
      return;
    } else
      props.setMoney((prevMoney) => {
        let betNum = +prevMoney.userBet;
        return {
          userMoney: (prevMoney.userMoney -= betData.amount),
          userBet: (betNum += betData.amount),
          userNumber: betData.number,
        };
      });
    setNotification(`Bet Placed. Good Luck.`);
    clearInputs();
  };

  return (
    <>
      <form className="bet-form">
        <input
          name="number"
          type="number"
          className="input-bet input-number"
          placeholder="Enter Number of Rolls"
          value={betData.number}
          onChange={handleChange}
        ></input>
        <button className="btn-bet" onClick={placeBet}>
          Place
        </button>
        <input
          name="amount"
          type="number"
          className="input-bet input-amount"
          placeholder="Enter Bet Amount"
          value={betData.amount || ""}
          onChange={handleChange}
        ></input>
      </form>
      <h3 className="notification">{notification}</h3>
    </>
  );
}
