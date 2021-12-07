import { useEffect, useState } from "react";
import {
  collection,
  query,
  onSnapshot,
  doc,
  where,
  updateDoc,
  deleteDoc
} from "firebase/firestore";
import { db } from "./firebase-config";

export default function ({ currentUser }) {
  const [stockies, setStockies] = useState([]);

  function getBuyTotal(acc, obj) {
    console.log("TOTALING IN PORTFOLIO");
    console.log(obj.buy);
    console.log(acc);
    return acc + obj.buy;
  }
  useEffect(() => {
    const q = query(
      collection(db, "Stockies"),
      where("userID", "==", currentUser.uid)
    );
    const unsub = onSnapshot(q, (querySnapshot) => {
      let stockiesArrayFromFirebase = [];
      querySnapshot.forEach((doc) => {
        stockiesArrayFromFirebase.push({ ...doc.data(), id: doc.id });
      });
      // using the useState from above
      setStockies(stockiesArrayFromFirebase);
    });
    return () => unsub();
  }, [currentUser]);

  async function sellStock(id) {
    //console.log("DELETING STOCK");
    //console.log(id);
    await deleteDoc(doc(db, "Stockies", id));
  }

  return (
    <div>
      <h1>PORTFOLIO</h1>
      Total Wealth:$
      {stockies.reduce(getBuyTotal, 0.0).toFixed(2)}
      <div className="container">
        <div className="orders">
          <h2>BUYING:</h2>
          Total cost:{" "}
          {/* {this.state.buying.reduce((total, item) => {
              return total + item.rates.buy;
            }, 0)} */}
          <br />
          <button className="empbtn" onClick={this.addPortfolio}>
            ADD TO PORTFOLIO
          </button>
          {/* TASK 3：Add a button to REMOVE the Portfolio */}
          <ol>
            {/* {this.state.buying.map((s, key) => (
                <li key={key}>
                  {s.stock.symbol} {s.stock.name} ${s.rates.buy}
                </li>
              ))} */}
          </ol>
        </div>
        <pre> </pre>
        <div className="orders">
          <h2>SELLING:</h2>
          Total cost:{" "}
          {/* {this.state.selling.reduce((total, item) => {
              return total + item.rates.sell;
            }, 0)} */}
          <br />
          <button className="empbtn" onClick={this.empty2}>
            REMOVE FROM PORTFOLIO
          </button>
          <ol>
            {/* {this.state.selling.map((s, key) => (
                <li key={key}>
                  {s.stock.symbol} {s.stock.name} ${s.rates.sell}
                </li>
              ))} */}
          </ol>
        </div>
      </div>
      <br />
      {stockies.map((s, key) => (
        <div className="li" key={s.id}>
          <div className="buttons" onMouseOver={this.boxMouseOverHandler}>
            <b>{console.log(s)}</b>
            {s.symbol}
            <div style={{ alignItems: "center", width: "80%" }}>
              {s.name}
              <br />
              {s.sector}
            </div>
            <div className="price">
              <p style={{ margin: "3px" }}>${s.buy}</p>
              <button
                className="buybtn"
                // onClick={() => this.props.buyStock(key)}
              >
                BUY
              </button>
            </div>
            <div className="price">
              {/* TASK 1: Add a reduce function to caculate the total buy */}
              <p style={{ margin: "3px" }}>${s.sell}</p>
              <button
                style={{ background: "red", color: "white" }}
                className="sellbtn"
                onClick={() => sellStock(s.id)}
              >
                SELL
              </button>
            </div>
          </div>
        </div>
      ))}
      <p>add stocks to add to your portfolio and keep track of them here!!</p>
    </div>
  );
}
