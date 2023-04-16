# highlight.js-language-parser
 Used in Nerimity to load langauges async

## Usage
```js
import aliases from './aliases.json';
import languages from './languages.json';

let hljs;

// language argument can be a name or alias.
export function getLanguageName(language: string) {
  if (languages.includes(language)) return language;
  const languageIndex = (aliases as any)[language];
  if (languageIndex === undefined) return false;
  return languages[languageIndex];
}



async function registerLanguage(language: string) {
  const langFilename = getLanguageName(props.lang);
  if (!langFilename) return;
  hljs = (await import("highlight.js/lib/core")).default;
  const lang = await import(`../../../node_modules/highlight.js/es/languages/${langFilename}.js`);
  hljs.registerLanguage(langFilename, lang.default);
}
```
