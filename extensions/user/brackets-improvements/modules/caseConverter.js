/*   Convert case of selected text into uppercase, lowercase and titlecase, or swap cases, supports multi-selections   */

/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets */

define(function (require, exports, module) {
	"use strict";

	// Brackets Modules Vars
	var CommandManager      = brackets.getModule("command/CommandManager"),
		DocumentManager   	= brackets.getModule('document/DocumentManager'),
		EditorManager       = brackets.getModule("editor/EditorManager"),
		Menus               = brackets.getModule("command/Menus");

	// Vars and Consts
	var menu            	= Menus.getMenu("edit-menu"),
		contextMenu         = Menus.getContextMenu("editor-context-menu"),
		// Extension IDs
		UPPERCASE_ID        = "ai.customizations.edit.convertCase.uppercase",
		LOWERCASE_ID        = "ai.customizations.edit.convertCase.lowercase",
		TITLECASE_ID        = "ai.customizations.edit.convertCase.titlecase",
		SWAPCASE_ID        	= "ai.customizations.edit.convertCase.swapcase";

	// convert to either lower or upper case
	function convertTo(uppercase) {
		if (hasSelection()) {
			var currentEditor	= EditorManager.getCurrentFullEditor(),
				selectedText    = currentEditor.getSelectedText(true).split("\n"),
				selections      = currentEditor.getSelections(),
				doc             = DocumentManager.getCurrentDocument(),
				txt             = "";

			selections.forEach(function (selection, id) {
				if (uppercase) {
					txt = selectedText[id].toUpperCase();
				} else {
					txt = selectedText[id].toLowerCase();
				}
				
				doc.replaceRange(txt, selection.start, selection.end);
			});

			currentEditor.setSelections(selections);
		}
	}

	// upper and lower case functions
	function uppercase() { convertTo(true); }
	function lowercase() { convertTo(false); }

	// conver to titlecase
	function titlecase() {
		if (hasSelection()) {
			var currentEditor   = EditorManager.getCurrentFullEditor(),
				selectedText    = currentEditor.getSelectedText(true).toLowerCase().split("\n"),
				selections     	= currentEditor.getSelections(),
				doc             = DocumentManager.getCurrentDocument();
				
			selections.forEach(function (selection, id) {
				var txtArray	= selectedText[id].split(/ /),
					txt         = "";
				
				txtArray.forEach(function (element, id) {
					var firstChar = element.charAt(0).toUpperCase();
					
					if (id !== 0 && id !== txtArray.length) {
						txt += " ";
					}
					
					element = element.replace(/./, firstChar);
					txt += element;
				});
				
				doc.replaceRange(txt, selection.start, selection.end);
			});
			
			currentEditor.setSelections(selections);
		}
	}

	// swap cases from upper to lower and vice-versa
	function swapcase() {
		if (hasSelection()) {
			var currentEditor   = EditorManager.getCurrentFullEditor(),
				selectedText    = currentEditor.getSelectedText(true).split("\n"),
				selections     	= currentEditor.getSelections(),
				doc             = DocumentManager.getCurrentDocument();
			
			selections.forEach(function (selection, id) {
				var charPos		= 0,
					txt			= "";
				
				for (charPos = 0; charPos < selectedText[id].length; charPos++) {
					if (selectedText[id].charAt(charPos) === selectedText[id].charAt(charPos).toLowerCase()) {
						txt += selectedText[id].charAt(charPos).toUpperCase();
					} else {
						txt += selectedText[id].charAt(charPos).toLowerCase();
					}
				}
				
				doc.replaceRange(txt, selection.start, selection.end);
			});
			
			currentEditor.setSelections(selections);
		}
	}

	function hasSelection() {
		if (EditorManager.getCurrentFullEditor().hasSelection()) {
			return true;
		} else {
			showErrorMassage();
			return false;
		}
	}

	function showErrorMassage() {
		EditorManager.getCurrentFullEditor().displayErrorMessageAtCursor("Case Converter: select text for conversion");
	}

	function init() {
		// register commands
		CommandManager.register("Upper Case", UPPERCASE_ID, uppercase);
		CommandManager.register("Lower Case", LOWERCASE_ID, lowercase);
		CommandManager.register("Title Case", TITLECASE_ID, titlecase);
		CommandManager.register("Swap Case", SWAPCASE_ID, swapcase);
		
		// add menu items to edit menu and editor menu
		menu.addMenuDivider();
		menu.addMenuItem(UPPERCASE_ID, "Ctrl-Shift-U"); //{key:"Ctrl-Alt-Up", displayKey:"Ctrl-Alt-↑"}
		menu.addMenuItem(LOWERCASE_ID, "Ctrl-Shift-L"); //{key:"Ctrl-Alt-Down", displayKey:"Ctrl-Alt-↓"}
		menu.addMenuItem(TITLECASE_ID, undefined);
		menu.addMenuItem(SWAPCASE_ID, undefined);
		contextMenu.addMenuDivider();
		contextMenu.addMenuItem(UPPERCASE_ID, undefined); //{key:"Ctrl-Alt-Up", displayKey:"Ctrl-Alt-↑"}
		contextMenu.addMenuItem(LOWERCASE_ID, undefined); //{key:"Ctrl-Alt-Down", displayKey:"Ctrl-Alt-↓"}
		contextMenu.addMenuItem(TITLECASE_ID, undefined);
		contextMenu.addMenuItem(SWAPCASE_ID, undefined);
	}
	
	exports.init = init;
});