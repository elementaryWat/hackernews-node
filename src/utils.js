const jwt = require("jsonwebtoken");
const APP_SECRET = "MyFirstGRAPHQlAPI";

function getUserById(context) {
  const Authorization = context.request.get("Authorization");
  if (Authorization) {
    const token = Authorization.replace("Bearer ", "");
    const { user_id } = jwt.verify(token, APP_SECRET);
    return user_id;
  }
  throw new Error("No Autenticado");
}

module.exports={
    APP_SECRET,
    getUserById
}
