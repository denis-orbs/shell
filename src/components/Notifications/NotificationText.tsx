import React, { ReactNode } from "react";
interface Props {
  children: ReactNode | string;
}

function NotificationText({ children }: Props) {
  return <div className="notification-text">{children}</div>;
}

export default NotificationText;
