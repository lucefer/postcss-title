const postcss = require('postcss');
const fs=require('fs');
const path=require('path');
const ROOT=process.cwd();
const searchNum=10
let pkgPath=['package.json']

for(let i=0;i<searchNum;i++){
  let pkg=path.resolve(ROOT,pkgPath.join(''))
  if(fs.existsSync(pkg)){
    if(i==0){
      pkgInfo=require(pkg)
    }else{
      pkgInfo=require(pkg)
    }
    break;
  }else{
    pkgPath.shift('../')
  }
}

let now=new Date()
let info={
  version: pkgInfo.version,
  author: pkgInfo.author,
  updated: now.toLocaleDateString()+" "+now.toLocaleTimeString()
}

module.exports = postcss.plugin('title', function (opts) {
    opts = opts || {}
    return function (root, result) {
      let fileName=root.source.input.file
      let fileIndex=fileName.lastIndexOf("/")
      console.log("index:",fileIndex,fileName.length-fileIndex-1)
      fileName=fileName.substr(fileIndex+1,fileName.length-fileIndex-1)
      info.filename=fileName
      let comment=
      `
          filename: ${info.filename}
          version: ${info.version}
          author: ${info.author}
          updated: ${info.updated}
      `
      root.prepend(postcss.comment({text:comment}))
    };
});
