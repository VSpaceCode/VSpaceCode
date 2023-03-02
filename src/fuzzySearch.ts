import * as vscode from 'vscode';

class Item implements vscode.QuickPickItem {
    description = ''
    detail = ''

    constructor(public label: string, public line: number) {
        this.label = label.trim();
    }
}

// Changes "5" to "0005", ie, ensures that |str| has |length| characters in it.
function pad(str: string, length: number) {
    return '0'.repeat(length - str.length) + str
}

let valueFromPreviousInvocation = '';
let lastSelected: Item | undefined = undefined;

export function showFuzzySearchWithCurrentSelection() {
    showFuzzySearch(true)
}

export function showFuzzySearch(useCurrentSelection: boolean = false) {
    // Build the entries we will show the user. One entry for each non-empty line,
    // prefixed with the line number. We prefix with the line number so lines stay
    // in the correct order and so duplicate lines do not get merged together.
    let lines: string[] =
        vscode.window.activeTextEditor!.document.getText().split(/\r?\n/);
    let maxNumberLength = lines.length.toString().length;
    let quickPickEntries: Item[] = [];
    for (let i = 0; i < lines.length; ++i) {
        if (lines[i]) {
            quickPickEntries.push(
                new Item(`${pad((i + 1).toString(), maxNumberLength)}: ${lines[i]}`, i));
        }
    }

    // Setup basic quick pick.
    let pick = vscode.window.createQuickPick<Item>();
    pick.items = quickPickEntries;
    pick.canSelectMany = false;


    // Try to preselect the previously selected item.
    if (lastSelected) {
        // Update `lastSelected` reference to point to the current entry in `items`.
        lastSelected = quickPickEntries.find(
            t => t.line == lastSelected!.line || t.label == lastSelected!.label);
    }
    if (lastSelected) pick.activeItems = [lastSelected];
    // Save the item the user selected so it can be pre-selected next time fuzzy
    // search is invoked.
    pick.onDidAccept(() => {
        lastSelected = pick.selectedItems[0];
        pick.hide();
    });


    // Show the currently selected item in the editor.
    pick.onDidChangeActive(items => {
        if (!items.length) return;

        let p = new vscode.Position(items[0].line, 0);
        vscode.window.activeTextEditor!.revealRange(
            new vscode.Range(p, p), vscode.TextEditorRevealType.InCenter);
        vscode.window.activeTextEditor!.selection = new vscode.Selection(p, p);
    });


    if (useCurrentSelection) {
        pick.value = vscode.window.activeTextEditor!.document.getText(
            vscode.window.activeTextEditor!.selection);
    } else {
        // Show the previous search string. When the user types a character, the
        // preview string will replaced with the typed character.
        pick.value = valueFromPreviousInvocation;
        let previewValue = valueFromPreviousInvocation;
        let hasPreviewValue = previewValue.length > 0;
        pick.onDidChangeValue(value => {
            if (hasPreviewValue) {
                hasPreviewValue = false;

                // Try to figure out what text the user typed. Assumes that the user
                // typed at most one character.
                for (let i = 0; i < value.length; ++i) {
                    if (previewValue.charAt(i) != value.charAt(i)) {
                        pick.value = value.charAt(i);
                        break;
                    }
                }
            }
        });
        // Save the search string so we can show it next time fuzzy search is
        // invoked.
        pick.onDidChangeValue(value => valueFromPreviousInvocation = value);
    }


    // If fuzzy-search was cancelled navigate to the previous location.
    let startingSelection = vscode.window.activeTextEditor!.selection;
    pick.onDidHide(() => {
        if (pick.selectedItems.length == 0) {
            vscode.window.activeTextEditor!.revealRange(
                new vscode.Range(startingSelection.start, startingSelection.end),
                vscode.TextEditorRevealType.InCenter);
            vscode.window.activeTextEditor!.selection = startingSelection;
        }
    });


    pick.show();
}