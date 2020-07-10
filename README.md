# VSpaceCode (Preview)

![VSpaceCode Logo](resources/logo.png)

**Update**: This project has been merged with [stevenguh/spacecode](https://github.com/stevenguh/spacecode) to share the efforts to bring the best Spacemacs integration into VSCode. It is not any longer a list of settings but is based on an extension. If you prefer the old way please read the section [Project history](#project-history).

This extension is inspired by spacemacs and aiming to provide similar experience in VSCode. An action menu trigger by space key is implemented to reduce memorization of shortcuts. You can change the editor group, change the file language, and check git status without leaving your keyboard. This provides the speed to shortcut while minimizing typing comparing to fuzzy search in the command palette or shortcut memorizing.

## Features

- Spacemacs like action menu to reduce memorization of shortcuts
- All menu items are customizable
- The menu key is customizable
- Bundle all the extensions needed out-of-the box

![VSpaceCode actions](resources/feature.gif)

## Project history

This project was initially started by [StreakyCobra](https://github.com/StreakyCobra) as a configuration file for [VSCodeVim](https://github.com/VSCodeVim/Vim) to be merged in your `settings.json` file. [stevenguh](https://github.com/stevenguh) developed on his side an extension also with the goal to brings Spacemacs bindings to VSCode. After some discussion we agreed to merge the two projects to keep this niche community unified. stevenguh solution was technically better, and this project had a larger community and was better referenced, so it was decided move his extension here.

If you prefer this project's first approach using settings, see the [vscode-vim](https://github.com/VSpaceCode/VSpaceCode/tree/vscode-vim) branch.

## Installation
This extension is published as an extension pack, and should install all the necessary extensions for the best-of-the box experience; however, if you do not like the bundled extensions or are not using VSCode Vim, please go to the [vscode-which-key](https://github.com/VSpaceCode/vscode-which-key) for a standalone which key menu function.

After the installation of the extension, a notification will help you to configure both the necessary settings and user bindings. However, the formatting of `settings.json` and `keybindings.json` may be lost. You can choose to follow the manual configuration below.

### Configuration
The [`settings.json`](./src/settings.json) and [`keybindings.json`](./src/keybindings.json) in the repo contains the configurations needed. You can merge them manually to your user's `settings.json` and `keybindings.json`.

> You can access your user's `settings.json` and `keybindings.json` by searching "Preference: Open Settings (JSON)" and "Preference: Open Keyboard Shortcuts (JSON)" in the command palette (Ctl+Shift+p)

The following commands can be access through command palette to rerun the automatic configuration step.

- Configure Settings and Keybindings Config for VSpaceCode

  This command will run the below two commands and is also the command that runs on the welcome notification

- Configure Settings for VSpaceCode

  This command will merge the [necessary settings](./src/settings.json) to your user's `settings.json`

- Configure Keybindings for VSpaceCode

  This command will merge the [necessary key bindings](./src/keybindings.json) to your user's `keybindings.json`

## Menu Customization
There are two ways to customize the menu: incrementally, and from scratch. Incrementally is great for when you only need to modify a few bindings from the default. Customizing from scratch is great for total control of the customization.

> The default menu bindings are subject to change before `1.0.0`. If you find something that you think it should bind to a particular key by default, or you want a particular command, please open an issue as a feature request.

### Incrementally
Using this option will allow to you surgically update the default bindings (`vspacecode.bindings`). The extension will override bindings sequentially base on `vspacecode.bindingOverrides`.

#### Add/Replace
The following json will replace `<SPC> g s` in the same position if the binding exists in `vspacecode.bindings`, and append `s` to menu `<SPC> g` if it doesn't exists. This override will only execute if `<SPC> g` menu exists. An optional `position` key can be used to specified index of where the item should be inserted/moved to.

```jsonc
{
  "vspacecode.bindingOverrides": [
    {
      "keys": "g.s",
      "name": "Go to line",
      "type": "command",
      "command":"workbench.action.gotoLine",
    }
  ]
}
```
The following example will replace/append the whole `<SPC> g` menu with one binding `s` in it.
```jsonc
{
  "vspacecode.bindingOverrides": [
    {
      "keys": "g",
      "name": "Go...",
      "type": "bindings",
      "bindings": [
        {
          "key": "s",
          "name": "Go to",
          "type": "command",
          "command": "workbench.action.gotoLine",   
        }
      ]
    }
  ]
}
```
If the key binding's key uses character `.` like `<SPC> e .`, you can target that by using an array in the keys like `"keys": ["e", "."]`.

#### Removal
Any negative number in position is denoting a removal operation. In the following example, any item bound to `<SPC> g s` will be remove.
```jsonc
{
  "vspacecode.bindingOverrides": [
    {
      "keys": "g.s",
      "position": -1,
    }
  ]
}
```

### From Scratch
To customize the menu items from scratch, you can override the menu completely by putting your own `vspacecode.bindings` into your `settings.json`. Using this option will prevent any update to your own bindings.

An example of a `settings.json` file that overrides space menu is as follows:
```json
{
  "vspacecode.bindings": [
    {
      "key": "f",
      "name": "File...",
      "type": "bindings",
      "bindings": [
        {
          "key": "f",
          "name": "Open file",
          "type": "command",
          "command": "workbench.action.files.openFileFolder"
        },
        {
          "key": "i",
          "name": "Indentation...",
          "type": "bindings",
          "bindings": [
            {
              "key": "i",
              "name": "Change indentation",
              "type": "command",
              "command": "changeEditorIndentation"
            },
            {
              "key": "d",
              "name": "Detect indentation",
              "type": "command",
              "command": "editor.action.detectIndentation"
            }
          ]
        }
      ]
    }
  ]
}
```

The default value can be found in the `contributes.configuration.vspacecode.bindings.default` section of the `package.json` in this repo. You can use the default value as an example to craft your own custom menu.

## Bonus
This section contains additional config that might be helpful beyond the default bindings

### Additional settings
You may want to add the following additional settings to your `settings.json` file:
```json
{
    "vim.useSystemClipboard": true
}
```

### Quick Window Navigation
To navigate all the windows including slide and bottom pane with `Ctl-h/j/k/l`, you can merge the following config system's key bindings to your `keybindings.json` file.

> This config might conflict with "Easy List Navigation" below.

<details><summary>keybindings.json</summary>
<p>

```json
[
	{
		"key": "ctrl+h",
		"command": "workbench.action.navigateLeft",
		"when": "!inQuickOpen && !suggestWidgetVisible && !parameterHintsVisible"
	},
	{
		"key": "ctrl+j",
		"command": "workbench.action.navigateDown",
		"when": "!inQuickOpen && !suggestWidgetVisible && !parameterHintsVisible && !inKeybindingsSearch && !problemsFilterFocus"
	},
	{
		"key": "ctrl+k",
		"command": "workbench.action.navigateUp",
		"when": "!inQuickOpen && !suggestWidgetVisible && !parameterHintsVisible"
	},
	{
		"key": "ctrl+l",
		"command": "workbench.action.navigateRight",
		"when": "!inQuickOpen && !suggestWidgetVisible && !parameterHintsVisible"
  }
]
```

</p>
</details>

### Quick Editor Move
Merge the following overrides to `settings.json` will change `<spc> w h/j/k/l` to move the active editor to a window in that direction like `<spc> b H/J/K/L` Note that this is default behavior before `v0.4.0`

<details><summary>settings.json</summary>
<p>

```json
"spacecode.bindingOverrides": [
    {
        "keys": "w.h",
        "name": "Move editor into the left group",
        "type": "command",
        "command": "workbench.action.moveEditorToLeftGroup"
    },
    {
        "keys": "w.j",
        "name": "Move editor into below group",
        "type": "command",
        "command": "workbench.action.moveEditorToBelowGroup"
    },
    {
        "keys": "w.k",
        "name": "Move editor into above group",
        "type": "command",
        "command": "workbench.action.moveEditorToAboveGroup"
    },
    {
        "keys": "w.l",
        "name": "Move editor into the right group",
        "type": "command",
        "command": "workbench.action.moveEditorToRightGroup"
    }
]
```

</p>
</details>

### Easy List Navigation

Although [VSCode Vim already bound](https://github.com/VSCodeVim/Vim/blob/v1.14.5/package.json#L124-L152) these to `h/j/k/l`, however, they might not work in all lists like in the problem pane. You can merge the following keybindings to `keybindings.json` to bind `ctrl+h/l/j/k` for those situations. 

> This config might conflict with "Quick Window Navigation" above.

<details><summary>keybindings.json</summary>
<p>

```json
[
    {
        "key": "ctrl+h",
        "command": "list.collapse",
        "when": "listFocus && !inputFocus"
    },
    {
        "key": "ctrl+l",
        "command": "list.expand",
        "when": "listFocus && !inputFocus"
    },
    {
        "key": "ctrl+j",
        "command": "list.focusDown",
        "when": "listFocus && !inputFocus"
    },
    {
        "key": "ctrl+k",
        "command": "list.focusUp",
        "when": "listFocus && !inputFocus"
    }
]
```

</p>
</details>

### Use non-character keys
See in [vscode-which-key](https://github.com/VSpaceCode/vscode-which-key#use-non-character-keys)

### Display menu with a delay
See in [vscode-which-key](https://github.com/VSpaceCode/vscode-which-key#display-menu-with-a-delay)

## Release Notes

See [CHANGELOG.md](CHANGELOG.md)

## [Contribution](CONTRIBUTING.md)
All feature requests and help are welcome. Please open an issue to track.

## Credits
Thanks @kahole for his implementation of quick pick menu in edamagit.
