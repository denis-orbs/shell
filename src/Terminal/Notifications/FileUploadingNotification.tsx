import BaseNotification from "../../components/Notifications/BaseNotification";
import BeatLoader from "react-spinners/BeatLoader";
import NotificationText from "../../components/Notifications/NotificationText";

const Component = () => {
  return (
    <div className="notification-content">
      <NotificationText>Files uploading...</NotificationText>
      <BeatLoader size={10} speedMultiplier={0.6} />
    </div>
  );
};

interface Props {
  show: boolean;
}

const FileUploadingNotification = ({ show }: Props) => {
  return (
    <BaseNotification toastId="FileUploadingNotification" show={show} position="bottom-left">
      <Component /> 
    </BaseNotification>
  );
};

export default FileUploadingNotification;
