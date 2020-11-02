function xUrl(url) {
    this.url = url;
}

xUrl.prototype.fix = function () {
    var match = this.url.match(/^((http|ftp|https):\/\/){1}(\S+)$/);
    if (match == null) {
        this.url = "http://" + this.url;
    }
};

module.exports = xUrl;