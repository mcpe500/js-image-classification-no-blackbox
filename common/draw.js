const draw = {}
draw.path = (ctx, path, colors = "black") => {
    ctx.strokeStyle = colors;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(path[0].x, path[0].y);
    for (let i = 1; i < path.length; i++) {
        ctx.lineTo(path[i].x, path[i].y);
    }
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
}

draw.paths = (ctx, paths, colors = "black") => {
    for (let i = 0; i < paths.length; i++) {
        draw.path(ctx, paths[i], colors[i]);
    }
}
if(typeof module !== 'undefined'){
    module.exports = draw;
}