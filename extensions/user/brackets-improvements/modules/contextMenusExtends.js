/*   Add lock working set and more options in context menu   */

/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets, window */

define(function (require, exports, module) {
    "use strict";
    
    // Brackets Modules Vars
    var ProjectManager      = brackets.getModule("project/ProjectManager"),
        PreferencesManager  = brackets.getModule("preferences/PreferencesManager"),
        DocumentManager     = brackets.getModule("document/DocumentManager"),
        CommandManager      = brackets.getModule("command/CommandManager"),
        Menus               = brackets.getModule("command/Menus");
    
    // Vars and Conts
    var preferences         = PreferencesManager.getExtensionPrefs("ai.brackets-cusomizations"),
        lockList            = [],
        // Menus
        editorMenu          = Menus.getContextMenu("editor-context-menu"),
        projectMenu         = Menus.getContextMenu("project-context-menu"),
        workingMenu         = Menus.getContextMenu("working-set-context-menu"),
        workingSettingsMenu = Menus.getContextMenu("working-set-settings-context-menu"),
        // Extension IDs
        LOCK_WORKING_SET_ID = "ai.customizations.project.lock-working-set",
        SET_PROJECT_ID      = "ai.customizations.project.set-project",
        // Other IDs
        CUT_ID              = "edit.cut",
        COPY_ID             = "edit.copy",
        PASTE_ID            = "edit.paste",
        INDENT_ID           = "edit.indent",
        UNINDENT_ID         = "edit.unindent",
        CLOSE_ID            = "file.close",
        CLOSE_ALL_ID        = "file.close_all",
        OPEN_FILE_ID        = "file.open",
        SAVE_ID             = "file.save",
        NEW_FILE_ID         = "file.newDoc",
        SAVE_ALL_ID         = "file.saveAll",
        OPEN_FOLDER_ID      = "file.openFolder",
        NEW_PROJECT_ID      = "file.newProject",
        REOPEN_ID           = "alexisfasquel.reopener.reopen";
    
    // set project to selected folder
    function _setProject() {
        var selectedItem    = ProjectManager.getSelectedItem();
        
        if (selectedItem.isDirectory) {
            ProjectManager.openProject(selectedItem.fullPath);
        } else {
            console.log("Can't set files as project.");
            ProjectManager.openProject(selectedItem.fullPath);
        }
    }
    
    /** Working Set Lock **/
    // add working set list after project open
    function _onWorkingSetRemove() {
        var workingSet = DocumentManager.getWorkingSet();
        $(ProjectManager).on("projectOpen.lock", function () {
            DocumentManager.addListToWorkingSet(workingSet);
            $(ProjectManager).off("projectOpen.lock");
        });
    }
    
    // lock working set and add listeners for project change
    function _toggleWorkingSetLock() {
        var lock            = CommandManager.get(LOCK_WORKING_SET_ID);
        
        if (!lock.getChecked()) {
            lock.setChecked(true);
            $(ProjectManager).on("beforeProjectClose.lock", function () {
                _onWorkingSetRemove();
            });
        } else {
            lock.setChecked(false);
            $(ProjectManager).off("beforeProjectClose.lock");
        }
        
        preferences.set("workingSetLocked", lock.getChecked());
        preferences.save();
    }
    /** Working Set Lock END **/
    
    function init() {
        // register (set as project) and (lock working set)
        preferences.definePreference("workingSetLocked", "boolean", false);
        CommandManager.register("Set as Project", SET_PROJECT_ID, _setProject);
        CommandManager.register("Lock Working Files", LOCK_WORKING_SET_ID, _toggleWorkingSetLock);
        
        // change names of existing commands
        CommandManager.get(NEW_FILE_ID).setName("New File");
        CommandManager.get(OPEN_FILE_ID).setName("Open File…");
        
        // add menu items in editor menu
        editorMenu.addMenuDivider(Menus.LAST);
        editorMenu.addMenuItem(CUT_ID, undefined, Menus.LAST);
        editorMenu.addMenuItem(COPY_ID, undefined, Menus.LAST);
        editorMenu.addMenuItem(PASTE_ID, undefined, Menus.LAST);
        editorMenu.addMenuDivider(Menus.LAST);
        editorMenu.addMenuItem(INDENT_ID, undefined, Menus.LAST);
        editorMenu.addMenuItem(UNINDENT_ID, undefined, Menus.LAST);
        
        // add menu items in project menu
        projectMenu.addMenuDivider(Menus.LAST);
        projectMenu.addMenuItem(NEW_PROJECT_ID, undefined, Menus.LAST);
        projectMenu.addMenuItem(OPEN_FOLDER_ID, undefined, Menus.LAST);
        projectMenu.addMenuItem(SET_PROJECT_ID, undefined, Menus.LAST);
        
        // add menu item (lock working set) into working set settings menu
        workingSettingsMenu.addMenuDivider();
        workingSettingsMenu.addMenuItem(LOCK_WORKING_SET_ID);
        
        // add menu items in working set menu
        workingMenu.addMenuItem(CLOSE_ALL_ID, undefined, Menus.AFTER, CLOSE_ID);
        workingMenu.addMenuItem(REOPEN_ID, undefined, Menus.LAST);
        workingMenu.addMenuDivider(Menus.LAST);
        workingMenu.addMenuItem(OPEN_FILE_ID, undefined, Menus.LAST);
        workingMenu.addMenuItem(NEW_FILE_ID, undefined, Menus.LAST);
        workingMenu.addMenuItem(SAVE_ALL_ID, undefined, Menus.AFTER, SAVE_ID);
        
        // lock working set if locked
        if (preferences.get("workingSetLocked")) {
            _toggleWorkingSetLock();
        }
    }
    
    exports.init = init;
});