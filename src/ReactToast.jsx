import { toast } from "react-toastify";
const showToast = (message, type = "success") => {
  switch (type) {
    case "success":
      toast.success(message);
      break;
    case "error":
      toast.error(message);
      break;
    default:
      break;
  }
};

export { showToast };
