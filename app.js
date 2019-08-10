// 于koa1不同，koa2倒入的是一个class类，因此变量名用大写
const Koa = require('koa');
const app = new Koa();


// 在koa2源码中，每次调用app.use方法其实都是将中间件函数推入到一个数组中
app.use(async (ctx, next) => {
    // 第一步
    console.log('第一步')
    console.log(`${ctx.method} ${ctx.url}`);
    await next();
    // 第六步
    console.log('第六步')
})

app.use(async (ctx, next) => {
    // 第二步
    console.log('第二步')
    const start  = new Date().getTime();
    await next();
    const ms = new Date().getTime() - start;
    // 第五步
    console.log('第五步')
    console.log(`Time: ${ms}/ms`);
})

app.use(async (ctx,next) => {
    // 第三步
    console.log('第三步')
    await next();
    // 第四步
    console.log('第四步')
    // 设置content-type的值，也可以直接用ctx.type，在源码中已经将ctx.response上的方法以及属性代理到ctx上了
    ctx.response.type = 'text/html';  // ctx.type = 'text/html';
    ctx.response.body = '<h1>hello，koa2</h2>' // ctx.body = '<h1>hello，koa2</h2>'

})

/* 当执行listen方法时，koa内部会其实调用的是app上的callback方法，
   该方法返回一个可被 http.createServer() 接受的程序实例handleRequest
   在callback方法内部通过koa-compose模块将所有中间间合并为一个，并返回合并后的中间件
   然后在内部通过createContext(req,res)（req、res是node返回的请求体和响应体，在这里传入为了把这两个对象挂载到context上）
   方法创建上下文对象context，并将ctx和fn传入this.handleRequest中执行

    callback() {
        const fn = compose(this.middleware);
        if (!this.listenerCount('error')) this.on('error', this.onerror);
        const handleRequest = (req, res) => {
            const ctx = this.createContext(req, res);
            return this.handleRequest(ctx, fn);
        };
        return handleRequest;
    }
    handleRequest(ctx, fnMiddleware) {
        const res = ctx.res;
        res.statusCode = 404;
        const onerror = err => ctx.onerror(err);
        const handleResponse = () => respond(ctx);
        onFinished(res, onerror);
        return fnMiddleware(ctx).then(handleResponse).catch(onerror);
    }
*/

app.listen(3000)