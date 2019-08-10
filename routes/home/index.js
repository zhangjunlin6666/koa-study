let fn_index = async (ctx, next) => {
    ctx.render('home.html',{
        title:'Welcome'
    })
}

module.exports = {
    "GET /": fn_index
}