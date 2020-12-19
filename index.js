module.exports = function () {
    var dust = require('./dust');

    dust.helpers = require('./helpers');
    var filters = require('./filters');
    var name;
    for (name in filters) {
        if (!filters.hasOwnProperty(name)) {
            continue;
        }
        dust.filters[name] = filters[name];
    }

    return dust;
};
