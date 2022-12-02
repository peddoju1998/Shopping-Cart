import {
  createContext,
  useContext,
  useReducer,
  useState,
  useEffect,
} from "react";

import { cartReducer, productReducer } from "./Reducers";

const Cart = createContext();

const Context = ({ children }) => {
  const [prod, setProd] = useState([]);

  let products = prod;

  useEffect(() => {
    fetch("https://shopping-cart-ebon-delta.vercel.app/db.json")
      .then((response) => response.json())
      .then((result) => setProd(result))
      .catch((error) => console.log(error));
  }, []);

  const [state, dispatch] = useReducer(cartReducer, {
    products: products,
    cart: [],
  });
  console.log(products);

  const [productState, productDispatch] = useReducer(productReducer, {
    byStock: false,
    byFastDelivery: false,
    byRating: 0,
    searchQuery: "",
  });

  console.log(productState);

  return (
    <Cart.Provider value={{ state, dispatch, productState, productDispatch }}>
      {children}
    </Cart.Provider>
  );
};

export const CartState = () => {
  return useContext(Cart);
};

export default Context;
