const express = require("express");
const app = express();
const port = 3000;
// route
app.get("/", (req, res) => {
  res.send("Hello World!");
});
// 127.0.0.1 - localhost
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
