const babel = require( '@babel/core');
const fs =  require('fs');
const plugin = require('../src/index.js');
const path = require('path');

const code = fs.readFileSync(path.join(process.cwd(),'./test/test.case.js')).toString()

const transformedCode = babel.transform(code, {
  plugins: [[plugin,{'pattern': /^\.\/style(\.js)?$/, 'action':{'add':'../theme/theme.css', 'replace':'./style.css'}}]],
  code: true,
  ast: false,
}).code

fs.writeFileSync(`${__dirname}/out.js`, transformedCode);