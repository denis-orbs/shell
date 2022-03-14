import { toast, ToastPosition, Slide } from "react-toastify";
import { ReactNode, ReactText, useEffect, useRef } from "react";

interface Props {
  show: boolean;
  children: ReactNode | string;
  position?: ToastPosition;
  onClick?: () => void;
  draggable?: boolean;
  closeOnClick?: boolean;
  closeButton?: boolean;
  autoCloseMilliseconds?: number;
  onClose?: () => void;
  toastId?: string;
}

function BaseNotification({
  children,
  position = "top-right",
  onClick,
  show,
  draggable = true,
  closeOnClick = true,
  closeButton = true,
  onClose,
  toastId,
}: Props) {
  const notify = () => {
    if (toastId && toast.isActive(toastId)) {
      return;
    }
    toast(children, {
      toastId,
      position,
      draggable,
      hideProgressBar: true,
      progress: undefined,
      autoClose: false,
      onClick,
      closeOnClick,
      closeButton,
      onClose: onClose,
      transition: Slide
      
    });
  };

  useEffect(() => {
    if (show) {
      notify();
    } else {
      toast.dismiss(toastId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);
  return null;
}

export default BaseNotification;
