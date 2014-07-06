module.exports = function (helpers) {
    var dust = require('./dust');
    var render = dust.render;
    var renderSource = dust.renderSource;
    var stream = dust.stream;

    dust.helpers = require('./helpers');
    helpers = helpers || {};

    dust.render = function () {
        var args = Array.prototype.slice.call(arguments);
        var base = dust.makeBase(helpers);
        //args[1] = base.push(args[1]);
        return render.apply(dust, args);
    };
/*

    dust.renderSource = function () {
        var args = Array.prototype.slice.call(arguments);
        var base = dust.makeBase(helpers);
        //args[1] = base.push(args[1]);
        return renderSource.apply(dust, args);
    };
*/

    dust.stream = function () {
        var args = Array.prototype.slice.call(arguments);
        var base = dust.makeBase(helpers);
        //args[1] = base.push(args[1]);
        return stream.apply(dust, args);
    };

    return dust;
};