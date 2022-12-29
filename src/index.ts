// convert languages to alias
import fs from 'fs';
import path from 'path'
import hljs from 'highlight.js';

const dirs = fs.readdirSync(path.join(__dirname, "languages"));


let aliasList: Record<string, number> = {};
let languageList: string[] = [];

const main = async () => {
  console.log("Processing...")

  const returns = await Promise.all(dirs.map(filename => {
    if (filename == "lib") return;
     return import(path.join(__dirname,'languages', filename)).then(file => [filename, file.default(hljs).aliases])
  })) as [string, string[]][];


  returns.forEach(values => {
    if (!values) return;
    const [filename, aliases] = values;
    const language = path.parse(filename).name;
    languageList.push(language)
    aliases?.forEach(alias => {
      aliasList[alias] = languageList.length - 1;
    })
  })

  fs.rmSync(`./output`, {force: true, recursive: true})
  fs.mkdirSync(`./output`)
  fs.writeFileSync(`./output/languages.json`, JSON.stringify(languageList));
  fs.writeFileSync(`./output/aliases.json`, JSON.stringify(aliasList));
  console.log("Done!")


}
main()