const mdLinks = require ("./index.js");
mdLinks("./mdpruebas", {validate: true}).then((links)=>{
    console.log(links);
});