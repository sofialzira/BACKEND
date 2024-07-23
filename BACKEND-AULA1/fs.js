import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";


const dirname = path.dirname(fileURLToPath(import.meta.url));

console.log(dirname);

// create a new directory
// fs.mkdirSync(path.resolve(dirname, "pasta1"));
fs.mkdirSync(path.resolve(dirname, "folder1", "folder2", "fodler3"),                
    { recursive: true });

// remove a directory
fs.rmdirSync(path.resolve(dirname, "lixo"));


