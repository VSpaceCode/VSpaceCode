# Spacecode (Preview)

![Space Code Icon](images/icon.png)

This extension is inspired by spacemacs and aiming to provide similar experience in VSCode. An action menu trigger by space key is implemented to reduce memorization of shortcuts. You can change the editor group, change the file language, and check git status without leaving your keyboard. This provides speed to shortcut while minimizing typing comparing to fuzzy search in the command palette or shortcut memorizing.

## Features

- Spacemacs like action menu to reduce memorization of shortcuts
- All menu items are customizable
- The menu key is customizable

![Space actions](https://media.giphy.com/media/VdDdNbEPrYp282EC3Y/giphy.gif)

## Requirements

- [VSCode Vim](https://marketplace.visualstudio.com/items?itemName=vscodevim.vim) (required for default space key)
- [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens) (required for default bindings)
- [edamagit](https://marketplace.visualstudio.com/items?itemName=kahole.magit) and its Vim bindings (required for default bindings)

## Installation
After the installation of the extension, a series of prompts in the vscode notification will guide you through the steps to set to setup the key binding for the menu. If you are a VSCode Vim user, the prompts can config the space key in Vim key binding section automatically. However, it will reformat `vim.normalModeKeyBindingsNonRecursive` or `vim.visualModeKeyBindingsNonRecursive` in your `settings.json`. If you want to keep the format, or are not a vim users, you can follow the instructions below to add key bindings manually.

### I am using VSCode Vim
Add the menu key as follows in `settings.json`. This following example is to let VSCode Vim to capture the `space` key and trigger the action menu in normal mode and visual mode.
> To access `settings.json`, you can search `Setting` in the command list with `Ctl+Shift+P` or `Cmd+Shift+P` and select `Preference: Open Settings (JSON)`.

> If you have existing config for `vim.normalModeKeyBindingsNonRecursive` or `vim.visualModeKeyBindingsNonRecursive`, make sure you add to the array instead of replace them.

```json
"vim.normalModeKeyBindingsNonRecursive": [
  {
    "before": ["<space>"],
    "commands": ["spacecode.space"]
  }
],
"vim.visualModeKeyBindingsNonRecursive": [
  {
    "before": ["<space>"],
    "commands": ["spacecode.space"]
  }
]
```

### I am *not* using VSCode Vim
1. Change the `spacecode.checkVimConfig` to `false` in `settings.json` disable vim config checking on startup.
2. Add the trigger as follows in `keybindings.json`. This following json is an example to bind `alt+space` to the action menu when a text editor is in focus.

> To access `keybindings.json`, you can search `Keyboard` in the command list with `Ctl+Shift+P` or `Cmd+Shift+P` and select `Preference: Open Keyboard Shortcuts (JSON)`.

```json
{
  "key": "alt+space",
  "command": "spacecode.space",
  "when": "editorTextFocus"
},
```

## Customization

### Change the actions in the menu
To customize the menu, you can override the menu completely by putting your own `spacecode.bindings` into your `settings.json`.
An example of a `settings.json` file that overrides space menu is as follows:
```json
{
  "spacecode.bindings": [
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

The default value can be found in the `contributes.configuration.spacecode.bindings.default` section of the `package.json` in this repo. You can use the default value as an example to craft your own custom menu.

> The key `q` is reversed to escape the menu.

> The actions are subject to change before `1.0.0`. If you find something you that think it should bind to a particular key, or you want a particular command, please open an issue as a feature request.

## Release Notes

See [CHANGELOG.md](CHANGELOG.md)

## Contribution
All feature requests and help are welcome. Please open an issue to track.

## Credits
Thanks @kahole for his implementation of quick pick menu in edamagit.

Icons made by [Icongeek26](https://www.flaticon.com/authors/icongeek26) from [www.flaticon.com](www.flaticon.com)
