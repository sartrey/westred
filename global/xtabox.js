var xBrowser = require("./xbrowser.js");

function createBrowserWindow(xtabox) {
    var BrowserWindow = require("browser-window");
    var window = new BrowserWindow({
        "width": 1000, "height": 720,
        "center": true,
        "frame": false, "transparent": true,
        "always-on-top": true,
        "skip-taskbar": true,
        "node-integration": true
    });
    window.loadUrl("file://" + __dirname + "/../views/tabox.html");
    window.on("closed", function () {
        //check if allowed
        window = null;
    });
    window.xhost = xtabox;
    return window;
}

function xTabox() {
    this.window = createBrowserWindow(this);
    this.pages = new Array();
}

xTabox.prototype = {
    constructor: xTabox
}

module.exports = xTabox;