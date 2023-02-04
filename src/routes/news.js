const express = require("express");
const router = express.Router();

const newsController = require("../app/controllers/NewsController");
// router matchs path từ trên xuống, match => chạy controller luôn, => đặt "/" xuống cuối cùng
router.get("/:slug", newsController.show);
router.get("/", newsController.index);

module.exports = router;
