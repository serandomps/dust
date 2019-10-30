var utils = require('utils');

module.exports = {
    url: function (value) {
        return utils.resolve(value);
    },
    year: function (value) {
        return moment(value).year();
    },
    ago: function (value) {
        return moment(value).fromNow();
    }
};
