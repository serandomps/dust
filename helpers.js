module.exports = {
    slice: function (chunk, context, bodies, params) {
        return chunk.map(function (chunk) {
            var ctx = params.context || context.current(),
                length = ctx.length,
                start = parseInt(params.start, 10) || 0,
                end = parseInt(params.end, 10) || length,
                count = parseInt(params.count, 10) || length,
                size = parseInt(params.size, 10) || length,
                i = start,
                c = 0;

            async.whilst(function () {
                return i < end && c++ < count;
            }, function (whilstDone) {
                chunk.map(function (chunk) {
                    chunk.render(bodies.block, context.push(ctx.slice(i, (i += size))));
                    whilstDone();
                }).end();
            }, function (err) {
                if (err) {
                    return chunk.setError(err);
                }
                chunk.end();
            });
        });
    },
    is: function (chunk, context, bodies, params) {
        return chunk.map(function (chunk) {
            var elze;
            if (params.group) {
                if (sera.is(params.group)) {
                    chunk = chunk.render(bodies.block, context);
                    return chunk.end();
                }
                elze = bodies['else'];
                if (!elze) {
                    return chunk.end();
                }
                chunk = chunk.render(elze, context);
                return chunk.end();
            }
            if (params.user) {
                if (sera.user && sera.user.id === params.user) {
                    chunk = chunk.render(bodies.block, context);
                    return chunk.end();
                }
                elze = bodies['else'];
                if (!elze) {
                    return chunk.end();
                }
                chunk = chunk.render(elze, context);
                return chunk.end();
            }
            return chunk.end();
        });
    },
    dump: function (chunk, context) {
        console.log(context);
        return chunk.write(JSON.stringify(context));
    },
    cdn: function (chunk, context, bodies, params) {
        var cursor = chunk.map(function (chunk) {
            setTimeout(function () {
                var path = params.path;
                chunk.write(sera.cdn + path);
                chunk.end();
                cursor.end();
            })
        });
        return cursor;
    },
};
