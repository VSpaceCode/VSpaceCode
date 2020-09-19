# VSpaceCode (Preview)

![VSpaceCode Logo](resources/logo.png)

This extension is inspired by spacemacs and aiming to provide similar experience in VSCode. An action menu trigger by space key is implemented to reduce memorization of shortcuts. You can change the editor group, change the file language, and check git status without leaving your keyboard. This provides the speed to shortcut while minimizing typing comparing to fuzzy search in the command palette or shortcut memorizing.

## Features

- Spacemacs like action menu to reduce memorization of shortcuts
- All menu items are customizable
- The menu key is customizable
- Bundle all the extensions needed out-of-the box

![VSpaceCode actions](https://github.com/VSpaceCode/vspacecode.github.io/blob/master/static/img/demo.gif?raw=true)

## Project history

This project was initially started by [StreakyCobra](https://github.com/StreakyCobra) as a configuration file for [VSCodeVim](https://github.com/VSCodeVim/Vim) to be merged in your `settings.json` file. [stevenguh](https://github.com/stevenguh) developed on his side [stevenguh/spacecode](https://github.com/stevenguh/spacecode) also with the goal to bring Spacemacs bindings to VSCode. After some discussion we agreed to merge the two projects to keep this niche community unified. stevenguh solution was technically better, but this project had a larger community and was better referenced, so it was decided move his extension here and to deprecate [stevenguh/spacecode](https://github.com/stevenguh/spacecode).

If you prefer this project's first approach using settings without an extension, see the [vscode-vim](https://github.com/VSpaceCode/VSpaceCode/tree/vscode-vim) branch.

## Installation and documentation

You can find installation instructions and documentation in the [VSpaceCode website](https://vspacecode.github.io/docs/).

## Known Issues
- File browser (bound to `<spc> f f`) doesn't have a button to open local file with VSCode Remote

## Release Notes

See [CHANGELOG.md](CHANGELOG.md)

## [Contribution](CONTRIBUTING.md)
All feature requests and help are welcome. Please open an issue to track.

## Credits
Thanks @kahole for his implementation of quick pick menu in edamagit.
