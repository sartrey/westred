//using system
var App = require("app");

//using field
var xBrowser = require("./xbrowser.js");

//require('crash-reporter').start();

var window1 = null;

App.on("window-all-closed", function () {
    if (App.listeners("window-all-closed").length == 1)
        App.quit();
});

App.on("ready", function () {
    window1 = new xBrowser();
});