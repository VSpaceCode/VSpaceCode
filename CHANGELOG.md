# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

⚙️ Require setting reconfiguration

⌨️️ Require keybinding reconfiguration

> See [Configuration](https://vspacecode.github.io/docs/#manual-configuration-optional) section on our website

## [Unreleased]

### Added

- Add default setting config to fix vim navigation keys in peek view for vscode 1.58

## [0.10.1] - 2021-07-04

### Added

- Add additional refactoring bindings in Python major mode
  - `r v` to extract variable
  - `r m` to extract method

### Changed

- Use the newer whichkey menu registering API, which means this version require v0.9 and above of whichkey to work.

## [0.10.0] - 2021-06-27

### Added

- Add `b` backend to Python major mode
- Add `<spc> .` to repeat most recent action
- Add `<spc> r .` to show recent actions
- Add `<spc> ?` to search keybindings
- Add icons to most default bindings
  (See [#206](https://github.com/VSpaceCode/VSpaceCode/issues/206) for the tracker)

### Fixed

- Fix the missing `+` prefix for "Go to" key in python major mode
- Fix `<spc> 0` command when triggered in file outside of workspace

## [0.9.1] - 2021-03-28

### Added

- Add Rust major mode key bindings
- Add F# major mode key bindings
- Add C# major mode key bindings
- Add C++ major mode key bindings
- Add LaTeX major mode key bindings
- Add functions to Python "major mode" (`<spc> m`). Most functions require the [Python](https://marketplace.visualstudio.com/items?itemName=ms-python.python) extension to be installed.
  - "Go to commands..." menu (`<spc> m g`):
    - `<spc> m g d` to go to definition
    - `<spc> m g e` to go to errors/problems
    - `<spc> m g g` to go to definition
    - `<spc> m g i` to find symbol in file
    - `<spc> m g r` to peek references
    - `<spc> m g D` to peek definition
    - `<spc> m g I` to find symbols in project
    - `<spc> m g R` to find all references

### Changed

- Change the order of the spacemacs to be more aligned with spacemacs

## [0.9.0] - 2021-01-25

### Added

- ⌨ Trigger vspacecode when sidebar is in focus
- Add `<spc> b h/j/k/l` for directional editor moving
- Add `<spc> c c` to compile the project
- Add `<spc> S n` to show notification center
- Add `<spc> j c` for previous change, `<spc> j C` for next change
- Add Ruby major mode key bindings
- Add Python major mode key bindings
- Add Clojure major mode key bindings to support the Calva extension for Clojure & ClojureScript development

### Changed

- Move "Format buffer" action from `<spc> f =` to `<spc> j +`

## [0.8.5] - 2020-12-11

### Added

- Add `<spc> h D` to open VSpaceCode documentation website
- Add `<spc> p c` to run the default build task for the current project
- Add `<spc> p T` to run the default test task for the current project
- Add `<spc> 0` to show active file in explorer

### Changed

- Indicate submenus with `+` instead of `...`

## [0.8.4] - 2020-11-23

### Added

- Add `<spc> z f j/k` to zoom out/in frame
- Add `<spc> z x j/k` to zoom out/in text

### Changed

- Focus on the search result after `<spc> *`
- `<spc> b b` shows recent buffers first

## [0.8.3] - 2020-10-22

### Added

- ⚙️ Add `,` to trigger major mode
- Add functions to Go "major mode" (`<spc> m`). Most functions require the [Go](https://marketplace.visualstudio.com/items?itemName=golang.Go) extension to be installed.
  - `<spc> m <spc>` to show all Go extension commands
  - "Format..." menu (`<spc> m =`):
    - `<spc> m = =` to format document
    - `<spc> m = d` to format document with... (choose formatter)
    - `<spc> m = m` to format modified lines only
    - `<spc> m = s` to format selection
    - `<spc> m = S` to format selection with... (choose formatter)
  - "Actions..." menu (`<spc> m a`):
    - `<spc> m a P` to run code in Go Playground
    - "Package actions..." menu (`<spc> m a p`):
      - `<spc> m a p b` to build current package
      - `<spc> m a p g` to get a package
      - `<spc> m a p i` to install current package
      - `<spc> m a p l` to lint current package
      - `<spc> m a p s` to browse packages
      - `<spc> m a p v` to vet current package
    - "Workspace actions...." menu (`<spc> m a w`):
      - `<spc> m a w b` to build workspace
      - `<spc> m a w l` to lint workspace
      - `<spc> m a w b` to vet workspace
      - `<spc> m a w p` to add package to workspace
  - "Backend/environment..." menu (`<spc> m b`):
    - `<spc> m b e` to choose Go environment
    - `<spc> m b g` to show current GOPATH
    - `<spc> m b i` to install/update tools
    - `<spc> m b l` to locate configured Go tools
    - `<spc> m b R` to restart language server
  - "Go to..." menu (`<spc> m g`):
    - `<spc> m g d` to go to definition
    - `<spc> m g D` to peek definition
    - `<spc> m g e` to go to errors/problems
    - `<spc> m g g` to go to definition
    - `<spc> m g i` to find symbol in file
    - `<spc> m g I` to find symbol in project
    - `<spc> m g m` to go to method in file
    - `<spc> m g r` to peek references
    - `<spc> m g R` to find all references
    - `<spc> m g t` to go to type definition
    - `<spc> m g T` to peek type definition
  - "Insert/remove..." menu (`<spc> m i`):
    - `<spc> m i f` to fill struct
    - `<spc> m i i` to add import
    - `<spc> m i I` to generate interface stubs
    - `<spc> m i t` to add tags to struct fields
    - `<spc> m i T` to remove tags from struct fields
  - "Refactor..." menu (`<spc> m r`):
    - `<spc> m r .` to quick fix
    - `<spc> m r e` to extract to function or variable
    - `<spc> m r r` to rename symbol
  - "Test..." menu (`<spc> m t`):
    - "Benchmarks..." menu (`<spc> m t b`):
      - `<spc> m t b f` to benchmark function at cursor
      - `<spc> m t b f` to benchmark file
      - `<spc> m t b f` to benchmark package
    - `<spc> m t c` to cancel running tests
    - `<spc> m t d` to debug test at cursor
    - `<spc> m t f` to test function at cursor
    - `<spc> m t F` to test the current file
    - "Generate..." menu (`<spc> m t g`):
      - `<spc> m t g f` to generate unit tests for function
      - `<spc> m t g F` to generate unit tests for file
      - `<spc> m t g p` to generate unit tests for package
    - `<spc> m t l` to test previous
    - `<spc> m t p` to test package
    - `<spc> m t P` to apply cover profile
    - `<spc> m t s` to subtest at cursor
    - "Toggle..." menu (`<spc> m t t`):
      - `<spc> m t t c` to toggle test coverage in current package
      - `<spc> m t t f` to toggle open test file
    - `<spc> m t w` to test packages in workspace

### Changed

- Speed up vscode startup by deferred extension activation
- Reorder the default keybindings in alphabetical order similar to spacemacs

### Fixed

- Fix the issue where config default setting command normalized existing vim's keybindings (e.g. `<space>` to ``) and can cause duplicate keybindings.
- ⌨️️ Fix the inability to enter space key in any input when there is no editor opened
- Keep cursor position after `<spc> b Y`
- Fix the item name of `<spc> j =`

## [0.8.2] - 2020-10-06

### Added

- Add functions to Markdown "major mode" (`<spc> m`). Most functions require the [Markdown All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one) extension to be installed.
  - "Buffer commands..." menu (`<spc> m c`):
    - `<spc> m c p` to open preview to the side
    - `<spc> m c P` to open preview in current group
    - `<spc> m c e` to export to HTML
  - "Text..." menu (`<spc> m x`):
    - `<spc> m x b` to toggle bold
    - `<spc> m x ~` to toggle code block
    - `` <spc> m x ` `` to toggle inline code
    - `<spc> m x i` to toggle italic
    - `<spc> m x l` to toggle list
    - `<spc> m x m` to toggle math
    - `<spc> m x s` to toggle strikethrough
    - `<spc> m x ]` to increase heading level (transient)
    - `<spc> m x [` to decrease heading level (transient)
  - "Table of contents..." menu (`<spc> m t`):
    - `<spc> m t c` to create table of contents
    - `<spc> m t u` to update table of contents
    - `<spc> m t n` to add section numbers
    - `<spc> m t N` to remove section numbers

## [0.8.1] - 2020-09-29

### Fixed

- Fix the `<spc> j n` to split new line
- ⌨️️ Fix which-key taking over when typing `<spc>` in the quick open dialog without an editor open

## [0.8.0] - 2020-09-21

### Changed

- Adopt emacs terminology for key bindings names
- Change `<spc> t l` to toggle word wrap instead of `<spc> t W`
- Change `<spc> f t` to toggle file explorer view
- Change `<spc> e n`, `<spc> e N`, and `<spc> e p` to search in all project
- Change `<spc> j =` to format selection in visual mode
- Change `<spc> d b` to open a breakpoint menu
  - `<spc> d b b` to toggle breakpoint
  - `<spc> d b i` to toggle inline breakpoint
  - `<spc> d b c` to add conditional breakpoint
  - `<spc> d b f` to add function breakpoint
  - `<spc> d b d` to delete breakpoint
  - `<spc> d b D` to delete all breakpoints
  - `<spc> d b e` to enable breakpoint
  - `<spc> d b E` to enable all breakpoints
  - `<spc> d b s` to disable breakpoint
  - `<spc> d b S` to disable all breakpoints
  - `<spc> d b n` to jump to next breakpoint
  - `<spc> d b p` to jump to next breakpoint
- Change `<spc> b N` to open a new buffer menu
  - `<spc> b N n` to open new buffer
  - `<spc> b N h` to open new buffer (split left)
  - `<spc> b N j` to open new buffer (split down)
  - `<spc> b N k` to open new buffer (split up)
  - `<spc> b N l` to open new buffer (split right)
- Change `<spc> t w` to toggle render whitespace

### Added

- ⌨️️ Add `ctrl+l` to accept suggestion
- Add `<spc> "` to open a new external terminal
- Add major mode bindings for `markdown`
- Add `<spc> c` to open Comments menu
  - `<spc> c l` to toggle line comment
  - `<spc> c n` to go to next error
  - `<spc> c N` to go to previous error
- Add `<spc> D` to open Diff/Compare menu

### Removed

- Remove `<spc> d B` since toggle inline breakpoint is now in `<spc> d b`

## [0.7.5] - 2020-08-27

## Added

- Implement the commands for rest of the menu items in `<spc> f y`
  - `<spc> f y c` to copy path of active file with line and column
  - `<spc> f y C` to copy relative path of active file with line and column
  - `<spc> f y d` to copy directory path of the active file
  - `<spc> f y D` to copy relative directory path of active file
  - `<spc> f y l` to copy path of active file with line
  - `<spc> f y L` to copy relative path of active file with line
  - `<spc> f y n` to copy filename of active file
  - `<spc> f y N` to copy filename without extension of active file

## Change

- Change `<spc> h I` (report issue) to better action
- Change `<spc> f y y` and `<spc> f y Y` to own implementation to show the copied path on status bar

## [0.7.4] - 2020-08-14

### Added

- Add copy section value for magit ref menu
- Add copy buffer revision for magit ref menu
- Add `<spc> T i` to choose icon theme
- Add `<spc> b 1` to focus first editor in group
- Add `<spc> b 0` to focus last editor in group
- Add `<spc> b t` to pin editor
- Add `<spc> b T` to unpin editor
- Add `<spc> f D` to delete current file
- Add `<spc> F n` to duplicate workspace in new frame
- Add `<spc> F N` to open a new empty frame
- Add `<spc> F o` to switch frame
- Add `<spc> g c` to clone git repository
- Add `<spc> g i` to initialize git repository
- Add `<spc> g f d` to view differences of current file
- Add `<spc> g f l` to focus on timeline
- Add `<spc> h d` to open VSCode documentation
- Add `<spc> h I` to report issue
- Add `<spc> h T` to open VSCode tutorial
- Add `<spc> j v` to Focus Breadcrumbs
- Add `<spc> p R` to replace in files
- Add `<spc> q R` to reload window with all extensions disabled
- Add `<spc> w c` to toggle centered layout
- Add `<spc> w D` to close all other editor groups
- Add `<spc> w F` to open a new empty frame
- Add `<spc> w o` to switch frame
- Add `<spc> w [` to shrink window
- Add `<spc> w ]` to enlarge window

### Changed

- Change `<spc> b Y` to deselect after copying
- Change `<spc> f e` to open settings bindings
- Change `<spc> f n` to create new file with explorer
- Change `<spc> f y` to open yank bindings

### Removed

- Remove `<spc> p '` since it has been replaced by `<spc> F o`

## [0.7.3] - 2020-07-30

### Added

- Add `<spc> f e` to open settings
- Add `<spc> b s` to open a new scratch buffer
- Add `<spc> h k` to open global key bindings
- Add `<spc> l d` to close current workspace
- Add `<spc> p l` to open recent project (same as `<spc> p p`)
- Add `<spc> q f` to close window (same as `<spc> q q`)
- Add `<spc> r b` to open recent buffers
- Add `<spc> r s` to search in project
- Add `<spc> ;` to toggle comment
- Add `<spc> '` to show terminal

### Changed

- Change `<spc> w m` to be able to toggle it

### Removed

- Remove `<spc> w t` since it has been replaced by `<spc> w m`

## [0.7.2] - 2020-07-23

### Added

- Add `<spc> s r` to search reference
- Add `<spc> s R` to search reference in side bar
- Add `<spc> s J` to jump symbol in the workspace

### Changed

- Change `<spc> s j` to jump to symbol in file

### Fixed

- Fix `<spc> s s` by calling the right command

## [0.7.1] - 2020-07-20

### Fixed

- Fix README format

## [0.7.0] - 2020-07-20

### Changed

- Change `<spc> f f` to use `bodil.file-browser`

### Added

- ⌨️ Add `ctrl+h/l` to traverse `bodil.file-browser` menu

### Fixed

- Fix typo and grammar in default binding names

## [0.6.0] - 2020-07-16

### Added

- Add `<spc> <tab>` to switch to last editor
- Add <code>&lt;spc&gt; p `</code> to switch active project window (application window)
- Add support to run VSpaceCode locally with VSCode Remote
- Add `<spc> s S` to fuzzy search with selection
- ⚙️ Add `vim.useSystemClipboard` to the setting configuration command
- ⌨️ Add `<spc>` to trigger which-key menu when the active editor group is empty
- ⌨️ Add `ctrl+j/k` as a shortcut to traverse items in:
  - Quick open menu/QuickPick
  - Suggestion overlay/intellisense
  - Parameter hint (i.e. the overlay when there's multiple overloads)

    > If you bind `ctrl+h/j/k/l` for window navigation, you can add the `!inQuickOpen && !suggestWidgetVisible && !parameterHintsVisible` to the `when` section of those keybindings. See [README](./README.md) the example of the bindings

### Changed

- Change `<spc> s s` to search the selection automatically if there's one

## [0.5.0] - 2020-06-29

### Added

- Add menu for magit ref `y` in normal mode

    This requires configuration of your `keybindings.json`, checkout the installation section of [README](./README.md) for more information

- Add configuration commands for setting up both `settings.json` and `keybindings.json`
- Add `<spc> b H/J/K/L` for directional editor moving
- Add `<spc> q` for Quit menu
- Add `<spc> j` for Jump/Joing/Split menu (#53)

  This requires `vim.easymotion` to be `true` in your `settings.json`

### Changed

- Split the core menu logic to another extension (`vscode-which-key`) so this extension can be focused on Vim users
- Change `<spc> s s` to use fuzzy search to emulate Helm Swoop/Ivy Swiper (#56)

### Fixed

- Fix the duplicated `<spc> f l` by move locate file to `<spc> f L`

### Removed

- Remove support of non-vscodevim users.

  If you are a non-vscodevim, please use `vscode-which-key` instead.

- Remove continuos config checker on launch

- Remove Gitlens bindings from the `<spc> g`

  To restore the previous `<spc> g` menu, merge the following overrides to `settings.json`
  <details><summary>settings.json</summary>
  <p>

  ```json
  "spacecode.bindingOverrides": [
      {
          "keys": "g",
          "name": "Git...",
          "type": "bindings",
          "bindings": [
              {
                  "key": "s",
                  "name": "Magit: Status",
                  "type": "command",
                  "command": "magit.status"
              },
              {
                  "key": "f",
                  "name": "Magit: File...",
                  "type": "command",
                  "command": "magit.file-popup"
              },
              {
                  "key": "m",
                  "name": "Magit: Dispatch",
                  "type": "command",
                  "command": "magit.dispatch"
              },
              {
                  "key": "d",
                  "name": "Gitlens: Diff...",
                  "type": "bindings",
                  "bindings": [
                      {
                          "key": "w",
                          "name": "Diff working file",
                          "type": "command",
                          "command": "gitlens.diffWithWorking"
                      },
                      {
                          "key": "p",
                          "name": "Diff previous file",
                          "type": "command",
                          "command": "gitlens.diffWithPrevious"
                      },
                      {
                          "key": "n",
                          "name": "Diff next file",
                          "type": "command",
                          "command": "gitlens.diffWithNext"
                      },
                      {
                          "key": "W",
                          "name": "Diff working line",
                          "type": "command",
                          "command": "gitlens.diffLineWithWorking"
                      },
                      {
                          "key": "P",
                          "name": "Diff previous line",
                          "type": "command",
                          "command": "gitlens.diffLineWithPrevious"
                      },
                      {
                          "key": "N",
                          "name": "Diff  next line",
                          "type": "command",
                          "command": "gitlens.diffLineWithNext"
                      }
                  ]
              },
              {
                  "key": "h",
                  "name": "Gitlens: File history",
                  "type": "command",
                  "command": "gitlens.showQuickFileHistory"
              },
              {
                  "key": "l",
                  "name": "Gitlens: Repo history",
                  "type": "command",
                  "command": "gitlens.showQuickRepoHistory"
              },
              {
                  "key": "b",
                  "name": "Gitlens: Blame",
                  "type": "command",
                  "command": "gitlens.toggleFileBlame"
              },
              {
                  "key": "z",
                  "name": "Gitlens: Stash",
                  "type": "command",
                  "command": "gitlens.showQuickStashList"
              },
              {
                  "key": "S",
                  "name": "Stag lines",
                  "type": "command",
                  "command": "git.stageSelectedRanges"
              },
              {
                  "key": "U",
                  "name": "Unstage lines",
                  "type": "command",
                  "command": "git.unstageSelectedRanges"
              },
              {
                  "key": "R",
                  "name": "Revert lines",
                  "type": "command",
                  "command": "git.revertSelectedRanges"
              }
          ]
      }
  ]
  ```

  </p>
  </details>

## [0.4.0] - 2020-06-21

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
- Add `<spc> p` for project menu
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
- Move the quick open in `<spc> f f` to `<spc> p f` to be more aligned with spacemacs
- Move fold to `<spc> z .` to be more aligned with spacemacs
- Move Show (`s`) menu to `S` for the addition of search/symbol menu
- Change the editor menu (`e`) to be text (`x`) menu to be more aligned with spacemacs
  - Add `u` to transform text to lower case
  - Add `U` to transform text to upper case
  - Add `J` to move lines down with a transient menu
  - Add `K` to move lines up with a transient menu
  - Add lines (`l`) sub-menu
    - Add `s` to sort lines ascendingly
    - Add `S` to sort lines decendingly
    - Add `d` to duplicate lines down
    - Add `D` to duplicate lines up
  - Add delete (`d`) sub-menu
    - Add `w` to trim trailing whitespace
- Change the bindings and names in the fold menu to be more aligned with spacemacs
  - Use `c` instead of `f` to close at a point
  - Use `g` instead of `r` to close all regions
  - Use `m` instead of `a` to close all
  - Use `o` instead of `F` to open at a point
  - Use `O` instead of `c` to open recursively
  - Use `G` instead of `R` to open all regions
  - Use `r` instead of `A` to open all
- Break up toggles into toggles (`t`) and UI toggles (`T`) to be more aligned with spacemacs
  - Add `F` to toggle ful screen in UI toggles (`T`)
  - Add `s` to select theme in UI toggles (`T`)
  - Change `t` to toggle activity bar visibility in UI toggles (`T`)
  - Use `T` instead `t` to toggle tab visibility in UI toggles (`T`)
  - Remove fold `t` in toggles menu (`t`) in favor of the added toggle in the fold menu
- Change the debug bindings to be more aligned with spcaemacs
  - Use `s` instead of `o` for step over
  - use `o` instead of `O` for step out
  - Add `v` for REPL
  - Add `w` to focus on watch window
  - Add `W` to add to watch
- Change the file bindings to be more aligned with spacemacs
  - Use `l` instead `r` to reval file in os
  - Use `r` to open recent
  - Add `t` to toggle explore view
  - Add `T` to show active file in explore
  - Add `y` to copy the path of the active file
- Change the window bindings to be more aligned with spacemacs
  - Use `/` instead of `\` for splitting editor editor right
  - Use `d` instead of `x` for closing editors in group
  - Change `h` to focus on the left pane
  - Change `j` to focus on the pane below
  - Change `k` to focus on the pane above
  - Change `l` to focus on the right pane
  - Add `s` to split editor below
  - Add `v` to split editor right
  - Add `W` to focus previous editor group

  To get the old window pane behavior for `h`, `j`, `k` and `l` one can merge the following overrides to your `settings.json`
  <details><summary>settings.json</summary>
  <p>

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

  </p>
  </details>

## [0.3.2] - 2020-06-19

### Changed

- Re-release v0.3.2 in `VSpaceCode`
