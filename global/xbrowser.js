var xPage = require("./xpage.js");

function createBrowserWindow(xbrowser) {
    var BrowserWindow = require("browser-window");
    var window = new BrowserWindow({
        "width": 900, "height": 630,
        "min-width": 300, "min-height": 210,
        "center": true,
        "frame": false, "transparent": false,
        "node-integration": true
    });
    window.loadUrl("file://" + __dirname + "/../views/browser.html");
    window.on("closed", function () {
        window = null;
    });
    window.on("maximize", function () {
        window.webContents.executeJavaScript("setWindowBorder(false);");
    });
    window.on("unmaximize", function () {
        window.webContents.executeJavaScript("setWindowBorder(true);");
    });
    window.xhost = xbrowser;
    return window;
}

function xBrowser() {
    this.window = createBrowserWindow(this);
    this.pages = new Array();
}

xBrowser.prototype = {
    constructor: xBrowser,
    newPage: function () {
        var new_id = this.getNewPageId();
        var page = new xPage(this, new_id);
        this.pages.push(page);
        return page;
    },
    openPage: function (id) {
        var page = this.getPageById(id);
        if (page != null) {
            page.open();
        }
    },
    closePage: function (id) {
        for (var i in this.pages) {
            var page = this.pages[i];
            if (page.id == id) {
                page.close();
                page = null;
                this.pages.splice(i, 1);
            }
        }
    },
    getNewPageId: function () {
        this.pages.sort(function (a, b) {
            return a.id - b.id;
        });
        for (var i in this.pages) {
            var page = this.pages[i];
            if (page != null && page.id != i)
                return i;
        }
        return this.pages.length;
    },
    getPageById: function (id) {
        for (var i in this.pages) {
            var page = this.pages[i];
            if (page != null && page.id == id)
                return page;
        }
        return null;
    }
}

module.exports = xBrowser;