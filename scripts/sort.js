const fs = require('fs');

const UPPERCASE = "QWERTYUIOPASDFGHJKLZXCVBNM";
const lowercase = "qwertyuiopasdfghjklzxcvbnm";

const package = JSON.parse(fs.readFileSync('./package.json'));
const defaultBindings = package.contributes.configuration[0].properties['vspacecode.bindings'].default;

const queue = [defaultBindings];
while(queue.length > 0) {
    const bindings = queue.pop();
    for(const b of bindings) {
        if(b.bindings) {
            queue.push(b.bindings);
        }
    }
    bindings.sort(compareFunction);
}

fs.writeFileSync('./package.json', JSON.stringify(package, null, "\t") + "\n");

function getType(b) {
    let type = b.type;
    if (type === "conditional") {
        if (b.bindings.every(x => x.type === b.bindings[0].type)) {
            type = b.bindings[0].type;
        }
    }
    return type;
}

/**
 * Binding compare function
 * Modified from https://github.com/VSpaceCode/VSpaceCode/pull/132
 */
function compareFunction(a, b) {

    /*
      From https://github.com/VSpaceCode/VSpaceCode/issues/121
  
      1. Symbols/numbers (I can't really tell what order here?)
      2. Lowercase commands (transient/single commands, doesn't matter)
      3. Uppercase commands (transient/single commands, doesn't matter)
      4. Menus (symbols, lowercase, then uppercase)
    */

    if ((a.key === " " || b.key === " ") && a.key !== b.key) {
        // Usually "space" is the most important command, so bubbling it up to the top
        return (a.key === " ") ? -1 : 1;
    }

    if ((a.name === "+Major" || b.name === "+Major") && a.name !== b.name) {
        // Special case major mode to be at the bottom
        return (a.name === "+Major") ? 1 : -1;
    }

    const aType = getType(a);
    const bType = getType(b);
    if (aType !== bType) {
        // order non-bindings type first
        if (aType === "bindings") {
            return 1;
        }
        if (bType === "bindings") {
            return -1;
        }

        return 0;
    } else {
        return compareUpperLower(a, b);
    }
}

function compareUpperLower(a, b) {
    if (UPPERCASE.includes(a.key) && UPPERCASE.includes(b.key)) {
        return a.key - b.key;
    } else if (UPPERCASE.includes(a.key) && lowercase.includes(b.key)) {
        return 1;
    } else if (lowercase.includes(a.key) && UPPERCASE.includes(b.key)) {
        return -1;
    } else {
        return a.key - b.key;
    }
}