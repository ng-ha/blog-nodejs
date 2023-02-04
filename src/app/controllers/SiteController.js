const Course = require("../models/Course");
const { multipleMongooseToObject } = require("../../util/mongoose");
class SiteController {
    // [GET] /
    index(req, res, next) {
        // trả dữ liệu về dưới dạng json (send a JSON response):
        // res.json({
        //     name: "test",
        // });

        // Dùng callback
        // Course.find({}, (err, courses) => {
        //     if (!err) {
        //         res.json(courses);
        //     } else {
        //         next(err);
        //     }
        // });

        // Dùng promise
        // Course.find({})
        //     .then((courses) => res.json(courses))
        //     // .catch((err) => next(err));
        //     .catch(next);

        // Render view with data from db
        // Course.find({})
        //     .then((courses) => {
        //         // moongoose trả về Object với các props nằm trong prototype, không phải "own prop" => dùng .toObject()
        //         // Handlebars: Access has been denied to resolve the property "image" because it is not an "own property" of its parent.
        //         // courses = courses.map((course) => course.toObject());

        //         res.render("home", {
        //             courses: multipleMongooseToObject(courses),
        //         });
        //     })
        //     .catch(next);
        Course.find({})
            .lean()
            .then((courses) => {
                res.render("home", { courses });
            })
            .catch(next);

        // res.render("home");
    }

    // [GET] /search
    search(req, res) {
        res.render("search");
    }
}

module.exports = new SiteController();
