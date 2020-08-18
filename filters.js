var utils = require('utils');

module.exports = {
    url: function (value) {
        return utils.resolve(value);
    },
    year: function (value) {
        return moment(value).year();
    },
    numeral: function (value) {
        return numeral(value).format('(0,0)');
    },
    ago: function (value) {
        return moment(value).fromNow();
    },
    js: function (value) {
        return html_sanitize(value);
    }
};
