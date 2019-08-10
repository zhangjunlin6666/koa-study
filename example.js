const Koa = require('koa');
const fs = require('fs');
const app = new Koa();
app.keys = ['im a newer secret', 'i like turtle'];
app.env = 'test';
// app.keys = new KeyGrip(['im a newer secret', 'i like turtle'], 'sha256');

// x-response-time
app.use(async (ctx, next) => {
    // console.log("第一步",1)
    const start = Date.now();
    await next();
    // console.log("第五部",5)
    const ms = Date.now() - start;
    ctx.set('X-Response-Time',`${ms}ms`)
    // 模拟错误信息输出
    // throw new Error('错误信息输出')
    // ctx.throw('错误信息') // ctx提供的错误抛出方法
    console.log(ctx.cookies.get('name'));
    console.log(app.env);
    
})

// logger
app.use(async (ctx, next) => {
    const start = Date.now();
    // console.log("第二步",2)
    await next();
    // console.log("第四步",4)
    const ms = Date.now() - start;
    // console.log(`${ctx.method} ${ctx.url} - ${ms}`)
})

app.use(async ctx => {
    // console.log("第三步",3)
    ctx.body = "hello world 你好中国"
    ctx.cookies.set('name', 'tobi', { signed: true });
})

// 监听错误事件
app.on('error',(err, ctx) => {
    // 如果发生错误，利用fs模块将错误信息同步写入到error.txt中
    err += '\n';
    fs.writeFileSync('error.txt',err, { flag: 'a' });
})
app.listen(3000,()=>{
    // console.log("http://localhost:3000")
})