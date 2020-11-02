window.$ = window.jQuery = require("./../3rdparty/jquery/jquery-2.1.4.min.js");

﻿var Remote = require("remote");
var xUrl = Remote.require("./../global/xurl.js");
var xBrowser = Remote.require("./../global/xbrowser.js");
var xTabox = Remote.require("./../global/xtabox.js");

var this_window = Remote.getCurrentWindow();
var this_browser = this_window.xhost;

function setWindowBorder(enable) {
    if (enable) {
        $(".window").addClass("window-border");
    } else {
        $(".window").removeClass("window-border");
    }
}

function bindTabView(id) {
    var view_id = "tab" + id + "-view";
    var head_id = "tab" + id + "-head";
    var view = $("#" + view_id)[0];
    view.addEventListener("new-window", function (e) {
        var page = this_browser.newPage();
        page.loadUrl(e.url);
    });
    view.addEventListener("close", function () {
        this_browser.closePage(id);
    });
    view.addEventListener("dom-ready", function () {
        $("#" + head_id).children("p").text(view.getTitle());
        $("#txt-url").val(view.getUrl());
    });
}

function newPage(id) {
    var view_id = "tab" + id + "-view";
    var head_id = "tab" + id + "-head";
    var view_html =
        "<webview id=\"" + view_id +
        "\" class=\"active\"></webview>";
    var view_dom = $(view_html);
    var view_core = view_dom[0];
    $("#view").append(view_dom);
    bindTabView(id);

    var head_html =
        "<div id=\"" + head_id +
        "\" class=\"tab tab-bar active\"><p></p></div>";
    var head_dom = $(head_html);
    head_dom.click(function () {
        this_browser.openPage(id);
    });
    $("#top-tab").append(head_dom);

    var close_html = "<a class=\"close\"></a>";
    var close_dom = $(close_html);
    head_dom.append(close_dom);
    close_dom.click(function () {
        this_browser.closePage(id);
    });
}

function openPage(id) {
    $("webview").removeClass("active");
    $(".tab-bar").removeClass("active");

    var view_id = "tab" + id + "-view";
    var head_id = "tab" + id + "-head";
    if ($("#" + view_id).size() == 0 &&
        $("#" + head_id).size() == 0) {
        newPage(id);
    } else {
        $("#" + view_id).addClass("active");
        $("#" + head_id).addClass("active");
        var view_core = $("webview.active")[0];
        $("#txt-url").val(view_core.getUrl());
    }
}

function closePage(id) {
    var view_id = "tab" + id + "-view";
    var head_id = "tab" + id + "-head";
    var current_view = $("#" + view_id);
    var current_head = $("#" + head_id);
    var next_head = current_head.next();
    var prev_head = current_head.prev();
    current_view.remove();
    current_head.remove();
    if (next_head.size() != 0) {
        var id = parseInt(next_head[0].id.substr(3));
        openPage(id);
    } else if (prev_head.size() != 0) {
        var id = parseInt(prev_head[0].id.substr(3));
        openPage(id);
    } else {
        var page = this_browser.newPage();
        page.loadUrl("start.html");
    }
}

function loadUrl(url, id) {
    if (id != undefined) {
        $("#tab" + id + "-view")[0].src = url;
    } else {
        $("webview.active")[0].src = url;
    }
}

$(document).ready(function () {
    $("#txt-url").keydown(function (event) {
        if (event.which == 13) {
            var xurl = new xUrl($("#txt-url").val());
            xurl.fix();
            loadUrl(xurl.url);
        }
    });
    $("#txt-url").focus(function () {
        $("#txt-url").select();
    });
    $("#btn-refresh").click(function () {
        var view = $("webview.active")[0];
        view.reload();
    });
    $("#btn-refresh-window").click(function () {
        window.location.reload(true);
    });
    $("#btn-min").click(function() {
        this_window.minimize();
    });
    $("#btn-max").click(function () {
        if (this_window.isMaximized()) {
            this_window.unmaximize();
        } else {
            this_window.maximize();
        }
    });
    $("#btn-close").click(function() {
        this_window.close();
    });
    $("#btn-new").click(function() {
        var page = this_browser.newPage();
        page.loadUrl("start.html");
    });
    $("#btn-tabs").click(function() {
        var this_tabox = new xTabox();
    });
    $("#btn-back").click(function () {
        $("webview.active")[0].goBack();
        //todo: press for a while to popup menu
    });
    $("#btn-forward").click(function () {
        $("webview.active")[0].goForward();
    });
    var page = this_browser.newPage();
    page.loadUrl("start.html");
});
