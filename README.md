# Spacecode (Preview)

![Space Code Icon](images/icon.png)

This extension is inspired by spacemacs and aiming to provide similar experience in VSCode. An action menu trigger by space key is implemented to reduce memorization of shortcuts. You can change the editor group, change the file language, and check git status without leaving your keyboard. This provides speed to shortcut while minimizing typing comparing to fuzzy search in the command palette or shortcut memorizing.

## Features

- Action menu triggered by space key to reduce memorization of shortcuts
- All menu items are customizable

\!\[feature X\]\(images/feature-x.png\)

## Requirements

- [VSCode Vim](vscode:extension/vscodevim.vim)
- [GitLens](vscode:extension/eamodio.gitlens) (required for default bindings)
- [edmagit](vscode:extension/kahole.magit) and its Vim bindings (required for default bindings)

## Extension Settings

To customize the menu, copy the default value in `package.json` in this repo and put the updated `spacecode.space` config to your own setting json.

> The space bindings are subject to change before `1.0.0`. If you find something you think it should bind to a particular key, or you want some particular function, please open an issue as a feature request.

## Release Notes

See [CHANGELOG.md](CHANGELOG.md)

## Contribution
All feature requests and help are welcome. Please open an issue to track.

## Credits
Thanks @kahole for his implementation of quick pick menu in edamagit. 

Icons made by [Icongeek26](https://www.flaticon.com/authors/icongeek26) from [www.flaticon.com](www.flaticon.com)