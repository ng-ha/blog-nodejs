const express = require("express");
const router = express.Router();

const newsController = require("../app/controllers/NewsController");
// router matchs path từ trên xuống, match => chạy controller luôn, => đặt "/" xuống cuối cùng
router.use("/:slug", newsController.show);
router.use("/", newsController.index);

module.exports = router;
