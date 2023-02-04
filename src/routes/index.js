const newsRouter = require("./news");
const meRouter = require("./me");
const coursesRouter = require("./courses");
const siteRouter = require("./site");

function route(app) {
    //   app.get("/news", (req, res) => {
    //     res.render("news");
    //   });
    app.use("/news", newsRouter);
    app.use("/courses", coursesRouter);
    app.use("/me", meRouter);
    app.use("/", siteRouter);
}

module.exports = route;

// function slugify(str) {
//     return str.toString().trim().toLowerCase().replace(/\s+/g,"-").replace(/{[^\w\-]+/g, ""). replace(/\-\-+/g, "-").replace(/^-+/, "").replace(/-+$/, "")
// }
