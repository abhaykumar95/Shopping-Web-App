import { useDispatch, useSelector } from "react-redux";
import { add } from "../redux/Slices/CartSlice";
import { remove } from "../redux/Slices/CartSlice";
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

const Product = ({ post, isLoggedIn }) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addToCart = () => {
    if (isLoggedIn === true) {
      dispatch(add(post));
      toast.success('Item added to Cart');
    } else {
      toast.error('Please Log In first');
      setTimeout(function () {
        navigate('/login');
      }, 3000);
    }
  };

  const removeFromCart = () => {
    dispatch(remove(post.id));
    toast.error('Item removed from Cart');
  };

  return (
    <div className="flex flex-col items-center justify-between border rounded-xl shadow-lg hover:scale-110 transition duration-300 ease-in hover:shadow-[0_10px_20px_rgba(0,_0,_0)] gap-3 p-4 mt-10 ml-5">
      <div>
        <p className="text-gray-700 font-semibold text-lg mt-1 truncate w-40">{post.title}</p>
      </div>

      <div>
        <p className="px-2 w-40 text-gray-400 font-normal text-[10px]">
          {post.description.split(' ').slice(0, 10).join(' ') + '...'}
        </p>
      </div>

      <div>
        <img className="h-[160px]" src={post.image} alt={post.title} />
      </div>

      <div className="mt-3 flex items-center justify-between w-full px-3 text-[14px]">
        <div>
          <p className="text-green-600 font-bold">${post.price}</p>
        </div>

        <div>
          {
            isLoggedIn ? (
              cart.some((p) => p.id === post.id) ? (
                <button
                  className="text-gray-700 border-2 border-gray-700 rounded-md p-2 hover:bg-slate-900 hover:text-white transition-all duration-200 ease-in"
                  onClick={removeFromCart}
                >
                  Remove Item
                </button>
              ) : (
                <button
                  className="text-gray-700 border-2 border-gray-700 rounded-md p-2 hover:bg-slate-900 hover:text-white transition-all duration-200 ease-in"
                  onClick={addToCart}
                >
                  Add to Cart
                </button>
              )
            ) : (
              <button
                className="text-gray-700 border-2 border-gray-700 rounded-md p-2 hover:bg-slate-900 hover:text-white transition-all duration-200 ease-in"
                onClick={addToCart}
              >
                Add to Cart
              </button>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default Product;
