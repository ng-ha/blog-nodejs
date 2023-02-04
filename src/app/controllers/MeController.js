const Course = require("../models/Course");
const { multipleMongooseToObject } = require("../../util/mongoose");
class MeController {
    // [GET] /me/stored/courses-all
    storedCoursesAll(req, res, next) {
        Promise.all([
            Course.find({}).sortable(req).lean(),
            Course.countDocumentsDeleted(),
        ])
            .then(([courses, deletedCount]) => {
                res.render("me/stored-courses-all", {
                    courses,
                    deletedCount,
                });
            })
            .catch(next);
    }

    // [GET] /me/stored/courses & /me/stored/courses/:page
    storedCourses(req, res, next) {
        let itemsPerPage = 5;
        let curPage = req.params.page || 1;

        Promise.all([
            Course.find({})
                .skip(itemsPerPage * curPage - itemsPerPage)
                .limit(itemsPerPage)
                .sortable(req)
                .lean(),
            Course.countDocumentsDeleted(),
            Course.countDocumentsWithDeleted(),
        ])
            .then(([courses, deletedCount, allCount]) => {
                const numPages = Math.ceil(
                    (allCount - deletedCount) / itemsPerPage
                );
                res.render("me/stored-courses", {
                    courses,
                    deletedCount,
                    curPage,
                    numPages,
                });
            })
            .catch(next);

        // Course.countDocumentsDeleted()
        //     .then((deletedCount) => {
        //         console.log(deletedCount);
        //     })
        //     .catch(() => {});
        // Course.find({})
        //     .lean()
        //     .then((courses) => res.render("me/stored-courses", { courses }))
        //     .catch(next);
    }

    // [GET] /me/trash/courses-all
    trashCoursesAll(req, res, next) {
        Course.findDeleted({})
            .sortable(req)
            .lean()
            .then((courses) => res.render("me/trash-courses-all", { courses }))
            .catch(next);
    }
    // [GET] /me/trash/courses & /me/trash/courses/:page
    trashCourses(req, res, next) {
        let itemsPerPage = 5;
        let curPage = req.params.page || 1;

        Promise.all([
            Course.findDeleted({})
                .skip(itemsPerPage * curPage - itemsPerPage)
                .limit(itemsPerPage)
                .sortable(req)
                .lean(),
            Course.countDocumentsDeleted(),
        ])
            .then(([courses, deletedCount]) => {
                const numPages = Math.ceil(deletedCount / itemsPerPage);
                res.render("me/trash-courses", { courses, curPage, numPages });
            })
            .catch(next);
    }
}

module.exports = new MeController();
