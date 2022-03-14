import BaseNotification from "../../components/Notifications/BaseNotification";
import NotificationText from "../../components/Notifications/NotificationText";

const Component = () => {
  return (
    <div className="notification-content">
      <NotificationText>Files uploaded</NotificationText>
    </div>
  );
};

interface Props {
  show: boolean;
}

const FileUploadingSuccess = ({ show }: Props) => {
  return (
    <BaseNotification toastId="FileUploadingSuccess" show={show} position="bottom-left">
      <Component />
    </BaseNotification>
  );
};

export default FileUploadingSuccess;
