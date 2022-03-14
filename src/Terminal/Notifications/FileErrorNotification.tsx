import BaseNotification from "../../components/Notifications/BaseNotification";
import BeatLoader from "react-spinners/BeatLoader";
import NotificationText from "../../components/Notifications/NotificationText";
import { MAX_FILE_SIZE } from "../../consts";

const Component = () => {
  return (
    <div className="notification-content">
      <NotificationText>
        File size limit is {MAX_FILE_SIZE / 1000000} MB
      </NotificationText>
    </div>
  );
};

interface Props {
  show: boolean;
}

const FileErrorNotification = ({ show }: Props) => {
  return (
    <BaseNotification toastId='FileErrorNotification' show={show} position="bottom-left"  
    >
      <Component />
    </BaseNotification>
  );
};

export default FileErrorNotification;
