const format = (word) => {
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