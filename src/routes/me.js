const express = require("express");
const router = express.Router();

const meController = require("../app/controllers/MeController");

router.get("/stored/courses", meController.storedCourses);
router.get("/stored/courses/:page", meController.storedCourses);
router.get("/stored/courses-all", meController.storedCoursesAll);
router.get("/trash/courses", meController.trashCourses);
router.get("/trash/courses/:page", meController.trashCourses);
router.get("/trash/courses-all", meController.trashCoursesAll);

module.exports = router;
