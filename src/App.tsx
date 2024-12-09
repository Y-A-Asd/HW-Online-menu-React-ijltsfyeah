import { Flip, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

function App() {
  const notify = () => toast("Wow so easy!");
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
      <Footer />
    </div>
  );
}

export default App;
