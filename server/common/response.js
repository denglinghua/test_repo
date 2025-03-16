// 200 includes success and error in business logic level
// under 200 
// 0: success
// >0: business logic error
function response(res, code, msg, data) {
  return res.status(200).json({
    code: code,
    msg: msg,
    data: data,
  });
}

function ok(res, msg, data) {
  return response(res, 0, msg, data);
}

function error(res, code, msg, data = {}) {
  return response(res, code, msg, data);
}

export default {
  ok,
  error,
};