/*   use CM's smart indent to reindent selected lines, supports multi-selections   */

/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets */

define(function (require, exports, module) {
	"use strict";

	// Brackets Modules Vars
	var CommandManager      = brackets.getModule("command/CommandManager"),
		EditorManager       = brackets.getModule("editor/EditorManager"),
		Menus               = brackets.getModule("command/Menus");

	// Vars and Consts
	var menu                = Menus.getMenu("edit-menu"),
		contextMenu			= Menus.getContextMenu("editor-context-menu"),
		// Extension IDs
		REINDENT_ID         = "ai.customizations.edit.reindent",
		// Other IDs
		UNINDENT_ID         = "edit.unindent";

	// Re-indent each selected line of the editor using CM's smart indentation.
	function reindent() {
		var editor = EditorManager.getCurrentFullEditor(),
			selections = editor.getSelections(),
			_cm = editor._codeMirror;

		_cm.operation(function () {
			selections.forEach(function (selection) {
				var lineStart = selection.start.line;
				var lineEnd = selection.end.line;

				for (lineStart;lineStart<=lineEnd;lineStart++) {
					_cm.indentLine(lineStart);
				}
			});
		});
	}

	function init() {
		// register command (reindent)
		CommandManager.register("Reindent", REINDENT_ID, reindent);
		
		// add menu item (reindent) in edit menu
		menu.addMenuItem(REINDENT_ID, "Ctrl-Shift-[", Menus.AFTER, UNINDENT_ID);
		contextMenu.addMenuItem(REINDENT_ID, undefined, Menus.AFTER, UNINDENT_ID);
	}
	
	exports.init = init;
});