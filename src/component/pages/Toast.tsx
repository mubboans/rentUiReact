/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
// import { HideToast } from "../../helper/ToastHelper";
import { useEffect } from "react";
const Toast = () => {
  // const[type,setType]=useState('success')
  //@ts-expect-error
  const { a, toastConf } = useSelector((state) => state.custom) || {}; // eslint-disable-line
  useEffect(() => {
    console.log(toastConf, "toastConf hit", a);
    if (toastConf?.showtoast) {
      const toastOptions = {
        duration: 6000,
        style: {
          backgroundColor: getBackgroundColor(toastConf?.type),
          // toastConf?.type === "success" ? "#4CAF50" : "#F44336",
          color: "#FFFFFF"
          // Add more styles as needed
        },
        iconTheme: {
          primary: "#000",
          secondary: "#fff"
        }
      };
      if (toastConf?.type == "success") {
        toast.success(toastConf?.message, toastOptions);
      } else {
        toast.error(toastConf?.message, toastOptions);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toastConf]);
  const getBackgroundColor = (type: string) => {
    switch (type) {
      case "success":
        return "#4CAF50";
      case "warning":
        return "#FFFF00";
      case "error":
        return "#F44336";
      default:
        return "#FFFFFF";
    }
  };
  return (
    // const handleClose = () => {
    //     HideToast();
    //     console.log('Toast Hidded Succesfully');

    // }
    //   if (toastConf) {
    <Toaster position="bottom-right" />
    //            {toastConf.toastConf && (
    //     <div className={`toast ${toastConf.type}`}>
    //       <button onClick={handleClose}>✖</button>
    //       <p>{toastConf.message}</p>
    //     </div>
    //   )}
    //           {/*  */}
    //       </Toaster>
    //   }
  );
};

export default Toast;
