/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets, window */

define(function (require, exports, module) {
    "use strict";
    
    // Brackets Modules Vars
    var AppInit             = brackets.getModule("utils/AppInit"),
        ExtensionUtils      = brackets.getModule('utils/ExtensionUtils');
        
    // Requires and Imports
    var 
        uiFixes             = require("modules/uiFixes"),
        reindent            = require("modules/reindent"),
        caseConverter       = require("modules/caseConverter"),
        barsToggle          = require("modules/barsToggle"),
        contextMenusExtends = require("modules/contextMenusExtends");
    
    // Initialize All
    function init() {
        contextMenusExtends.init();
        caseConverter.init();
        barsToggle.init();
        reindent.init();
        uiFixes.init();
    }
    
    AppInit.appReady(function () {
        // initialize all
        init();
        
        // load extension style sheet
        ExtensionUtils.loadStyleSheet(module, "styles/style.css");
    });
});