==========
VSpaceCode
==========

.. image:: resources/logo.png
   :align: center

» *Spacemacs-like keybindings for Visual Studio Code*

-----

.. contents:: **Table of Contents**

-----

Presentation
============

This project tries to mimic Spacemacs_ key bindings in VSCode_.

Heavy Spacemacs users have trained their muscle memory around the **mnemonic**
key bindings that Spacemacs provides, and usually they start missing them when
using other text editors. The goal of this project is to provide a configuration
that maps Spacemacs key bindings to VSCode functionalities. This will allow
users to continue using their muscle memory and and the mnemonics they know in
VSCode.

It is not possible to replicate the full Spacemacs experience within VScode, but
it is at least possible to map some key bindings to functions offering the same
features as Spacemacs does. For instance, :kbd:`SPC g s` in Spacemacs opens git
version control through Magit, so it make sense to map it to open the "Source
Control" view in VScode. A list of the currently remapped key bindings is
available in the `Keybindings`_ section.

The `Installation`_ can currently not be automated as it requires manual
interventions, and updates have also to be resolved manually. This project is
young and the direction it should take is not really clear yet. This is
discussed in `this issue`_. Feel free to participate in this discussion if you
have insightful ideas.

:Author: Fabien Dubosson
:License: MIT (See LICENSE_)

.. _Spacemacs: https://github.com/syl20bnr/spacemacs
.. _VSCode: https://github.com/Microsoft/vscode
.. _`this issue`: https://github.com/StreakyCobra/VSpaceCode/issues/1
.. _LICENSE: LICENSE


Installation
============

First you will have to install VSCodeVim_ in order to make VSCode_
vim-compliant. To do so, press :kbd:`Ctrl + P`, enter ``ext install vscodevim``
and then press :kbd:`Return`. You can then press the ``Install`` button, wait
for it to finish, and then ``Reload`` the editor by clicking the associated
button.

To set up VSpaceCode, simply merge the content of the `settings.json`_ file with
your own settings. To do so, press :kbd:`Ctrl + Shift + P`, enter ``user
settings`` and then press :kbd:`Return`:

- If you don't have any VSCodeVim configuration yet, you can simply copy/paste
  the content of `settings.json`_ (without the top-level brackets) somewhere
  into your ``settings.json``.

- If you already have some VSCodeVim configurations, you will have to manually
  copy/paste the parts of `settings.json`_ into the corresponding
  ``vim.normalModeKeyBindings`` section of your ``settings.json``.

In any case it is recommended to keep the configurations you take from here
grouped in your ``settings.json`` so you can easily update them by just
copy/pasting the relevant parts.

To enable :kbd:`Ctrl + h`, :kbd:`Ctrl + j`,  :kbd:`Ctrl + k`, :kbd:`Ctrl + l`
bindings to navigate in some widgets outside the editor, merge the content of
`keybindings.json`_ into `your`_ ``keybindings.json``.

.. _VSCodeVim: https://github.com/VSCodeVim/Vim
.. _VSpaceCode: https://github.com/StreakyCobra/VSpaceCode
.. _`settings.json`: settings.json
.. _`keybindings.json`: keybindings.json
.. _`your`: https://code.visualstudio.com/docs/getstarted/keybindings


Note for Mac users
------------------

On Mac, you will need to change the setting for ``<leader> f f`` from::

    "command": "workbench.action.files.openFile"

to::

    "command": "workbench.action.files.openFileFolder"


Keybindings
===========

The following keybindings are configured in the editor through VSCodeVim:

===============================  =========================================== =========================
Key bindings                     Description                                 Remark
===============================  =========================================== =========================
:kbd:`leader` :kbd:`space`       Run command
:kbd:`leader` :kbd:`tab`         Next editor
:kbd:`leader` :kbd:`;` :kbd:`;`  Comment line
:kbd:`leader` :kbd:`'`           Toggle terminal                             Open terminal effectively
:kbd:`leader` :kbd:`/`           Find in files
:kbd:`leader` :kbd:`1`           Focus first editor group
:kbd:`leader` :kbd:`2`           Focus second editor group
:kbd:`leader` :kbd:`3`           Focus third editor group
:kbd:`leader` :kbd:`4`           Focus forth editor group
:kbd:`leader` :kbd:`5`           Focus fifth editor group
:kbd:`leader` :kbd:`6`           Focus sixth editor group
:kbd:`leader` :kbd:`7`           Focus seventh editor group
:kbd:`leader` :kbd:`8`           Focus eighth editor group
:kbd:`leader` :kbd:`b` :kbd:`b`  Quick open (show current buffers)
:kbd:`leader` :kbd:`b` :kbd:`d`  Close active editor
:kbd:`leader` :kbd:`b` :kbd:`n`  Next editor
:kbd:`leader` :kbd:`b` :kbd:`p`  Previous editor
:kbd:`leader` :kbd:`b` :kbd:`s`  Scratch buffer
:kbd:`leader` :kbd:`e` :kbd:`l`  List errors / problems
:kbd:`leader` :kbd:`e` :kbd:`n`  Next error
:kbd:`leader` :kbd:`e` :kbd:`p`  Previous error
:kbd:`leader` :kbd:`f` :kbd:`e`  Show your settings file                     Shorter binding (by 'd')
:kbd:`leader` :kbd:`f` :kbd:`f`  Open file
:kbd:`leader` :kbd:`f` :kbd:`r`  Open recent (show recent files)
:kbd:`leader` :kbd:`f` :kbd:`s`  Save file
:kbd:`leader` :kbd:`f` :kbd:`t`  Show explorer view
:kbd:`leader` :kbd:`f` :kbd:`y`  Copy current file path                      Doesn't show the path
:kbd:`leader` :kbd:`g` :kbd:`b`  Git checkout
:kbd:`leader` :kbd:`g` :kbd:`c`  Git commit
:kbd:`leader` :kbd:`g` :kbd:`d`  Git delete branch
:kbd:`leader` :kbd:`g` :kbd:`f`  Git fetch
:kbd:`leader` :kbd:`g` :kbd:`i`  Git init
:kbd:`leader` :kbd:`g` :kbd:`m`  Git merge
:kbd:`leader` :kbd:`g` :kbd:`p`  Git publish
:kbd:`leader` :kbd:`g` :kbd:`s`  Show source control view
:kbd:`leader` :kbd:`g` :kbd:`S`  Git stage
:kbd:`leader` :kbd:`g` :kbd:`U`  Git unstage
:kbd:`leader` :kbd:`h` :kbd:`d`  Help describe keybindings
:kbd:`leader` :kbd:`i` :kbd:`s`  Insert snippet
:kbd:`leader` :kbd:`j` :kbd:`=`  Format document                             Better than Spacemacs
:kbd:`leader` :kbd:`j` :kbd:`j`  Easymotion to character
:kbd:`leader` :kbd:`j` :kbd:`l`  Easymotion to line
:kbd:`leader` :kbd:`j` :kbd:`w`  Easymotion to word
:kbd:`leader` :kbd:`l` :kbd:`d`  Close folder
:kbd:`leader` :kbd:`p` :kbd:`f`  Quick open (allow to open any project file)
:kbd:`leader` :kbd:`p` :kbd:`l`  Open folder project
:kbd:`leader` :kbd:`p` :kbd:`p`  Open recent (show recent folders)
:kbd:`leader` :kbd:`p` :kbd:`t`  Show explorer view
:kbd:`leader` :kbd:`q` :kbd:`f`  Close window
:kbd:`leader` :kbd:`q` :kbd:`q`  Close window
:kbd:`leader` :kbd:`q` :kbd:`r`  Reload window
:kbd:`leader` :kbd:`r` :kbd:`s`  Find in files
:kbd:`leader` :kbd:`s` :kbd:`e`  Rename symbol                               Works only on symbols
:kbd:`leader` :kbd:`s` :kbd:`j`  Go to symbol in file
:kbd:`leader` :kbd:`s` :kbd:`p`  Find in files
:kbd:`leader` :kbd:`s` :kbd:`P`  Find in files with selection
:kbd:`leader` :kbd:`T` :kbd:`F`  Toggle fullscreen
:kbd:`leader` :kbd:`T` :kbd:`m`  Toggle menu bar
:kbd:`leader` :kbd:`T` :kbd:`s`  Select color theme
:kbd:`leader` :kbd:`T` :kbd:`t`  Toggle activity bar
:kbd:`leader` :kbd:`v`           Expand region                               No transient state
:kbd:`leader` :kbd:`V`           Shrink region                               No transient state
:kbd:`leader` :kbd:`w` :kbd:`-`  Split window below
:kbd:`leader` :kbd:`w` :kbd:`/`  Split window to right
:kbd:`leader` :kbd:`w` :kbd:`d`  Close editors in group
:kbd:`leader` :kbd:`w` :kbd:`h`  Previous editor group
:kbd:`leader` :kbd:`w` :kbd:`H`  Move editor group to left
:kbd:`leader` :kbd:`w` :kbd:`j`  Move window focus down
:kbd:`leader` :kbd:`w` :kbd:`k`  Move window focus up
:kbd:`leader` :kbd:`w` :kbd:`l`  Next editor group
:kbd:`leader` :kbd:`w` :kbd:`L`  Move editor group to right
:kbd:`leader` :kbd:`w` :kbd:`m`  Maximize
:kbd:`leader` :kbd:`w` :kbd:`v`  Split window
:kbd:`leader` :kbd:`w` :kbd:`w`  Next editor group
:kbd:`leader` :kbd:`w` :kbd:`W`  Previous editor group
:kbd:`leader` :kbd:`x` :kbd:`s`  Sort lines
:kbd:`leader` :kbd:`x` :kbd:`w`  Trim whitespace
===============================  =========================================== =========================

The following keybindings are configured globally in VSCode in some modes:

===============================  =========================================== =========================
Key bindings                     Description                                 Remark
===============================  =========================================== =========================
:kbd:`Ctrl+h`                    Left                                        In: ListFocus
:kbd:`Ctrl+j`                    Down                                        In: QuickOpen, SuggestWidget, ListFocus
:kbd:`Ctrl+k`                    Up                                          In: QuickOpen, SuggestWidget, ListFocus
:kbd:`Ctrl+l`                    Right                                       In: ListFocus
===============================  =========================================== =========================

Contributing
============

Contributions are welcome. Spacemacs has more than one thousand key bindings and
it is very probably that the contributors of this project are not using them
all. Feel free to open pull requests if you have some interesting mappings that
do not exist yet. Please try to make the following changes in a **single
commit**:

- Keep bindings sorted in `settings.json`_
- Add the corresponding line in the `Keybindings`_ section of this README
- Include your name in the `Contributors`_ section of this README

If you are writing and testing some keybindings, and find the changes required
to update ``settings.json`` too large, you can use ``npm run dev`` to compile a
``./scripts/settings.json`` file which is a copy of ``./settings.json`` but with
a shorter syntax. Note: ``npm install`` should be run the first time to install
the dependencies.

Contributors
============

Thanks to the following people for sharing their configurations and contributing
to this project:

- `adrianstaniec <https://github.com/adrianstaniec>`_
- `CodeFalling <https://github.com/CodeFalling>`_
- `danielpa9708 <https://github.com/danielpa9708>`_
- `fabrik42 <https://github.com/fabrik42>`_
- `jamrizzi <https://github.com/jamrizzi>`_
- `JJWJ <https://github.com/JJWJ>`_
- `joefiorini <https://github.com/joefiorini>`_
- `JuanCaicedo <https://github.com/JuanCaicedo>`_
- `li-xinyang <https://github.com/li-xinyang>`_
- `Raphael-Duchaine <https://github.com/Raphael-Duchaine>`_
- `thanhvg <https://github.com/thanhvg>`_

Related projects
================

- `IntelliSpace <https://github.com/MarcoIeni/intelli-space>`_ - Spacemacs' like key bindings for IntelliJ platform.
- `Spaceclipse <https://github.com/MarcoIeni/spaceclipse>`_ - Spacemacs' like key bindings for Eclipse.
