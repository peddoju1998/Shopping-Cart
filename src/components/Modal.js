import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';

function Model({data}) {
    const [smShow, setSmShow] = useState(false);
    const [item, setitem] = useState(1)

    const handleOnPlusitem  = () =>{
        if(data.stock > item){
            setitem(item + 1)
        }else{
            alert("Quantity should less than " + data.stock)
        }
    }

    const handleOnMinusitem  = () =>{
        if (item > 1){
            setitem(item - 1)
        }
    }

    const handleOnCart = (n)=>{
        let data1 = {
            name: n.title,
            qty: item,
            img: n.image,
            price: n.price
        }
        sessionStorage.setItem(n.id, JSON.stringify(data1))
    }
  
    return (
      <>
        <Button onClick={() => setSmShow(true)} className="me-2">
          Add to cart
        </Button>
        <Modal
          size="sm"
          show={smShow}
          onHide={() => setSmShow(false)}
          aria-labelledby="example-modal-sizes-title-sm"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-sm">
              Choice quantity
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', flexDirection: 'row'}}>
            <Button className='btn-danger' onClick={()=> handleOnMinusitem()} style={{backgroundColor: "dark-red"}}>-</Button>
            <p style={{margin: 0}}>{item}</p>
            <Button className='btn-success' onClick={()=> handleOnPlusitem()} style={{backgroundColor: "dark-green"}}>+</Button>
            </div>
            <div style={{alignItems: 'center', display: 'flex', justifyContent: 'center', marginTop: 10}}>
            <Button onClick={()=> handleOnCart(data)}> <Link to={{pathname: "/cart"}}> Go to cart </Link></Button>
            </div>
          </Modal.Body>
        </Modal>
      </>
    );
  }
  
  export default Model;