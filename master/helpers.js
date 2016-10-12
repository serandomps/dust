module.exports = {
    slice: function (chunk, context, bodies, params) {
        return chunk.map(function (chunk) {
            var ctx = context.current(),
                length = ctx.length,
                start = parseInt(params.start, 10) || 0,
                end = parseInt(params.end, 10) || length,
                count = parseInt(params.count, 10) || length,
                size = parseInt(params.size, 10) || length,
                i = start,
                c = 0;
            while (i < end && c++ < count) {
                chunk.render(bodies.block, context.push(ctx.slice(i, (i += size))));
            }
            chunk.end();
        });
    },
    dump: function (chunk, context) {
        console.log(context);
        return chunk.write(JSON.stringify(context));
    }
};