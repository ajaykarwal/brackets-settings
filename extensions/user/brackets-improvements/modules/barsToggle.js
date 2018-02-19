/*   Show and hide toolbar (icon's bar) and status bar   */

/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets, window */

define(function (require, exports, module) {
    "use strict";
    
    // Brackets Modules Vars
    var Menus               = brackets.getModule("command/Menus"),
        StatusBar           = brackets.getModule("widgets/StatusBar"),
        CommandManager      = brackets.getModule("command/CommandManager"),
        PreferencesManager  = brackets.getModule("preferences/PreferencesManager");
        
    // Vars and Consts
    var preferences         = PreferencesManager.getExtensionPrefs("ai.brackets-cusomizations"),
        menu                = Menus.getMenu("view-menu"),
        // Selectors
        $toolbar            = $("#main-toolbar"),
        $content            = $(".main-view .content"),
        // Extension IDs
        TOGGLE_TOOLBAR_ID   = "ai.customizations.toolbar.toggle",
        TOGGLE_STATUSBAR_ID = "ai.customizations.statusbar.toggle";
    
    // hide toolbar
    function hideToolbar() {
        $toolbar.css("display", "none");
        $content.css("right", "0");
    }
    
    // show toolbar
    function showToolbar() {
        $toolbar.show();
        $content.css("right", "30px");
    }
    
    // toggle (show | hide) toolbar
    function toggleToolbar() {
        var toggle = CommandManager.get(TOGGLE_TOOLBAR_ID);
        var enabled = preferences.get("toolbarEnabled");
        
        if (enabled) {
            hideToolbar();
            toggle.setName("Show Toolbar");
        } else {
            showToolbar();
            toggle.setName("Hide Toolbar");
        }
        
        preferences.set('toolbarEnabled', !enabled);
        preferences.save();
    }
    
    // hide statusbar
    function hideStatusbar() {
        StatusBar.hide();
    }
    
    // show statusbar
    function showStatusbar() {
        StatusBar.show();
    }
    
    // toggle (show | hide) statusbar
    function toggleStatusbar() {
        var toggle = CommandManager.get(TOGGLE_STATUSBAR_ID);
        var enabled = preferences.get("statusbarEnabled");
        
        if (enabled) {
            hideStatusbar();
            toggle.setName("Show Statusbar");
        } else {
            showStatusbar();
            toggle.setName("Hide Statusbar");
        }
        
        preferences.set('statusbarEnabled', !enabled);
        preferences.save();
    }
    
    function init() {
        // register toolbar toggle and add menu item
        preferences.definePreference("toolbarEnabled", "boolean", true);
        CommandManager.register("Hide Toolbar", TOGGLE_TOOLBAR_ID, toggleToolbar);
        menu.addMenuItem(TOGGLE_TOOLBAR_ID, "ALT-SHIFT-H", Menus.LAST_IN_SECTION, Menus.MenuSection.VIEW_HIDESHOW_COMMANDS);
        
        // register statusbar toggle and add menu item
        preferences.definePreference("statusbarEnabled", "boolean", true);
        CommandManager.register("Hide Statusbar", TOGGLE_STATUSBAR_ID, toggleStatusbar);
        menu.addMenuItem(TOGGLE_STATUSBAR_ID, "CTRL-ALT-Shift-H", Menus.LAST_IN_SECTION, Menus.MenuSection.VIEW_HIDESHOW_COMMANDS);
        
        // check if toolbar is enabled
        if (!preferences.get("toolbarEnabled")) {
            hideToolbar();
            CommandManager.get(TOGGLE_TOOLBAR_ID).setName("Show Toolbar");
        }
        
        // check if statusbar is enabled
        if (!preferences.get("statusbarEnabled")) {
            hideStatusbar();
            CommandManager.get(TOGGLE_STATUSBAR_ID).setName("Show Statusbar");
        }
    }
    
    exports.init = init;
});