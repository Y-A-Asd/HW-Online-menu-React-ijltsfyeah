import { Dispatch, SetStateAction, useState } from "react";
import { CartProps } from "./Cart";
import { notify } from "../App";

export interface MenuProps {
  id: number;
  name: string;
  price: number;
  short_description: string;
  image: string;
}

interface MenuComponentProps<T> {
  props: MenuProps[];
  setCartItems: Dispatch<SetStateAction<T>>;
  cartItem: T;
}

export function Menu({
  props,
  setCartItems,
  cartItem,
}: MenuComponentProps<CartProps[]>) {
  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = props.slice(startIndex, endIndex);
  const totalPages = Math.ceil(props.length / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const addToCart = (item: MenuProps) => {
    setCartItems((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
    notify("آیتم مورد نظر اضافه شد!");
  };

  const removeFromCart = (item: MenuProps) => {
    setCartItems((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
      } else {
        return prevCart.filter((cartItem) => cartItem.id !== item.id);
      }
    });
    notify("آیتم مورد نظر حذف شد!");
  };

  return (
    <div>
      <div className="grid grid-cols-3 p-10 gap-6 font-farsi">
        {currentItems.map((item) => (
          <div
            key={item.id}
            className="bg-gray-50 hover:shadow-lg p-4 rounded m-2 flex-col justify-center gap-3"
          >
            <img
              className="place-self-center w-full h-[140px] object-cover"
              src={item.image}
              alt={item.name}
              width="200"
            />
            <h4 className="font-bold my-2 text-md">{item.name}</h4>
            <p className="text-gray-600 my-1 text-sm truncate">
              {item.short_description}
            </p>
            <p className="text-amber-500 font-bold">{item.price} تومان</p>
            <div className="flex mt-4">
              <button
                className=" bg-amber-500 hover:bg-amber-600 text-white w-7 h-7 rounded mx-2"
                onClick={() => addToCart(item)}
              >
                +
              </button>
              <p
                id=""
                className=" bg-white text-black rounded mx-2 mt-0.5 text-xs place-self-center font-bold"
              >
                {cartItem.find((cartItem) => cartItem.id === item.id)
                  ?.quantity || 0}
                {/* optional chaining operator.  */}
              </p>
              <button
                onClick={() => removeFromCart(item)}
                className=" bg-gray-300 text-black w-7 h-7 rounded mx-2"
              >
                -
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-4 my-6">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 text-black bg-gray-300 hover:bg-gray-400 hover:shadow  rounded disabled:hidden"
        >
          قبلی
        </button>
        <span className="text-lg">
          صفحه {currentPage} از {totalPages}
        </span>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-amber-600 hover:bg-amber-700 hover:shadow text-white rounded disabled:bg-gray-300"
        >
          بعدی
        </button>
      </div>
    </div>
  );
}
