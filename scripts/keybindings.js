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
        .replace(/ /g, '-')
        .toLowerCase();
    return `[${text}](#${link})`;
}

function createCommandText(binding) {
    if (binding.command)
    {
        return `\`${binding.command}\``;
    } else if (binding.commands) {
        return binding.commands.map(c => `\`${c}\``).join("<br />");
    } else {
        return "N/A";
    }
}

function wrapCode(text) {
    if (text && text.length > 0) {
        return `<code>${text.replace(/\`/g, '\\\`')}</code>`;
    }

    return text;
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
        `Key Binding: ${wrapCode(node.keys.join(" "))}`,
        "\n\n",
        `Type: ${wrapCode(node.type)}`,
        "\n\n"
    );

    // Process the node
    const isTransient = node.type === "transient";
    const isConditional = node.type === "conditional";
    const tableContent = [[(isConditional ? 'Condition' : 'Key Binding'), 'Name', 'Type', 'Command(s)']];
    for (const b of node.bindings) {
        b.keys = [...node.keys, replaceChar(b.key)];

        const shouldJoinKeys = !isTransient && !isConditional;
        const hasBindings = Array.isArray(b.bindings) && b.bindings.length > 0;
        tableContent.push([
            wrapCode(shouldJoinKeys ? b.keys.join(" ") : b.key),
            b.name,
            hasBindings ? createHeadingLink(b.type, b.name) : b.type,
            createCommandText(b)
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
