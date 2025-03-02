import axios from "axios";

let apiURL = process.env.NODE_ENV === "development" ? "http://localhost:3001" : "";
const axs = axios.create({ baseURL: apiURL });

function request(method, url, param = null, notify) {
  let call;
  let header = {};
  if (method == "get") {
    call = axs.get;
  } else if (method == "post") {
    call = axs.post;
  } else if (method == "upload") {
    call = axs.post;
    header = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
  } else {
    console.error("Invalid request method");
    return;
  }

  return new Promise(async (resolve, reject) => {
    logRequest(method, url, param);
    call(url, param, header)
      .then((res) => {
        logResponse(res);
        const code = res.data.code;
        switch (code) {
          case 0:
            resolve(res.data);
            break;
          default:
            // business logic error which need to be handled in business logic code
            // so what reject do is about business logic error represent by error code (HTTP status is 200)
            // instead of exception caused by http response which HTTP status is not 200
            reject(res.data);
        }
      })
      .catch((err) => {
        // http request error(non 200 status) OR the above code block javascript error
        if (err.response) {
          handleErrStatus(err.response.status, null);
        }
        logResponseError(err);
        notifyErr(notify.err);
      });
  });
}

function logRequest(method, url, param) {
  console.log(`↑ ${method} ${url}`, param);
}

function logResponse(res) {
  console.log(`↓ ${res.data.msg}`, res.data);
}

function handleErrStatus(status, router) {
  switch (status) {
    case 401:
      handleUnLogin(router);
      break;
    case 403:
    case 404:
    case 500:
    default:
  }
}

function logResponseError(err) {
  console.error("↓ * ", err);
}

function notifyOk(msg) {}

function notifyErr(msg) {}

function handleUnLogin(router) {}

function setAuthToken(token) {
  axs.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

function get(url, params) {
  return request("get", url, { params: params }, {});
}

function post(url, params) {
  return request("post", url, params, {});
}

function upload(url, fileData) {
  return request("upload", url, fileData, {});
}

export default { get, post, upload, setAuthToken };
