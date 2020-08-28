const _ = require('lodash');

const fixD = (obj) => {
    let partOfSpeech, entries;
    for (key in obj) {
        switch (key.toLowerCase()) {
            case 'partofspeech':
                partOfSpeech = obj[key];
                break;
            case 'entries':
                entries = obj[key];
                break;
            default:
                key = key;
        }
    }
    return {partOfSpeech, entries}
}
const fixKeys = (obj) => {
    let name, id, category, definition;
    for (key in obj) {
        switch (key.toLowerCase()) {
            case 'name':
                name = obj[key];
                break;
            case 'id':
                id = obj[key];
                break;
            case 'category':
                category = obj[key];
                break;
            case 'definition':
                definition = obj[key].map(k => fixD(k));
                break;
            case 'partofspeech':
                partOfSpeech = obj[key];
                break;
            case 'entries':
                entries = obj[key];
                break;
            default:
                key = key;
        }
    }
    return {name, id, category, definition};
}

const isMissingKeys = (obj) => {
  const requiredKeys = ['id', 'name', 'category', 'definition'];
  const providedKeys = Object.keys(obj).map(key => key.toLowerCase());
  const missingKeys = requiredKeys.filter(key => !providedKeys.includes(key));
  return missingKeys.length ? missingKeys : null;
}

const format = (word) => {
  const missingKeys = isMissingKeys(word);
  if (missingKeys) {
    throw Error(`required field${missingKeys.length === 1 ? '' : 's'} missing: ${missingKeys.join(', ')}`)
  }
    word = fixKeys(word);
    let {name, definition, id, category} = word;
    name = name.toLowerCase();
    id = id.toLowerCase();
    category = category.map(cat => cat.toLowerCase());
    definition = definition.map(def => {
        let {partOfSpeech, entries} = def;
        partOfSpeech = partOfSpeech.toLowerCase();
        entries = entries.map(ent => ent.toLowerCase());
        return {entries, partOfSpeech};
    })

    return {name, definition, id, category};
}

module.exports = format;
