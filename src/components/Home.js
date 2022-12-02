import { CartState } from "../context/Context";
import Filters from "./Filters";
import SingleProduct from "./SingleProduct";


const Home = (props) => {
  const { item } = props;
  console.log(item, "item of home");
  const {
    productState: { sort, searchQuery, byFastDelivery },
  } = CartState();

  const {
    productState
  } = CartState();
  console.log(productState)
  const transformProducts = () => {
    return [sort, searchQuery, byFastDelivery];
  };

  return (
    <div className="home">
      <Filters />
      <div className="productContainer">
        <SingleProduct filter={transformProducts}/>
      </div>
    </div>
  );
};

export default Home;
