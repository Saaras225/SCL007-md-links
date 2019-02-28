module.exports = () => {
  

};

const fs = require('fs');
  const path = require('path');
  
  
  const getUrls = (path)=>{
   fs.readFile(path, function(err,data){
          if(err){
          console.log(err);
          }
          let stringData = data.toString();
          
          let matches;
          const expre1= new RegExp(/(https?:\/\/)([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?/g);
          matches = stringData.match(expre1);
          for(let i = 0; i<matches.length; i++)
              console.log(matches[i]);
             
      
      
    })
  }
  
  const traverseFileSystem = function (currentPath) {
      let reg = new RegExp(/.+\.md/gi);
      //console.log(currentPath);
      var files = fs.readdirSync(currentPath);
      for (var i in files) {
         var currentFile = currentPath + '/' + files[i];
         var stats = fs.statSync(currentFile);
         if (stats.isFile()) {
          var match = reg.exec(currentFile);
          if (match != null)
          getUrls(currentFile);
         }
        else if (stats.isDirectory()) {
               traverseFileSystem(currentFile);
             }
       }
   };
    traverseFileSystem('.');