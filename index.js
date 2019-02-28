module.exports = () => {

};

  const fs = require('fs');
  const path = require('path');
  const https = require ("https");
  const fetch = require ("node-fetch");
  
  const getUrls = (path)=>{
      fs.readFile(path, function(err,data){
          if(err){
          console.log(err);
          }
  
          let stringData = data.toString();
          let matches;
          const expre1= new RegExp(/(https?:\/\/)([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?/g);
          matches = stringData.match(expre1);
          for(let i = 0; i<matches.length; i++){
              //console.log(matches[i]);
  
              fetch(matches[i]).then(function(response){
                  if (response.ok) {
                      console.log(matches[i] + " FUNCIONA");
                  } else {
                      console.log(response.status, response.statusText);
                  }
              })
              .catch(function(error) {
              console.log(matches[i]+' ', error.message);
              });
          }
      })
  }
  
  const traverseFileSystem = function (currentPath) {
      let reg = new RegExp(/.+\.md/gi);
      //console.log(currentPath);
      let files = fs.readdirSync(currentPath);
      for (let i in files) {
         let currentFile = currentPath + '/' + files[i];
         let stats = fs.statSync(currentFile);
         if (stats.isFile()) {
          let match = reg.exec(currentFile);
          if (match != null)
          getUrls(currentFile);
         }
        else if (stats.isDirectory()) {
               traverseFileSystem(currentFile);
             }
       }
  };
  traverseFileSystem('.');