# Spacecode (Preview)

![Space Code Icon](images/icon.png)

This extension is inspired by spacemacs and aiming to provide similar experience in VSCode. An action menu trigger by space key is implemented to reduce memorization of shortcuts. You can change the editor group, change the file language, and check git status without leaving your keyboard. This provides speed to shortcut while minimizing typing comparing to fuzzy search in the command palette or shortcut memorizing.

## Features

- Spacemacs like action menu to reduce memorization of shortcuts
- All menu items are customizable
- The the menu key is customizable

![Space actions](images/feature.gif)

## Requirements

- [VSCode Vim](https://marketplace.visualstudio.com/items?itemName=vscodevim.vim) (required for default space key)
- [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens) (required for default bindings)
- [edmagit](https://marketplace.visualstudio.com/items?itemName=kahole.magit) and its Vim bindings (required for default bindings)

## Customization

### Use other key to trigger the menu

> The following instructions might change during preview

#### I don't use VSCode Vim
Since the default key binding adding by this extensions will only tigger when Vim extension is active, you can just add a new binding in the your own `keybindings.json`. The following json is an example to bind `alt+space` to the action menu.

```json
{
  "key": "alt+space",
  "command": "spacecode.space",
  "when": "editorTextFocus"
},
```

#### I use Vim, but I just don't like the `space` key
You will have to remove the key binding added by this extension and replace that with your own. The following json is example to bind `alt+space` to the action menu.
```json
{
  "command": "-spacecode.space",
  "key": "space",
  "when": "editorTextFocus && vim.active && !inDebugRepl && vim.mode =~ /^Normal|Visual|VisualBlock|VisualLine$/"
},
{
  "command": "spacecode.space",
  "key": "alt+space",
  "when": "editorTextFocus && vim.active && !inDebugRepl && vim.mode =~ /^Normal|Visual|VisualBlock|VisualLine$/"
},

```

### Change the actions in the menu
To customize the menu, copy the default `spacecode.bindings` value in `package.json` in this repo and put the updated `spacecode.bindings` config in your own `setting.json`.

> The actions are subject to change before `1.0.0`. If you find something you think it should bind to a particular key, or you want some particular function, please open an issue as a feature request.

## Release Notes

See [CHANGELOG.md](CHANGELOG.md)

## Contribution
All feature requests and help are welcome. Please open an issue to track.

## Credits
Thanks @kahole for his implementation of quick pick menu in edamagit. 

Icons made by [Icongeek26](https://www.flaticon.com/authors/icongeek26) from [www.flaticon.com](www.flaticon.com)