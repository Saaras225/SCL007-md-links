#!/usr/bin/env node

const fs = require('fs');
const fetch = require ("node-fetch");

module.exports = function mdLinks(path, options){
    return new Promise((resolve, reject)=>{
        links = [];
        let countLinks = 0;
        let countLinksBad = 0;
        let countLinksOk = 0;
        //con esto obtengo la cantidad de links totales,los que funcionan y los que no
        Promise.all(traverseFileSystem(path, options.validate)).then((FileLinksList)=>{
            for(let i in FileLinksList){                
                links = links.concat(FileLinksList[i]);
                if(options.stats){
                    for(j in FileLinksList[i]){
                        countLinks++;
                    if(FileLinksList[i][j].ok)                
                        countLinksOk ++;
                    else
                        countLinksBad++;
                    }
                }
            }
            if(options.stats){
                console.log('Total: '+countLinks);
                console.log('Bad: '+ countLinksBad);
            }           
            resolve(links);
        });
    });
    
}

function getLinks(file, validate){   
    return new Promise((resolve, reject)=>{
        fs.readFile(file,function(err,data){
            if(err){
                resolve([]);
            }else{
                //LLEVO EL CONTENIDO DEL ARCHIVO A UN STRING
                let stringData = data.toString();
                const expre1= new RegExp(/(\[.+\])\(((https?:\/\/)([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?)\)/g);
                let match;
                //INICIALIZO EL ARREGLO DE LINKS VACIO
                let linkList = [];
                let fetchPromises = [];
                while (match = expre1.exec(stringData)) {
                    //AGREGO LOS LINKS A LA LISTA, SI ES POSITIVO EL IF AGREGANDO EL TEXTO,EL LINK Y DE DONDE SALE 
                    if(validate === true)
                        fetchPromises.push(fetch(match[2]));    
                    linkList.push({href:match[2], text: match[1], file:file  });                  
                }
                //ESTO AGREGA LA INFORMACION DEL RESULTADO DEL FETCH AL OBJETO
                if(validate === true){
                    Promise.all(fetchPromises).then((responses)=>{
                        for(let i in responses){
                            linkList[i].ok = responses[i].ok;
                            linkList[i].status = responses[i].status;
                        }
                        resolve(linkList);
                    });
                }else{
                    resolve(linkList);
                }
                    
                
            }
        });
    });      
}

//ESTO HACE LA RECURSION
const traverseFileSystem = function(currentPath, validate){
    let filesPromises = []
    if(currentPath!=undefined){
        let reg = new RegExp(/.+\.md/gi);
        let files = fs.readdirSync(currentPath);
        // recorro los elementos del directorio
        for (let i in files) {
            let currentFile = currentPath + '/' + files[i];
            let stats = fs.statSync(currentFile);
            //chequeo si el elemento es un archivo o directorio
            if (stats.isFile()) {
                // chequeo si es un archivo .md
                let match = reg.exec(currentFile);
                if (match != null)
                    // Esto es un archivo .md debo buscar los links
                    filesPromises.push(getLinks(currentFile, validate));
            } else if (stats.isDirectory()) {
                // si es directorio me vuelvo a llamar recursivamente
                filesPromises = filesPromises.concat(traverseFileSystem(currentFile));
                
            }
        }
    }
    return filesPromises;   
};

const [, , ...args] = process.argv;
let validate = args.find((arg)=>{
    return '--validate' === arg;
});
let stats = args.find((arg)=>{
    return '--stats' === arg;
});
module.exports(args[0],{validate:validate === undefined?false:true, stats:stats === undefined?false:true});

