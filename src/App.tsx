import { Flip, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Menu } from "./components/Menu";
import { MenuProps } from "./components/Menu";
import { useEffect, useState } from "react";
import { Cart, CartProps } from "./components/Cart";
import { Dispatch, SetStateAction } from "react";
import { usePersistedState } from "./utils/Persisted";

export const notify = (text: string) => toast(text);

function App() {
  const [menuItems, setMenuItems] = useState<MenuProps[]>([]);

  // useEffect lets you perform the fetch after the initial render
  // and ensures it only happens once (or when dependencies change).
  useEffect(() => {
    fetch("/data.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((json) => setMenuItems(json))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const [cartItems, setCartItems] = usePersistedState<CartProps[] | []>(
    [],
    "cart"
  );

  return (
    <div className="min-h-screen">
      <Header />
      <div dir="rtl">
        <ToastContainer rtl={true} />
      </div>
      <Menu
        props={menuItems}
        setCartItems={setCartItems}
        cartItem={cartItems}
      ></Menu>
      <Cart
        props={cartItems}
        setCartItems={setCartItems}
        cartItem={cartItems}
      ></Cart>
      <Footer />
    </div>
  );
}

export default App;
