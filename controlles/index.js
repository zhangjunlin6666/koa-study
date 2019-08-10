let path = require('path');
module.exports = function(dir){
    // 不传参时，默认时routes目录
    let controllers_dir = dir || "routes";
    const router = require('koa-router')();
    const routes = require(path.join(__dirname, '../', controllers_dir));
    // resolve方法是将项目根目录与传入的路径进行解析，最终结果是包含传入路径的绝对地址
    // join只是单纯的将传入的路径进行合并
    console.log('bool',path.resolve(controllers_dir) === path.join(__dirname, '../', controllers_dir));
    // 循环加载遍历routes，动态加载路由
    for(let opt in routes){
        for(let url in routes[opt]){
            // get方法
            if(url.startsWith('GET ')){
                let path = url.substring(4);
                router.get(path, routes[opt][url]);
                console.log(`register URL mapping: GET ${path}`);
            // post方法
            } else if(url.startsWith('POST ')){
                let path = url.substring(5);
                router.post(path, routes[opt][url]);
                console.log(`register URL mapping: POST ${path}`);
            } else {
                // 无效的URL:
                console.log(`invalid URL: ${url}`);
            }
        }
    }
    return router.routes();
}
