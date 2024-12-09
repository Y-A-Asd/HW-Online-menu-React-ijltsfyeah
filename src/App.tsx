import { Flip, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Menu } from "./components/Menu";
import { MenuProps } from "./components/Menu";
import { useEffect, useState } from "react";

function App() {
  const notify = () => toast("Wow so easy!");

  const [menuItems, setMenuItems] = useState<MenuProps[]>([]);

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

  return (
    <div className="min-h-screen">
      <Header />
      <div>
        <button onClick={notify}>Notify!</button>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={true}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          transition={Flip}
        />
      </div>
      <Menu props={menuItems}></Menu>
      <Footer />
    </div>
  );
}

export default App;
