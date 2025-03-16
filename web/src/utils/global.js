import useLoadingStore from "../stores/loadingStore";
import useNotificationStore from "../stores/notificationStore";
import api from "./api";

export const setLoading = (loading) => {
  const setLoading = useLoadingStore.getState().setLoading;
  setLoading(loading);
};

export const notifyOk = (message) => {
  const setNotification = useNotificationStore.getState().setNotification;
  setNotification(message, "success");
}

export const notifyError = (message) => {
  const setNotification = useNotificationStore.getState().setNotification;
  setNotification(message, "error");
}

// To simplify importing(import this module only), forward the get and post functions from the api module
export const get = (url, params) => {
  return api.get(url, params);
}

export const post = (url, params) => {
  return api.post(url, params);
}