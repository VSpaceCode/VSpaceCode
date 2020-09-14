# VSpaceCode (Preview)

![VSpaceCode Logo](resources/logo.png)

This extension is inspired by spacemacs and aiming to provide similar experience in VSCode. An action menu trigger by space key is implemented to reduce memorization of shortcuts. You can change the editor group, change the file language, and check git status without leaving your keyboard. This provides the speed to shortcut while minimizing typing comparing to fuzzy search in the command palette or shortcut memorizing.

## Features

- Spacemacs like action menu to reduce memorization of shortcuts
- All menu items are customizable
- The menu key is customizable
- Bundle all the extensions needed out-of-the box

![VSpaceCode actions](resources/feature.gif)

## Project history

This project was initially started by [StreakyCobra](https://github.com/StreakyCobra) as a configuration file for [VSCodeVim](https://github.com/VSCodeVim/Vim) to be merged in your `settings.json` file. [stevenguh](https://github.com/stevenguh) developed on his side [stevenguh/spacecode](https://github.com/stevenguh/spacecode) also with the goal to bring Spacemacs bindings to VSCode. After some discussion we agreed to merge the two projects to keep this niche community unified. stevenguh solution was technically better, but this project had a larger community and was better referenced, so it was decided move his extension here and to deprecate [stevenguh/spacecode](https://github.com/stevenguh/spacecode).

If you prefer this project's first approach using settings without an extension, see the [vscode-vim](https://github.com/VSpaceCode/VSpaceCode/tree/vscode-vim) branch.

## Installation
This extension is published as an extension pack, and should install all the necessary extensions for the best-of-the box experience; however, if you do not like the bundled extensions or are not using VSCode Vim, please go to the [vscode-which-key](https://github.com/VSpaceCode/vscode-which-key) for a standalone which key menu function.

After the installation of the extension, a notification will help you to configure both the necessary settings and user bindings. However, the formatting of `settings.json` and `keybindings.json` may be lost. You can choose to follow the manual configuration below.

### Configuration
The [`settings.jsonc`](./src/settings.jsonc) and [`keybindings.jsonc`](./src/keybindings.jsonc) in the repo contains the configurations needed. You can merge them manually to your user's `settings.json` and `keybindings.json`.

> You can access your user's `settings.json` and `keybindings.json` by searching `Preference: Open Settings (JSON)` and `Preference: Open Keyboard Shortcuts (JSON)` in the command palette (Ctl+Shift+P)

The following commands can be access through command palette to rerun the automatic configuration step.

- VSpaceCode: Configure Default Settings and Keybindings

  This command will run the below two commands and is also the command that runs on the welcome notification

- VSpaceCode: Configure Default Settings

  This command will merge the [necessary settings](./src/settings.jsonc) to your user's `settings.json`

- VSpaceCode: Configure Default Keybindings

  This command will merge the [necessary key bindings](./src/keybindings.jsonc) to your user's `keybindings.json`

## Menu Customization

See [here](https://vspacecode.github.io/docs/menu-customization).

## Bonus

See [here](https://vspacecode.github.io/docs/bonus).

## Known Issues
- File browser (bound to `<spc> f f`) doesn't have a button to open local file with VSCode Remote

## Terminology

Key bindings name adopts spacemacs/emacs terminology. Here you can find the
corresponding terms in VSCode:

| Emacs  | VSCode       |
| ------ | ------------ |
| buffer | editor       |
| window | editor group |
| frame  | window       |

## Release Notes

See [CHANGELOG.md](CHANGELOG.md)

## [Contribution](CONTRIBUTING.md)
All feature requests and help are welcome. Please open an issue to track.

## Credits
Thanks @kahole for his implementation of quick pick menu in edamagit.
