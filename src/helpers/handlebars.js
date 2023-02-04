const Handlebars = require("handlebars");

module.exports = {
    sum: (a, b) => a + b,
    sortable: (field, sort) => {
        const sortType = field === sort.column ? sort.type : "default";

        const icons = {
            default: "bi bi-chevron-expand",
            asc: "bi bi-sort-down-alt",
            desc: "bi bi-sort-down",
        };
        const types = {
            default: "desc",
            asc: "desc",
            desc: "asc",
        };

        const icon = icons[sortType];
        const type = types[sortType];

        const href = Handlebars.escapeExpression(
            `?_sort&column=${field}&type=${type}`
        );
        const output = `
            <a class="sort-icon" href="${href}">
                <i class="${icon}"></i>
            </a>
        `;

        return new Handlebars.SafeString(output);
    },
    paginate: (curPage, numPages, rout) => {
        let tagA = "";
        for (let i = 1; i <= numPages; ++i) {
            tagA =
                tagA +
                `<li class="page-item ${
                    curPage == i ? "active" : ""
                }"><a class="page-link" href="/me/${rout}/courses/${i}">${i}</a></li>`;
        }
        return tagA;
    },
};
