let fn_login = async (ctx, next) => {
    var email = ctx.request.body.email || '',
        password = ctx.request.body.password || '';
    if (email === 'admin@example.com' && password === '123456') {
        // 登录成功:
        ctx.render('login-ok.html', {
            title: 'login In OK',
            name: 'Mr Node'
        });
    } else {
        // 登录失败:
        ctx.render('login-failed.html', {
            title: 'login In Failed'
        });
    }
}

module.exports = {
    "POST /login": fn_login
}