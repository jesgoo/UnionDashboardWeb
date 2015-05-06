var path = require('path');
module.exports = {
    loadTemplateEnforce: process.env.dev,
    templateVariable: 'data',
    templatePath: path.join(__dirname, '../tpl_compile'),
    templateSourcePath: path.join(__dirname, '../tpl')
};