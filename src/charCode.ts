/**
 * An inlined enum containing useful character codes (to be used with String.charCodeAt).
 * Please leave the const keyword such that it gets inlined when compiled to JavaScript!
 * Modified from https://github.com/microsoft/vscode/blob/f74e473238aca7b79c08be761d99a0232838ca4c/src/vs/base/common/charCode.ts
 */
export const enum CharCode {
    /**
	 * The `/` character.
	 */
    Slash = 47,
	/**
	 * The `:` character.
	 */
    Colon = 58,

    A = 65,
    Z = 90,
    a = 97,
    z = 122,

    /**
     * The `\` character.
     */
    Backslash = 92,
}