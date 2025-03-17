import React from "react";
import { Snackbar, Alert } from "@mui/material";
import useNotificationStore from "../stores/notificationStore";

const Notification = () => {
  const notification = useNotificationStore((state) => state.notification);
  const notificationType = useNotificationStore((state) => state.notificationType);
  const clearNotification = useNotificationStore((state) => state.clearNotification);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    clearNotification();
  };

  let content = <div></div>;
  if (notification) {
    content = (
      <Alert onClose={handleClose} severity={notificationType} sx={{ width: "100%" }}>
        {notification}
      </Alert>
    );
  }

  return (
    (
      <Snackbar
        open={!!notification}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        {content}
      </Snackbar>
    )
  );
};

export default Notification;
