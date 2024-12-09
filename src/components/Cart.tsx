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
    <div className="p-5 m-5 border-2 border-gray-300 rounded-lg mx-32">
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
            <div className="grid grid-flow-col g-4 place-items-center items-center space-x-4">
              <p className="text-md mx-2 text-amber-500 font-bold font-farsi">
                {item.price * item.quantity} تومان
              </p>
              <div className="flex items-center space-x-2">
                <button
                  className="bg-gray-300 text-gray-800 font-bold mb-0.5 w-7 h-7 rounded mx-2 
                  font-allfont disabled:invisible hover:bg-slate-500 transition ease-in"
                  onClick={() => removeFromCart(item.id)}
                  disabled={item.quantity == 1}
                >
                  -
                </button>
                <span className="text-sm font-allfont font-bold">
                  {item.quantity}
                </span>
                <button
                  className="bg-amber-500 hover:bg-amber-600 text-white font-bold w-7 h-7 rounded mx-2 font-allfont"
                  onClick={() => addToCart(item.id)}
                >
                  +
                </button>
              </div>
              <button
                className="bg-red-600 hover:shadow-lg hover:bg-red-700 font-bold  text-white w-7 h-7 rounded mx-2 font-allfont"
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
          }, 0)}{" "}
          تومان
        </h2>
      </div>
      <button className="bg-amber-600 w-full py-2 rounded-lg font-extrabold text-white text-xl tracking-wider">
        ثبت سفارش
      </button>
    </div>
  );
}
