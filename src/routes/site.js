const express = require("express");
const router = express.Router();

const siteController = require("../app/controllers/SiteController");
// router matchs path từ trên xuống, match => chạy controller luôn, => đặt "/" xuống cuối cùng
router.use("/search", siteController.search);
router.use("/", siteController.index);

module.exports = router;

// site.js chứa tất cả những path còn lại (vì có ít path liên kết nên không cần thiết tạo controller và route riêng)
