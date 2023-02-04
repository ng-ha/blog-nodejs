const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
mongoose.plugin(slug);

const mongooseDelete = require("mongoose-delete");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const CourseSchema = new Schema(
    {
        _id: Number,
        name: { type: String, maxLength: 255, required: true },
        description: { type: String, maxLength: 600 },
        image: { type: String, maxLength: 255 },
        // createdAt: { type: Date, default: Date.now },
        // updatedAt: { type: Date, default: Date.now },
        slug: { type: String, slug: "name", unique: true },
        videoId: String,
        level: String,
    },
    {
        _id: false,
        timestamps: true,
    }
);
// Custom query helpers
CourseSchema.query.sortable = function (req) {
    if (req.query.hasOwnProperty("_sort")) {
        const isValidType = ["asc", "desc"].includes(req.query.type);
        return this.sort({
            [req.query.column]: isValidType ? [req.query.type] : "desc",
        });
    }
    return this;
};

// Add plugins
CourseSchema.plugin(AutoIncrement);
CourseSchema.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: true,
});

module.exports = mongoose.model("Course", CourseSchema);
