# VSpaceCode

Key Binding: <code>␣</code>

Type: <code>bindings</code>

| Key Binding      | Name                             | Type                                    |
| ---------------- | -------------------------------- | --------------------------------------- |
| <code>␣ ␣</code> | Commands...                      | command                                 |
| <code>␣ ↹</code> | Last editor                      | commands                                |
| <code>␣ b</code> | Buffers/Editors...               | [bindings](#BuffersEditors)             |
| <code>␣ d</code> | Debug...                         | [bindings](#Debug)                      |
| <code>␣ e</code> | Errors...                        | [bindings](#Errors)                     |
| <code>␣ f</code> | File...                          | [bindings](#File)                       |
| <code>␣ g</code> | Git...                           | [bindings](#Git)                        |
| <code>␣ i</code> | Insert...                        | [bindings](#Insert)                     |
| <code>␣ j</code> | Jump/Join/Split...               | [bindings](#JumpJoinSplit)              |
| <code>␣ p</code> | Project...                       | [bindings](#Project)                    |
| <code>␣ q</code> | Quit..                           | [bindings](#Quit)                       |
| <code>␣ s</code> | Search/Symbol...                 | [bindings](#SearchSymbol)               |
| <code>␣ S</code> | Show...                          | [bindings](#Show)                       |
| <code>␣ t</code> | Toggles...                       | [bindings](#Toggles)                    |
| <code>␣ T</code> | UI toggles...                    | [bindings](#UI-toggles)                 |
| <code>␣ w</code> | Window...                        | [bindings](#Window)                     |
| <code>␣ x</code> | Text...                          | [bindings](#Text)                       |
| <code>␣ z</code> | Zoom/Fold...                     | [bindings](#ZoomFold)                   |
| <code>␣ !</code> | Show terminal                    | command                                 |
| <code>␣ /</code> | Search in project                | command                                 |
| <code>␣ *</code> | Search in project with selection | commands                                |
| <code>␣ v</code> | Smart select/expand region       | [transient](#Smart-selectexpand-region) |
| <code>␣ 1</code> | Focus 1st editor group           | command                                 |
| <code>␣ 2</code> | Focus 2nd editor group           | command                                 |
| <code>␣ 3</code> | Focus 3rd editor group           | command                                 |
| <code>␣ 4</code> | Focus 4th editor group           | command                                 |
| <code>␣ 5</code> | Focus 5th editor group           | command                                 |
| <code>␣ 6</code> | Focus 6th editor group           | command                                 |
| <code>␣ 7</code> | Focus 7th editor group           | command                                 |
| <code>␣ 8</code> | Focus 8th editor group           | command                                 |

# Buffers/Editors...

Key Binding: <code>␣ b</code>

Type: <code>bindings</code>

| Key Binding        | Name                                     | Type     |
| ------------------ | ---------------------------------------- | -------- |
| <code>␣ b b</code> | Show all buffers/editors                 | command  |
| <code>␣ b B</code> | Show all buffers/editors in active group | command  |
| <code>␣ b d</code> | Close active editor                      | command  |
| <code>␣ b H</code> | Move editor into left group              | command  |
| <code>␣ b J</code> | Move editor into below group             | command  |
| <code>␣ b K</code> | Move editor into above group             | command  |
| <code>␣ b L</code> | Move editor into right group             | command  |
| <code>␣ b M</code> | Close other editors                      | command  |
| <code>␣ b n</code> | Next editor                              | command  |
| <code>␣ b p</code> | Previous editor                          | command  |
| <code>␣ b N</code> | New untitled editor                      | command  |
| <code>␣ b u</code> | Reopen closed editor                     | command  |
| <code>␣ b P</code> | Paste clipboard to buffer                | commands |
| <code>␣ b Y</code> | Copy buffer to clipboard                 | commands |

# Debug...

Key Binding: <code>␣ d</code>

Type: <code>bindings</code>

| Key Binding        | Name                     | Type    |
| ------------------ | ------------------------ | ------- |
| <code>␣ d d</code> | Start debug              | command |
| <code>␣ d D</code> | Run without debugging    | command |
| <code>␣ d S</code> | Stop debug               | command |
| <code>␣ d c</code> | Continue debug           | command |
| <code>␣ d p</code> | Pause debug              | command |
| <code>␣ d R</code> | Restart debug            | command |
| <code>␣ d i</code> | Step into                | command |
| <code>␣ d s</code> | Step over                | command |
| <code>␣ d o</code> | Step out                 | command |
| <code>␣ d b</code> | Toggle breakpoint        | command |
| <code>␣ d B</code> | Toggle inline breakpoint | command |
| <code>␣ d j</code> | Jump to cursor           | command |
| <code>␣ d v</code> | REPL                     | command |
| <code>␣ d w</code> | Focus on watch window    | command |
| <code>␣ d W</code> | Add to watch             | command |

# Errors...

Key Binding: <code>␣ e</code>

Type: <code>bindings</code>

| Key Binding        | Name            | Type                          |
| ------------------ | --------------- | ----------------------------- |
| <code>␣ e .</code> | Error transient | [transient](#Error-transient) |
| <code>␣ e l</code> | List errors     | command                       |
| <code>␣ e N</code> | Previous error  | command                       |
| <code>␣ e n</code> | Next error      | command                       |
| <code>␣ e p</code> | Previous error  | command                       |

# File...

Key Binding: <code>␣ f</code>

Type: <code>bindings</code>

| Key Binding        | Name                                   | Type                     |
| ------------------ | -------------------------------------- | ------------------------ |
| <code>␣ f f</code> | Open file/folder                       | command                  |
| <code>␣ f n</code> | New Untitled                           | command                  |
| <code>␣ f w</code> | Open active in new window              | command                  |
| <code>␣ f s</code> | Save file                              | command                  |
| <code>␣ f S</code> | Save all files                         | command                  |
| <code>␣ f r</code> | Open recent...                         | command                  |
| <code>␣ f R</code> | Rename file                            | commands                 |
| <code>␣ f t</code> | Show tree/explorer view                | command                  |
| <code>␣ f T</code> | Show active file in tree/explorer view | command                  |
| <code>␣ f y</code> | Copy path of active file               | command                  |
| <code>␣ f o</code> | Open with...                           | command                  |
| <code>␣ f l</code> | Change file language                   | command                  |
| <code>␣ f L</code> | Locate file                            | command                  |
| <code>␣ f =</code> | Format file                            | command                  |
| <code>␣ f i</code> | Indentation...                         | [bindings](#Indentation) |

# Git...

Key Binding: <code>␣ g</code>

Type: <code>bindings</code>

| Key Binding        | Name           | Type    |
| ------------------ | -------------- | ------- |
| <code>␣ g b</code> | Blame file     | command |
| <code>␣ g s</code> | Status         | command |
| <code>␣ g m</code> | Magit dispatch | command |
| <code>␣ g S</code> | Stage file     | command |
| <code>␣ g U</code> | Unstage file   | command |

# Insert...

Key Binding: <code>␣ i</code>

Type: <code>bindings</code>

| Key Binding        | Name              | Type    |
| ------------------ | ----------------- | ------- |
| <code>␣ i j</code> | Insert line below | command |
| <code>␣ i k</code> | Insert line above | command |
| <code>␣ i s</code> | Insert snippet    | command |

# Jump/Join/Split...

Key Binding: <code>␣ j</code>

Type: <code>bindings</code>

| Key Binding        | Name                        | Type    |
| ------------------ | --------------------------- | ------- |
| <code>␣ j =</code> | Format file                 | command |
| <code>␣ j i</code> | Jump to symbol in editor    | command |
| <code>␣ j I</code> | Jump to symbol in workspace | command |
| <code>␣ j j</code> | Jump to character           | command |
| <code>␣ j l</code> | Jump to line                | command |
| <code>␣ j n</code> | Split new line              | command |
| <code>␣ j w</code> | Jump to word                | command |

# Project...

Key Binding: <code>␣ p</code>

Type: <code>bindings</code>

| Key Binding        | Name                            | Type    |
| ------------------ | ------------------------------- | ------- |
| <code>␣ p `</code> | Switch active project window... | command |
| <code>␣ p f</code> | Find file in project...         | command |
| <code>␣ p p</code> | Switch project...               | command |
| <code>␣ p t</code> | Show tree/explorer view         | command |

# Quit..

Key Binding: <code>␣ q</code>

Type: <code>bindings</code>

| Key Binding        | Name                      | Type     |
| ------------------ | ------------------------- | -------- |
| <code>␣ q q</code> | Close window              | command  |
| <code>␣ q Q</code> | Quit application          | command  |
| <code>␣ q r</code> | Reload window             | command  |
| <code>␣ q s</code> | Save all and close window | commands |

# Search/Symbol...

Key Binding: <code>␣ s</code>

Type: <code>bindings</code>

| Key Binding        | Name                                          | Type                           |
| ------------------ | --------------------------------------------- | ------------------------------ |
| <code>␣ s c</code> | Clear highlight                               | command                        |
| <code>␣ s e</code> | Edit symbol                                   | command                        |
| <code>␣ s h</code> | Highlight symbol                              | [transient](#Highlight-symbol) |
| <code>␣ s j</code> | Jump to symbol in file                        | command                        |
| <code>␣ s J</code> | Jump to symbol in workspace                   | command                        |
| <code>␣ s p</code> | Search in project                             | command                        |
| <code>␣ s P</code> | Search in project with selection              | commands                       |
| <code>␣ s r</code> | Search all references                         | command                        |
| <code>␣ s R</code> | Search all references in side bar             | command                        |
| <code>␣ s s</code> | Fuzzy search in current editor                | command                        |
| <code>␣ s S</code> | Fuzzy search with selection in current editor | commands                       |

# Show...

Key Binding: <code>␣ S</code>

Type: <code>bindings</code>

| Key Binding        | Name                 | Type    |
| ------------------ | -------------------- | ------- |
| <code>␣ S e</code> | Show explorer        | command |
| <code>␣ S s</code> | Show search          | command |
| <code>␣ S g</code> | Show source control  | command |
| <code>␣ S t</code> | Show test            | command |
| <code>␣ S r</code> | Show remote explorer | command |
| <code>␣ S x</code> | Show extensions      | command |
| <code>␣ S p</code> | Show problem         | command |
| <code>␣ S o</code> | Show output          | command |
| <code>␣ S d</code> | Show debug console   | command |

# Toggles...

Key Binding: <code>␣ t</code>

Type: <code>bindings</code>

| Key Binding        | Name                                  | Type    |
| ------------------ | ------------------------------------- | ------- |
| <code>␣ t c</code> | Toggle find case sensitive            | command |
| <code>␣ t w</code> | Toggle ignore trim whitespace in diff | command |
| <code>␣ t W</code> | Toggle word wrap                      | command |

# UI toggles...

Key Binding: <code>␣ T</code>

Type: <code>bindings</code>

| Key Binding        | Name                                | Type    |
| ------------------ | ----------------------------------- | ------- |
| <code>␣ T b</code> | Toggle side bar visibility          | command |
| <code>␣ T j</code> | Toggle panel visibility             | command |
| <code>␣ T F</code> | Toggle full screen                  | command |
| <code>␣ T s</code> | Select theme                        | command |
| <code>␣ T m</code> | Toggle maximized panel              | command |
| <code>␣ T t</code> | Toggle tool/activity bar visibility | command |
| <code>␣ T T</code> | Toggle tab visibility               | command |
| <code>␣ T z</code> | Toggle zen mode                     | command |

# Window...

Key Binding: <code>␣ w</code>

Type: <code>bindings</code>

| Key Binding        | Name                                    | Type    |
| ------------------ | --------------------------------------- | ------- |
| <code>␣ w w</code> | Focus next editor group                 | command |
| <code>␣ w W</code> | Focus previous editor group             | command |
| <code>␣ w -</code> | Split editor below                      | command |
| <code>␣ w /</code> | Split editor right                      | command |
| <code>␣ w s</code> | Split editor below                      | command |
| <code>␣ w v</code> | Split editor right                      | command |
| <code>␣ w h</code> | Move editor left                        | command |
| <code>␣ w j</code> | Move editor down                        | command |
| <code>␣ w k</code> | Move editor up                          | command |
| <code>␣ w l</code> | Move editor right                       | command |
| <code>␣ w H</code> | Move editor group left                  | command |
| <code>␣ w J</code> | Move editor group down                  | command |
| <code>␣ w K</code> | Move editor group up                    | command |
| <code>␣ w L</code> | Move editor group right                 | command |
| <code>␣ w t</code> | Toggle editor group sizes               | command |
| <code>␣ w m</code> | Maximize editor group                   | command |
| <code>␣ w M</code> | Maximize editor group and hide side bar | command |
| <code>␣ w =</code> | Reset editor group sizes                | command |
| <code>␣ w z</code> | Combine all editors                     | command |
| <code>␣ w d</code> | Close editor group                      | command |
| <code>␣ w x</code> | Close all editor groups                 | command |

# Text...

Key Binding: <code>␣ x</code>

Type: <code>bindings</code>

| Key Binding        | Name                | Type                          |
| ------------------ | ------------------- | ----------------------------- |
| <code>␣ x i</code> | Organize Imports    | command                       |
| <code>␣ x r</code> | Rename symbol       | command                       |
| <code>␣ x R</code> | Refactor            | command                       |
| <code>␣ x .</code> | Quick fix           | command                       |
| <code>␣ x a</code> | Find all references | command                       |
| <code>␣ x u</code> | To lower case       | command                       |
| <code>␣ x U</code> | To upper case       | command                       |
| <code>␣ x J</code> | Move lines down     | [transient](#Move-lines-down) |
| <code>␣ x K</code> | Move lines up       | [transient](#Move-lines-up)   |
| <code>␣ x l</code> | Lines...            | [bindings](#Lines)            |
| <code>␣ x d</code> | Delete...           | [bindings](#Delete)           |
| <code>␣ x m</code> | Merge conflict...   | [bindings](#Merge-conflict)   |

# Zoom/Fold...

Key Binding: <code>␣ z</code>

Type: <code>bindings</code>

| Key Binding        | Name             | Type                        |
| ------------------ | ---------------- | --------------------------- |
| <code>␣ z .</code> | Fold...          | [bindings](#Fold)           |
| <code>␣ z f</code> | Frame...         | [transient](#Frame)         |
| <code>␣ z x</code> | Font...          | [transient](#Font)          |
| <code>␣ z i</code> | Image preview... | [transient](#Image-preview) |

# Smart select/expand region

Key Binding: <code>␣ v</code>

Type: <code>transient</code>

| Key Binding    | Name             | Type    |
| -------------- | ---------------- | ------- |
| <code>v</code> | Grow selection   | command |
| <code>V</code> | Shrink selection | command |

# Error transient

Key Binding: <code>␣ e .</code>

Type: <code>transient</code>

| Key Binding    | Name           | Type    |
| -------------- | -------------- | ------- |
| <code>N</code> | Previous error | command |
| <code>n</code> | Next error     | command |
| <code>p</code> | Previous error | command |

# Indentation...

Key Binding: <code>␣ f i</code>

Type: <code>bindings</code>

| Key Binding          | Name                          | Type    |
| -------------------- | ----------------------------- | ------- |
| <code>␣ f i i</code> | Change indentation            | command |
| <code>␣ f i d</code> | Detect indentation            | command |
| <code>␣ f i r</code> | Reindent                      | command |
| <code>␣ f i R</code> | Reindent selected             | command |
| <code>␣ f i t</code> | Convert indentation to tabs   | command |
| <code>␣ f i s</code> | Convert indentation to spaces | command |

# Highlight symbol

Key Binding: <code>␣ s h</code>

Type: <code>transient</code>

| Key Binding    | Name                             | Type     |
| -------------- | -------------------------------- | -------- |
| <code>p</code> | Previous occurrence              | command  |
| <code>N</code> | Previous occurrence              | command  |
| <code>n</code> | Next occurrence                  | command  |
| <code>/</code> | Search in project with selection | commands |

# Move lines down

Key Binding: <code>␣ x J</code>

Type: <code>transient</code>

| Key Binding    | Name            | Type    |
| -------------- | --------------- | ------- |
| <code>J</code> | Move lines down | command |
| <code>K</code> | Move lines up   | command |

# Move lines up

Key Binding: <code>␣ x K</code>

Type: <code>transient</code>

| Key Binding    | Name            | Type    |
| -------------- | --------------- | ------- |
| <code>J</code> | Move lines down | command |
| <code>K</code> | Move lines up   | command |

# Lines...

Key Binding: <code>␣ x l</code>

Type: <code>bindings</code>

| Key Binding          | Name                           | Type    |
| -------------------- | ------------------------------ | ------- |
| <code>␣ x l s</code> | Sort lines in ascending order  | command |
| <code>␣ x l S</code> | Sort lines in descending order | command |
| <code>␣ x l d</code> | Duplicate lines down           | command |
| <code>␣ x l D</code> | Duplicate lines up             | command |

# Delete...

Key Binding: <code>␣ x d</code>

Type: <code>bindings</code>

| Key Binding          | Name                       | Type    |
| -------------------- | -------------------------- | ------- |
| <code>␣ x d w</code> | Delete trailing whitespace | command |

# Merge conflict...

Key Binding: <code>␣ x m</code>

Type: <code>bindings</code>

| Key Binding          | Name                     | Type    |
| -------------------- | ------------------------ | ------- |
| <code>␣ x m b</code> | Accept both              | command |
| <code>␣ x m c</code> | Accept current           | command |
| <code>␣ x m i</code> | Accept incoming          | command |
| <code>␣ x m B</code> | Accept all both          | command |
| <code>␣ x m C</code> | Accept all current       | command |
| <code>␣ x m I</code> | Accept all incoming      | command |
| <code>␣ x m s</code> | Accept selection         | command |
| <code>␣ x m k</code> | Compare current conflict | command |
| <code>␣ x m n</code> | Next Conflict            | command |
| <code>␣ x m N</code> | Previous Conflict        | command |

# Fold...

Key Binding: <code>␣ z .</code>

Type: <code>bindings</code>

| Key Binding          | Name                      | Type    |
| -------------------- | ------------------------- | ------- |
| <code>␣ z . a</code> | Toggle: around a point    | command |
| <code>␣ z . c</code> | Close: at a point         | command |
| <code>␣ z . b</code> | Close: all block comments | command |
| <code>␣ z . g</code> | Close: all regions        | command |
| <code>␣ z . m</code> | Close: all                | command |
| <code>␣ z . o</code> | Open: at a point          | command |
| <code>␣ z . O</code> | Open: recursively         | command |
| <code>␣ z . G</code> | Open: all regions         | command |
| <code>␣ z . r</code> | Open: all                 | command |

# Frame...

Key Binding: <code>␣ z f</code>

Type: <code>transient</code>

| Key Binding    | Name       | Type    |
| -------------- | ---------- | ------- |
| <code>=</code> | Zoom in    | command |
| <code>+</code> | Zoom in    | command |
| <code>-</code> | Zoom out   | command |
| <code>0</code> | Reset zoom | command |

# Font...

Key Binding: <code>␣ z x</code>

Type: <code>transient</code>

| Key Binding    | Name       | Type    |
| -------------- | ---------- | ------- |
| <code>=</code> | Zoom in    | command |
| <code>+</code> | Zoom in    | command |
| <code>-</code> | Zoom out   | command |
| <code>0</code> | Reset zoom | command |

# Image preview...

Key Binding: <code>␣ z i</code>

Type: <code>transient</code>

| Key Binding    | Name     | Type    |
| -------------- | -------- | ------- |
| <code>=</code> | Zoom in  | command |
| <code>+</code> | Zoom in  | command |
| <code>-</code> | Zoom out | command |

