const serverless = require("serverless-http");
const express = require("express");
const app = express();

const connection = require("./connection/connect");
const v1Routes = require("./v1/routes/index");
const response = require("./utility/response");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/v1", v1Routes);

app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from root!",
  });
});

app.get("/hello", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from path!",
  });
});

app.use((req, res, next) => {
  const err = "Oops! Page Not Found";
  res.status(404).send({ status: 404, message: err });
});

app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 400;
  if (err.message == "jwt expired" || err.message == "Authentication error") {
    res.status(401).send({ statusCode: 401, message: err });
  }
  if (typeof err == typeof "") {
    response.sendFailResponse(req, res, status, err);
  } else if (err.Error)
    res.status(status).send({ statusCode: status, message: err.Error });
  else if (err.message)
    res.status(status).send({ statusCode: status, message: err.message });
  else res.status(status).send({ statusCode: status, message: err.message });
});

app.listen(4000, () => console.log("run on port 4000"));

// module.exports.handler = serverless(app);
