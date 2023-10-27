import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Customer from "./pages/Customer";
import { Provider } from "react-redux";
import appStore from "./store/appStore";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <Header />
        <Outlet />
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </Provider>
    </>

  )
}

const creatingRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <SignIn />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/customer",
        element: <Customer />,
      },

    ],
  },
]);

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(<RouterProvider router={creatingRouter} />);
} else {
  console.error("Element with id 'root' not found");
}