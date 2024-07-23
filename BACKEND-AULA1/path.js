import path from "path";

console.log(import.meta.url)

// get the directory name of the current module
const dirname = path.dirname(import.meta.url);

// console.log(dirname);

// console.log(path.join(dirname, '..', 'pasta1'));

// caminho relativo 
console.log(path.resolve('pasta1', 'pasta2', 'ficheiro.js'));


console.log(path.isAbsolute('pasta1/pasta2/ficheiro.js')); // false 

console.log(path.isAbsolute('/pasta1/pasta2/ficheiro.js')); // true

console.log(path.basename('/pasta1/pasta2/ficheiro.js')); // ficheiro.js

console.group(path.extname('/pasta1/pasta2/ficheiro.js')); // .js 


