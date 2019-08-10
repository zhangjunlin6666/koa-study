const sequelize = require('./../baseModels'); // 基models
const Sequelize = require('sequelize'); // 引入sequelize模块

// 定义模型Pet，告诉Sequelize如何映射数据库表：
// 如果还有其他表需要映射，可以sequelize.define一个即可
let Pet = sequelize.defineModel('pets',{
    name: Sequelize.STRING(100),
    gender: Sequelize.BOOLEAN,
    birth: Sequelize.STRING(10),
})
module.exports = Pet;