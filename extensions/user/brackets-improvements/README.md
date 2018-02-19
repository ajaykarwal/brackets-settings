# ***Brackets Improvements***

Simple extension that improves and extends brackets. adds the following :-

####Case Converter
Converts case of selected text into uppercase, lowercase and titlecase, or swap cases, supports multi-selections.

####Reindent
Organizes file by reindenting selected lines using Code Mirror's smart indent, supports multi-selections.

####Context Menus Extends
Adds lock working set to working set settings context menu, and extends project, working set, and editor context menu by adding :

- Editor Menu
	1. Cut, Copy and Paste
	2. Indent, Unindent
- Working Set Menu
	1. Save All
	2. Close All
	3. Reopen Closed File
	4. Open File...
	5. New File
- Project Menu
	1. New Project...
	2. Open Folder...
	3. Set as Project

***REQUIRES***: (New Project) extension for menu item `New Project...` and (Reopener) extension for menu item `Reopen Closed File` inorder to function.

####Bars Toggle
Shows and hides toolbar (icon's bar) and statusbar.

####UI Fixes
Fixes border between linter and language indicator (linter left border is actually hidden and instead language indicator have a right border...just fixed that) and if linter is disabled, hides the linter.

####Style
Removes the triangle shown on selected item in sidebar, if you don't want this just clear the file `style.css` but ***DO NOT DELETE IT***.

##How to Disable One of The Improvements

1. Open Extensions Folder (`Help -> Show Extensions Folder`).
2. Navigate into `user\ai.brackets-improvements`.
3. Edit `main.js` file.
4. comment the line (add `//` at the beginning of the line or go to the line and press `Ctrl + /`) containing the improvement you want to disable, under `Requires and Imports` comment.
5. comment the line containing the initialization of the improvement you want to disable, under `initialize all` comment.

## Report Issues and Feature Requests

Issues and feature requests can be reported at [https://github.com/aymanizz/Brackets-Improvements/issues](https://github.com/aymanizz/Brackets-Improvements/issues)

## License

MIT License. see [LICENSE](https://github.com/aymanizz/Brackets-Improvements/LICENSE) for more details.