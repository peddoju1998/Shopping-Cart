import { Card, Button } from "react-bootstrap";
import Rating from "./Rating";
import CardGroup from 'react-bootstrap/CardGroup';
import {
  useState,
  useEffect,
} from "react";

import { Link } from "react-router-dom";

const SingleProduct = ({filter}) => {
  const [prod, setProd] = useState([]);
  const [userCart, setUserCart] = useState([])
  const [isLoad, setIsLoad] = useState(false)

  const lowToHigh = ()=>{
    const a = prod.sort((a, b)=>{
      return a.price - b.price
    })
    setProd([...a])
  }

  const highToLow = ()=>{
    const a = prod.sort((a, b)=>{
      return b.price - a.price
    })
    setProd([...a])
  }

  const fecthData = async () => {
    const url = "http://localhost:3000/db.json"
    const response = await fetch(url);
    const data = await response.json()
    setProd(data.ecommerce)
    setIsLoad(true)
  }

  const findText = async (n)=>{
    if(n){
      const a = prod.filter((s)=>{
        return  s.title.toLowerCase().includes(n)
      })
      console.log(a)
      setProd([...a])
    }else{
      await fecthData()
    }
  }



    const handleOnCartAdd = (n)=>{
      let tempData = {
        name: n.title,
        price: n.price,
        stock: n.stock,
        currentUserStock: 1,
        img: n.image,
        id: n.id
      }
      let getOldData = sessionStorage.getItem("data")
      if (getOldData == null){
        sessionStorage.setItem("data", JSON.stringify([tempData]))
      }else{
        let tempStorage = JSON.parse(getOldData)
        tempStorage = [...tempStorage, tempData]
        sessionStorage.setItem("data", JSON.stringify(tempStorage))
      }
    alert("Check your cart")
    }

  useEffect(() => {
    const fecthData = async () => {
      const url = "http://localhost:3000/db.json"
      const response = await fetch(url);
      const data = await response.json()
      setProd(data.ecommerce)
      setIsLoad(true)
    }
    fecthData()
  }, []);


  useEffect(() => {
    const data = filter()
    console.log(123)
    console.log(data)
    if (data[0] === "highToLow"){
      console.log(12)
      highToLow()
    }
    else if(data[0] === "lowToHigh"){
      lowToHigh()
    }
    else if(data[1]){
      findText(data[1])
    }else if(!data[1]){
      fecthData()
    }else if(data[2]){
      fecthData()
    }
  }, [filter])
  

  return (
    <>
      {!isLoad && <p> Loading... </p>}
      {isLoad && prod.map((n) => {
        return (
          <div className="products" key={n.id}>
            <CardGroup>
              <Card>
                <Card.Img variant="top" src={n.image} alt={n.title}/>
                <Card.Body>

                  <Card.Title>{n.title}</Card.Title>
                  <Card.Subtitle style={{ paddingBottom: 10 }}>
                    <span>Rs. {n.price}</span>
                    {n.fastDelivery ? (
                      <div>Fast Delivery</div>
                    ) : (
                      <div>4 days delivery</div>
                    )}
                    <p style={{ paddingTop: 3 }}>Stock: {n.stock}</p>
                    <Rating rating={n.rating} />
                  </Card.Subtitle>
                </Card.Body>
                <Button onClick={()=>  {
                  handleOnCartAdd(n)
                }}>Add to cart</Button>
              </Card>
            </CardGroup>
          </div>
        )
      })}
    </>
  );
};

export default SingleProduct;
