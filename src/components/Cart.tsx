import { Dispatch, SetStateAction, useState } from "react";
import { MenuProps } from "./Menu";
import { notify } from "../App";

export interface CartProps extends MenuProps {
  quantity: number;
}

interface CartComponentProps<T> {
  props: CartProps[];
  setCartItems: Dispatch<SetStateAction<T>>;
  cartItem: T;
}

export function Cart({
  props,
  setCartItems,
  cartItem,
}: CartComponentProps<CartProps[]>) {
  const removeItem = (itemId: number) => {
    setCartItems((prevCart) => prevCart.filter((item) => item.id !== itemId));
    notify("آیتم مورد نظر حذف شد!");
  };

  const addToCart = (itemId: number) => {
    setCartItems((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
    notify("آیتم مورد نظر اضافه شد!");
  };

  const removeFromCart = (itemId: number) => {
    setCartItems((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
    notify("آیتم مورد نظر حذف شد!");
  };

  return (
    <div className="p-5 m-5 border-2 border-gray-300 rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">سبد شما</h2>
      <div className="grid grid-cols-1 gap-6">
        {props.map((item) => (
          <div
            key={item.id}
            className="bg-gray-50 p-4 rounded shadow-lg flex items-center justify-between"
          >
            <div>
              <h4 className="font-bold text-gray-800">{item.name}</h4>
            </div>
            <div className="flex items-center space-x-4">
              <p className="text-md mx-5 text-amber-500 font-bold font-farsi">
                {item.price * item.quantity} تومان
              </p>
              <div className="flex items-center space-x-2">
                <button
                  className="bg-gray-400 text-black mb-0.5 w-7 h-7 rounded mx-2 font-allfont"
                  onClick={() => removeFromCart(item.id)}
                >
                  -
                </button>
                <span className="text-sm font-allfont font-bold">
                  {item.quantity}
                </span>
                <button
                  className="bg-amber-500 hover:bg-amber-600 text-white w-7 h-7 rounded mx-2 font-allfont"
                  onClick={() => addToCart(item.id)}
                >
                  +
                </button>
              </div>
              <button
                className="bg-rose-500 hover:shadow-lg hover:bg-rose-600 text-white w-7 h-7 rounded mx-2 font-allfont"
                onClick={() => removeItem(item.id)}
              >
                x
              </button>
            </div>
          </div>
        ))}

        <h2 className="text-2xl font-extrabold mb-6 text-gray-800">
          جمع کل:{" "}
          {props.reduce<number>((acc, cur) => {
            return (acc += cur.price * cur.quantity);
          }, 0)}
        </h2>
      </div>
    </div>
  );
}
