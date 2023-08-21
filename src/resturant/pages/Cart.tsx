import { useSelector } from 'react-redux'
import { RootState } from '../redux/store';
import AddToCartButton from '../components/AddToCartButton';

function Cart() {
  const getProduct = useSelector(
    (state: RootState) => state.cartReducer.cartItem
  );

  return (
    <div className="flex gap-10">
      <div className="cartItem w-6/12 p-10 shadow-xl shadow-black-1000/100 rounded-md">
        {getProduct.map((item) => (
          <div key={item.id} className="flex justify-between mb-4 border-b-2 pb-2">
            <img src={item.image} alt="" className="w-10 h-10 object-cover" />
            <div className="container ml-2">
              <p className="text-sm">{item.name}</p>
              <AddToCartButton
                {...item}
                quantity={item.quantity}
                cn="flex-row-reverse"
                price={item.price * item.quantity}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="paymentSection p-10 w-6/12 shadow-xl shadow-black-1000/100 rounded-md">
        asd
      </div>
    </div>
  );
}

export default Cart