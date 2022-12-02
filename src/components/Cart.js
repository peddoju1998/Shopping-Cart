import { useEffect, useState } from "react";
import { Button, Col, Form, Image, ListGroup, Row } from "react-bootstrap";
import { Card } from "react-bootstrap";
import CardGroup from "react-bootstrap/CardGroup";
import Rating from "./Rating";

const Cart = () => {
  const [myCart, setMCart] = useState([]);

  const [isLoad, setIsLoad] = useState(false);
  const [balance, setBalance] = useState(0);

  const handleOnPlusitem = (data) => {
    updateCartValue(data.id);
    totalBalance();
  };

  const handleOnMinusitem = (n) => {
    updateCartValueMinus(n.id);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const totalBalance = () => {
    let b = 0;
    myCart.map((n) => {
      b += n.price * n.currentUserStock;
    });
    console.log(b);
    setBalance(b);
  };

  const handleOnRemove = (n) => {
    let a = myCart.filter((i) => {
      return i.id !== n.id;
    });
    let getTempData = sessionStorage.getItem("data");
    if (getTempData) {
      let tempStorage = JSON.parse(getTempData);
      let filteredData = tempStorage.filter((i) => {
        return i.id !== n.id;
      });
      sessionStorage.setItem("data", JSON.stringify(filteredData));
    }
    setMCart(a);
  };

  useEffect(() => {
    totalBalance();
  }, [totalBalance]);

  useEffect(() => {
    let keys = sessionStorage.getItem("data");
    setMCart(JSON.parse(keys));
    setIsLoad(true);
  }, []);

  const updateCartValue = (id) => {
    const myData = myCart.find((n) => n.id === id);
    console.log(myData);
    setMCart(
      myCart.map((item) =>
        item.id === id
          ? {
              ...myData,
              currentUserStock:
                item.currentUserStock < item.stock
                  ? item.currentUserStock + 1
                  : item.currentUserStock,
            }
          : item
      )
    );
  };

  const updateCartValueMinus = (id) => {
    const myData = myCart.find((n) => n.id === id);
    if (myData.currentUserStock > 1) {
      console.log(myData);
      setMCart(
        myCart.map((item) =>
          item.id === id
            ? { ...myData, currentUserStock: item.currentUserStock - 1 }
            : item
        )
      );
    }
  };

  return (
    <div className="home">
      {!isLoad && <p> Loading... </p>}
      {isLoad &&
        myCart.map((n) => {
          return (
            <div className="products" key={n.id}>
              <CardGroup>
                <Card>
                  <Card.Img variant="top" src={n.img} alt={n.name} />
                  <Card.Body>
                    <Card.Title>{n.name}</Card.Title>
                    <Card.Subtitle style={{ paddingBottom: 10 }}>
                      <span>Rs. {n.price}</span>
                      {n.fastDelivery ? (
                        <div>Fast Delivery</div>
                      ) : (
                        <div>4 days delivery</div>
                      )}
                      <p style={{ paddingTop: 3 }}>Stock: {n.stock}</p>
                    </Card.Subtitle>
                  </Card.Body>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-evenly",
                      flexDirection: "row",
                    }}
                  >
                    <Button
                      className="btn-danger"
                      onClick={() => handleOnMinusitem(n)}
                      style={{ backgroundColor: "dark-red" }}
                    >
                      -
                    </Button>
                    <p style={{ margin: 0 }}>{n.currentUserStock}</p>
                    <Button
                      className="btn-success"
                      onClick={() => handleOnPlusitem(n)}
                      style={{ backgroundColor: "dark-green" }}
                    >
                      +
                    </Button>
                  </div>
                  <div
                    style={{
                      alignItems: "center",
                      display: "flex",
                      justifyContent: "center",
                      marginTop: 10,
                      marginBottom: 10,
                    }}
                  >
                    <Button onClick={() => handleOnRemove(n)}>
                      Remove item
                    </Button>
                  </div>
                </Card>
              </CardGroup>
            </div>
          );
        })}
      <div className="filters summary">
        <span className="title">Subtotal ({myCart.length}) items</span>
        <span style={{ fontWeight: 700, fontSize: 20 }}>
          Total: Rs. {balance}
        </span>
        <Button type="button" disabled={myCart.length === 0}>
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
};

export default Cart;
