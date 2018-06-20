const fs = require("fs-extra");
const path = require("path");
const lodash = require("lodash");

const bigSetting = path.join(__dirname, "..", "./settings.json");
const smallSetting = path.join(__dirname,  "./settings.json");

const keys = ["vim.normalModeKeyBindings", "vim.insertModeKeyBindings"];

function getBigKeyBinding(obj) {
    const result = [];
    for (const key in obj) {
        const sub = {
            before: key.split(" "),
            after: [],
        };
        const binding = obj[key];
        const splited = binding.split(" ");
        const type = splited[0];
        if (type === "after:") {
            sub.after = splited.slice(1);
        } else {
            sub.commands = splited.slice(1).map((command) => ({ command, args: [] }));
        }
        result.push(sub);
    }
    return result;
}

function getBig(obj) {
    const result = lodash.omit(obj, keys)
    keys.forEach((key) => {
        result[key] = getBigKeyBinding(obj[key]);
    });
    return result;
}

function getSmallKeyBinding(arr) {
    const result = {};
    for (const keybinding of arr) {
        const key = keybinding.before.join(" ");
        let binding = "";
        if (keybinding.after && keybinding.after.length) {
            binding = "after: " + keybinding.after.join(" ");
        } else {
            binding = "commands: " + keybinding.commands.map((command) => command.command).join(" ");
        }
        result[key] = binding;
    }
    return result;
}

function getSmall(obj) {
    const result = lodash.omit(obj, keys)
    keys.forEach((key) => {
        result[key] = getSmallKeyBinding(obj[key]);
    });
    return result;
}

async function read(src) {
    if (await fs.exists(src) === false) {
        return {};
    }
    return await fs.readJson(src);
}

async function write(src, obj) {
    await fs.writeFile(src, JSON.stringify(obj, null, 4) + "\n");
}

async function syncSettings() {
    const settings = getSmall(await read(bigSetting));
    const smallSettings = await read(smallSetting);
    if (lodash.isEqual(smallSettings, {})) {
        await write(smallSetting, settings);
    } else {
        await write(bigSetting, getBig(smallSettings));
    }
}

syncSettings().catch(console.log);
