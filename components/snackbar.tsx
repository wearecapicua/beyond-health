import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Snackbar = () => {
  return (
    <ToastContainer
      position="bottom-right"
      autoClose={1400}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      theme="light"
    />
  );
};

export default Snackbar
