import { useState, useEffect } from "react";

const thresholdAmount = 100;

const options = [
  {
    id: 1,
    text: `7% on first ${thresholdAmount} and 3 % on balance`,
    thresholdCommission: 7,
    balanceCommission: 3,
  },
  {
    id: 2,
    text: `7% on first ${thresholdAmount}  and 2.5 % on balance`,
    thresholdCommission: 7,
    balanceCommission: 2.5,
  },
  {
    id: 3,
    text: `6% on first ${thresholdAmount}  and 2 % on balance`,
    thresholdCommission: 6,
    balanceCommission: 2,
  },
  { id: 4, text: "coustom" },
];

function findCommission(s_p, t, c_t, c_b) {
  if (s_p <= t) {
    return 0;
  }
  const balance = s_p - t;
  const thresholdCommission = (t * c_t) / 100;
  const balanceCommission = (balance * c_b) / 100;
  const total = thresholdCommission + balanceCommission;
  return total;
}

const Commison = () => {
  const [selcted, setSelected] = useState(1);
  const [total, setTotal] = useState("");
  const [price, setPrice] = useState("");
  const [tPer, setTper] = useState("");
  const [bper, setBper] = useState("");
  const [threshold, setthreshold] = useState("");
  const [visibility, setVisibility] = useState(true);
  function priceChangeHandler(e) {
    const val = e.target.value;
    setPrice(val);
  }
 
  function commissionChangeHandler(e) {}

  function optionChangeHandler(e) {
    const val = e.target.value;
    setSelected(Number(val));
    console.log(val);
  }

  useEffect(() => {
    if (selcted === 4) {
      const totalCommission = findCommission(
        Number(price),
        Number(threshold),
        Number(tPer),
        Number(bper)
      );
      console.log(totalCommission);
      setTotal(totalCommission);
    } else if (selcted !== 4) {
      const item = options.find((item) => item.id === selcted);
      console.log(item);
      const totalCommission = findCommission(
        Number(price),
        thresholdAmount,
        Number(item.thresholdCommission),
        Number(item.balanceCommission)
      );
      console.log(totalCommission);
      setTotal(totalCommission);
      setthreshold(thresholdAmount);
    }
    console.log("running");
    console.log(selcted);
  }, [selcted, price, tPer, bper , threshold]);

  useEffect(() => {
    if (Number(price) < Number(threshold)) {
      setVisibility(true);
    } else {
      console.log("set");
      setVisibility(false);
    }
  }, [price , threshold]);

  function thresholdPercentChangeHandler(e) {
    const val = e.target.value;
    setTper(val);
  }

  function balancePercentChangeHandler(e) {
    const val = e.target.value;
    setBper(val);
  }

  function thresholdChangeHandler(e) {
    const val = e.target.value;
    setthreshold(val);
  }
  console.log(tPer, bper);

  return (
    <>
      <div className="flex">
        <lable htmlFor="salePrice"> sale Price: </lable>
        <input
          id="salePrice"
          type="number"
          onChange={priceChangeHandler}
          value={price}
          class=" px-3 py-2 placeholder-gray-400 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        ></input>
        {selcted === 4 && (
          <>
            <lable htmlFor="threshold"> threshold Amount: </lable>
            <input
              id="threshold"
              type="number"
              onChange={thresholdChangeHandler}
              value={threshold}
              class=" px-3 py-2 placeholder-gray-400 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            ></input>
            <lable htmlFor="thresholdPercent"> threshold Percent: </lable>
            <input
              id="thresholdPercent"
              type="number"
              onChange={thresholdPercentChangeHandler}
              value={tPer}
              class=" px-3 py-2 placeholder-gray-400 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            ></input>
            <lable htmlFor="balancePercent"> balance Percent: </lable>
            <input
              id="balancePercent"
              type="number"
              onChange={balancePercentChangeHandler}
              value={bper}
              class=" px-3 py-2 placeholder-gray-400 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            ></input>
          </>
        )}
        <select value={selcted} onChange={optionChangeHandler} class="w-fit px-3 py-2 placeholder-gray-400 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"> 
          {options.map((item) => {
            return (
              <option
                key={item.id}
                value={item.id}
                selected={item.id === selcted}
              >
                {item.text}
              </option>
            );
          })}
        </select>
        <lable htmlFor="totalcommission: "> total commission </lable>
        <input
          id="totalcommission"
          type="number"
          value={total}
          onChange={commissionChangeHandler}
          class="px-3 py-2 placeholder-gray-400 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        ></input>
      </div>
      {visibility && (
        <p style={{ color: "red" }}>
          Saling price can't be less then the threshold
        </p>
      )}
    </>
  );
};
export default Commison;
