import React, { useState } from "react";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { updateCart } from "../redux/cartSlice";
import { IAddToCartButton } from "../redux/Types";

function AddToCartButton(props: IAddToCartButton) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(props.quantity ?? 0);

  const addToCart = () => {
    const updatedCount: number = (quantity || 0) + 1;
    setQuantity(updatedCount);
    dispatch(updateCart({ ...props, quantity: updatedCount }));
  };

  const removeFromCart = () => {
    const updatedCount: number = (quantity || 0) - 1;
    setQuantity(updatedCount);
    dispatch(updateCart({ ...props, quantity: updatedCount }));
  };
  
  return (
    <div className={`flex justify-between ${props.cn}`}>
      <div className="price">Rs:{props.price}</div>
      {props.quantity > 0 ? (
        <div className="flex justify-end">
          <button onClick={removeFromCart}>
            <AiOutlineMinusCircle />
          </button>
          <p className="w-5 text-center">{props.quantity ?? 0}</p>
          <button onClick={addToCart}>
            <AiOutlinePlusCircle />
          </button>
        </div>
      ) : (
        <button
          className="bg-black text-white px-2 py-1 text-small rounded"
          onClick={addToCart}
        >
          Add
        </button>
      )}
    </div>
  );
}

export default AddToCartButton;
