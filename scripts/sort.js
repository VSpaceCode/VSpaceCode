const fs = require('fs');

const package = JSON.parse(fs.readFileSync('./package.json'));
const defaultBindings = package.contributes.configuration[0].properties['vspacecode.bindings'].default;

const queue = [defaultBindings];
while (queue.length > 0) {
    const bindings = queue.pop();
    for (const b of bindings) {
        if (b.bindings) {
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

function getTypeOrder(type) {
    if (type === "bindings") {
        return 1;
    }

    // non-bindings type have precedence
    return 0;
}

function getKeyTypeOrder(b) {
    // 1. Single key
    // 2. Normal
    // 3. Combo key with dash like C-v

    // Use array from to handle unicode correctly
    const len = Array.from(b.key).length;
    if (len === 1) {
        return 0;
    } else if (/.+-.+/g.test(b.key)) {
        return 3;
    } else {
        return 2;
    }
}

/**
 * Get order for each character
 * 1. Swap SPACE and TAB so SPACE key order first
 * 2. Shift capital character to the end of ASCII (before)
 * @param {string} a A single character string
 * @returns a shifted character for ordering
 */
function codePointOrder(a) {
    codePoint = a.codePointAt(0);

    if (codePoint >= 65 && codePoint <= 90) {
        // shift A-Z back to the end of ASCII set
        codePoint += 36;
    } else if (codePoint >= 91 && codePoint <= 126) {
        // shift ] - ~ forward
        codePoint -= 26;
    } else if (codePoint === 32) {
        // Swap SPACE to TAB
        codePoint = 9;
    } else if (codePoint === 9) {
        // Swap TAB to SPACE
        codePoint = 32;
    }
    return codePoint;
}

function compareKeyString(a, b) {
    a = Array.from(a).map(codePointOrder);
    b = Array.from(b).map(codePointOrder);
    const len = Math.min(a.length, b.length);
    for (let i = 0; i < len; i++) {
        // Swap the case of the letter to sort lower case character first
        const diff = a[i] - b[i];
        if (diff !== 0) { return diff; }
    }

    return a.length - b.length;
}

/**
 * Binding compare function
 * 1. Sort non binding first
 * 2. 
 */
function compareFunction(a, b) {
    let diff = getTypeOrder(getType(a)) - getTypeOrder(getType(b));
    if (diff !== 0) { return diff; }

    diff = getKeyTypeOrder(a) - getKeyTypeOrder(b);
    if (diff !== 0) { return diff; }

    diff = compareKeyString(a.key, b.key);
    return diff;
}
