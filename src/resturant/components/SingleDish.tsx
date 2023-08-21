import { useSelector } from "react-redux";
import { IDishDetails } from "../redux/Types";
import { Link } from "react-router-dom";
import { RootState } from "../redux/store";
import { AiTwotoneStar } from "react-icons/ai";
import AddToCartButton from "./AddToCartButton";
import FoodCategorySymbol from "./FoodCategorySymbol";

function SingleDish(props: IDishDetails) {
  const getProduct = useSelector(
    (state: RootState) => state.cartReducer.cartItem
  );
  const itemCount =
    getProduct.find((item) => item.id === props.id)?.quantity ?? 0;

  return (
    <div className="grid grid-cols-2 relative shadow-xl shadow-black-1000/100">
      <div className="w-full">
        <img
          src={props.image}
          alt={props.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col justify-between p-2">
        <div className="flex justify-between items-center">
          <div className="bg-orange-600 text-white text-xs capitalize rounded-md p-1">
            {props.category}
          </div>
          <div className="rating flex items-center">
            <AiTwotoneStar className="text-md text-orange-400" />
            <span>{props.rating}</span>
          </div>
        </div>
        <Link to={`/resturant/product/${props.id}`} className="text-medium block">
          {props.name}
        </Link>
        <p>{props.description}</p>
        <AddToCartButton {...props} quantity={itemCount} />
      </div>
      <FoodCategorySymbol isNonVeg={props.isNonVeg}/>
    </div>
  );
}

// const mapStateToProps = (state: any) => {
//   // console.log(state.cartReducer.cartItem);
//   return { getProduct: state.cartReducer.cartItem };
// };

// const mapDispatchToProps = (dispatch: any) => {
//   return {
//     ADD: (id: number) => dispatch(ADD(id)),
//     REMOVE: (id: number) => dispatch(REMOVE(id)),
//   };
// };

export default SingleDish;
