
    (jQuery),
    (function (e) {
        "function" == typeof define && define.amd ? define(["jquery"], e) : e("object" == typeof exports ? require("jquery") : window.jQuery || window.Zepto);
    })(function (c) {
        var p,
            o,
            u,
            s,
            f,
            t,
            l = "Close",
            d = "BeforeClose",
            h = "MarkupParse",
            m = "Open",
            g = ".mfp",
            v = "mfp-ready",
            i = "mfp-removing",
            r = "mfp-prevent-close",
            e = function () { },
            a = !!window.jQuery,
            y = c(window),
            b = function (e, t) {
                p.ev.on("mfp" + e + g, t);
            },
            w = function (e, t, i, o) {
                var s = document.createElement("div");
                return (s.className = "mfp-" + e), i && (s.innerHTML = i), o ? t && t.appendChild(s) : ((s = c(s)), t && s.appendTo(t)), s;
            },
            k = function (e, t) {
                p.ev.triggerHandler("mfp" + e, t), p.st.callbacks && ((e = e.charAt(0).toLowerCase() + e.slice(1)), p.st.callbacks[e] && p.st.callbacks[e].apply(p, c.isArray(t) ? t : [t]));
            },
            x = function (e) {
                return (e === t && p.currTemplate.closeBtn) || ((p.currTemplate.closeBtn = c(p.st.closeMarkup.replace("%title%", p.st.tClose))), (t = e)), p.currTemplate.closeBtn;
            },
            n = function () {
                c.magnificPopup.instance || ((p = new e()).init(), (c.magnificPopup.instance = p));
            };
        (e.prototype = {
            constructor: e,
            init: function () {
                var e = navigator.appVersion;
                (p.isLowIE = p.isIE8 = document.all && !document.addEventListener),
                    (p.isAndroid = /android/gi.test(e)),
                    (p.isIOS = /iphone|ipad|ipod/gi.test(e)),
                    (p.supportsTransition = (function () {
                        var e = document.createElement("p").style,
                            t = ["ms", "O", "Moz", "Webkit"];
                        if (void 0 !== e.transition) return !0;
                        for (; t.length;) if (t.pop() + "Transition" in e) return !0;
                        return !1;
                    })()),
                    (p.probablyMobile = p.isAndroid || p.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent)),
                    (u = c(document)),
                    (p.popupsCache = {});
            },
            open: function (e) {
                var t;
                if (!1 === e.isObj) {
                    (p.items = e.items.toArray()), (p.index = 0);
                    var i,
                        o = e.items;
                    for (t = 0; t < o.length; t++)
                        if (((i = o[t]).parsed && (i = i.el[0]), i === e.el[0])) {
                            p.index = t;
                            break;
                        }
                } else (p.items = c.isArray(e.items) ? e.items : [e.items]), (p.index = e.index || 0);
                if (!p.isOpen) {
                    (p.types = []),
                        (f = ""),
                        e.mainEl && e.mainEl.length ? (p.ev = e.mainEl.eq(0)) : (p.ev = u),
                        e.key ? (p.popupsCache[e.key] || (p.popupsCache[e.key] = {}), (p.currTemplate = p.popupsCache[e.key])) : (p.currTemplate = {}),
                        (p.st = c.extend(!0, {}, c.magnificPopup.defaults, e)),
                        (p.fixedContentPos = "auto" === p.st.fixedContentPos ? !p.probablyMobile : p.st.fixedContentPos),
                        p.st.modal && ((p.st.closeOnContentClick = !1), (p.st.closeOnBgClick = !1), (p.st.showCloseBtn = !1), (p.st.enableEscapeKey = !1)),
                        p.bgOverlay ||
                        ((p.bgOverlay = w("bg").on("click" + g, function () {
                            p.close();
                        })),
                            (p.wrap = w("wrap")
                                .attr("tabindex", -1)
                                .on("click" + g, function (e) {
                                    p._checkIfClose(e.target) && p.close();
                                })),
                            (p.container = w("container", p.wrap))),
                        (p.contentContainer = w("content")),
                        p.st.preloader && (p.preloader = w("preloader", p.container, p.st.tLoading));
                    var s = c.magnificPopup.modules;
                    for (t = 0; t < s.length; t++) {
                        var n = s[t];
                        (n = n.charAt(0).toUpperCase() + n.slice(1)), p["init" + n].call(p);
                    }
                    k("BeforeOpen"),
                        p.st.showCloseBtn &&
                        (p.st.closeBtnInside
                            ? (b(h, function (e, t, i, o) {
                                i.close_replaceWith = x(o.type);
                            }),
                                (f += " mfp-close-btn-in"))
                            : p.wrap.append(x())),
                        p.st.alignTop && (f += " mfp-align-top"),
                        p.fixedContentPos ? p.wrap.css({ overflow: p.st.overflowY, overflowX: "hidden", overflowY: p.st.overflowY }) : p.wrap.css({ top: y.scrollTop(), position: "absolute" }),
                        (!1 === p.st.fixedBgPos || ("auto" === p.st.fixedBgPos && !p.fixedContentPos)) && p.bgOverlay.css({ height: u.height(), position: "absolute" }),
                        p.st.enableEscapeKey &&
                        u.on("keyup" + g, function (e) {
                            27 === e.keyCode && p.close();
                        }),
                        y.on("resize" + g, function () {
                            p.updateSize();
                        }),
                        p.st.closeOnContentClick || (f += " mfp-auto-cursor"),
                        f && p.wrap.addClass(f);
                    var r = (p.wH = y.height()),
                        a = {};
                    if (p.fixedContentPos && p._hasScrollBar(r)) {
                        var l = p._getScrollbarSize();
                        l && (a.marginRight = l);
                    }
                    p.fixedContentPos && (p.isIE7 ? c("body, html").css("overflow", "hidden") : (a.overflow = "hidden"));
                    var d = p.st.mainClass;
                    return (
                        p.isIE7 && (d += " mfp-ie7"),
                        d && p._addClassToMFP(d),
                        p.updateItemHTML(),
                        k("BuildControls"),
                        c("html").css(a),
                        p.bgOverlay.add(p.wrap).prependTo(p.st.prependTo || c(document.body)),
                        (p._lastFocusedEl = document.activeElement),
                        setTimeout(function () {
                            p.content ? (p._addClassToMFP(v), p._setFocus()) : p.bgOverlay.addClass(v), u.on("focusin" + g, p._onFocusIn);
                        }, 16),
                        (p.isOpen = !0),
                        p.updateSize(r),
                        k(m),
                        e
                    );
                }
                p.updateItemHTML();
            },
            close: function () {
                p.isOpen &&
                    (k(d),
                        (p.isOpen = !1),
                        p.st.removalDelay && !p.isLowIE && p.supportsTransition
                            ? (p._addClassToMFP(i),
                                setTimeout(function () {
                                    p._close();
                                }, p.st.removalDelay))
                            : p._close());
            },
            _close: function () {
                k(l);
                var e = i + " " + v + " ";
                if ((p.bgOverlay.detach(), p.wrap.detach(), p.container.empty(), p.st.mainClass && (e += p.st.mainClass + " "), p._removeClassFromMFP(e), p.fixedContentPos)) {
                    var t = { marginRight: "" };
                    p.isIE7 ? c("body, html").css("overflow", "") : (t.overflow = ""), c("html").css(t);
                }
                u.off("keyup.mfp focusin" + g),
                    p.ev.off(g),
                    p.wrap.attr("class", "mfp-wrap").removeAttr("style"),
                    p.bgOverlay.attr("class", "mfp-bg"),
                    p.container.attr("class", "mfp-container"),
                    !p.st.showCloseBtn || (p.st.closeBtnInside && !0 !== p.currTemplate[p.currItem.type]) || (p.currTemplate.closeBtn && p.currTemplate.closeBtn.detach()),
                    p.st.autoFocusLast && p._lastFocusedEl && c(p._lastFocusedEl).focus(),
                    (p.currItem = null),
                    (p.content = null),
                    (p.currTemplate = null),
                    (p.prevHeight = 0),
                    k("AfterClose");
            },
            updateSize: function (e) {
                if (p.isIOS) {
                    var t = document.documentElement.clientWidth / window.innerWidth,
                        i = window.innerHeight * t;
                    p.wrap.css("height", i), (p.wH = i);
                } else p.wH = e || y.height();
                p.fixedContentPos || p.wrap.css("height", p.wH), k("Resize");
            },
            updateItemHTML: function () {
                var e = p.items[p.index];
                p.contentContainer.detach(), p.content && p.content.detach(), e.parsed || (e = p.parseEl(p.index));
                var t = e.type;
                if ((k("BeforeChange", [p.currItem ? p.currItem.type : "", t]), (p.currItem = e), !p.currTemplate[t])) {
                    var i = !!p.st[t] && p.st[t].markup;
                    k("FirstMarkupParse", i), (p.currTemplate[t] = !i || c(i));
                }
                s && s !== e.type && p.container.removeClass("mfp-" + s + "-holder");
                var o = p["get" + t.charAt(0).toUpperCase() + t.slice(1)](e, p.currTemplate[t]);
                p.appendContent(o, t), (e.preloaded = !0), k("Change", e), (s = e.type), p.container.prepend(p.contentContainer), k("AfterChange");
            },
            appendContent: function (e, t) {
                (p.content = e) ? (p.st.showCloseBtn && p.st.closeBtnInside && !0 === p.currTemplate[t] ? p.content.find(".mfp-close").length || p.content.append(x()) : (p.content = e)) : (p.content = ""),
                    k("BeforeAppend"),
                    p.container.addClass("mfp-" + t + "-holder"),
                    p.contentContainer.append(p.content);
            },
            parseEl: function (e) {
                var t,
                    i = p.items[e];
                if ((i.tagName ? (i = { el: c(i) }) : ((t = i.type), (i = { data: i, src: i.src })), i.el)) {
                    for (var o = p.types, s = 0; s < o.length; s++)
                        if (i.el.hasClass("mfp-" + o[s])) {
                            t = o[s];
                            break;
                        }
                    (i.src = i.el.attr("data-mfp-src")), i.src || (i.src = i.el.attr("href"));
                }
                return (i.type = t || p.st.type || "inline"), (i.index = e), (i.parsed = !0), (p.items[e] = i), k("ElementParse", i), p.items[e];
            },
            addGroup: function (t, i) {
                var e = function (e) {
                    (e.mfpEl = this), p._openClick(e, t, i);
                };
                i || (i = {});
                var o = "click.magnificPopup";
                (i.mainEl = t), i.items ? ((i.isObj = !0), t.off(o).on(o, e)) : ((i.isObj = !1), i.delegate ? t.off(o).on(o, i.delegate, e) : (i.items = t).off(o).on(o, e));
            },
            _openClick: function (e, t, i) {
                if ((void 0 !== i.midClick ? i.midClick : c.magnificPopup.defaults.midClick) || !(2 === e.which || e.ctrlKey || e.metaKey || e.altKey || e.shiftKey)) {
                    var o = void 0 !== i.disableOn ? i.disableOn : c.magnificPopup.defaults.disableOn;
                    if (o)
                        if (c.isFunction(o)) {
                            if (!o.call(p)) return !0;
                        } else if (y.width() < o) return !0;
                    e.type && (e.preventDefault(), p.isOpen && e.stopPropagation()), (i.el = c(e.mfpEl)), i.delegate && (i.items = t.find(i.delegate)), p.open(i);
                }
            },
            updateStatus: function (e, t) {
                if (p.preloader) {
                    o !== e && p.container.removeClass("mfp-s-" + o), t || "loading" !== e || (t = p.st.tLoading);
                    var i = { status: e, text: t };
                    k("UpdateStatus", i),
                        (e = i.status),
                        (t = i.text),
                        p.preloader.html(t),
                        p.preloader.find("a").on("click", function (e) {
                            e.stopImmediatePropagation();
                        }),
                        p.container.addClass("mfp-s-" + e),
                        (o = e);
                }
            },
            _checkIfClose: function (e) {
                if (!c(e).hasClass(r)) {
                    var t = p.st.closeOnContentClick,
                        i = p.st.closeOnBgClick;
                    if (t && i) return !0;
                    if (!p.content || c(e).hasClass("mfp-close") || (p.preloader && e === p.preloader[0])) return !0;
                    if (e === p.content[0] || c.contains(p.content[0], e)) {
                        if (t) return !0;
                    } else if (i && c.contains(document, e)) return !0;
                    return !1;
                }
            },
            _addClassToMFP: function (e) {
                p.bgOverlay.addClass(e), p.wrap.addClass(e);
            },
            _removeClassFromMFP: function (e) {
                this.bgOverlay.removeClass(e), p.wrap.removeClass(e);
            },
            _hasScrollBar: function (e) {
                return (p.isIE7 ? u.height() : document.body.scrollHeight) > (e || y.height());
            },
            _setFocus: function () {
                (p.st.focus ? p.content.find(p.st.focus).eq(0) : p.wrap).focus();
            },
            _onFocusIn: function (e) {
                return e.target === p.wrap[0] || c.contains(p.wrap[0], e.target) ? void 0 : (p._setFocus(), !1);
            },
            _parseMarkup: function (s, e, t) {
                var n;
                t.data && (e = c.extend(t.data, e)),
                    k(h, [s, e, t]),
                    c.each(e, function (e, t) {
                        if (void 0 === t || !1 === t) return !0;
                        if (1 < (n = e.split("_")).length) {
                            var i = s.find(g + "-" + n[0]);
                            if (0 < i.length) {
                                var o = n[1];
                                "replaceWith" === o ? i[0] !== t[0] && i.replaceWith(t) : "img" === o ? (i.is("img") ? i.attr("src", t) : i.replaceWith(c("<img>").attr("src", t).attr("class", i.attr("class")))) : i.attr(n[1], t);
                            }
                        } else s.find(g + "-" + e).html(t);
                    });
            },
            _getScrollbarSize: function () {
                if (void 0 === p.scrollbarSize) {
                    var e = document.createElement("div");
                    (e.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;"), document.body.appendChild(e), (p.scrollbarSize = e.offsetWidth - e.clientWidth), document.body.removeChild(e);
                }
                return p.scrollbarSize;
            },
        }),
            (c.magnificPopup = {
                instance: null,
                proto: e.prototype,
                modules: [],
                open: function (e, t) {
                    return n(), ((e = e ? c.extend(!0, {}, e) : {}).isObj = !0), (e.index = t || 0), this.instance.open(e);
                },
                close: function () {
                    return c.magnificPopup.instance && c.magnificPopup.instance.close();
                },
                registerModule: function (e, t) {
                    t.options && (c.magnificPopup.defaults[e] = t.options), c.extend(this.proto, t.proto), this.modules.push(e);
                },
                defaults: {
                    disableOn: 0,
                    key: null,
                    midClick: !1,
                    mainClass: "",
                    preloader: !0,
                    focus: "",
                    closeOnContentClick: !1,
                    closeOnBgClick: !0,
                    closeBtnInside: !0,
                    showCloseBtn: !0,
                    enableEscapeKey: !0,
                    modal: !1,
                    alignTop: !1,
                    removalDelay: 0,
                    prependTo: null,
                    fixedContentPos: "auto",
                    fixedBgPos: "auto",
                    overflowY: "auto",
                    closeMarkup: '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
                    tClose: "Close (Esc)",
                    tLoading: "Loading...",
                    autoFocusLast: !0,
                },
            }),
            (c.fn.magnificPopup = function (e) {
                n();
                var t = c(this);
                if ("string" == typeof e)
                    if ("open" === e) {
                        var i,
                            o = a ? t.data("magnificPopup") : t[0].magnificPopup,
                            s = parseInt(arguments[1], 10) || 0;
                        o.items ? (i = o.items[s]) : ((i = t), o.delegate && (i = i.find(o.delegate)), (i = i.eq(s))), p._openClick({ mfpEl: i }, t, o);
                    } else p.isOpen && p[e].apply(p, Array.prototype.slice.call(arguments, 1));
                else (e = c.extend(!0, {}, e)), a ? t.data("magnificPopup", e) : (t[0].magnificPopup = e), p.addGroup(t, e);
                return t;
            });
        var S,
            C,
            T,
            $ = "inline",
            B = function () {
                T && (C.after(T.addClass(S)).detach(), (T = null));
            };
        c.magnificPopup.registerModule($, {
            options: { hiddenClass: "hide", markup: "", tNotFound: "Content not found" },
            proto: {
                initInline: function () {
                    p.types.push($),
                        b(l + "." + $, function () {
                            B();
                        });
                },
                getInline: function (e, t) {
                    if ((B(), e.src)) {
                        var i = p.st.inline,
                            o = c(e.src);
                        if (o.length) {
                            var s = o[0].parentNode;
                            s && s.tagName && (C || ((S = i.hiddenClass), (C = w(S)), (S = "mfp-" + S)), (T = o.after(C).detach().removeClass(S))), p.updateStatus("ready");
                        } else p.updateStatus("error", i.tNotFound), (o = c("<div>"));
                        return (e.inlineElement = o);
                    }
                    return p.updateStatus("ready"), p._parseMarkup(t, {}, e), t;
                },
            },
        });
        var O,
            I = "ajax",
            P = function () {
                O && c(document.body).removeClass(O);
            },
            A = function () {
                P(), p.req && p.req.abort();
            };
        c.magnificPopup.registerModule(I, {
            options: { settings: null, cursor: "mfp-ajax-cur", tError: '<a href="%url%">The content</a> could not be loaded.' },
            proto: {
                initAjax: function () {
                    p.types.push(I), (O = p.st.ajax.cursor), b(l + "." + I, A), b("BeforeChange." + I, A);
                },
                getAjax: function (s) {
                    O && c(document.body).addClass(O), p.updateStatus("loading");
                    var e = c.extend(
                        {
                            url: s.src,
                            success: function (e, t, i) {
                                var o = { data: e, xhr: i };
                                k("ParseAjax", o),
                                    p.appendContent(c(o.data), I),
                                    (s.finished = !0),
                                    P(),
                                    p._setFocus(),
                                    setTimeout(function () {
                                        p.wrap.addClass(v);
                                    }, 16),
                                    p.updateStatus("ready"),
                                    k("AjaxContentAdded");
                            },
                            error: function () {
                                P(), (s.finished = s.loadError = !0), p.updateStatus("error", p.st.ajax.tError.replace("%url%", s.src));
                            },
                        },
                        p.st.ajax.settings
                    );
                    return (p.req = c.ajax(e)), "";
                },
            },
        });
        var E;
        c.magnificPopup.registerModule("image", {
            options: {
                markup:
                    '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
                cursor: "mfp-zoom-out-cur",
                titleSrc: "title",
                verticalFit: !0,
                tError: '<a href="%url%">The image</a> could not be loaded.',
            },
            proto: {
                initImage: function () {
                    var e = p.st.image,
                        t = ".image";
                    p.types.push("image"),
                        b(m + t, function () {
                            "image" === p.currItem.type && e.cursor && c(document.body).addClass(e.cursor);
                        }),
                        b(l + t, function () {
                            e.cursor && c(document.body).removeClass(e.cursor), y.off("resize" + g);
                        }),
                        b("Resize" + t, p.resizeImage),
                        p.isLowIE && b("AfterChange", p.resizeImage);
                },
                resizeImage: function () {
                    var e = p.currItem;
                    if (e && e.img && p.st.image.verticalFit) {
                        var t = 0;
                        p.isLowIE && (t = parseInt(e.img.css("padding-top"), 10) + parseInt(e.img.css("padding-bottom"), 10)), e.img.css("max-height", p.wH - t);
                    }
                },
                _onImageHasSize: function (e) {
                    e.img && ((e.hasSize = !0), E && clearInterval(E), (e.isCheckingImgSize = !1), k("ImageHasSize", e), e.imgHidden && (p.content && p.content.removeClass("mfp-loading"), (e.imgHidden = !1)));
                },
                findImageSize: function (t) {
                    var i = 0,
                        o = t.img[0],
                        s = function (e) {
                            E && clearInterval(E),
                                (E = setInterval(function () {
                                    return 0 < o.naturalWidth ? void p._onImageHasSize(t) : (200 < i && clearInterval(E), void (3 === ++i ? s(10) : 40 === i ? s(50) : 100 === i && s(500)));
                                }, e));
                        };
                    s(1);
                },
                getImage: function (e, t) {
                    var i = 0,
                        o = function () {
                            e &&
                                (e.img[0].complete
                                    ? (e.img.off(".mfploader"), e === p.currItem && (p._onImageHasSize(e), p.updateStatus("ready")), (e.hasSize = !0), (e.loaded = !0), k("ImageLoadComplete"))
                                    : ++i < 200
                                        ? setTimeout(o, 100)
                                        : s());
                        },
                        s = function () {
                            e && (e.img.off(".mfploader"), e === p.currItem && (p._onImageHasSize(e), p.updateStatus("error", n.tError.replace("%url%", e.src))), (e.hasSize = !0), (e.loaded = !0), (e.loadError = !0));
                        },
                        n = p.st.image,
                        r = t.find(".mfp-img");
                    if (r.length) {
                        var a = document.createElement("img");
                        (a.className = "mfp-img"),
                            e.el && e.el.find("img").length && (a.alt = e.el.find("img").attr("alt")),
                            (e.img = c(a).on("load.mfploader", o).on("error.mfploader", s)),
                            (a.src = e.src),
                            r.is("img") && (e.img = e.img.clone()),
                            0 < (a = e.img[0]).naturalWidth ? (e.hasSize = !0) : a.width || (e.hasSize = !1);
                    }
                    return (
                        p._parseMarkup(
                            t,
                            {
                                title: (function (e) {
                                    if (e.data && void 0 !== e.data.title) return e.data.title;
                                    var t = p.st.image.titleSrc;
                                    if (t) {
                                        if (c.isFunction(t)) return t.call(p, e);
                                        if (e.el) return e.el.attr(t) || "";
                                    }
                                    return "";
                                })(e),
                                img_replaceWith: e.img,
                            },
                            e
                        ),
                        p.resizeImage(),
                        e.hasSize
                            ? (E && clearInterval(E), e.loadError ? (t.addClass("mfp-loading"), p.updateStatus("error", n.tError.replace("%url%", e.src))) : (t.removeClass("mfp-loading"), p.updateStatus("ready")))
                            : (p.updateStatus("loading"), (e.loading = !0), e.hasSize || ((e.imgHidden = !0), t.addClass("mfp-loading"), p.findImageSize(e))),
                        t
                    );
                },
            },
        });
        var M;
        c.magnificPopup.registerModule("zoom", {
            options: {
                enabled: !1,
                easing: "ease-in-out",
                duration: 300,
                opener: function (e) {
                    return e.is("img") ? e : e.find("img");
                },
            },
            proto: {
                initZoom: function () {
                    var e,
                        n = p.st.zoom,
                        t = ".zoom";
                    if (n.enabled && p.supportsTransition) {
                        var i,
                            o,
                            s = n.duration,
                            r = function (e) {
                                var t = e.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
                                    i = "all " + n.duration / 1e3 + "s " + n.easing,
                                    o = { position: "fixed", zIndex: 9999, left: 0, top: 0, "-webkit-backface-visibility": "hidden" },
                                    s = "transition";
                                return (o["-webkit-" + s] = o["-moz-" + s] = o["-o-" + s] = o[s] = i), t.css(o), t;
                            },
                            a = function () {
                                p.content.css("visibility", "visible");
                            };
                        b("BuildControls" + t, function () {
                            if (p._allowZoom()) {
                                if ((clearTimeout(i), p.content.css("visibility", "hidden"), !(e = p._getItemToZoom()))) return void a();
                                (o = r(e)).css(p._getOffset()),
                                    p.wrap.append(o),
                                    (i = setTimeout(function () {
                                        o.css(p._getOffset(!0)),
                                            (i = setTimeout(function () {
                                                a(),
                                                    setTimeout(function () {
                                                        o.remove(), (e = o = null), k("ZoomAnimationEnded");
                                                    }, 16);
                                            }, s));
                                    }, 16));
                            }
                        }),
                            b(d + t, function () {
                                if (p._allowZoom()) {
                                    if ((clearTimeout(i), (p.st.removalDelay = s), !e)) {
                                        if (!(e = p._getItemToZoom())) return;
                                        o = r(e);
                                    }
                                    o.css(p._getOffset(!0)),
                                        p.wrap.append(o),
                                        p.content.css("visibility", "hidden"),
                                        setTimeout(function () {
                                            o.css(p._getOffset());
                                        }, 16);
                                }
                            }),
                            b(l + t, function () {
                                p._allowZoom() && (a(), o && o.remove(), (e = null));
                            });
                    }
                },
                _allowZoom: function () {
                    return "image" === p.currItem.type;
                },
                _getItemToZoom: function () {
                    return !!p.currItem.hasSize && p.currItem.img;
                },
                _getOffset: function (e) {
                    var t,
                        i = (t = e ? p.currItem.img : p.st.zoom.opener(p.currItem.el || p.currItem)).offset(),
                        o = parseInt(t.css("padding-top"), 10),
                        s = parseInt(t.css("padding-bottom"), 10);
                    i.top -= c(window).scrollTop() - o;
                    var n = { width: t.width(), height: (a ? t.innerHeight() : t[0].offsetHeight) - s - o };
                    return void 0 === M && (M = void 0 !== document.createElement("p").style.MozTransform), M ? (n["-moz-transform"] = n.transform = "translate(" + i.left + "px," + i.top + "px)") : ((n.left = i.left), (n.top = i.top)), n;
                },
            },
        });
        var _ = "iframe",
            z = function (e) {
                if (p.currTemplate[_]) {
                    var t = p.currTemplate[_].find("iframe");
                    t.length && (e || (t[0].src = "//about:blank"), p.isIE8 && t.css("display", e ? "block" : "none"));
                }
            };
        c.magnificPopup.registerModule(_, {
            options: {
                markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
                srcAction: "iframe_src",
                patterns: {
                    youtube: { index: "youtube.com", id: "v=", src: "//www.youtube.com/embed/%id%?autoplay=1" },
                    vimeo: { index: "vimeo.com/", id: "/", src: "//player.vimeo.com/video/%id%?autoplay=1" },
                    gmaps: { index: "//maps.google.", src: "%id%&output=embed" },
                },
            },
            proto: {
                initIframe: function () {
                    p.types.push(_),
                        b("BeforeChange", function (e, t, i) {
                            t !== i && (t === _ ? z() : i === _ && z(!0));
                        }),
                        b(l + "." + _, function () {
                            z();
                        });
                },
                getIframe: function (e, t) {
                    var i = e.src,
                        o = p.st.iframe;
                    c.each(o.patterns, function () {
                        return -1 < i.indexOf(this.index) ? (this.id && (i = "string" == typeof this.id ? i.substr(i.lastIndexOf(this.id) + this.id.length, i.length) : this.id.call(this, i)), (i = this.src.replace("%id%", i)), !1) : void 0;
                    });
                    var s = {};
                    return o.srcAction && (s[o.srcAction] = i), p._parseMarkup(t, s, e), p.updateStatus("ready"), t;
                },
            },
        });
        var H = function (e) {
            var t = p.items.length;
            return t - 1 < e ? e - t : e < 0 ? t + e : e;
        },
            D = function (e, t, i) {
                return e.replace(/%curr%/gi, t + 1).replace(/%total%/gi, i);
            };
        c.magnificPopup.registerModule("gallery", {
            options: {
                enabled: !1,
                arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
                preload: [0, 2],
                navigateByImgClick: !0,
                arrows: !0,
                tPrev: "Previous (Left arrow key)",
                tNext: "Next (Right arrow key)",
                tCounter: "%curr% of %total%",
            },
            proto: {
                initGallery: function () {
                    var n = p.st.gallery,
                        e = ".mfp-gallery";
                    return (
                        (p.direction = !0),
                        !(!n || !n.enabled) &&
                        ((f += " mfp-gallery"),
                            b(m + e, function () {
                                n.navigateByImgClick &&
                                    p.wrap.on("click" + e, ".mfp-img", function () {
                                        return 1 < p.items.length ? (p.next(), !1) : void 0;
                                    }),
                                    u.on("keydown" + e, function (e) {
                                        37 === e.keyCode ? p.prev() : 39 === e.keyCode && p.next();
                                    });
                            }),
                            b("UpdateStatus" + e, function (e, t) {
                                t.text && (t.text = D(t.text, p.currItem.index, p.items.length));
                            }),
                            b(h + e, function (e, t, i, o) {
                                var s = p.items.length;
                                i.counter = 1 < s ? D(n.tCounter, o.index, s) : "";
                            }),
                            b("BuildControls" + e, function () {
                                if (1 < p.items.length && n.arrows && !p.arrowLeft) {
                                    var e = n.arrowMarkup,
                                        t = (p.arrowLeft = c(e.replace(/%title%/gi, n.tPrev).replace(/%dir%/gi, "left")).addClass(r)),
                                        i = (p.arrowRight = c(e.replace(/%title%/gi, n.tNext).replace(/%dir%/gi, "right")).addClass(r));
                                    t.click(function () {
                                        p.prev();
                                    }),
                                        i.click(function () {
                                            p.next();
                                        }),
                                        p.container.append(t.add(i));
                                }
                            }),
                            b("Change" + e, function () {
                                p._preloadTimeout && clearTimeout(p._preloadTimeout),
                                    (p._preloadTimeout = setTimeout(function () {
                                        p.preloadNearbyImages(), (p._preloadTimeout = null);
                                    }, 16));
                            }),
                            void b(l + e, function () {
                                u.off(e), p.wrap.off("click" + e), (p.arrowRight = p.arrowLeft = null);
                            }))
                    );
                },
                next: function () {
                    (p.direction = !0), (p.index = H(p.index + 1)), p.updateItemHTML();
                },
                prev: function () {
                    (p.direction = !1), (p.index = H(p.index - 1)), p.updateItemHTML();
                },
                goTo: function (e) {
                    (p.direction = e >= p.index), (p.index = e), p.updateItemHTML();
                },
                preloadNearbyImages: function () {
                    var e,
                        t = p.st.gallery.preload,
                        i = Math.min(t[0], p.items.length),
                        o = Math.min(t[1], p.items.length);
                    for (e = 1; e <= (p.direction ? o : i); e++) p._preloadItem(p.index + e);
                    for (e = 1; e <= (p.direction ? i : o); e++) p._preloadItem(p.index - e);
                },
                _preloadItem: function (e) {
                    if (((e = H(e)), !p.items[e].preloaded)) {
                        var t = p.items[e];
                        t.parsed || (t = p.parseEl(e)),
                            k("LazyLoad", t),
                            "image" === t.type &&
                            (t.img = c('<img class="mfp-img" />')
                                .on("load.mfploader", function () {
                                    t.hasSize = !0;
                                })
                                .on("error.mfploader", function () {
                                    (t.hasSize = !0), (t.loadError = !0), k("LazyLoadError", t);
                                })
                                .attr("src", t.src)),
                            (t.preloaded = !0);
                    }
                },
            },
        });
        var j = "retina";
        c.magnificPopup.registerModule(j, {
            options: {
                replaceSrc: function (e) {
                    return e.src.replace(/\.\w+$/, function (e) {
                        return "@2x" + e;
                    });
                },
                ratio: 1,
            },
            proto: {
                initRetina: function () {
                    if (1 < window.devicePixelRatio) {
                        var i = p.st.retina,
                            o = i.ratio;
                        1 < (o = isNaN(o) ? o() : o) &&
                            (b("ImageHasSize." + j, function (e, t) {
                                t.img.css({ "max-width": t.img[0].naturalWidth / o, width: "100%" });
                            }),
                                b("ElementParse." + j, function (e, t) {
                                    t.src = i.replaceSrc(t, o);
                                }));
                    }
                },
            },
        }),
            n();
    }),
    (function (e) {
        "function" == typeof define && define.amd ? define("picker", ["jquery"], e) : "object" == typeof exports ? (module.exports = e(require("jquery"))) : (this.Picker = e(jQuery));
    })(function (g) {
        function v(s, n, r, e) {
            function a() {
                return v._.node("div", v._.node("div", v._.node("div", v._.node("div", m.component.nodes(p.open), f.box), f.wrap), f.frame), f.holder, 'tabindex="-1"');
            }
            function l() {
                m.$holder
                    .on({
                        keydown: d,
                        "focus.toOpen": t,
                        blur: function () {
                            h.removeClass(f.target);
                        },
                        focusin: function (e) {
                            m.$root.removeClass(f.focused), e.stopPropagation();
                        },
                        "mousedown click": function (e) {
                            var t = e.target;
                            t != m.$holder[0] && (e.stopPropagation(), "mousedown" != e.type || g(t).is("input, select, textarea, button, option") || (e.preventDefault(), m.$holder[0].focus()));
                        },
                    })
                    .on("click", "[data-pick], [data-nav], [data-clear], [data-close]", function () {
                        var e = g(this),
                            t = e.data(),
                            i = e.hasClass(f.navDisabled) || e.hasClass(f.disabled),
                            o = b();
                        (o = o && (o.type || o.href)),
                            (i || (o && !g.contains(m.$root[0], o))) && m.$holder[0].focus(),
                            !i && t.nav
                                ? m.set("highlight", m.component.item.highlight, { nav: t.nav })
                                : !i && "pick" in t
                                    ? (m.set("select", t.pick), u.closeOnSelect && m.close(!0))
                                    : t.clear
                                        ? (m.clear(), u.closeOnClear && m.close(!0))
                                        : t.close && m.close(!0);
                    });
            }
            function t(e) {
                e.stopPropagation(), h.addClass(f.target), m.$root.addClass(f.focused), m.open();
            }
            function d(e) {
                var t = e.keyCode,
                    i = /^(8|46)$/.test(t);
                return 27 == t ? (m.close(!0), !1) : void ((32 == t || i || (!p.open && m.component.key[t])) && (e.preventDefault(), e.stopPropagation(), i ? m.clear().close() : m.open()));
            }
            if (!s) return v;
            var c = !1,
                p = { id: s.id || "P" + Math.abs(~~(Math.random() * new Date())) },
                u = r ? g.extend(!0, {}, r.defaults, e) : e || {},
                f = g.extend({}, v.klasses(), u.klass),
                h = g(s),
                i = function () {
                    return this.start();
                },
                m = (i.prototype = {
                    constructor: i,
                    $node: h,
                    start: function () {
                        return p && p.start
                            ? m
                            : ((p.methods = {}),
                                (p.start = !0),
                                (p.open = !1),
                                (p.type = s.type),
                                (s.autofocus = s == b()),
                                (s.readOnly = !u.editable),
                                (s.id = s.id || p.id),
                                "text" != s.type && (s.type = "text"),
                                (m.component = new r(m, u)),
                                (m.$root = g('<div class="' + f.picker + '" id="' + s.id + '_root" />')),
                                y(m.$root[0], "hidden", !0),
                                (m.$holder = g(a()).appendTo(m.$root)),
                                l(),
                                u.formatSubmit &&
                                (!0 === u.hiddenName
                                    ? ((o = s.name), (s.name = ""))
                                    : (o = (o = ["string" == typeof u.hiddenPrefix ? u.hiddenPrefix : "", "string" == typeof u.hiddenSuffix ? u.hiddenSuffix : "_submit"])[0] + s.name + o[1]),
                                    (m._hidden = g('<input type=hidden name="' + o + '"' + (h.data("value") || s.value ? ' value="' + m.get("select", u.formatSubmit) + '"' : "") + ">")[0]),
                                    h.on("change." + p.id, function () {
                                        m._hidden.value = s.value ? m.get("select", u.formatSubmit) : "";
                                    })),
                                h
                                    .data(n, m)
                                    .addClass(f.input)
                                    .val(h.data("value") ? m.get("select", u.format) : s.value),
                                u.editable ||
                                h
                                    .on("focus." + p.id + " click." + p.id, function (e) {
                                        e.preventDefault(), m.open();
                                    })
                                    .on("keydown." + p.id, d),
                                y(s, { haspopup: !0, expanded: !1, readonly: !1, owns: s.id + "_root" }),
                                u.containerHidden ? g(u.containerHidden).append(m._hidden) : h.after(m._hidden),
                                u.container ? g(u.container).append(m.$root) : h.after(m.$root),
                                m
                                    .on({ start: m.component.onStart, render: m.component.onRender, stop: m.component.onStop, open: m.component.onOpen, close: m.component.onClose, set: m.component.onSet })
                                    .on({ start: u.onStart, render: u.onRender, stop: u.onStop, open: u.onOpen, close: u.onClose, set: u.onSet }),
                                (e = m.$holder[0]),
                                (i = "position"),
                                e.currentStyle ? (t = e.currentStyle[i]) : window.getComputedStyle && (t = getComputedStyle(e)[i]),
                                (c = "fixed" == t),
                                s.autofocus && m.open(),
                                m.trigger("start").trigger("render"));
                        var e, t, i, o;
                    },
                    render: function (e) {
                        return e ? ((m.$holder = g(a())), l(), m.$root.html(m.$holder)) : m.$root.find("." + f.box).html(m.component.nodes(p.open)), m.trigger("render");
                    },
                    stop: function () {
                        return (
                            p.start &&
                            (m.close(),
                                m._hidden && m._hidden.parentNode.removeChild(m._hidden),
                                m.$root.remove(),
                                h.removeClass(f.input).removeData(n),
                                setTimeout(function () {
                                    h.off("." + p.id);
                                }, 0),
                                (s.type = p.type),
                                (s.readOnly = !1),
                                m.trigger("stop"),
                                (p.methods = {}),
                                (p.start = !1)),
                            m
                        );
                    },
                    open: function (e) {
                        return p.open
                            ? m
                            : (h.addClass(f.active),
                                y(s, "expanded", !0),
                                setTimeout(function () {
                                    m.$root.addClass(f.opened), y(m.$root[0], "hidden", !1);
                                }, 0),
                                !1 !== e &&
                                ((p.open = !0),
                                    c && k.css("overflow", "hidden").css("padding-right", "+=" + o()),
                                    c && x
                                        ? m.$holder.find("." + f.frame).one("transitionend", function () {
                                            m.$holder[0].focus();
                                        })
                                        : m.$holder[0].focus(),
                                    w
                                        .on("click." + p.id + " focusin." + p.id, function (e) {
                                            var t = e.target;
                                            t != s && t != document && 3 != e.which && m.close(t === m.$holder[0]);
                                        })
                                        .on("keydown." + p.id, function (e) {
                                            var t = e.keyCode,
                                                i = m.component.key[t],
                                                o = e.target;
                                            27 == t
                                                ? m.close(!0)
                                                : o != m.$holder[0] || (!i && 13 != t)
                                                    ? g.contains(m.$root[0], o) && 13 == t && (e.preventDefault(), o.click())
                                                    : (e.preventDefault(),
                                                        i
                                                            ? v._.trigger(m.component.key.go, m, [v._.trigger(i)])
                                                            : m.$root.find("." + f.highlighted).hasClass(f.disabled) || (m.set("select", m.component.item.highlight), u.closeOnSelect && m.close(!0)));
                                        })),
                                m.trigger("open"));
                    },
                    close: function (e) {
                        return (
                            e &&
                            (u.editable
                                ? s.focus()
                                : (m.$holder.off("focus.toOpen").focus(),
                                    setTimeout(function () {
                                        m.$holder.on("focus.toOpen", t);
                                    }, 0))),
                            h.removeClass(f.active),
                            y(s, "expanded", !1),
                            setTimeout(function () {
                                m.$root.removeClass(f.opened + " " + f.focused), y(m.$root[0], "hidden", !0);
                            }, 0),
                            p.open ? ((p.open = !1), c && k.css("overflow", "").css("padding-right", "-=" + o()), w.off("." + p.id), m.trigger("close")) : m
                        );
                    },
                    clear: function (e) {
                        return m.set("clear", null, e);
                    },
                    set: function (e, t, i) {
                        var o,
                            s,
                            n = g.isPlainObject(e),
                            r = n ? e : {};
                        if (((i = n && g.isPlainObject(t) ? t : i || {}), e)) {
                            for (o in (n || (r[e] = t), r))
                                (s = r[o]), o in m.component.item && (void 0 === s && (s = null), m.component.set(o, s, i)), ("select" == o || "clear" == o) && h.val("clear" == o ? "" : m.get(o, u.format)).trigger("change");
                            m.render();
                        }
                        return i.muted ? m : m.trigger("set", r);
                    },
                    get: function (e, t) {
                        if (null != p[(e = e || "value")]) return p[e];
                        if ("valueSubmit" == e) {
                            if (m._hidden) return m._hidden.value;
                            e = "value";
                        }
                        if ("value" == e) return s.value;
                        if (e in m.component.item) {
                            if ("string" == typeof t) {
                                var i = m.component.get(e);
                                return i ? v._.trigger(m.component.formats.toString, m.component, [t, i]) : "";
                            }
                            return m.component.get(e);
                        }
                    },
                    on: function (e, t, i) {
                        var o,
                            s,
                            n = g.isPlainObject(e),
                            r = n ? e : {};
                        if (e) for (o in (n || (r[e] = t), r)) (s = r[o]), i && (o = "_" + o), (p.methods[o] = p.methods[o] || []), p.methods[o].push(s);
                        return m;
                    },
                    off: function () {
                        var e,
                            t,
                            i = arguments;
                        for (e = 0, namesCount = i.length; e < namesCount; e += 1) (t = i[e]) in p.methods && delete p.methods[t];
                        return m;
                    },
                    trigger: function (e, i) {
                        var t = function (e) {
                            var t = p.methods[e];
                            t &&
                                t.map(function (e) {
                                    v._.trigger(e, m, [i]);
                                });
                        };
                        return t("_" + e), t(e), m;
                    },
                });
            return new i();
        }
        function o() {
            if (k.height() <= n.height()) return 0;
            var e = g('<div style="visibility:hidden;width:100px" />').appendTo("body"),
                t = e[0].offsetWidth;
            e.css("overflow", "scroll");
            var i = g('<div style="width:100%" />').appendTo(e)[0].offsetWidth;
            return e.remove(), t - i;
        }
        function y(e, t, i) {
            if (g.isPlainObject(t)) for (var o in t) s(e, o, t[o]);
            else s(e, t, i);
        }
        function s(e, t, i) {
            e.setAttribute(("role" == t ? "" : "aria-") + t, i);
        }
        function b() {
            try {
                return document.activeElement;
            } catch (e) { }
        }
        var n = g(window),
            w = g(document),
            k = g(document.documentElement),
            x = null != document.documentElement.style.transition;
        return (
            (v.klasses = function (e) {
                return {
                    picker: (e = e || "picker"),
                    opened: e + "--opened",
                    focused: e + "--focused",
                    input: e + "__input",
                    active: e + "__input--active",
                    target: e + "__input--target",
                    holder: e + "__holder",
                    frame: e + "__frame",
                    wrap: e + "__wrap",
                    box: e + "__box",
                };
            }),
            (v._ = {
                group: function (e) {
                    for (var t, i = "", o = v._.trigger(e.min, e); o <= v._.trigger(e.max, e, [o]); o += e.i) (t = v._.trigger(e.item, e, [o])), (i += v._.node(e.node, t[0], t[1], t[2]));
                    return i;
                },
                node: function (e, t, i, o) {
                    return t ? "<" + e + (i = i ? ' class="' + i + '"' : "") + (o = o ? " " + o : "") + ">" + (t = g.isArray(t) ? t.join("") : t) + "</" + e + ">" : "";
                },
                lead: function (e) {
                    return (e < 10 ? "0" : "") + e;
                },
                trigger: function (e, t, i) {
                    return "function" == typeof e ? e.apply(t, i || []) : e;
                },
                digits: function (e) {
                    return /\d/.test(e[1]) ? 2 : 1;
                },
                isDate: function (e) {
                    return -1 < {}.toString.call(e).indexOf("Date") && this.isInteger(e.getDate());
                },
                isInteger: function (e) {
                    return -1 < {}.toString.call(e).indexOf("Number") && e % 1 == 0;
                },
                ariaAttr: function (e, t) {
                    for (var i in (g.isPlainObject(e) || (e = { attribute: t }), (t = ""), e)) {
                        var o = ("role" == i ? "" : "aria-") + i;
                        t += null == e[i] ? "" : o + '="' + e[i] + '"';
                    }
                    return t;
                },
            }),
            (v.extend = function (o, s) {
                (g.fn[o] = function (e, t) {
                    var i = this.data(o);
                    return "picker" == e
                        ? i
                        : i && "string" == typeof e
                            ? v._.trigger(i[e], i, [t])
                            : this.each(function () {
                                g(this).data(o) || new v(this, o, s, e);
                            });
                }),
                    (g.fn[o].defaults = s.defaults);
            }),
            v
        );
    }),
    (function (e) {
        "function" == typeof define && define.amd ? define(["picker", "jquery"], e) : "object" == typeof exports ? (module.exports = e(require("./picker.js"), require("jquery"))) : e(Picker, jQuery);
    })(function (e, h) {
        function t(t, i) {
            var e,
                o = this,
                s = t.$node[0],
                n = s.value,
                r = t.$node.data("value"),
                a = r || n,
                l = r ? i.formatSubmit : i.format,
                d = function () {
                    return s.currentStyle ? "rtl" == s.currentStyle.direction : "rtl" == getComputedStyle(t.$root[0]).direction;
                };
            (o.settings = i),
                (o.$node = t.$node),
                (o.queue = {
                    min: "measure create",
                    max: "measure create",
                    now: "now create",
                    select: "parse create validate",
                    highlight: "parse navigate create validate",
                    view: "parse create validate viewset",
                    disable: "deactivate",
                    enable: "activate",
                }),
                (o.item = {}),
                (o.item.clear = null),
                (o.item.disable = (i.disable || []).slice(0)),
                (o.item.enable = -(!0 === (e = o.item.disable)[0] ? e.shift() : -1)),
                o.set("min", i.min).set("max", i.max).set("now"),
                a ? o.set("select", a, { format: l, defaultValue: !0 }) : o.set("select", null).set("highlight", o.item.now),
                (o.key = {
                    40: 7,
                    38: -7,
                    39: function () {
                        return d() ? -1 : 1;
                    },
                    37: function () {
                        return d() ? 1 : -1;
                    },
                    go: function (e) {
                        var t = o.item.highlight,
                            i = new Date(t.year, t.month, t.date + e);
                        o.set("highlight", i, { interval: e }), this.render();
                    },
                }),
                t
                    .on(
                        "render",
                        function () {
                            t.$root.find("." + i.klass.selectMonth).on("change", function () {
                                var e = this.value;
                                e && (t.set("highlight", [t.get("view").year, e, t.get("highlight").date]), t.$root.find("." + i.klass.selectMonth).trigger("focus"));
                            }),
                                t.$root.find("." + i.klass.selectYear).on("change", function () {
                                    var e = this.value;
                                    e && (t.set("highlight", [e, t.get("view").month, t.get("highlight").date]), t.$root.find("." + i.klass.selectYear).trigger("focus"));
                                });
                        },
                        1
                    )
                    .on(
                        "open",
                        function () {
                            var e = "";
                            o.disabled(o.get("now")) && (e = ":not(." + i.klass.buttonToday + ")"), t.$root.find("button" + e + ", select").attr("disabled", !1);
                        },
                        1
                    )
                    .on(
                        "close",
                        function () {
                            t.$root.find("button, select").attr("disabled", !0);
                        },
                        1
                    );
        }
        var i,
            v = e._;
        (t.prototype.set = function (t, i, o) {
            var s = this,
                e = s.item;
            return (
                null === i
                    ? ("clear" == t && (t = "select"), (e[t] = i))
                    : ((e["enable" == t ? "disable" : "flip" == t ? "enable" : t] = s.queue[t]
                        .split(" ")
                        .map(function (e) {
                            return (i = s[e](t, i, o));
                        })
                        .pop()),
                        "select" == t
                            ? s.set("highlight", e.select, o)
                            : "highlight" == t
                                ? s.set("view", e.highlight, o)
                                : t.match(/^(flip|min|max|disable|enable)$/) && (e.select && s.disabled(e.select) && s.set("select", e.select, o), e.highlight && s.disabled(e.highlight) && s.set("highlight", e.highlight, o))),
                s
            );
        }),
            (t.prototype.get = function (e) {
                return this.item[e];
            }),
            (t.prototype.create = function (e, t, i) {
                var o;
                return (
                    (t = void 0 === t ? e : t) == -1 / 0 || t == 1 / 0
                        ? (o = t)
                        : h.isPlainObject(t) && v.isInteger(t.pick)
                            ? (t = t.obj)
                            : h.isArray(t)
                                ? ((t = new Date(t[0], t[1], t[2])), (t = v.isDate(t) ? t : this.create().obj))
                                : (t = v.isInteger(t) || v.isDate(t) ? this.normalize(new Date(t), i) : this.now(e, t, i)),
                    { year: o || t.getFullYear(), month: o || t.getMonth(), date: o || t.getDate(), day: o || t.getDay(), obj: o || t, pick: o || t.getTime() }
                );
            }),
            (t.prototype.createRange = function (e, t) {
                var i = this,
                    o = function (e) {
                        return !0 === e || h.isArray(e) || v.isDate(e) ? i.create(e) : e;
                    };
                return (
                    v.isInteger(e) || (e = o(e)),
                    v.isInteger(t) || (t = o(t)),
                    v.isInteger(e) && h.isPlainObject(t) ? (e = [t.year, t.month, t.date + e]) : v.isInteger(t) && h.isPlainObject(e) && (t = [e.year, e.month, e.date + t]),
                    { from: o(e), to: o(t) }
                );
            }),
            (t.prototype.withinRange = function (e, t) {
                return (e = this.createRange(e.from, e.to)), t.pick >= e.from.pick && t.pick <= e.to.pick;
            }),
            (t.prototype.overlapRanges = function (e, t) {
                var i = this;
                return (e = i.createRange(e.from, e.to)), (t = i.createRange(t.from, t.to)), i.withinRange(e, t.from) || i.withinRange(e, t.to) || i.withinRange(t, e.from) || i.withinRange(t, e.to);
            }),
            (t.prototype.now = function (e, t, i) {
                return (t = new Date()), i && i.rel && t.setDate(t.getDate() + i.rel), this.normalize(t, i);
            }),
            (t.prototype.navigate = function (e, t, i) {
                var o,
                    s,
                    n,
                    r,
                    a = h.isArray(t),
                    l = h.isPlainObject(t),
                    d = this.item.view;
                if (a || l) {
                    for (
                        l ? ((s = t.year), (n = t.month), (r = t.date)) : ((s = +t[0]), (n = +t[1]), (r = +t[2])),
                        i && i.nav && d && d.month !== n && ((s = d.year), (n = d.month)),
                        s = (o = new Date(s, n + (i && i.nav ? i.nav : 0), 1)).getFullYear(),
                        n = o.getMonth();
                        new Date(s, n, r).getMonth() !== n;

                    )
                        r -= 1;
                    t = [s, n, r];
                }
                return t;
            }),
            (t.prototype.normalize = function (e) {
                return e.setHours(0, 0, 0, 0), e;
            }),
            (t.prototype.measure = function (e, t) {
                return t ? ("string" == typeof t ? (t = this.parse(e, t)) : v.isInteger(t) && (t = this.now(e, t, { rel: t }))) : (t = "min" == e ? -1 / 0 : 1 / 0), t;
            }),
            (t.prototype.viewset = function (e, t) {
                return this.create([t.year, t.month, 1]);
            }),
            (t.prototype.validate = function (e, i, t) {
                var o,
                    s,
                    n,
                    r,
                    a = this,
                    l = i,
                    d = t && t.interval ? t.interval : 1,
                    c = -1 === a.item.enable,
                    p = a.item.min,
                    u = a.item.max,
                    f =
                        c &&
                        a.item.disable.filter(function (e) {
                            if (h.isArray(e)) {
                                var t = a.create(e).pick;
                                t < i.pick ? (o = !0) : t > i.pick && (s = !0);
                            }
                            return v.isInteger(e);
                        }).length;
                if ((!t || (!t.nav && !t.defaultValue)) && ((!c && a.disabled(i)) || (c && a.disabled(i) && (f || o || s)) || (!c && (i.pick <= p.pick || i.pick >= u.pick))))
                    for (
                        c && !f && ((!s && 0 < d) || (!o && d < 0)) && (d *= -1);
                        a.disabled(i) &&
                        (1 < Math.abs(d) && (i.month < l.month || i.month > l.month) && ((i = l), (d = 0 < d ? 1 : -1)),
                            i.pick <= p.pick
                                ? ((n = !0), (d = 1), (i = a.create([p.year, p.month, p.date + (i.pick === p.pick ? 0 : -1)])))
                                : i.pick >= u.pick && ((r = !0), (d = -1), (i = a.create([u.year, u.month, u.date + (i.pick === u.pick ? 0 : 1)]))),
                            !n || !r);

                    )
                        i = a.create([i.year, i.month, i.date + d]);
                return i;
            }),
            (t.prototype.disabled = function (t) {
                var i = this,
                    e = i.item.disable.filter(function (e) {
                        return v.isInteger(e) ? t.day === (i.settings.firstDay ? e : e - 1) % 7 : h.isArray(e) || v.isDate(e) ? t.pick === i.create(e).pick : h.isPlainObject(e) ? i.withinRange(e, t) : void 0;
                    });
                return (
                    (e =
                        e.length &&
                        !e.filter(function (e) {
                            return (h.isArray(e) && "inverted" == e[3]) || (h.isPlainObject(e) && e.inverted);
                        }).length),
                    -1 === i.item.enable ? !e : e || t.pick < i.item.min.pick || t.pick > i.item.max.pick
                );
            }),
            (t.prototype.parse = function (e, o, t) {
                var s = this,
                    n = {};
                return o && "string" == typeof o
                    ? ((t && t.format) || ((t = t || {}).format = s.settings.format),
                        s.formats.toArray(t.format).map(function (e) {
                            var t = s.formats[e],
                                i = t ? v.trigger(t, s, [o, n]) : e.replace(/^!/, "").length;
                            t && (n[e] = o.substr(0, i)), (o = o.substr(i));
                        }),
                        [n.yyyy || n.yy, +(n.mm || n.m) - 1, n.dd || n.d])
                    : o;
            }),
            (t.prototype.formats = (function () {
                function o(e, t, i) {
                    var o = e.match(/[^\x00-\x7F]+|\w+/)[0];
                    return i.mm || i.m || (i.m = t.indexOf(o) + 1), o.length;
                }
                function i(e) {
                    return e.match(/\w+/)[0].length;
                }
                return {
                    d: function (e, t) {
                        return e ? v.digits(e) : t.date;
                    },
                    dd: function (e, t) {
                        return e ? 2 : v.lead(t.date);
                    },
                    ddd: function (e, t) {
                        return e ? i(e) : this.settings.weekdaysShort[t.day];
                    },
                    dddd: function (e, t) {
                        return e ? i(e) : this.settings.weekdaysFull[t.day];
                    },
                    m: function (e, t) {
                        return e ? v.digits(e) : t.month + 1;
                    },
                    mm: function (e, t) {
                        return e ? 2 : v.lead(t.month + 1);
                    },
                    mmm: function (e, t) {
                        var i = this.settings.monthsShort;
                        return e ? o(e, i, t) : i[t.month];
                    },
                    mmmm: function (e, t) {
                        var i = this.settings.monthsFull;
                        return e ? o(e, i, t) : i[t.month];
                    },
                    yy: function (e, t) {
                        return e ? 2 : ("" + t.year).slice(2);
                    },
                    yyyy: function (e, t) {
                        return e ? 4 : t.year;
                    },
                    toArray: function (e) {
                        return e.split(/(d{1,4}|m{1,4}|y{4}|yy|!.)/g);
                    },
                    toString: function (e, t) {
                        var i = this;
                        return i.formats
                            .toArray(e)
                            .map(function (e) {
                                return v.trigger(i.formats[e], i, [0, t]) || e.replace(/^!/, "");
                            })
                            .join("");
                    },
                };
            })()),
            (t.prototype.isDateExact = function (e, t) {
                return (v.isInteger(e) && v.isInteger(t)) || ("boolean" == typeof e && "boolean" == typeof t)
                    ? e === t
                    : (v.isDate(e) || h.isArray(e)) && (v.isDate(t) || h.isArray(t))
                        ? this.create(e).pick === this.create(t).pick
                        : !(!h.isPlainObject(e) || !h.isPlainObject(t)) && this.isDateExact(e.from, t.from) && this.isDateExact(e.to, t.to);
            }),
            (t.prototype.isDateOverlap = function (e, t) {
                var i = this.settings.firstDay ? 1 : 0;
                return v.isInteger(e) && (v.isDate(t) || h.isArray(t))
                    ? (e = (e % 7) + i) === this.create(t).day + 1
                    : v.isInteger(t) && (v.isDate(e) || h.isArray(e))
                        ? (t = (t % 7) + i) === this.create(e).day + 1
                        : !(!h.isPlainObject(e) || !h.isPlainObject(t)) && this.overlapRanges(e, t);
            }),
            (t.prototype.flipEnable = function (e) {
                var t = this.item;
                t.enable = e || (-1 == t.enable ? 1 : -1);
            }),
            (t.prototype.deactivate = function (e, t) {
                var o = this,
                    s = o.item.disable.slice(0);
                return (
                    "flip" == t
                        ? o.flipEnable()
                        : !1 === t
                            ? (o.flipEnable(1), (s = []))
                            : !0 === t
                                ? (o.flipEnable(-1), (s = []))
                                : t.map(function (e) {
                                    for (var t, i = 0; i < s.length; i += 1)
                                        if (o.isDateExact(e, s[i])) {
                                            t = !0;
                                            break;
                                        }
                                    t || ((v.isInteger(e) || v.isDate(e) || h.isArray(e) || (h.isPlainObject(e) && e.from && e.to)) && s.push(e));
                                }),
                    s
                );
            }),
            (t.prototype.activate = function (e, t) {
                var n = this,
                    r = n.item.disable,
                    a = r.length;
                return (
                    "flip" == t
                        ? n.flipEnable()
                        : !0 === t
                            ? (n.flipEnable(1), (r = []))
                            : !1 === t
                                ? (n.flipEnable(-1), (r = []))
                                : t.map(function (e) {
                                    var t, i, o, s;
                                    for (o = 0; o < a; o += 1) {
                                        if (((i = r[o]), n.isDateExact(i, e))) {
                                            (t = r[o] = null), (s = !0);
                                            break;
                                        }
                                        if (n.isDateOverlap(i, e)) {
                                            h.isPlainObject(e) ? ((e.inverted = !0), (t = e)) : h.isArray(e) ? (t = e)[3] || t.push("inverted") : v.isDate(e) && (t = [e.getFullYear(), e.getMonth(), e.getDate(), "inverted"]);
                                            break;
                                        }
                                    }
                                    if (t)
                                        for (o = 0; o < a; o += 1)
                                            if (n.isDateExact(r[o], e)) {
                                                r[o] = null;
                                                break;
                                            }
                                    if (s)
                                        for (o = 0; o < a; o += 1)
                                            if (n.isDateOverlap(r[o], e)) {
                                                r[o] = null;
                                                break;
                                            }
                                    t && r.push(t);
                                }),
                    r.filter(function (e) {
                        return null != e;
                    })
                );
            }),
            (t.prototype.nodes = function (l) {
                var t,
                    i,
                    d = this,
                    c = d.settings,
                    e = d.item,
                    r = e.now,
                    a = e.select,
                    p = e.highlight,
                    u = e.view,
                    f = e.disable,
                    h = e.min,
                    m = e.max,
                    o =
                        ((t = (c.showWeekdaysFull ? c.weekdaysFull : c.weekdaysShort).slice(0)),
                            (i = c.weekdaysFull.slice(0)),
                            c.firstDay && (t.push(t.shift()), i.push(i.shift())),
                            v.node(
                                "thead",
                                v.node(
                                    "tr",
                                    v.group({
                                        min: 0,
                                        max: 6,
                                        i: 1,
                                        node: "th",
                                        item: function (e) {
                                            return [t[e], c.klass.weekdays, 'scope=col title="' + i[e] + '"'];
                                        },
                                    })
                                )
                            )),
                    s = function (e) {
                        return v.node(
                            "div",
                            " ",
                            c.klass["nav" + (e ? "Next" : "Prev")] + ((e && u.year >= m.year && u.month >= m.month) || (!e && u.year <= h.year && u.month <= h.month) ? " " + c.klass.navDisabled : ""),
                            "data-nav=" + (e || -1) + " " + v.ariaAttr({ role: "button", controls: d.$node[0].id + "_table" }) + ' title="' + (e ? c.labelMonthNext : c.labelMonthPrev) + '"'
                        );
                    },
                    n = function () {
                        var t = c.showMonthsShort ? c.monthsShort : c.monthsFull;
                        return c.selectMonths
                            ? v.node(
                                "select",
                                v.group({
                                    min: 0,
                                    max: 11,
                                    i: 1,
                                    node: "option",
                                    item: function (e) {
                                        return [t[e], 0, "value=" + e + (u.month == e ? " selected" : "") + ((u.year == h.year && e < h.month) || (u.year == m.year && e > m.month) ? " disabled" : "")];
                                    },
                                }),
                                c.klass.selectMonth,
                                (l ? "" : "disabled") + " " + v.ariaAttr({ controls: d.$node[0].id + "_table" }) + ' title="' + c.labelMonthSelect + '"'
                            )
                            : v.node("div", t[u.month], c.klass.month);
                    },
                    g = function () {
                        var t = u.year,
                            e = !0 === c.selectYears ? 5 : ~~(c.selectYears / 2);
                        if (e) {
                            var i = h.year,
                                o = m.year,
                                s = t - e,
                                n = t + e;
                            if ((s < i && ((n += i - s), (s = i)), o < n)) {
                                var r = s - i,
                                    a = n - o;
                                (s -= a < r ? a : r), (n = o);
                            }
                            return v.node(
                                "select",
                                v.group({
                                    min: s,
                                    max: n,
                                    i: 1,
                                    node: "option",
                                    item: function (e) {
                                        return [e, 0, "value=" + e + (t == e ? " selected" : "")];
                                    },
                                }),
                                c.klass.selectYear,
                                (l ? "" : "disabled") + " " + v.ariaAttr({ controls: d.$node[0].id + "_table" }) + ' title="' + c.labelYearSelect + '"'
                            );
                        }
                        return v.node("div", t, c.klass.year);
                    };
                return (
                    v.node("div", (c.selectYears ? g() + n() : n() + g()) + s() + s(1), c.klass.header) +
                    v.node(
                        "table",
                        o +
                        v.node(
                            "tbody",
                            v.group({
                                min: 0,
                                max: 5,
                                i: 1,
                                node: "tr",
                                item: function (e) {
                                    var t = c.firstDay && 0 === d.create([u.year, u.month, 1]).day ? -7 : 0;
                                    return [
                                        v.group({
                                            min: 7 * e - u.day + t + 1,
                                            max: function () {
                                                return this.min + 7 - 1;
                                            },
                                            i: 1,
                                            node: "td",
                                            item: function (e) {
                                                e = d.create([u.year, u.month, e + (c.firstDay ? 1 : 0)]);
                                                var t,
                                                    i = a && a.pick == e.pick,
                                                    o = p && p.pick == e.pick,
                                                    s = (f && d.disabled(e)) || e.pick < h.pick || e.pick > m.pick,
                                                    n = v.trigger(d.formats.toString, d, [c.format, e]);
                                                return [
                                                    v.node(
                                                        "div",
                                                        e.date,
                                                        ((t = [c.klass.day]),
                                                            t.push(u.month == e.month ? c.klass.infocus : c.klass.outfocus),
                                                            r.pick == e.pick && t.push(c.klass.now),
                                                            i && t.push(c.klass.selected),
                                                            o && t.push(c.klass.highlighted),
                                                            s && t.push(c.klass.disabled),
                                                            t.join(" ")),
                                                        "data-pick=" + e.pick + " " + v.ariaAttr({ role: "gridcell", label: n, selected: !(!i || d.$node.val() !== n) || null, activedescendant: !!o || null, disabled: !!s || null })
                                                    ),
                                                    "",
                                                    v.ariaAttr({ role: "presentation" }),
                                                ];
                                            },
                                        }),
                                    ];
                                },
                            })
                        ),
                        c.klass.table,
                        'id="' + d.$node[0].id + '_table" ' + v.ariaAttr({ role: "grid", controls: d.$node[0].id, readonly: !0 })
                    ) +
                    v.node(
                        "div",
                        v.node("button", c.today, c.klass.buttonToday, "type=button data-pick=" + r.pick + (l && !d.disabled(r) ? "" : " disabled") + " " + v.ariaAttr({ controls: d.$node[0].id })) +
                        v.node("button", c.clear, c.klass.buttonClear, "type=button data-clear=1" + (l ? "" : " disabled") + " " + v.ariaAttr({ controls: d.$node[0].id })) +
                        v.node("button", c.close, c.klass.buttonClose, "type=button data-close=true " + (l ? "" : " disabled") + " " + v.ariaAttr({ controls: d.$node[0].id })),
                        c.klass.footer
                    )
                );
            }),
            (t.defaults = {
                labelMonthNext: "Next month",
                labelMonthPrev: "Previous month",
                labelMonthSelect: "Select a month",
                labelYearSelect: "Select a year",
                monthsFull: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                weekdaysFull: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                weekdaysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                today: "Today",
                clear: "Clear",
                close: "Close",
                closeOnSelect: !0,
                closeOnClear: !0,
                format: "d mmmm, yyyy",
                klass: {
                    table: (i = e.klasses().picker + "__") + "table",
                    header: i + "header",
                    navPrev: i + "nav--prev",
                    navNext: i + "nav--next",
                    navDisabled: i + "nav--disabled",
                    month: i + "month",
                    year: i + "year",
                    selectMonth: i + "select--month",
                    selectYear: i + "select--year",
                    weekdays: i + "weekday",
                    day: i + "day",
                    disabled: i + "day--disabled",
                    selected: i + "day--selected",
                    highlighted: i + "day--highlighted",
                    now: i + "day--today",
                    infocus: i + "day--infocus",
                    outfocus: i + "day--outfocus",
                    footer: i + "footer",
                    buttonClear: i + "button--clear",
                    buttonToday: i + "button--today",
                    buttonClose: i + "button--close",
                },
            }),
            e.extend("pickadate", t);
    }),
    (function (e) {
        "function" == typeof define && define.amd ? define(["picker", "jquery"], e) : "object" == typeof exports ? (module.exports = e(require("./picker.js"), require("jquery"))) : e(Picker, jQuery);
    })(function (e, l) {
        function t(s, n) {
            var e,
                t = this,
                i = s.$node[0].value,
                o = s.$node.data("value"),
                r = o || i,
                a = o ? n.formatSubmit : n.format;
            (t.settings = n),
                (t.$node = s.$node),
                (t.queue = {
                    interval: "i",
                    min: "measure create",
                    max: "measure create",
                    now: "now create",
                    select: "parse create validate",
                    highlight: "parse create validate",
                    view: "parse create validate",
                    disable: "deactivate",
                    enable: "activate",
                }),
                (t.item = {}),
                (t.item.clear = null),
                (t.item.interval = n.interval || 30),
                (t.item.disable = (n.disable || []).slice(0)),
                (t.item.enable = -(!0 === (e = t.item.disable)[0] ? e.shift() : -1)),
                t.set("min", n.min).set("max", n.max).set("now"),
                r ? t.set("select", r, { format: a }) : t.set("select", null).set("highlight", t.item.now),
                (t.key = {
                    40: 1,
                    38: -1,
                    39: 1,
                    37: -1,
                    go: function (e) {
                        t.set("highlight", t.item.highlight.pick + e * t.item.interval, { interval: e * t.item.interval }), this.render();
                    },
                }),
                s
                    .on(
                        "render",
                        function () {
                            var e = s.$root.children(),
                                t = e.find("." + n.klass.viewset),
                                o = function (t) {
                                    return ["webkit", "moz", "ms", "o", ""].map(function (e) {
                                        return (e ? "-" + e + "-" : "") + t;
                                    });
                                },
                                i = function (t, i) {
                                    o("transform").map(function (e) {
                                        t.css(e, i);
                                    }),
                                        o("transition").map(function (e) {
                                            t.css(e, i);
                                        });
                                };
                            t.length && (i(e, "none"), (e[0].scrollTop = ~~t.position().top - 2 * t[0].clientHeight), i(e, ""));
                        },
                        1
                    )
                    .on(
                        "open",
                        function () {
                            s.$root.find("button").attr("disabled", !1);
                        },
                        1
                    )
                    .on(
                        "close",
                        function () {
                            s.$root.find("button").attr("disabled", !0);
                        },
                        1
                    );
        }
        var i,
            s = 1440,
            f = e._;
        (t.prototype.set = function (t, i, o) {
            var s = this,
                e = s.item;
            return (
                null === i
                    ? ("clear" == t && (t = "select"), (e[t] = i))
                    : ((e["enable" == t ? "disable" : "flip" == t ? "enable" : t] = s.queue[t]
                        .split(" ")
                        .map(function (e) {
                            return (i = s[e](t, i, o));
                        })
                        .pop()),
                        "select" == t
                            ? s.set("highlight", e.select, o)
                            : "highlight" == t
                                ? s.set("view", e.highlight, o)
                                : "interval" == t
                                    ? s.set("min", e.min, o).set("max", e.max, o)
                                    : t.match(/^(flip|min|max|disable|enable)$/) &&
                                    (e.select && s.disabled(e.select) && s.set("select", i, o), e.highlight && s.disabled(e.highlight) && s.set("highlight", i, o), "min" == t && s.set("max", e.max, o))),
                s
            );
        }),
            (t.prototype.get = function (e) {
                return this.item[e];
            }),
            (t.prototype.create = function (e, t, i) {
                var o = this;
                return (
                    (t = void 0 === t ? e : t),
                    f.isDate(t) && (t = [t.getHours(), t.getMinutes()]),
                    l.isPlainObject(t) && f.isInteger(t.pick) ? (t = t.pick) : l.isArray(t) ? (t = 60 * +t[0] + +t[1]) : f.isInteger(t) || (t = o.now(e, t, i)),
                    "max" == e && t < o.item.min.pick && (t += s),
                    "min" != e && "max" != e && (t - o.item.min.pick) % o.item.interval != 0 && (t += o.item.interval),
                    { hour: ~~(24 + (t = o.normalize(e, t, i)) / 60) % 24, mins: (60 + (t % 60)) % 60, time: (s + t) % s, pick: t % s }
                );
            }),
            (t.prototype.createRange = function (e, t) {
                var i = this,
                    o = function (e) {
                        return !0 === e || l.isArray(e) || f.isDate(e) ? i.create(e) : e;
                    };
                return (
                    f.isInteger(e) || (e = o(e)),
                    f.isInteger(t) || (t = o(t)),
                    f.isInteger(e) && l.isPlainObject(t) ? (e = [t.hour, t.mins + e * i.settings.interval]) : f.isInteger(t) && l.isPlainObject(e) && (t = [e.hour, e.mins + t * i.settings.interval]),
                    { from: o(e), to: o(t) }
                );
            }),
            (t.prototype.withinRange = function (e, t) {
                return (e = this.createRange(e.from, e.to)), t.pick >= e.from.pick && t.pick <= e.to.pick;
            }),
            (t.prototype.overlapRanges = function (e, t) {
                var i = this;
                return (e = i.createRange(e.from, e.to)), (t = i.createRange(t.from, t.to)), i.withinRange(e, t.from) || i.withinRange(e, t.to) || i.withinRange(t, e.from) || i.withinRange(t, e.to);
            }),
            (t.prototype.now = function (e, t) {
                var i,
                    o = this.item.interval,
                    s = new Date(),
                    n = 60 * s.getHours() + s.getMinutes();
                return (n -= n % o), (i = t < 0 && o * t + n <= -o), (n += "min" == e && i ? 0 : o), f.isInteger(t) && (n += o * (i && "max" != e ? t + 1 : t)), n;
            }),
            (t.prototype.normalize = function (e, t) {
                var i = this.item.interval,
                    o = (this.item.min && this.item.min.pick) || 0;
                return t - ("min" == e ? 0 : (t - o) % i);
            }),
            (t.prototype.measure = function (e, t, i) {
                return (
                    t || (t = "min" == e ? [0, 0] : [23, 59]),
                    "string" == typeof t ? (t = this.parse(e, t)) : !0 === t || f.isInteger(t) ? (t = this.now(e, t, i)) : l.isPlainObject(t) && f.isInteger(t.pick) && (t = this.normalize(e, t.pick, i)),
                    t
                );
            }),
            (t.prototype.validate = function (e, t, i) {
                var o = this,
                    s = i && i.interval ? i.interval : o.item.interval;
                return o.disabled(t) && (t = o.shift(t, s)), (t = o.scope(t)), o.disabled(t) && (t = o.shift(t, -1 * s)), t;
            }),
            (t.prototype.disabled = function (t) {
                var i = this,
                    e = i.item.disable.filter(function (e) {
                        return f.isInteger(e) ? t.hour == e : l.isArray(e) || f.isDate(e) ? t.pick == i.create(e).pick : l.isPlainObject(e) ? i.withinRange(e, t) : void 0;
                    });
                return (
                    (e =
                        e.length &&
                        !e.filter(function (e) {
                            return (l.isArray(e) && "inverted" == e[2]) || (l.isPlainObject(e) && e.inverted);
                        }).length),
                    -1 === i.item.enable ? !e : e || t.pick < i.item.min.pick || t.pick > i.item.max.pick
                );
            }),
            (t.prototype.shift = function (e, t) {
                var i = this,
                    o = i.item.min.pick,
                    s = i.item.max.pick;
                for (t = t || i.item.interval; i.disabled(e) && !((e = i.create((e.pick += t))).pick <= o || e.pick >= s););
                return e;
            }),
            (t.prototype.scope = function (e) {
                var t = this.item.min.pick,
                    i = this.item.max.pick;
                return this.create(e.pick > i ? i : e.pick < t ? t : e);
            }),
            (t.prototype.parse = function (e, s, t) {
                var i,
                    o,
                    n,
                    r,
                    a,
                    l = this,
                    d = {};
                if (!s || "string" != typeof s) return s;
                for (r in ((t && t.format) || ((t = t || {}).format = l.settings.format),
                    l.formats.toArray(t.format).map(function (e) {
                        var t,
                            i = l.formats[e],
                            o = i ? f.trigger(i, l, [s, d]) : e.replace(/^!/, "").length;
                        i && ((t = s.substr(0, o)), (d[e] = t.match(/^\d+$/) ? +t : t)), (s = s.substr(o));
                    }),
                    d))
                    (a = d[r]), f.isInteger(a) ? (r.match(/^(h|hh)$/i) ? ((i = a), ("h" == r || "hh" == r) && (i %= 12)) : "i" == r && (o = a)) : r.match(/^a$/i) && a.match(/^p/i) && ("h" in d || "hh" in d) && (n = !0);
                return 60 * (n ? i + 12 : i) + o;
            }),
            (t.prototype.formats = {
                h: function (e, t) {
                    return e ? f.digits(e) : t.hour % 12 || 12;
                },
                hh: function (e, t) {
                    return e ? 2 : f.lead(t.hour % 12 || 12);
                },
                H: function (e, t) {
                    return e ? f.digits(e) : "" + (t.hour % 24);
                },
                HH: function (e, t) {
                    return e ? f.digits(e) : f.lead(t.hour % 24);
                },
                i: function (e, t) {
                    return e ? 2 : f.lead(t.mins);
                },
                a: function (e, t) {
                    return e ? 4 : t.time % s < 720 ? "a.m." : "p.m.";
                },
                A: function (e, t) {
                    return e ? 2 : t.time % s < 720 ? "AM" : "PM";
                },
                toArray: function (e) {
                    return e.split(/(h{1,2}|H{1,2}|i|a|A|!.)/g);
                },
                toString: function (e, t) {
                    var i = this;
                    return i.formats
                        .toArray(e)
                        .map(function (e) {
                            return f.trigger(i.formats[e], i, [0, t]) || e.replace(/^!/, "");
                        })
                        .join("");
                },
            }),
            (t.prototype.isTimeExact = function (e, t) {
                return (f.isInteger(e) && f.isInteger(t)) || ("boolean" == typeof e && "boolean" == typeof t)
                    ? e === t
                    : (f.isDate(e) || l.isArray(e)) && (f.isDate(t) || l.isArray(t))
                        ? this.create(e).pick === this.create(t).pick
                        : !(!l.isPlainObject(e) || !l.isPlainObject(t)) && this.isTimeExact(e.from, t.from) && this.isTimeExact(e.to, t.to);
            }),
            (t.prototype.isTimeOverlap = function (e, t) {
                return f.isInteger(e) && (f.isDate(t) || l.isArray(t))
                    ? e === this.create(t).hour
                    : f.isInteger(t) && (f.isDate(e) || l.isArray(e))
                        ? t === this.create(e).hour
                        : !(!l.isPlainObject(e) || !l.isPlainObject(t)) && this.overlapRanges(e, t);
            }),
            (t.prototype.flipEnable = function (e) {
                var t = this.item;
                t.enable = e || (-1 == t.enable ? 1 : -1);
            }),
            (t.prototype.deactivate = function (e, t) {
                var o = this,
                    s = o.item.disable.slice(0);
                return (
                    "flip" == t
                        ? o.flipEnable()
                        : !1 === t
                            ? (o.flipEnable(1), (s = []))
                            : !0 === t
                                ? (o.flipEnable(-1), (s = []))
                                : t.map(function (e) {
                                    for (var t, i = 0; i < s.length; i += 1)
                                        if (o.isTimeExact(e, s[i])) {
                                            t = !0;
                                            break;
                                        }
                                    t || ((f.isInteger(e) || f.isDate(e) || l.isArray(e) || (l.isPlainObject(e) && e.from && e.to)) && s.push(e));
                                }),
                    s
                );
            }),
            (t.prototype.activate = function (e, t) {
                var n = this,
                    r = n.item.disable,
                    a = r.length;
                return (
                    "flip" == t
                        ? n.flipEnable()
                        : !0 === t
                            ? (n.flipEnable(1), (r = []))
                            : !1 === t
                                ? (n.flipEnable(-1), (r = []))
                                : t.map(function (e) {
                                    var t, i, o, s;
                                    for (o = 0; o < a; o += 1) {
                                        if (((i = r[o]), n.isTimeExact(i, e))) {
                                            (t = r[o] = null), (s = !0);
                                            break;
                                        }
                                        if (n.isTimeOverlap(i, e)) {
                                            l.isPlainObject(e) ? ((e.inverted = !0), (t = e)) : l.isArray(e) ? (t = e)[2] || t.push("inverted") : f.isDate(e) && (t = [e.getFullYear(), e.getMonth(), e.getDate(), "inverted"]);
                                            break;
                                        }
                                    }
                                    if (t)
                                        for (o = 0; o < a; o += 1)
                                            if (n.isTimeExact(r[o], e)) {
                                                r[o] = null;
                                                break;
                                            }
                                    if (s)
                                        for (o = 0; o < a; o += 1)
                                            if (n.isTimeOverlap(r[o], e)) {
                                                r[o] = null;
                                                break;
                                            }
                                    t && r.push(t);
                                }),
                    r.filter(function (e) {
                        return null != e;
                    })
                );
            }),
            (t.prototype.i = function (e, t) {
                return f.isInteger(t) && 0 < t ? t : this.item.interval;
            }),
            (t.prototype.nodes = function (e) {
                var a = this,
                    l = a.settings,
                    d = a.item.select,
                    c = a.item.highlight,
                    p = a.item.view,
                    u = a.item.disable;
                return f.node(
                    "ul",
                    f.group({
                        min: a.item.min.pick,
                        max: a.item.max.pick,
                        i: a.item.interval,
                        node: "li",
                        item: function (e) {
                            var t,
                                i = (e = a.create(e)).pick,
                                o = d && d.pick == i,
                                s = c && c.pick == i,
                                n = u && a.disabled(e),
                                r = f.trigger(a.formats.toString, a, [l.format, e]);
                            return [
                                f.trigger(a.formats.toString, a, [f.trigger(l.formatLabel, a, [e]) || l.format, e]),
                                ((t = [l.klass.listItem]), o && t.push(l.klass.selected), s && t.push(l.klass.highlighted), p && p.pick == i && t.push(l.klass.viewset), n && t.push(l.klass.disabled), t.join(" ")),
                                "data-pick=" + e.pick + " " + f.ariaAttr({ role: "option", label: r, selected: !(!o || a.$node.val() !== r) || null, activedescendant: !!s || null, disabled: !!n || null }),
                            ];
                        },
                    }) + f.node("li", f.node("button", l.clear, l.klass.buttonClear, "type=button data-clear=1" + (e ? "" : " disabled") + " " + f.ariaAttr({ controls: a.$node[0].id })), "", f.ariaAttr({ role: "presentation" })),
                    l.klass.list,
                    f.ariaAttr({ role: "listbox", controls: a.$node[0].id })
                );
            }),
            (t.defaults = {
                clear: "Clear",
                format: "h:i A",
                interval: 30,
                closeOnSelect: !0,
                closeOnClear: !0,
                klass: {
                    picker: (i = e.klasses().picker) + " " + i + "--time",
                    holder: i + "__holder",
                    list: i + "__list",
                    listItem: i + "__list-item",
                    disabled: i + "__list-item--disabled",
                    selected: i + "__list-item--selected",
                    highlighted: i + "__list-item--highlighted",
                    viewset: i + "__list-item--viewset",
                    now: i + "__list-item--now",
                    buttonClear: i + "__button--clear",
                },
            }),
            e.extend("pickatime", t);
    }),
    (function (e) {
        "use strict";
        "function" == typeof define && define.amd ? define(["jquery"], e) : "undefined" != typeof exports ? (module.exports = e(require("jquery"))) : e(jQuery);
    })(function (d) {
        "use strict";
        var s,
            r = window.Slick || {};
        (((s = 0),
            (r = function (e, t) {
                var i,
                    o = this;
                (o.defaults = {
                    accessibility: !0,
                    adaptiveHeight: !1,
                    appendArrows: d(e),
                    appendDots: d(e),
                    arrows: !0,
                    asNavFor: null,
                    prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
                    nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
                    autoplay: !1,
                    autoplaySpeed: 3e3,
                    centerMode: !1,
                    centerPadding: "50px",
                    cssEase: "ease",
                    customPaging: function (e, t) {
                        return d('<button type="button" />').text(t + 1);
                    },
                    dots: !1,
                    dotsClass: "slick-dots",
                    draggable: !0,
                    easing: "linear",
                    edgeFriction: 0.35,
                    fade: !1,
                    focusOnSelect: !1,
                    focusOnChange: !1,
                    infinite: !0,
                    initialSlide: 0,
                    lazyLoad: "ondemand",
                    mobileFirst: !1,
                    pauseOnHover: !0,
                    pauseOnFocus: !0,
                    pauseOnDotsHover: !1,
                    respondTo: "window",
                    responsive: null,
                    rows: 1,
                    rtl: !1,
                    slide: "",
                    slidesPerRow: 1,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    speed: 500,
                    swipe: !0,
                    swipeToSlide: !1,
                    touchMove: !0,
                    touchThreshold: 5,
                    useCSS: !0,
                    useTransform: !0,
                    variableWidth: !1,
                    vertical: !1,
                    verticalSwiping: !1,
                    waitForAnimate: !0,
                    zIndex: 1e3,
                }),
                    (o.initials = {
                        animating: !1,
                        dragging: !1,
                        autoPlayTimer: null,
                        currentDirection: 0,
                        currentLeft: null,
                        currentSlide: 0,
                        direction: 1,
                        $dots: null,
                        listWidth: null,
                        listHeight: null,
                        loadIndex: 0,
                        $nextArrow: null,
                        $prevArrow: null,
                        scrolling: !1,
                        slideCount: null,
                        slideWidth: null,
                        $slideTrack: null,
                        $slides: null,
                        sliding: !1,
                        slideOffset: 0,
                        swipeLeft: null,
                        swiping: !1,
                        $list: null,
                        touchObject: {},
                        transformsEnabled: !1,
                        unslicked: !1,
                    }),
                    d.extend(o, o.initials),
                    (o.activeBreakpoint = null),
                    (o.animType = null),
                    (o.animProp = null),
                    (o.breakpoints = []),
                    (o.breakpointSettings = []),
                    (o.cssTransitions = !1),
                    (o.focussed = !1),
                    (o.interrupted = !1),
                    (o.hidden = "hidden"),
                    (o.paused = !0),
                    (o.positionProp = null),
                    (o.respondTo = null),
                    (o.rowCount = 1),
                    (o.shouldClick = !0),
                    (o.$slider = d(e)),
                    (o.$slidesCache = null),
                    (o.transformType = null),
                    (o.transitionType = null),
                    (o.visibilityChange = "visibilitychange"),
                    (o.windowWidth = 0),
                    (o.windowTimer = null),
                    (i = d(e).data("slick") || {}),
                    (o.options = d.extend({}, o.defaults, t, i)),
                    (o.currentSlide = o.options.initialSlide),
                    (o.originalSettings = o.options),
                    void 0 !== document.mozHidden ? ((o.hidden = "mozHidden"), (o.visibilityChange = "mozvisibilitychange")) : void 0 !== document.webkitHidden && ((o.hidden = "webkitHidden"), (o.visibilityChange = "webkitvisibilitychange")),
                    (o.autoPlay = d.proxy(o.autoPlay, o)),
                    (o.autoPlayClear = d.proxy(o.autoPlayClear, o)),
                    (o.autoPlayIterator = d.proxy(o.autoPlayIterator, o)),
                    (o.changeSlide = d.proxy(o.changeSlide, o)),
                    (o.clickHandler = d.proxy(o.clickHandler, o)),
                    (o.selectHandler = d.proxy(o.selectHandler, o)),
                    (o.setPosition = d.proxy(o.setPosition, o)),
                    (o.swipeHandler = d.proxy(o.swipeHandler, o)),
                    (o.dragHandler = d.proxy(o.dragHandler, o)),
                    (o.keyHandler = d.proxy(o.keyHandler, o)),
                    (o.instanceUid = s++),
                    (o.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/),
                    o.registerBreakpoints(),
                    o.init(!0);
            })).prototype.activateADA = function () {
                this.$slideTrack.find(".slick-active").attr({ "aria-hidden": "false" }).find("a, input, button, select").attr({ tabindex: "0" });
            }),
            (r.prototype.addSlide = r.prototype.slickAdd = function (e, t, i) {
                var o = this;
                if ("boolean" == typeof t) (i = t), (t = null);
                else if (t < 0 || t >= o.slideCount) return !1;
                o.unload(),
                    "number" == typeof t
                        ? 0 === t && 0 === o.$slides.length
                            ? d(e).appendTo(o.$slideTrack)
                            : i
                                ? d(e).insertBefore(o.$slides.eq(t))
                                : d(e).insertAfter(o.$slides.eq(t))
                        : !0 === i
                            ? d(e).prependTo(o.$slideTrack)
                            : d(e).appendTo(o.$slideTrack),
                    (o.$slides = o.$slideTrack.children(this.options.slide)),
                    o.$slideTrack.children(this.options.slide).detach(),
                    o.$slideTrack.append(o.$slides),
                    o.$slides.each(function (e, t) {
                        d(t).attr("data-slick-index", e);
                    }),
                    (o.$slidesCache = o.$slides),
                    o.reinit();
            }),
            (r.prototype.animateHeight = function () {
                var e = this;
                if (1 === e.options.slidesToShow && !0 === e.options.adaptiveHeight && !1 === e.options.vertical) {
                    var t = e.$slides.eq(e.currentSlide).outerHeight(!0);
                    e.$list.animate({ height: t }, e.options.speed);
                }
            }),
            (r.prototype.animateSlide = function (e, t) {
                var i = {},
                    o = this;
                o.animateHeight(),
                    !0 === o.options.rtl && !1 === o.options.vertical && (e = -e),
                    !1 === o.transformsEnabled
                        ? !1 === o.options.vertical
                            ? o.$slideTrack.animate({ left: e }, o.options.speed, o.options.easing, t)
                            : o.$slideTrack.animate({ top: e }, o.options.speed, o.options.easing, t)
                        : !1 === o.cssTransitions
                            ? (!0 === o.options.rtl && (o.currentLeft = -o.currentLeft),
                                d({ animStart: o.currentLeft }).animate(
                                    { animStart: e },
                                    {
                                        duration: o.options.speed,
                                        easing: o.options.easing,
                                        step: function (e) {
                                            (e = Math.ceil(e)), !1 === o.options.vertical ? (i[o.animType] = "translate(" + e + "px, 0px)") : (i[o.animType] = "translate(0px," + e + "px)"), o.$slideTrack.css(i);
                                        },
                                        complete: function () {
                                            t && t.call();
                                        },
                                    }
                                ))
                            : (o.applyTransition(),
                                (e = Math.ceil(e)),
                                !1 === o.options.vertical ? (i[o.animType] = "translate3d(" + e + "px, 0px, 0px)") : (i[o.animType] = "translate3d(0px," + e + "px, 0px)"),
                                o.$slideTrack.css(i),
                                t &&
                                setTimeout(function () {
                                    o.disableTransition(), t.call();
                                }, o.options.speed));
            }),
            (r.prototype.getNavTarget = function () {
                var e = this.options.asNavFor;
                return e && null !== e && (e = d(e).not(this.$slider)), e;
            }),
            (r.prototype.asNavFor = function (t) {
                var e = this.getNavTarget();
                null !== e &&
                    "object" == typeof e &&
                    e.each(function () {
                        var e = d(this).slick("getSlick");
                        e.unslicked || e.slideHandler(t, !0);
                    });
            }),
            (r.prototype.applyTransition = function (e) {
                var t = this,
                    i = {};
                !1 === t.options.fade ? (i[t.transitionType] = t.transformType + " " + t.options.speed + "ms " + t.options.cssEase) : (i[t.transitionType] = "opacity " + t.options.speed + "ms " + t.options.cssEase),
                    !1 === t.options.fade ? t.$slideTrack.css(i) : t.$slides.eq(e).css(i);
            }),
            (r.prototype.autoPlay = function () {
                var e = this;
                e.autoPlayClear(), e.slideCount > e.options.slidesToShow && (e.autoPlayTimer = setInterval(e.autoPlayIterator, e.options.autoplaySpeed));
            }),
            (r.prototype.autoPlayClear = function () {
                this.autoPlayTimer && clearInterval(this.autoPlayTimer);
            }),
            (r.prototype.autoPlayIterator = function () {
                var e = this,
                    t = e.currentSlide + e.options.slidesToScroll;
                e.paused ||
                    e.interrupted ||
                    e.focussed ||
                    (!1 === e.options.infinite &&
                        (1 === e.direction && e.currentSlide + 1 === e.slideCount - 1 ? (e.direction = 0) : 0 === e.direction && ((t = e.currentSlide - e.options.slidesToScroll), e.currentSlide - 1 == 0 && (e.direction = 1))),
                        e.slideHandler(t));
            }),
            (r.prototype.buildArrows = function () {
                var e = this;
                !0 === e.options.arrows &&
                    ((e.$prevArrow = d(e.options.prevArrow).addClass("slick-arrow")),
                        (e.$nextArrow = d(e.options.nextArrow).addClass("slick-arrow")),
                        e.slideCount > e.options.slidesToShow
                            ? (e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),
                                e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),
                                e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.prependTo(e.options.appendArrows),
                                e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.appendTo(e.options.appendArrows),
                                !0 !== e.options.infinite && e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"))
                            : e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({ "aria-disabled": "true", tabindex: "-1" }));
            }),
            (r.prototype.buildDots = function () {
                var e,
                    t,
                    i = this;
                if (!0 === i.options.dots) {
                    for (i.$slider.addClass("slick-dotted"), t = d("<ul />").addClass(i.options.dotsClass), e = 0; e <= i.getDotCount(); e += 1) t.append(d("<li />").append(i.options.customPaging.call(this, i, e)));
                    (i.$dots = t.appendTo(i.options.appendDots)), i.$dots.find("li").first().addClass("slick-active");
                }
            }),
            (r.prototype.buildOut = function () {
                var e = this;
                (e.$slides = e.$slider.children(e.options.slide + ":not(.slick-cloned)").addClass("slick-slide")),
                    (e.slideCount = e.$slides.length),
                    e.$slides.each(function (e, t) {
                        d(t)
                            .attr("data-slick-index", e)
                            .data("originalStyling", d(t).attr("style") || "");
                    }),
                    e.$slider.addClass("slick-slider"),
                    (e.$slideTrack = 0 === e.slideCount ? d('<div class="slick-track"/>').appendTo(e.$slider) : e.$slides.wrapAll('<div class="slick-track"/>').parent()),
                    (e.$list = e.$slideTrack.wrap('<div class="slick-list"/>').parent()),
                    e.$slideTrack.css("opacity", 0),
                    (!0 !== e.options.centerMode && !0 !== e.options.swipeToSlide) || (e.options.slidesToScroll = 1),
                    d("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"),
                    e.setupInfinite(),
                    e.buildArrows(),
                    e.buildDots(),
                    e.updateDots(),
                    e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0),
                    !0 === e.options.draggable && e.$list.addClass("draggable");
            }),
            (r.prototype.buildRows = function () {
                var e,
                    t,
                    i,
                    o,
                    s,
                    n,
                    r,
                    a = this;
                if (((o = document.createDocumentFragment()), (n = a.$slider.children()), 1 < a.options.rows)) {
                    for (r = a.options.slidesPerRow * a.options.rows, s = Math.ceil(n.length / r), e = 0; e < s; e++) {
                        var l = document.createElement("div");
                        for (t = 0; t < a.options.rows; t++) {
                            var d = document.createElement("div");
                            for (i = 0; i < a.options.slidesPerRow; i++) {
                                var c = e * r + (t * a.options.slidesPerRow + i);
                                n.get(c) && d.appendChild(n.get(c));
                            }
                            l.appendChild(d);
                        }
                        o.appendChild(l);
                    }
                    a.$slider.empty().append(o),
                        a.$slider
                            .children()
                            .children()
                            .children()
                            .css({ width: 100 / a.options.slidesPerRow + "%", display: "inline-block" });
                }
            }),
            (r.prototype.checkResponsive = function (e, t) {
                var i,
                    o,
                    s,
                    n = this,
                    r = !1,
                    a = n.$slider.width(),
                    l = window.innerWidth || d(window).width();
                if (("window" === n.respondTo ? (s = l) : "slider" === n.respondTo ? (s = a) : "min" === n.respondTo && (s = Math.min(l, a)), n.options.responsive && n.options.responsive.length && null !== n.options.responsive)) {
                    for (i in ((o = null), n.breakpoints)) n.breakpoints.hasOwnProperty(i) && (!1 === n.originalSettings.mobileFirst ? s < n.breakpoints[i] && (o = n.breakpoints[i]) : s > n.breakpoints[i] && (o = n.breakpoints[i]));
                    null !== o
                        ? null !== n.activeBreakpoint
                            ? (o !== n.activeBreakpoint || t) &&
                            ((n.activeBreakpoint = o),
                                "unslick" === n.breakpointSettings[o] ? n.unslick(o) : ((n.options = d.extend({}, n.originalSettings, n.breakpointSettings[o])), !0 === e && (n.currentSlide = n.options.initialSlide), n.refresh(e)),
                                (r = o))
                            : ((n.activeBreakpoint = o),
                                "unslick" === n.breakpointSettings[o] ? n.unslick(o) : ((n.options = d.extend({}, n.originalSettings, n.breakpointSettings[o])), !0 === e && (n.currentSlide = n.options.initialSlide), n.refresh(e)),
                                (r = o))
                        : null !== n.activeBreakpoint && ((n.activeBreakpoint = null), (n.options = n.originalSettings), !0 === e && (n.currentSlide = n.options.initialSlide), n.refresh(e), (r = o)),
                        e || !1 === r || n.$slider.trigger("breakpoint", [n, r]);
                }
            }),
            (r.prototype.changeSlide = function (e, t) {
                var i,
                    o,
                    s = this,
                    n = d(e.currentTarget);
                switch ((n.is("a") && e.preventDefault(), n.is("li") || (n = n.closest("li")), (i = s.slideCount % s.options.slidesToScroll != 0 ? 0 : (s.slideCount - s.currentSlide) % s.options.slidesToScroll), e.data.message)) {
                    case "previous":
                        (o = 0 === i ? s.options.slidesToScroll : s.options.slidesToShow - i), s.slideCount > s.options.slidesToShow && s.slideHandler(s.currentSlide - o, !1, t);
                        break;
                    case "next":
                        (o = 0 === i ? s.options.slidesToScroll : i), s.slideCount > s.options.slidesToShow && s.slideHandler(s.currentSlide + o, !1, t);
                        break;
                    case "index":
                        var r = 0 === e.data.index ? 0 : e.data.index || n.index() * s.options.slidesToScroll;
                        s.slideHandler(s.checkNavigable(r), !1, t), n.children().trigger("focus");
                        break;
                    default:
                        return;
                }
            }),
            (r.prototype.checkNavigable = function (e) {
                var t, i;
                if (((i = 0), e > (t = this.getNavigableIndexes())[t.length - 1])) e = t[t.length - 1];
                else
                    for (var o in t) {
                        if (e < t[o]) {
                            e = i;
                            break;
                        }
                        i = t[o];
                    }
                return e;
            }),
            (r.prototype.cleanUpEvents = function () {
                var e = this;
                e.options.dots &&
                    null !== e.$dots &&
                    (d("li", e.$dots).off("click.slick", e.changeSlide).off("mouseenter.slick", d.proxy(e.interrupt, e, !0)).off("mouseleave.slick", d.proxy(e.interrupt, e, !1)),
                        !0 === e.options.accessibility && e.$dots.off("keydown.slick", e.keyHandler)),
                    e.$slider.off("focus.slick blur.slick"),
                    !0 === e.options.arrows &&
                    e.slideCount > e.options.slidesToShow &&
                    (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide),
                        e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide),
                        !0 === e.options.accessibility && (e.$prevArrow && e.$prevArrow.off("keydown.slick", e.keyHandler), e.$nextArrow && e.$nextArrow.off("keydown.slick", e.keyHandler))),
                    e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler),
                    e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler),
                    e.$list.off("touchend.slick mouseup.slick", e.swipeHandler),
                    e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler),
                    e.$list.off("click.slick", e.clickHandler),
                    d(document).off(e.visibilityChange, e.visibility),
                    e.cleanUpSlideEvents(),
                    !0 === e.options.accessibility && e.$list.off("keydown.slick", e.keyHandler),
                    !0 === e.options.focusOnSelect && d(e.$slideTrack).children().off("click.slick", e.selectHandler),
                    d(window).off("orientationchange.slick.slick-" + e.instanceUid, e.orientationChange),
                    d(window).off("resize.slick.slick-" + e.instanceUid, e.resize),
                    d("[draggable!=true]", e.$slideTrack).off("dragstart", e.preventDefault),
                    d(window).off("load.slick.slick-" + e.instanceUid, e.setPosition);
            }),
            (r.prototype.cleanUpSlideEvents = function () {
                var e = this;
                e.$list.off("mouseenter.slick", d.proxy(e.interrupt, e, !0)), e.$list.off("mouseleave.slick", d.proxy(e.interrupt, e, !1));
            }),
            (r.prototype.cleanUpRows = function () {
                var e;
                1 < this.options.rows && ((e = this.$slides.children().children()).removeAttr("style"), this.$slider.empty().append(e));
            }),
            (r.prototype.clickHandler = function (e) {
                !1 === this.shouldClick && (e.stopImmediatePropagation(), e.stopPropagation(), e.preventDefault());
            }),
            (r.prototype.destroy = function (e) {
                var t = this;
                t.autoPlayClear(),
                    (t.touchObject = {}),
                    t.cleanUpEvents(),
                    d(".slick-cloned", t.$slider).detach(),
                    t.$dots && t.$dots.remove(),
                    t.$prevArrow &&
                    t.$prevArrow.length &&
                    (t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove()),
                    t.$nextArrow &&
                    t.$nextArrow.length &&
                    (t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove()),
                    t.$slides &&
                    (t.$slides
                        .removeClass("slick-slide slick-active slick-center slick-visible slick-current")
                        .removeAttr("aria-hidden")
                        .removeAttr("data-slick-index")
                        .each(function () {
                            d(this).attr("style", d(this).data("originalStyling"));
                        }),
                        t.$slideTrack.children(this.options.slide).detach(),
                        t.$slideTrack.detach(),
                        t.$list.detach(),
                        t.$slider.append(t.$slides)),
                    t.cleanUpRows(),
                    t.$slider.removeClass("slick-slider"),
                    t.$slider.removeClass("slick-initialized"),
                    t.$slider.removeClass("slick-dotted"),
                    (t.unslicked = !0),
                    e || t.$slider.trigger("destroy", [t]);
            }),
            (r.prototype.disableTransition = function (e) {
                var t = {};
                (t[this.transitionType] = ""), !1 === this.options.fade ? this.$slideTrack.css(t) : this.$slides.eq(e).css(t);
            }),
            (r.prototype.fadeSlide = function (e, t) {
                var i = this;
                !1 === i.cssTransitions
                    ? (i.$slides.eq(e).css({ zIndex: i.options.zIndex }), i.$slides.eq(e).animate({ opacity: 1 }, i.options.speed, i.options.easing, t))
                    : (i.applyTransition(e),
                        i.$slides.eq(e).css({ opacity: 1, zIndex: i.options.zIndex }),
                        t &&
                        setTimeout(function () {
                            i.disableTransition(e), t.call();
                        }, i.options.speed));
            }),
            (r.prototype.fadeSlideOut = function (e) {
                var t = this;
                !1 === t.cssTransitions ? t.$slides.eq(e).animate({ opacity: 0, zIndex: t.options.zIndex - 2 }, t.options.speed, t.options.easing) : (t.applyTransition(e), t.$slides.eq(e).css({ opacity: 0, zIndex: t.options.zIndex - 2 }));
            }),
            (r.prototype.filterSlides = r.prototype.slickFilter = function (e) {
                var t = this;
                null !== e && ((t.$slidesCache = t.$slides), t.unload(), t.$slideTrack.children(this.options.slide).detach(), t.$slidesCache.filter(e).appendTo(t.$slideTrack), t.reinit());
            }),
            (r.prototype.focusHandler = function () {
                var i = this;
                i.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*", function (e) {
                    e.stopImmediatePropagation();
                    var t = d(this);
                    setTimeout(function () {
                        i.options.pauseOnFocus && ((i.focussed = t.is(":focus")), i.autoPlay());
                    }, 0);
                });
            }),
            (r.prototype.getCurrent = r.prototype.slickCurrentSlide = function () {
                return this.currentSlide;
            }),
            (r.prototype.getDotCount = function () {
                var e = this,
                    t = 0,
                    i = 0,
                    o = 0;
                if (!0 === e.options.infinite)
                    if (e.slideCount <= e.options.slidesToShow) ++o;
                    else for (; t < e.slideCount;) ++o, (t = i + e.options.slidesToScroll), (i += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow);
                else if (!0 === e.options.centerMode) o = e.slideCount;
                else if (e.options.asNavFor) for (; t < e.slideCount;) ++o, (t = i + e.options.slidesToScroll), (i += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow);
                else o = 1 + Math.ceil((e.slideCount - e.options.slidesToShow) / e.options.slidesToScroll);
                return o - 1;
            }),
            (r.prototype.getLeft = function (e) {
                var t,
                    i,
                    o,
                    s,
                    n = this,
                    r = 0;
                return (
                    (n.slideOffset = 0),
                    (i = n.$slides.first().outerHeight(!0)),
                    !0 === n.options.infinite
                        ? (n.slideCount > n.options.slidesToShow &&
                            ((n.slideOffset = n.slideWidth * n.options.slidesToShow * -1),
                                (s = -1),
                                !0 === n.options.vertical && !0 === n.options.centerMode && (2 === n.options.slidesToShow ? (s = -1.5) : 1 === n.options.slidesToShow && (s = -2)),
                                (r = i * n.options.slidesToShow * s)),
                            n.slideCount % n.options.slidesToScroll != 0 &&
                            e + n.options.slidesToScroll > n.slideCount &&
                            n.slideCount > n.options.slidesToShow &&
                            (e > n.slideCount
                                ? ((n.slideOffset = (n.options.slidesToShow - (e - n.slideCount)) * n.slideWidth * -1), (r = (n.options.slidesToShow - (e - n.slideCount)) * i * -1))
                                : ((n.slideOffset = (n.slideCount % n.options.slidesToScroll) * n.slideWidth * -1), (r = (n.slideCount % n.options.slidesToScroll) * i * -1))))
                        : e + n.options.slidesToShow > n.slideCount && ((n.slideOffset = (e + n.options.slidesToShow - n.slideCount) * n.slideWidth), (r = (e + n.options.slidesToShow - n.slideCount) * i)),
                    n.slideCount <= n.options.slidesToShow && (r = n.slideOffset = 0),
                    !0 === n.options.centerMode && n.slideCount <= n.options.slidesToShow
                        ? (n.slideOffset = (n.slideWidth * Math.floor(n.options.slidesToShow)) / 2 - (n.slideWidth * n.slideCount) / 2)
                        : !0 === n.options.centerMode && !0 === n.options.infinite
                            ? (n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2) - n.slideWidth)
                            : !0 === n.options.centerMode && ((n.slideOffset = 0), (n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2))),
                    (t = !1 === n.options.vertical ? e * n.slideWidth * -1 + n.slideOffset : e * i * -1 + r),
                    !0 === n.options.variableWidth &&
                    ((o = n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite ? n.$slideTrack.children(".slick-slide").eq(e) : n.$slideTrack.children(".slick-slide").eq(e + n.options.slidesToShow)),
                        (t = !0 === n.options.rtl ? (o[0] ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0) : o[0] ? -1 * o[0].offsetLeft : 0),
                        !0 === n.options.centerMode &&
                        ((o = n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite ? n.$slideTrack.children(".slick-slide").eq(e) : n.$slideTrack.children(".slick-slide").eq(e + n.options.slidesToShow + 1)),
                            (t = !0 === n.options.rtl ? (o[0] ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0) : o[0] ? -1 * o[0].offsetLeft : 0),
                            (t += (n.$list.width() - o.outerWidth()) / 2))),
                    t
                );
            }),
            (r.prototype.getOption = r.prototype.slickGetOption = function (e) {
                return this.options[e];
            }),
            (r.prototype.getNavigableIndexes = function () {
                var e,
                    t = this,
                    i = 0,
                    o = 0,
                    s = [];
                for (!1 === t.options.infinite ? (e = t.slideCount) : ((i = -1 * t.options.slidesToScroll), (o = -1 * t.options.slidesToScroll), (e = 2 * t.slideCount)); i < e;)
                    s.push(i), (i = o + t.options.slidesToScroll), (o += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow);
                return s;
            }),
            (r.prototype.getSlick = function () {
                return this;
            }),
            (r.prototype.getSlideCount = function () {
                var i,
                    o,
                    s = this;
                return (
                    (o = !0 === s.options.centerMode ? s.slideWidth * Math.floor(s.options.slidesToShow / 2) : 0),
                    !0 === s.options.swipeToSlide
                        ? (s.$slideTrack.find(".slick-slide").each(function (e, t) {
                            if (t.offsetLeft - o + d(t).outerWidth() / 2 > -1 * s.swipeLeft) return (i = t), !1;
                        }),
                            Math.abs(d(i).attr("data-slick-index") - s.currentSlide) || 1)
                        : s.options.slidesToScroll
                );
            }),
            (r.prototype.goTo = r.prototype.slickGoTo = function (e, t) {
                this.changeSlide({ data: { message: "index", index: parseInt(e) } }, t);
            }),
            (r.prototype.init = function (e) {
                var t = this;
                d(t.$slider).hasClass("slick-initialized") ||
                    (d(t.$slider).addClass("slick-initialized"), t.buildRows(), t.buildOut(), t.setProps(), t.startLoad(), t.loadSlider(), t.initializeEvents(), t.updateArrows(), t.updateDots(), t.checkResponsive(!0), t.focusHandler()),
                    e && t.$slider.trigger("init", [t]),
                    !0 === t.options.accessibility && t.initADA(),
                    t.options.autoplay && ((t.paused = !1), t.autoPlay());
            }),
            (r.prototype.initADA = function () {
                var i = this,
                    o = Math.ceil(i.slideCount / i.options.slidesToShow),
                    s = i.getNavigableIndexes().filter(function (e) {
                        return 0 <= e && e < i.slideCount;
                    });
                i.$slides.add(i.$slideTrack.find(".slick-cloned")).attr({ "aria-hidden": "true", tabindex: "-1" }).find("a, input, button, select").attr({ tabindex: "-1" }),
                    null !== i.$dots &&
                    (i.$slides.not(i.$slideTrack.find(".slick-cloned")).each(function (e) {
                        var t = s.indexOf(e);
                        d(this).attr({ role: "tabpanel", id: "slick-slide" + i.instanceUid + e, tabindex: -1 }), -1 !== t && d(this).attr({ "aria-describedby": "slick-slide-control" + i.instanceUid + t });
                    }),
                        i.$dots
                            .attr("role", "tablist")
                            .find("li")
                            .each(function (e) {
                                var t = s[e];
                                d(this).attr({ role: "presentation" }),
                                    d(this)
                                        .find("button")
                                        .first()
                                        .attr({ role: "tab", id: "slick-slide-control" + i.instanceUid + e, "aria-controls": "slick-slide" + i.instanceUid + t, "aria-label": e + 1 + " of " + o, "aria-selected": null, tabindex: "-1" });
                            })
                            .eq(i.currentSlide)
                            .find("button")
                            .attr({ "aria-selected": "true", tabindex: "0" })
                            .end());
                for (var e = i.currentSlide, t = e + i.options.slidesToShow; e < t; e++) i.$slides.eq(e).attr("tabindex", 0);
                i.activateADA();
            }),
            (r.prototype.initArrowEvents = function () {
                var e = this;
                !0 === e.options.arrows &&
                    e.slideCount > e.options.slidesToShow &&
                    (e.$prevArrow.off("click.slick").on("click.slick", { message: "previous" }, e.changeSlide),
                        e.$nextArrow.off("click.slick").on("click.slick", { message: "next" }, e.changeSlide),
                        !0 === e.options.accessibility && (e.$prevArrow.on("keydown.slick", e.keyHandler), e.$nextArrow.on("keydown.slick", e.keyHandler)));
            }),
            (r.prototype.initDotEvents = function () {
                var e = this;
                !0 === e.options.dots && (d("li", e.$dots).on("click.slick", { message: "index" }, e.changeSlide), !0 === e.options.accessibility && e.$dots.on("keydown.slick", e.keyHandler)),
                    !0 === e.options.dots && !0 === e.options.pauseOnDotsHover && d("li", e.$dots).on("mouseenter.slick", d.proxy(e.interrupt, e, !0)).on("mouseleave.slick", d.proxy(e.interrupt, e, !1));
            }),
            (r.prototype.initSlideEvents = function () {
                var e = this;
                e.options.pauseOnHover && (e.$list.on("mouseenter.slick", d.proxy(e.interrupt, e, !0)), e.$list.on("mouseleave.slick", d.proxy(e.interrupt, e, !1)));
            }),
            (r.prototype.initializeEvents = function () {
                var e = this;
                e.initArrowEvents(),
                    e.initDotEvents(),
                    e.initSlideEvents(),
                    e.$list.on("touchstart.slick mousedown.slick", { action: "start" }, e.swipeHandler),
                    e.$list.on("touchmove.slick mousemove.slick", { action: "move" }, e.swipeHandler),
                    e.$list.on("touchend.slick mouseup.slick", { action: "end" }, e.swipeHandler),
                    e.$list.on("touchcancel.slick mouseleave.slick", { action: "end" }, e.swipeHandler),
                    e.$list.on("click.slick", e.clickHandler),
                    d(document).on(e.visibilityChange, d.proxy(e.visibility, e)),
                    !0 === e.options.accessibility && e.$list.on("keydown.slick", e.keyHandler),
                    !0 === e.options.focusOnSelect && d(e.$slideTrack).children().on("click.slick", e.selectHandler),
                    d(window).on("orientationchange.slick.slick-" + e.instanceUid, d.proxy(e.orientationChange, e)),
                    d(window).on("resize.slick.slick-" + e.instanceUid, d.proxy(e.resize, e)),
                    d("[draggable!=true]", e.$slideTrack).on("dragstart", e.preventDefault),
                    d(window).on("load.slick.slick-" + e.instanceUid, e.setPosition),
                    d(e.setPosition);
            }),
            (r.prototype.initUI = function () {
                var e = this;
                !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow.show(), e.$nextArrow.show()), !0 === e.options.dots && e.slideCount > e.options.slidesToShow && e.$dots.show();
            }),
            (r.prototype.keyHandler = function (e) {
                var t = this;
                e.target.tagName.match("TEXTAREA|INPUT|SELECT") ||
                    (37 === e.keyCode && !0 === t.options.accessibility
                        ? t.changeSlide({ data: { message: !0 === t.options.rtl ? "next" : "previous" } })
                        : 39 === e.keyCode && !0 === t.options.accessibility && t.changeSlide({ data: { message: !0 === t.options.rtl ? "previous" : "next" } }));
            }),
            (r.prototype.lazyLoad = function () {
                function e(e) {
                    d("img[data-lazy]", e).each(function () {
                        var e = d(this),
                            t = d(this).attr("data-lazy"),
                            i = d(this).attr("data-srcset"),
                            o = d(this).attr("data-sizes") || n.$slider.attr("data-sizes"),
                            s = document.createElement("img");
                        (s.onload = function () {
                            e.animate({ opacity: 0 }, 100, function () {
                                i && (e.attr("srcset", i), o && e.attr("sizes", o)),
                                    e.attr("src", t).animate({ opacity: 1 }, 200, function () {
                                        e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading");
                                    }),
                                    n.$slider.trigger("lazyLoaded", [n, e, t]);
                            });
                        }),
                            (s.onerror = function () {
                                e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), n.$slider.trigger("lazyLoadError", [n, e, t]);
                            }),
                            (s.src = t);
                    });
                }
                var t,
                    i,
                    o,
                    n = this;
                if (
                    (!0 === n.options.centerMode
                        ? !0 === n.options.infinite
                            ? (o = (i = n.currentSlide + (n.options.slidesToShow / 2 + 1)) + n.options.slidesToShow + 2)
                            : ((i = Math.max(0, n.currentSlide - (n.options.slidesToShow / 2 + 1))), (o = n.options.slidesToShow / 2 + 1 + 2 + n.currentSlide))
                        : ((i = n.options.infinite ? n.options.slidesToShow + n.currentSlide : n.currentSlide), (o = Math.ceil(i + n.options.slidesToShow)), !0 === n.options.fade && (0 < i && i--, o <= n.slideCount && o++)),
                        (t = n.$slider.find(".slick-slide").slice(i, o)),
                        "anticipated" === n.options.lazyLoad)
                )
                    for (var s = i - 1, r = o, a = n.$slider.find(".slick-slide"), l = 0; l < n.options.slidesToScroll; l++) s < 0 && (s = n.slideCount - 1), (t = (t = t.add(a.eq(s))).add(a.eq(r))), s--, r++;
                e(t),
                    n.slideCount <= n.options.slidesToShow
                        ? e(n.$slider.find(".slick-slide"))
                        : n.currentSlide >= n.slideCount - n.options.slidesToShow
                            ? e(n.$slider.find(".slick-cloned").slice(0, n.options.slidesToShow))
                            : 0 === n.currentSlide && e(n.$slider.find(".slick-cloned").slice(-1 * n.options.slidesToShow));
            }),
            (r.prototype.loadSlider = function () {
                var e = this;
                e.setPosition(), e.$slideTrack.css({ opacity: 1 }), e.$slider.removeClass("slick-loading"), e.initUI(), "progressive" === e.options.lazyLoad && e.progressiveLazyLoad();
            }),
            (r.prototype.next = r.prototype.slickNext = function () {
                this.changeSlide({ data: { message: "next" } });
            }),
            (r.prototype.orientationChange = function () {
                this.checkResponsive(), this.setPosition();
            }),
            (r.prototype.pause = r.prototype.slickPause = function () {
                this.autoPlayClear(), (this.paused = !0);
            }),
            (r.prototype.play = r.prototype.slickPlay = function () {
                var e = this;
                e.autoPlay(), (e.options.autoplay = !0), (e.paused = !1), (e.focussed = !1), (e.interrupted = !1);
            }),
            (r.prototype.postSlide = function (e) {
                var t = this;
                t.unslicked ||
                    (t.$slider.trigger("afterChange", [t, e]),
                        (t.animating = !1),
                        t.slideCount > t.options.slidesToShow && t.setPosition(),
                        (t.swipeLeft = null),
                        t.options.autoplay && t.autoPlay(),
                        !0 === t.options.accessibility && (t.initADA(), t.options.focusOnChange && d(t.$slides.get(t.currentSlide)).attr("tabindex", 0).focus()));
            }),
            (r.prototype.prev = r.prototype.slickPrev = function () {
                this.changeSlide({ data: { message: "previous" } });
            }),
            (r.prototype.preventDefault = function (e) {
                e.preventDefault();
            }),
            (r.prototype.progressiveLazyLoad = function (e) {
                e = e || 1;
                var t,
                    i,
                    o,
                    s,
                    n,
                    r = this,
                    a = d("img[data-lazy]", r.$slider);
                a.length
                    ? ((t = a.first()),
                        (i = t.attr("data-lazy")),
                        (o = t.attr("data-srcset")),
                        (s = t.attr("data-sizes") || r.$slider.attr("data-sizes")),
                        ((n = document.createElement("img")).onload = function () {
                            o && (t.attr("srcset", o), s && t.attr("sizes", s)),
                                t.attr("src", i).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"),
                                !0 === r.options.adaptiveHeight && r.setPosition(),
                                r.$slider.trigger("lazyLoaded", [r, t, i]),
                                r.progressiveLazyLoad();
                        }),
                        (n.onerror = function () {
                            e < 3
                                ? setTimeout(function () {
                                    r.progressiveLazyLoad(e + 1);
                                }, 500)
                                : (t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), r.$slider.trigger("lazyLoadError", [r, t, i]), r.progressiveLazyLoad());
                        }),
                        (n.src = i))
                    : r.$slider.trigger("allImagesLoaded", [r]);
            }),
            (r.prototype.refresh = function (e) {
                var t,
                    i,
                    o = this;
                (i = o.slideCount - o.options.slidesToShow),
                    !o.options.infinite && o.currentSlide > i && (o.currentSlide = i),
                    o.slideCount <= o.options.slidesToShow && (o.currentSlide = 0),
                    (t = o.currentSlide),
                    o.destroy(!0),
                    d.extend(o, o.initials, { currentSlide: t }),
                    o.init(),
                    e || o.changeSlide({ data: { message: "index", index: t } }, !1);
            }),
            (r.prototype.registerBreakpoints = function () {
                var e,
                    t,
                    i,
                    o = this,
                    s = o.options.responsive || null;
                if ("array" === d.type(s) && s.length) {
                    for (e in ((o.respondTo = o.options.respondTo || "window"), s))
                        if (((i = o.breakpoints.length - 1), s.hasOwnProperty(e))) {
                            for (t = s[e].breakpoint; 0 <= i;) o.breakpoints[i] && o.breakpoints[i] === t && o.breakpoints.splice(i, 1), i--;
                            o.breakpoints.push(t), (o.breakpointSettings[t] = s[e].settings);
                        }
                    o.breakpoints.sort(function (e, t) {
                        return o.options.mobileFirst ? e - t : t - e;
                    });
                }
            }),
            (r.prototype.reinit = function () {
                var e = this;
                (e.$slides = e.$slideTrack.children(e.options.slide).addClass("slick-slide")),
                    (e.slideCount = e.$slides.length),
                    e.currentSlide >= e.slideCount && 0 !== e.currentSlide && (e.currentSlide = e.currentSlide - e.options.slidesToScroll),
                    e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0),
                    e.registerBreakpoints(),
                    e.setProps(),
                    e.setupInfinite(),
                    e.buildArrows(),
                    e.updateArrows(),
                    e.initArrowEvents(),
                    e.buildDots(),
                    e.updateDots(),
                    e.initDotEvents(),
                    e.cleanUpSlideEvents(),
                    e.initSlideEvents(),
                    e.checkResponsive(!1, !0),
                    !0 === e.options.focusOnSelect && d(e.$slideTrack).children().on("click.slick", e.selectHandler),
                    e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0),
                    e.setPosition(),
                    e.focusHandler(),
                    (e.paused = !e.options.autoplay),
                    e.autoPlay(),
                    e.$slider.trigger("reInit", [e]);
            }),
            (r.prototype.resize = function () {
                var e = this;
                d(window).width() !== e.windowWidth &&
                    (clearTimeout(e.windowDelay),
                        (e.windowDelay = window.setTimeout(function () {
                            (e.windowWidth = d(window).width()), e.checkResponsive(), e.unslicked || e.setPosition();
                        }, 50)));
            }),
            (r.prototype.removeSlide = r.prototype.slickRemove = function (e, t, i) {
                var o = this;
                if (((e = "boolean" == typeof e ? (!0 === (t = e) ? 0 : o.slideCount - 1) : !0 === t ? --e : e), o.slideCount < 1 || e < 0 || e > o.slideCount - 1)) return !1;
                o.unload(),
                    !0 === i ? o.$slideTrack.children().remove() : o.$slideTrack.children(this.options.slide).eq(e).remove(),
                    (o.$slides = o.$slideTrack.children(this.options.slide)),
                    o.$slideTrack.children(this.options.slide).detach(),
                    o.$slideTrack.append(o.$slides),
                    (o.$slidesCache = o.$slides),
                    o.reinit();
            }),
            (r.prototype.setCSS = function (e) {
                var t,
                    i,
                    o = this,
                    s = {};
                !0 === o.options.rtl && (e = -e),
                    (t = "left" == o.positionProp ? Math.ceil(e) + "px" : "0px"),
                    (i = "top" == o.positionProp ? Math.ceil(e) + "px" : "0px"),
                    (s[o.positionProp] = e),
                    !1 === o.transformsEnabled || ((s = {}), !1 === o.cssTransitions ? (s[o.animType] = "translate(" + t + ", " + i + ")") : (s[o.animType] = "translate3d(" + t + ", " + i + ", 0px)")),
                    o.$slideTrack.css(s);
            }),
            (r.prototype.setDimensions = function () {
                var e = this;
                !1 === e.options.vertical
                    ? !0 === e.options.centerMode && e.$list.css({ padding: "0px " + e.options.centerPadding })
                    : (e.$list.height(e.$slides.first().outerHeight(!0) * e.options.slidesToShow), !0 === e.options.centerMode && e.$list.css({ padding: e.options.centerPadding + " 0px" })),
                    (e.listWidth = e.$list.width()),
                    (e.listHeight = e.$list.height()),
                    !1 === e.options.vertical && !1 === e.options.variableWidth
                        ? ((e.slideWidth = Math.ceil(e.listWidth / e.options.slidesToShow)), e.$slideTrack.width(Math.ceil(e.slideWidth * e.$slideTrack.children(".slick-slide").length)))
                        : !0 === e.options.variableWidth
                            ? e.$slideTrack.width(5e3 * e.slideCount)
                            : ((e.slideWidth = Math.ceil(e.listWidth)), e.$slideTrack.height(Math.ceil(e.$slides.first().outerHeight(!0) * e.$slideTrack.children(".slick-slide").length)));
                var t = e.$slides.first().outerWidth(!0) - e.$slides.first().width();
                !1 === e.options.variableWidth && e.$slideTrack.children(".slick-slide").width(e.slideWidth - t);
            }),
            (r.prototype.setFade = function () {
                var i,
                    o = this;
                o.$slides.each(function (e, t) {
                    (i = o.slideWidth * e * -1),
                        !0 === o.options.rtl ? d(t).css({ position: "relative", right: i, top: 0, zIndex: o.options.zIndex - 2, opacity: 0 }) : d(t).css({ position: "relative", left: i, top: 0, zIndex: o.options.zIndex - 2, opacity: 0 });
                }),
                    o.$slides.eq(o.currentSlide).css({ zIndex: o.options.zIndex - 1, opacity: 1 });
            }),
            (r.prototype.setHeight = function () {
                var e = this;
                if (1 === e.options.slidesToShow && !0 === e.options.adaptiveHeight && !1 === e.options.vertical) {
                    var t = e.$slides.eq(e.currentSlide).outerHeight(!0);
                    e.$list.css("height", t);
                }
            }),
            (r.prototype.setOption = r.prototype.slickSetOption = function () {
                var e,
                    t,
                    i,
                    o,
                    s,
                    n = this,
                    r = !1;
                if (
                    ("object" === d.type(arguments[0])
                        ? ((i = arguments[0]), (r = arguments[1]), (s = "multiple"))
                        : "string" === d.type(arguments[0]) &&
                        ((i = arguments[0]), (o = arguments[1]), (r = arguments[2]), "responsive" === arguments[0] && "array" === d.type(arguments[1]) ? (s = "responsive") : void 0 !== arguments[1] && (s = "single")),
                        "single" === s)
                )
                    n.options[i] = o;
                else if ("multiple" === s)
                    d.each(i, function (e, t) {
                        n.options[e] = t;
                    });
                else if ("responsive" === s)
                    for (t in o)
                        if ("array" !== d.type(n.options.responsive)) n.options.responsive = [o[t]];
                        else {
                            for (e = n.options.responsive.length - 1; 0 <= e;) n.options.responsive[e].breakpoint === o[t].breakpoint && n.options.responsive.splice(e, 1), e--;
                            n.options.responsive.push(o[t]);
                        }
                r && (n.unload(), n.reinit());
            }),
            (r.prototype.setPosition = function () {
                var e = this;
                e.setDimensions(), e.setHeight(), !1 === e.options.fade ? e.setCSS(e.getLeft(e.currentSlide)) : e.setFade(), e.$slider.trigger("setPosition", [e]);
            }),
            (r.prototype.setProps = function () {
                var e = this,
                    t = document.body.style;
                (e.positionProp = !0 === e.options.vertical ? "top" : "left"),
                    "top" === e.positionProp ? e.$slider.addClass("slick-vertical") : e.$slider.removeClass("slick-vertical"),
                    (void 0 === t.WebkitTransition && void 0 === t.MozTransition && void 0 === t.msTransition) || (!0 === e.options.useCSS && (e.cssTransitions = !0)),
                    e.options.fade && ("number" == typeof e.options.zIndex ? e.options.zIndex < 3 && (e.options.zIndex = 3) : (e.options.zIndex = e.defaults.zIndex)),
                    void 0 !== t.OTransform && ((e.animType = "OTransform"), (e.transformType = "-o-transform"), (e.transitionType = "OTransition"), void 0 === t.perspectiveProperty && void 0 === t.webkitPerspective && (e.animType = !1)),
                    void 0 !== t.MozTransform &&
                    ((e.animType = "MozTransform"), (e.transformType = "-moz-transform"), (e.transitionType = "MozTransition"), void 0 === t.perspectiveProperty && void 0 === t.MozPerspective && (e.animType = !1)),
                    void 0 !== t.webkitTransform &&
                    ((e.animType = "webkitTransform"), (e.transformType = "-webkit-transform"), (e.transitionType = "webkitTransition"), void 0 === t.perspectiveProperty && void 0 === t.webkitPerspective && (e.animType = !1)),
                    void 0 !== t.msTransform && ((e.animType = "msTransform"), (e.transformType = "-ms-transform"), (e.transitionType = "msTransition"), void 0 === t.msTransform && (e.animType = !1)),
                    void 0 !== t.transform && !1 !== e.animType && ((e.animType = "transform"), (e.transformType = "transform"), (e.transitionType = "transition")),
                    (e.transformsEnabled = e.options.useTransform && null !== e.animType && !1 !== e.animType);
            }),
            (r.prototype.setSlideClasses = function (e) {
                var t,
                    i,
                    o,
                    s,
                    n = this;
                if (((i = n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true")), n.$slides.eq(e).addClass("slick-current"), !0 === n.options.centerMode)) {
                    var r = n.options.slidesToShow % 2 == 0 ? 1 : 0;
                    (t = Math.floor(n.options.slidesToShow / 2)),
                        !0 === n.options.infinite &&
                        (t <= e && e <= n.slideCount - 1 - t
                            ? n.$slides
                                .slice(e - t + r, e + t + 1)
                                .addClass("slick-active")
                                .attr("aria-hidden", "false")
                            : ((o = n.options.slidesToShow + e),
                                i
                                    .slice(o - t + 1 + r, o + t + 2)
                                    .addClass("slick-active")
                                    .attr("aria-hidden", "false")),
                            0 === e ? i.eq(i.length - 1 - n.options.slidesToShow).addClass("slick-center") : e === n.slideCount - 1 && i.eq(n.options.slidesToShow).addClass("slick-center")),
                        n.$slides.eq(e).addClass("slick-center");
                } else
                    0 <= e && e <= n.slideCount - n.options.slidesToShow
                        ? n.$slides
                            .slice(e, e + n.options.slidesToShow)
                            .addClass("slick-active")
                            .attr("aria-hidden", "false")
                        : i.length <= n.options.slidesToShow
                            ? i.addClass("slick-active").attr("aria-hidden", "false")
                            : ((s = n.slideCount % n.options.slidesToShow),
                                (o = !0 === n.options.infinite ? n.options.slidesToShow + e : e),
                                n.options.slidesToShow == n.options.slidesToScroll && n.slideCount - e < n.options.slidesToShow
                                    ? i
                                        .slice(o - (n.options.slidesToShow - s), o + s)
                                        .addClass("slick-active")
                                        .attr("aria-hidden", "false")
                                    : i
                                        .slice(o, o + n.options.slidesToShow)
                                        .addClass("slick-active")
                                        .attr("aria-hidden", "false"));
                ("ondemand" !== n.options.lazyLoad && "anticipated" !== n.options.lazyLoad) || n.lazyLoad();
            }),
            (r.prototype.setupInfinite = function () {
                var e,
                    t,
                    i,
                    o = this;
                if ((!0 === o.options.fade && (o.options.centerMode = !1), !0 === o.options.infinite && !1 === o.options.fade && ((t = null), o.slideCount > o.options.slidesToShow))) {
                    for (i = !0 === o.options.centerMode ? o.options.slidesToShow + 1 : o.options.slidesToShow, e = o.slideCount; e > o.slideCount - i; e -= 1)
                        (t = e - 1),
                            d(o.$slides[t])
                                .clone(!0)
                                .attr("id", "")
                                .attr("data-slick-index", t - o.slideCount)
                                .prependTo(o.$slideTrack)
                                .addClass("slick-cloned");
                    for (e = 0; e < i + o.slideCount; e += 1)
                        (t = e),
                            d(o.$slides[t])
                                .clone(!0)
                                .attr("id", "")
                                .attr("data-slick-index", t + o.slideCount)
                                .appendTo(o.$slideTrack)
                                .addClass("slick-cloned");
                    o.$slideTrack
                        .find(".slick-cloned")
                        .find("[id]")
                        .each(function () {
                            d(this).attr("id", "");
                        });
                }
            }),
            (r.prototype.interrupt = function (e) {
                e || this.autoPlay(), (this.interrupted = e);
            }),
            (r.prototype.selectHandler = function (e) {
                var t = d(e.target).is(".slick-slide") ? d(e.target) : d(e.target).parents(".slick-slide"),
                    i = parseInt(t.attr("data-slick-index"));
                i || (i = 0), this.slideCount <= this.options.slidesToShow ? this.slideHandler(i, !1, !0) : this.slideHandler(i);
            }),
            (r.prototype.slideHandler = function (e, t, i) {
                var o,
                    s,
                    n,
                    r,
                    a,
                    l = null,
                    d = this;
                if (((t = t || !1), !((!0 === d.animating && !0 === d.options.waitForAnimate) || (!0 === d.options.fade && d.currentSlide === e))))
                    if (
                        (!1 === t && d.asNavFor(e),
                            (o = e),
                            (l = d.getLeft(o)),
                            (r = d.getLeft(d.currentSlide)),
                            (d.currentLeft = null === d.swipeLeft ? r : d.swipeLeft),
                            !1 === d.options.infinite && !1 === d.options.centerMode && (e < 0 || e > d.getDotCount() * d.options.slidesToScroll))
                    )
                        !1 === d.options.fade &&
                            ((o = d.currentSlide),
                                !0 !== i
                                    ? d.animateSlide(r, function () {
                                        d.postSlide(o);
                                    })
                                    : d.postSlide(o));
                    else if (!1 === d.options.infinite && !0 === d.options.centerMode && (e < 0 || e > d.slideCount - d.options.slidesToScroll))
                        !1 === d.options.fade &&
                            ((o = d.currentSlide),
                                !0 !== i
                                    ? d.animateSlide(r, function () {
                                        d.postSlide(o);
                                    })
                                    : d.postSlide(o));
                    else {
                        if (
                            (d.options.autoplay && clearInterval(d.autoPlayTimer),
                                (s =
                                    o < 0
                                        ? d.slideCount % d.options.slidesToScroll != 0
                                            ? d.slideCount - (d.slideCount % d.options.slidesToScroll)
                                            : d.slideCount + o
                                        : o >= d.slideCount
                                            ? d.slideCount % d.options.slidesToScroll != 0
                                                ? 0
                                                : o - d.slideCount
                                            : o),
                                (d.animating = !0),
                                d.$slider.trigger("beforeChange", [d, d.currentSlide, s]),
                                (n = d.currentSlide),
                                (d.currentSlide = s),
                                d.setSlideClasses(d.currentSlide),
                                d.options.asNavFor && (a = (a = d.getNavTarget()).slick("getSlick")).slideCount <= a.options.slidesToShow && a.setSlideClasses(d.currentSlide),
                                d.updateDots(),
                                d.updateArrows(),
                                !0 === d.options.fade)
                        )
                            return (
                                !0 !== i
                                    ? (d.fadeSlideOut(n),
                                        d.fadeSlide(s, function () {
                                            d.postSlide(s);
                                        }))
                                    : d.postSlide(s),
                                void d.animateHeight()
                            );
                        !0 !== i
                            ? d.animateSlide(l, function () {
                                d.postSlide(s);
                            })
                            : d.postSlide(s);
                    }
            }),
            (r.prototype.startLoad = function () {
                var e = this;
                !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow.hide(), e.$nextArrow.hide()),
                    !0 === e.options.dots && e.slideCount > e.options.slidesToShow && e.$dots.hide(),
                    e.$slider.addClass("slick-loading");
            }),
            (r.prototype.swipeDirection = function () {
                var e,
                    t,
                    i,
                    o,
                    s = this;
                return (
                    (e = s.touchObject.startX - s.touchObject.curX),
                    (t = s.touchObject.startY - s.touchObject.curY),
                    (i = Math.atan2(t, e)),
                    (o = Math.round((180 * i) / Math.PI)) < 0 && (o = 360 - Math.abs(o)),
                    o <= 45 && 0 <= o
                        ? !1 === s.options.rtl
                            ? "left"
                            : "right"
                        : o <= 360 && 315 <= o
                            ? !1 === s.options.rtl
                                ? "left"
                                : "right"
                            : 135 <= o && o <= 225
                                ? !1 === s.options.rtl
                                    ? "right"
                                    : "left"
                                : !0 === s.options.verticalSwiping
                                    ? 35 <= o && o <= 135
                                        ? "down"
                                        : "up"
                                    : "vertical"
                );
            }),
            (r.prototype.swipeEnd = function (e) {
                var t,
                    i,
                    o = this;
                if (((o.dragging = !1), (o.swiping = !1), o.scrolling)) return (o.scrolling = !1);
                if (((o.interrupted = !1), (o.shouldClick = !(10 < o.touchObject.swipeLength)), void 0 === o.touchObject.curX)) return !1;
                if ((!0 === o.touchObject.edgeHit && o.$slider.trigger("edge", [o, o.swipeDirection()]), o.touchObject.swipeLength >= o.touchObject.minSwipe)) {
                    switch ((i = o.swipeDirection())) {
                        case "left":
                        case "down":
                            (t = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide + o.getSlideCount()) : o.currentSlide + o.getSlideCount()), (o.currentDirection = 0);
                            break;
                        case "right":
                        case "up":
                            (t = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide - o.getSlideCount()) : o.currentSlide - o.getSlideCount()), (o.currentDirection = 1);
                    }
                    "vertical" != i && (o.slideHandler(t), (o.touchObject = {}), o.$slider.trigger("swipe", [o, i]));
                } else o.touchObject.startX !== o.touchObject.curX && (o.slideHandler(o.currentSlide), (o.touchObject = {}));
            }),
            (r.prototype.swipeHandler = function (e) {
                var t = this;
                if (!(!1 === t.options.swipe || ("ontouchend" in document && !1 === t.options.swipe) || (!1 === t.options.draggable && -1 !== e.type.indexOf("mouse"))))
                    switch (
                    ((t.touchObject.fingerCount = e.originalEvent && void 0 !== e.originalEvent.touches ? e.originalEvent.touches.length : 1),
                        (t.touchObject.minSwipe = t.listWidth / t.options.touchThreshold),
                        !0 === t.options.verticalSwiping && (t.touchObject.minSwipe = t.listHeight / t.options.touchThreshold),
                        e.data.action)
                    ) {
                        case "start":
                            t.swipeStart(e);
                            break;
                        case "move":
                            t.swipeMove(e);
                            break;
                        case "end":
                            t.swipeEnd(e);
                    }
            }),
            (r.prototype.swipeMove = function (e) {
                var t,
                    i,
                    o,
                    s,
                    n,
                    r,
                    a = this;
                return (
                    (n = void 0 !== e.originalEvent ? e.originalEvent.touches : null),
                    !(!a.dragging || a.scrolling || (n && 1 !== n.length)) &&
                    ((t = a.getLeft(a.currentSlide)),
                        (a.touchObject.curX = void 0 !== n ? n[0].pageX : e.clientX),
                        (a.touchObject.curY = void 0 !== n ? n[0].pageY : e.clientY),
                        (a.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(a.touchObject.curX - a.touchObject.startX, 2)))),
                        (r = Math.round(Math.sqrt(Math.pow(a.touchObject.curY - a.touchObject.startY, 2)))),
                        !a.options.verticalSwiping && !a.swiping && 4 < r
                            ? ((a.scrolling = !0), !1)
                            : (!0 === a.options.verticalSwiping && (a.touchObject.swipeLength = r),
                                (i = a.swipeDirection()),
                                void 0 !== e.originalEvent && 4 < a.touchObject.swipeLength && ((a.swiping = !0), e.preventDefault()),
                                (s = (!1 === a.options.rtl ? 1 : -1) * (a.touchObject.curX > a.touchObject.startX ? 1 : -1)),
                                !0 === a.options.verticalSwiping && (s = a.touchObject.curY > a.touchObject.startY ? 1 : -1),
                                (o = a.touchObject.swipeLength),
                                (a.touchObject.edgeHit = !1) === a.options.infinite &&
                                ((0 === a.currentSlide && "right" === i) || (a.currentSlide >= a.getDotCount() && "left" === i)) &&
                                ((o = a.touchObject.swipeLength * a.options.edgeFriction), (a.touchObject.edgeHit = !0)),
                                !1 === a.options.vertical ? (a.swipeLeft = t + o * s) : (a.swipeLeft = t + o * (a.$list.height() / a.listWidth) * s),
                                !0 === a.options.verticalSwiping && (a.swipeLeft = t + o * s),
                                !0 !== a.options.fade && !1 !== a.options.touchMove && (!0 === a.animating ? ((a.swipeLeft = null), !1) : void a.setCSS(a.swipeLeft))))
                );
            }),
            (r.prototype.swipeStart = function (e) {
                var t,
                    i = this;
                if (((i.interrupted = !0), 1 !== i.touchObject.fingerCount || i.slideCount <= i.options.slidesToShow)) return (i.touchObject = {}), !1;
                void 0 !== e.originalEvent && void 0 !== e.originalEvent.touches && (t = e.originalEvent.touches[0]),
                    (i.touchObject.startX = i.touchObject.curX = void 0 !== t ? t.pageX : e.clientX),
                    (i.touchObject.startY = i.touchObject.curY = void 0 !== t ? t.pageY : e.clientY),
                    (i.dragging = !0);
            }),
            (r.prototype.unfilterSlides = r.prototype.slickUnfilter = function () {
                var e = this;
                null !== e.$slidesCache && (e.unload(), e.$slideTrack.children(this.options.slide).detach(), e.$slidesCache.appendTo(e.$slideTrack), e.reinit());
            }),
            (r.prototype.unload = function () {
                var e = this;
                d(".slick-cloned", e.$slider).remove(),
                    e.$dots && e.$dots.remove(),
                    e.$prevArrow && e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove(),
                    e.$nextArrow && e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove(),
                    e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "");
            }),
            (r.prototype.unslick = function (e) {
                this.$slider.trigger("unslick", [this, e]), this.destroy();
            }),
            (r.prototype.updateArrows = function () {
                var e = this;
                Math.floor(e.options.slidesToShow / 2),
                    !0 === e.options.arrows &&
                    e.slideCount > e.options.slidesToShow &&
                    !e.options.infinite &&
                    (e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"),
                        e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"),
                        0 === e.currentSlide
                            ? (e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"))
                            : e.currentSlide >= e.slideCount - e.options.slidesToShow && !1 === e.options.centerMode
                                ? (e.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"))
                                : e.currentSlide >= e.slideCount - 1 &&
                                !0 === e.options.centerMode &&
                                (e.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")));
            }),
            (r.prototype.updateDots = function () {
                var e = this;
                null !== e.$dots &&
                    (e.$dots.find("li").removeClass("slick-active").end(),
                        e.$dots
                            .find("li")
                            .eq(Math.floor(e.currentSlide / e.options.slidesToScroll))
                            .addClass("slick-active"));
            }),
            (r.prototype.visibility = function () {
                this.options.autoplay && (document[this.hidden] ? (this.interrupted = !0) : (this.interrupted = !1));
            }),
            (d.fn.slick = function () {
                var e,
                    t,
                    i = this,
                    o = arguments[0],
                    s = Array.prototype.slice.call(arguments, 1),
                    n = i.length;
                for (e = 0; e < n; e++) if (("object" == typeof o || void 0 === o ? (i[e].slick = new r(i[e], o)) : (t = i[e].slick[o].apply(i[e].slick, s)), void 0 !== t)) return t;
                return i;
            });
    }),
    (function (e, t, i) {
        function a(e, t) {
            return typeof e === t;
        }
        function n(e) {
            var t = u.className,
                i = c._config.classPrefix || "";
            if ((f && (t = t.baseVal), c._config.enableJSClass)) {
                var o = new RegExp("(^|\\s)" + i + "no-js(\\s|$)");
                t = t.replace(o, "$1" + i + "js$2");
            }
            c._config.enableClasses && ((t += " " + i + e.join(" " + i)), f ? (u.className.baseVal = t) : (u.className = t));
        }
        function r(e, t) {
            if ("object" == typeof e) for (var i in e) p(e, i) && r(i, e[i]);
            else {
                var o = (e = e.toLowerCase()).split("."),
                    s = c[o[0]];
                if ((2 == o.length && (s = s[o[1]]), void 0 !== s)) return c;
                (t = "function" == typeof t ? t() : t),
                    1 == o.length ? (c[o[0]] = t) : (!c[o[0]] || c[o[0]] instanceof Boolean || (c[o[0]] = new Boolean(c[o[0]])), (c[o[0]][o[1]] = t)),
                    n([(t && 0 != t ? "" : "no-") + o.join("-")]),
                    c._trigger(e, t);
            }
            return c;
        }
        var l = [],
            d = [],
            o = {
                _version: "3.4.0",
                _config: { classPrefix: "", enableClasses: !0, enableJSClass: !0, usePrefixes: !0 },
                _q: [],
                on: function (e, t) {
                    var i = this;
                    setTimeout(function () {
                        t(i[e]);
                    }, 0);
                },
                addTest: function (e, t, i) {
                    d.push({ name: e, fn: t, options: i });
                },
                addAsyncTest: function (e) {
                    d.push({ name: null, fn: e });
                },
            },
            c = function () { };
        (c.prototype = o), (c = new c());
        var p,
            s,
            u = t.documentElement,
            f = "svg" === u.nodeName.toLowerCase();
        (p =
            a((s = {}.hasOwnProperty), "undefined") || a(s.call, "undefined")
                ? function (e, t) {
                    return t in e && a(e.constructor.prototype[t], "undefined");
                }
                : function (e, t) {
                    return s.call(e, t);
                }),
            (o._l = {}),
            (o.on = function (e, t) {
                this._l[e] || (this._l[e] = []),
                    this._l[e].push(t),
                    c.hasOwnProperty(e) &&
                    setTimeout(function () {
                        c._trigger(e, c[e]);
                    }, 0);
            }),
            (o._trigger = function (e, t) {
                if (this._l[e]) {
                    var i = this._l[e];
                    setTimeout(function () {
                        var e;
                        for (e = 0; e < i.length; e++) (0, i[e])(t);
                    }, 0),
                        delete this._l[e];
                }
            }),
            c._q.push(function () {
                o.addTest = r;
            }),
            c.addTest("svgasimg", t.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1")),
            c.addTest("svg", !!t.createElementNS && !!t.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect),
            (function () {
                var e, t, i, o, s, n;
                for (var r in d)
                    if (d.hasOwnProperty(r)) {
                        if (((e = []), (t = d[r]).name && (e.push(t.name.toLowerCase()), t.options && t.options.aliases && t.options.aliases.length)))
                            for (i = 0; i < t.options.aliases.length; i++) e.push(t.options.aliases[i].toLowerCase());
                        for (o = a(t.fn, "function") ? t.fn() : t.fn, s = 0; s < e.length; s++)
                            1 === (n = e[s].split(".")).length ? (c[n[0]] = o) : (!c[n[0]] || c[n[0]] instanceof Boolean || (c[n[0]] = new Boolean(c[n[0]])), (c[n[0]][n[1]] = o)), l.push((o ? "" : "no-") + n.join("-"));
                    }
            })(),
            n(l),
            delete o.addTest,
            delete o.addAsyncTest;
        for (var h = 0; h < c._q.length; h++) c._q[h]();
        e.Modernizr = c;
    })(window, document);
