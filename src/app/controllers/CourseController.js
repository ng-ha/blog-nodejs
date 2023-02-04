const Course = require("../models/Course");
const slugify = require("slugify");
const { nanoid } = require("nanoid");

class CourseController {
    //  [GET] /courses/:slug
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .lean()
            .then((course) => res.render("courses/show", { course }))
            .catch(next);
    }

    //  [GET] /courses/create
    create(req, res, next) {
        res.render("courses/create");
    }
    //  [POST] /courses/store
    store(req, res, next) {
        req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        const course = new Course(req.body);
        course
            .save()
            .then(() => res.redirect("/me/stored/courses"))
            .catch(next);
    }

    //  [GET] /courses/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .lean()
            .then((course) => res.render("courses/edit", { course }))
            .catch(next);
    }

    //  [PUT] /courses/:id

    update(req, res, next) {
        let update;
        Course.findOne({ _id: req.params.id })
            .then(async (course) => {
                if (course.name === req.body.name) {
                    update = { ...req.body };
                    return update;
                } else {
                    await Course.findOne({ slug: slugify(req.body.name) })
                        .then((course) => {
                            if (course) {
                                update = {
                                    ...req.body,
                                    slug: `${slugify(req.body.name)}-${nanoid(
                                        6
                                    )}`,
                                };
                            } else {
                                update = {
                                    ...req.body,
                                    slug: slugify(req.body.name),
                                };
                            }
                        })
                        .catch(() => {});
                    return update;
                }
            })
            .then((update) => {
                Course.updateOne({ _id: req.params.id }, update)
                    .then(() => res.redirect("/me/stored/courses"))
                    .catch(next);
            })
            .catch(next);
    }
    //  [DELETE] /courses/:id
    destroy(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect("back"))
            .catch(next);
    }
    //  [PATCH] /courses/:id/restore
    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(() => res.redirect("back"))
            .catch(next);
    }
    //  [DELETE] /courses/:id/force
    forceDestroy(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect("back"))
            .catch(next);
    }

    //  [POST] /courses/handle-form-actions-stored

    handleFormActionsStored(req, res, next) {
        // res.json(req.body);
        switch (req.body.action) {
            case "delete":
                Course.delete({ _id: { $in: req.body.courseIds } })
                    .then(() => res.redirect("back"))
                    .catch(next);
                break;
            default:
                res.json({ message: "Invalid action!" });
        }
    }

    //  [POST] /courses/handle-form-actions-trash
    handleFormActionsTrash(req, res, next) {
        // res.json(req.body);
        switch (req.body.action) {
            case "restore":
                Course.restore({ _id: { $in: req.body.courseIds } })
                    .then(() => res.redirect("back"))
                    .catch(next);
                break;
            case "delete":
                Course.deleteMany({ _id: { $in: req.body.courseIds } })
                    .then(() => res.redirect("back"))
                    .catch(next);
                break;
            default:
                res.json({ message: "Invalid action!" });
        }
    }
}

module.exports = new CourseController();
