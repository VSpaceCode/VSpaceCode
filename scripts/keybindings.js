const table = require('markdown-table');
const fs = require('fs');

function replaceChar(s) {
    return s.replace(/ /g, '␣').replace(/\t/g, '↹');
}

function createHeading(name) {
    return `# ${name}`;
}

function createHeadingLink(text, name) {
    const link = `${name}`
        .replace(/^#+/, '')
        .replace(/[^a-zA-Z0-9 ]/g, '')
        .replace(/ /g, '-');
    return `[${text}](#${link})`;
}

const package = JSON.parse(fs.readFileSync('./package.json'));
const defaultBindings = package.contributes.configuration[0].properties['vspacecode.bindings'].default;
const root = {
    key: replaceChar(" "),
    keys: [replaceChar(" ")],
    name: "VSpaceCode",
    type: "bindings",
    bindings: defaultBindings
};


let strBuilder = [];
// Breath first search
const queue = [root];
while (queue.length > 0) {
    const node = queue.shift();
    const heading = createHeading(node.name);
    strBuilder.push(
        heading,
        "\n\n",
        `Key Binding: <code>${node.keys.join(" ")}</code>`,
        "\n\n",
        `Type: <code>${node.type}</code>`,
        "\n\n"
    );

    // Process the node
    const tableContent = [['Key Binding', 'Name', 'Type']];
    for (const b of node.bindings) {
        b.keys = [...node.keys, replaceChar(b.key)];

        const isTransient = node.type === "transient";
        const hasBindings = Array.isArray(b.bindings) && b.bindings.length > 0;
        tableContent.push([
            `<code>${isTransient ? b.key : b.keys.join(" ")}</code>`,
            b.name,
            hasBindings ? createHeadingLink(b.type, b.name) : b.type
        ]);

        // Enqueue if it has binding
        if (hasBindings) {
            queue.push(b);
        }
    }

    // Write output of this node
    strBuilder.push(table(tableContent), "\n\n");
}

fs.writeFileSync('./KEYBINDINGS.md', strBuilder.join(""));