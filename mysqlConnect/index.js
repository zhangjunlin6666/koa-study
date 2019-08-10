const Sequelize = require('sequelize');
const config = require('./../mysqlConfig');

/*
用sequelize.define()定义Model时，传入名称pet，默认的表名就是pets。
第二个参数指定列名和数据类型，如果是主键，需要更详细地指定。
第三个参数是额外的配置，我们传入{ timestamps: false }是为了关闭Sequelize的自动添加timestamp的功能。
所有的ORM框架都有一种很不好的风气，总是自作聪明地加上所谓“自动化”的功能，但是会让人感到完全摸不着头脑 
*/

// 创建一个sequelize对象实例：
let sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});

module.exports = sequelize;