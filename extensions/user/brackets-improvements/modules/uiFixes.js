/*   Fix border between linter and language indicator   */

/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets, window */

define(function (require, exports, module) {
    "use strict";
    
    // Brackets Modules Vars
    var PreferencesManager  = brackets.getModule("preferences/PreferencesManager");
        
    // Vars and Consts
    var preferences         = PreferencesManager.getExtensionPrefs("ai.brackets-cusomizations"),
        // Selectors
        $linter             = $("#status-inspection"),
        $language           = $("#status-language");
        
    
    function init() {
        // fix borders between language and linter indicators to hide linter without ui issues
        $language.css("border-right", "none");
        $linter.css("border-left", "1px solid rgba(0,0,0,0.1)");
        
        // hide linter if disabled in preferences file
        if (!preferences.get("linting.enabled")) {
            $linter.hide();
        }
    }
    
    exports.init = init;
});