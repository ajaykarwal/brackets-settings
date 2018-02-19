/*   Navigate through files using shortcuts Alt - 1/2/3/../9   */

/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets, window */

define(function (require, exports, module) {
    "use strict";
    
    // Brackets Modules Vars
    var DocumentManager     = brackets.getModule("document/DocumentManager"),
		KeyBindingManager	= brackets.getModule("command/KeyBindingManager"),
        CommandManager      = brackets.getModule("command/CommandManager");
    
    // Vars and Consts
        // Extension IDs
	var FILE_NAVIGATION_ID	= "ai.customizations.workingFiles.navigateTo.";
	
	// jump to file using the given index
	function jumpToFile(index) {
		
		
		alert (path);
		
		
	}
	
	// add key bindings (Alt - 1/2/3/../9) to working files
	function addShortcuts() {
		var files = DocumentManager.getWorkingSet();
		
		console.log(files);
		
		for (var index in files) {
			if (index < 10) {
				++index;
				CommandManager.register("Switch To File " + index, FILE_NAVIGATION_ID + index, function () {
//					console.log("started...");
//					var workingSet = DocumentManager.getWorkingSet(),
//						path 	   = workingSet[0];
//										
//					console.log(path.fullPath);

					DocumentManager.getOpenDocumentForPath().done(function (doc) {
						DocumentManager.setCurrentDocument(doc);
					});
					
					console.log("finished...");
				});
				
				KeyBindingManager.addBinding(FILE_NAVIGATION_ID + index, "Alt-" + index);
			}
		}
	}
	
    function init() {
        addShortcuts();
    }
    
    exports.init = init;
});

		