const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser'); // 处理request上body的中间件
const controller = require('./controlles'); // 引入控制器
const middleware = require('./middleware'); // 引入自定义中间件
const tables = require('./models');
const isProduction = process.env.NODE_ENV === 'production'; // 判断环境

(async () => {
    let now = Date.now();
    let dog = await tables.Pet.create({
        id: 'd-' + now,
        name: 'Odie',
        gender: false,
        birth: '2008-08-08',
        createdAt: now,
        updatedAt: now,
        version: 0
    });
    console.log('created: ' + JSON.stringify(dog));
})();

// 处理静态资源static
if (!isProduction) {
    app.use(middleware.staticFiles('/static/', __dirname + '/static'));
}
// 添加在ctx挂载render方法的中间件
app.use(middleware.nunJucks('views', {
    noCache: !isProduction,
    watch: !isProduction
}))
// 将request上的body解析到ctx.request.body中
app.use(bodyParser());
// 添加控制器，controlles中进行路由挂载
app.use(controller());
app.listen(9000)