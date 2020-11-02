var xBrowser = require("./xbrowser.js");

function xPage(xbrowser, id) {
    this.xbrowser = xbrowser;
    this.id = id;
    this.open();
}

xPage.prototype = {
    constructor: xPage,
    open: function () {
        this.xbrowser.window.webContents
            .executeJavaScript("openPage(" + this.id + ");");
    },
    close: function () {
        this.xbrowser.window.webContents
            .executeJavaScript("closePage(" + this.id + ");");
    },
    loadUrl: function (url) {
        this.xbrowser.window.webContents
            .executeJavaScript("loadUrl(\"" + url + "\"," + this.id + ")");
    }
}

module.exports = xPage;
