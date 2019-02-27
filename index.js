/*module.exports = () => {
  // ...
};*/

const fs = require('fs');
const path = require('path');


fs.readFile('./README.md', function(err,data){
  if(err){
      console.log(err);
  }
  let stringData = data.toString();
  
  let matches;
  const expre1= new RegExp(/(https?:\/\/)([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?/g);
  matches = stringData.match(expre1);
  for(let i = 0; i<matches.length; i++)
      console.log(matches[i])
  
})