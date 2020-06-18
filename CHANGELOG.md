# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Added
- Implement transient menu
- Add `<spc> z` for zoom menu
- Add `<spc> 1...8` to focus different editor groups
- Add `<spc> b` for buffers/editors menu
- Add `<spc> e` for errors menu
- Add `<spc> v` for smart selection
- Add `<spc> *` to search with input
- Add `<spc> !` to show terminal
- Add `<spc> i` for insert menu
- Add `<spc> s` for search/symbol menu
- Implement `args` key in the bindings to executes command(s) with args
For example, the follow the binding will map `y` in the menu to `y y` in vim to yank a line by passing a `args` for that command.
```jsonc
{
    "key": "y",
    "name": "Yank a line",
    "type": "command",
    "command": "vim.remap",
    "args": {
      "after": ["y", "y"]
    }
},
```
In this example: Only the second command has args. When `args` is used with `commands`, the `args` is expected to be an array. If the `null` is not present in the follow example, the first command (`formatDocument`) will receive the second element of `args` instead.
```jsonc
{
    "key": "=",
    "name": "Yank a line",
    "type": "commands",
    "commands": ["editor.action.formatDocument", "vim.remap"],
    "args": [
      null,
      { "after": ["y", "y"]}
    ]
},
```

### Changed
- `q` is no longer a reserved key to exit menu
- Move fold to `<spc> z .` to be more aligned with spacemacs
- Move Show (`s`) menu to `S` for the addition of search/symbol menu
- Change the editor menu (`e`) to be text (`x`) menu to be more aligned with spacemacs
  + Add `u` to transform text to lower case
  + Add `U` to transform text to upper case
  + Add `J` to move lines down with a transient menu
  + Add `K` to move lines up with a transient menu
  + Add lines (`l`) sub-menu
    * Add `s` to sort lines ascendingly
    * Add `S` to sort lines decendingly
    * Add `d` to duplicate lines down
    * Add `D` to duplicate lines up
  + Add delete (`d`) sub-menu
    * Add `w` to trim trailing whitespace
- Change the bindings and names in the fold menu to be more aligned with spacemacs
  + Use `c` instead of `f` to close at a point
  + Use `g` instead of `r` to close all regions
  + Use `m` instead of `a` to close all
  + Use `o` instead of `F` to open at a point
  + Use `O` instead of `c` to open recursively
  + Use `G` instead of `R` to open all regions
  + Use `r` instead of `A` to open all
- Break up toggles into toggles (`t`) and UI toggles (`T`) to be more aligned with spacemacs
  + Add `F` to toggle ful screen in UI toggles (`T`)
  + Add `s` to select theme in UI toggles (`T`)
  + Change `t` to toggle activity bar visibility in UI toggles (`T`)
  + Use `T` instead `t` to toggle tab visibility in UI toggles (`T`)
  + Remove fold `t` in toggles menu (`t`) in favor of the added toggle in the fold menu 
- Change the debug bindings to be more aligned with spcaemacs
  + Use `s` instead of `o` for step over
  + use `o` instead of `O` for step out
  + Add `v` for REPL
  + Add `w` to focus on watch window
  + Add `W` to add to watch
- Change the file bindings to be more aligned with spacemacs
  + Use `l` instead `r` to reval file in os
  + Use `r` to open recent
  + Add `t` to toggle explore view
  + Add `T` to show active file in explore
  + Add `y` to copy the path of the active file
- Change the window bindings to be more aligned with spacemacs
  + Use `/` instead of `\` for splitting editor editor right
  + Use `d` instead of `x` for closing editors in group
  + Change `h` to focus on the left pane
  + Change `j` to focus on the pane below
  + Change `k` to focus on the pane above
  + Change `l` to focus on the right pane
  + Add `s` to split editor below
  + Add `v` to split editor right
  + Add `W` to focus previous editor group

To get the old window pane behavior for `h`, `j`, `k` and `l` one can add the following overrides to your `settings.json`
```json
"spacecode.bindingOverrides": [
    {
        "keys": "w.h",
        "name": "Move editor left",
        "type": "command",
        "command": "workbench.action.moveEditorToLeftGroup"
    },
    {
        "keys": "w.j",
        "name": "Move editor down",
        "type": "command",
        "command": "workbench.action.moveEditorToBelowGroup"
    },
    {
        "keys": "w.k",
        "name": "Move editor up",
        "type": "command",
        "command": "workbench.action.moveEditorToAboveGroup"
    },
    {
        "keys": "w.l",
        "name": "Move editor right",
        "type": "command",
        "command": "workbench.action.moveEditorToRightGroup"
    }
]
```

## [0.3.2] - 2020-06-19
### Changed
- Re-release v0.3.2 in `VSpaceCode`