/*! Copyright 2013 Brightcove, Inc. https://github.com/videojs/video.js/blob/master/LICENSE */
(function () {
    var b = void 0,
        f = !0,
        h = null,
        l = !1;

    function m() {
        return function () {}
    }
    function p(a) {
        return function () {
            return this[a]
        }
    }
    function r(a) {
        return function () {
            return a
        }
    }
    var t;
    document.createElement("video");
    document.createElement("audio");

    function u(a, c, d) {
        if ("string" === typeof a) {
            0 === a.indexOf("#") && (a = a.slice(1));
            if (u.Na[a]) return u.Na[a];
            a = u.s(a)
        }
        if (!a || !a.nodeName) throw new TypeError("The element or ID supplied is not valid. (videojs)");
        return a.player || new u.ga(a, c, d)
    }
    var v = u;
    window.xd = window.yd = u;
    u.Qb = "GENERATED_CDN_VSN";
    u.Pb = "https:" == document.location.protocol ? "https://" : "http://";
    u.options = {
        techOrder: ["html5", "flash"],
        html5: {},
        flash: {
            swf: u.Pb + "vjs.zencdn.net/c/video-js.swf"
        },
        width: 300,
        height: 150,
        defaultVolume: 0,
        children: {
            mediaLoader: {},
            posterImage: {},
            textTrackDisplay: {},
            loadingSpinner: {},
            bigPlayButton: {},
            controlBar: {}
        }
    };
    u.Na = {};
    "GENERATED_CDN_VSN" != u.Qb && (v.options.flash.swf = u.Pb + "vjs.zencdn.net/" + u.Qb + "/video-js.swf");
    u.ma = u.CoreObject = m();
    u.ma.extend = function (a) {
        var c, d;
        a = a || {};
        c = a.init || a.g || this.prototype.init || this.prototype.g || m();
        d = function () {
            c.apply(this, arguments)
        };
        d.prototype = u.i.create(this.prototype);
        d.prototype.constructor = d;
        d.extend = u.ma.extend;
        d.create = u.ma.create;
        for (var e in a) a.hasOwnProperty(e) && (d.prototype[e] = a[e]);
        return d
    };
    u.ma.create = function () {
        var a = u.i.create(this.prototype);
        this.apply(a, arguments);
        return a
    };
    u.d = function (a, c, d) {
        var e = u.getData(a);
        e.z || (e.z = {});
        e.z[c] || (e.z[c] = []);
        d.u || (d.u = u.u++);
        e.z[c].push(d);
        e.S || (e.disabled = l, e.S = function (c) {
            if (!e.disabled) {
                c = u.hc(c);
                var d = e.z[c.type];
                if (d) for (var d = d.slice(0), k = 0, q = d.length; k < q && !c.mc(); k++) d[k].call(a, c)
            }
        });
        1 == e.z[c].length && (document.addEventListener ? a.addEventListener(c, e.S, l) : document.attachEvent && a.attachEvent("on" + c, e.S))
    };
    u.t = function (a, c, d) {
        if (u.lc(a)) {
            var e = u.getData(a);
            if (e.z) if (c) {
                var g = e.z[c];
                if (g) {
                    if (d) {
                        if (d.u) for (e = 0; e < g.length; e++) g[e].u === d.u && g.splice(e--, 1)
                    } else e.z[c] = [];
                    u.ec(a, c)
                }
            } else for (g in e.z) c = g, e.z[c] = [], u.ec(a, c)
        }
    };
    u.ec = function (a, c) {
        var d = u.getData(a);
        0 === d.z[c].length && (delete d.z[c], document.removeEventListener ? a.removeEventListener(c, d.S, l) : document.detachEvent && a.detachEvent("on" + c, d.S));
        u.Ab(d.z) && (delete d.z, delete d.S, delete d.disabled);
        u.Ab(d) && u.sc(a)
    };
    u.hc = function (a) {
        function c() {
            return f
        }
        function d() {
            return l
        }
        if (!a || !a.Bb) {
            var e = a || window.event;
            a = {};
            for (var g in e) a[g] = e[g];
            a.target || (a.target = a.srcElement || document);
            a.relatedTarget = a.fromElement === a.target ? a.toElement : a.fromElement;
            a.preventDefault = function () {
                e.preventDefault && e.preventDefault();
                a.returnValue = l;
                a.zb = c
            };
            a.zb = d;
            a.stopPropagation = function () {
                e.stopPropagation && e.stopPropagation();
                a.cancelBubble = f;
                a.Bb = c
            };
            a.Bb = d;
            a.stopImmediatePropagation = function () {
                e.stopImmediatePropagation && e.stopImmediatePropagation();
                a.mc = c;
                a.stopPropagation()
            };
            a.mc = d;
            if (a.clientX != h) {
                g = document.documentElement;
                var j = document.body;
                a.pageX = a.clientX + (g && g.scrollLeft || j && j.scrollLeft || 0) - (g && g.clientLeft || j && j.clientLeft || 0);
                a.pageY = a.clientY + (g && g.scrollTop || j && j.scrollTop || 0) - (g && g.clientTop || j && j.clientTop || 0)
            }
            a.which = a.charCode || a.keyCode;
            a.button != h && (a.button = a.button & 1 ? 0 : a.button & 4 ? 1 : a.button & 2 ? 2 : 0)
        }
        return a
    };
    u.k = function (a, c) {
        var d = u.lc(a) ? u.getData(a) : {}, e = a.parentNode || a.ownerDocument;
        "string" === typeof c && (c = {
            type: c,
            target: a
        });
        c = u.hc(c);
        d.S && d.S.call(a, c);
        if (e && !c.Bb()) u.k(e, c);
        else if (!e && !c.zb() && (d = u.getData(c.target), c.target[c.type])) {
            d.disabled = f;
            if ("function" === typeof c.target[c.type]) c.target[c.type]();
            d.disabled = l
        }
        return !c.zb()
    };
    u.Q = function (a, c, d) {
        u.d(a, c, function () {
            u.t(a, c, arguments.callee);
            d.apply(this, arguments)
        })
    };
    var w = Object.prototype.hasOwnProperty;
    u.e = function (a, c) {
        var d = document.createElement(a || "div"),
            e;
        for (e in c) w.call(c, e) && (-1 !== e.indexOf("aria-") || "role" == e ? d.setAttribute(e, c[e]) : d[e] = c[e]);
        return d
    };
    u.Y = function (a) {
        return a.charAt(0).toUpperCase() + a.slice(1)
    };
    u.i = {};
    u.i.create = Object.create || function (a) {
        function c() {}
        c.prototype = a;
        return new c
    };
    u.i.sa = function (a, c, d) {
        for (var e in a) w.call(a, e) && c.call(d || this, e, a[e])
    };
    u.i.B = function (a, c) {
        if (!c) return a;
        for (var d in c) w.call(c, d) && (a[d] = c[d]);
        return a
    };
    u.i.gc = function (a, c) {
        var d, e, g;
        a = u.i.copy(a);
        for (d in c) w.call(c, d) && (e = a[d], g = c[d], a[d] = u.i.nc(e) && u.i.nc(g) ? u.i.gc(e, g) : c[d]);
        return a
    };
    u.i.copy = function (a) {
        return u.i.B({}, a)
    };
    u.i.nc = function (a) {
        return !!a && "object" === typeof a && "[object Object]" === a.toString() && a.constructor === Object
    };
    u.bind = function (a, c, d) {
        function e() {
            return c.apply(a, arguments)
        }
        c.u || (c.u = u.u++);
        e.u = d ? d + "_" + c.u : c.u;
        return e
    };
    u.qa = {};
    u.u = 1;
    u.expando = "vdata" + (new Date).getTime();
    u.getData = function (a) {
        var c = a[u.expando];
        c || (c = a[u.expando] = u.u++, u.qa[c] = {});
        return u.qa[c]
    };
    u.lc = function (a) {
        a = a[u.expando];
        return !(!a || u.Ab(u.qa[a]))
    };
    u.sc = function (a) {
        var c = a[u.expando];
        if (c) {
            delete u.qa[c];
            try {
                delete a[u.expando]
            } catch (d) {
                a.removeAttribute ? a.removeAttribute(u.expando) : a[u.expando] = h
            }
        }
    };
    u.Ab = function (a) {
        for (var c in a) if (a[c] !== h) return l;
        return f
    };
    u.p = function (a, c) {
        -1 == (" " + a.className + " ").indexOf(" " + c + " ") && (a.className = "" === a.className ? c : a.className + " " + c)
    };
    u.w = function (a, c) {
        if (-1 != a.className.indexOf(c)) {
            for (var d = a.className.split(" "), e = d.length - 1; 0 <= e; e--) d[e] === c && d.splice(e, 1);
            a.className = d.join(" ")
        }
    };
    u.ib = u.e("video");
    u.O = navigator.userAgent;
    u.Bc = !! u.O.match(/iPhone/i);
    u.Ac = !! u.O.match(/iPad/i);
    u.Cc = !! u.O.match(/iPod/i);
    u.Ub = u.Bc || u.Ac || u.Cc;
    var aa = u,
        x;
    var y = u.O.match(/OS (\d+)_/i);
    x = y && y[1] ? y[1] : b;
    aa.qd = x;
    u.ab = !! u.O.match(/Android.*AppleWebKit/i);
    var ba = u,
        z = u.O.match(/Android (\d+)\./i);
    ba.yc = z && z[1] ? z[1] : h;
    u.zc = function () {
        return !!u.O.match("Firefox")
    };
    u.wb = function (a) {
        var c = {};
        if (a && a.attributes && 0 < a.attributes.length) for (var d = a.attributes, e, g, j = d.length - 1; 0 <= j; j--) {
            e = d[j].name;
            g = d[j].value;
            if ("boolean" === typeof a[e] || -1 !== ",autoplay,controls,loop,muted,default,".indexOf("," + e + ",")) g = g !== h ? f : l;
            c[e] = g
        }
        return c
    };
    u.td = function (a, c) {
        var d = "";
        document.defaultView && document.defaultView.getComputedStyle ? d = document.defaultView.getComputedStyle(a, "").getPropertyValue(c) : a.currentStyle && (d = a["client" + c.substr(0, 1).toUpperCase() + c.substr(1)] + "px");
        return d
    };
    u.yb = function (a, c) {
        c.firstChild ? c.insertBefore(a, c.firstChild) : c.appendChild(a)
    };
    u.Nb = {};
    u.s = function (a) {
        0 === a.indexOf("#") && (a = a.slice(1));
        return document.getElementById(a)
    };
    u.Ha = function (a, c) {
        c = c || a;
        var d = Math.floor(a % 60),
            e = Math.floor(a / 60 % 60),
            g = Math.floor(a / 3600),
            j = Math.floor(c / 60 % 60),
            k = Math.floor(c / 3600),
            g = 0 < g || 0 < k ? g + ":" : "";
        return g + (((g || 10 <= j) && 10 > e ? "0" + e : e) + ":") + (10 > d ? "0" + d : d)
    };
    u.Gc = function () {
        document.body.focus();
        document.onselectstart = r(l)
    };
    u.ld = function () {
        document.onselectstart = r(f)
    };
    u.trim = function (a) {
        return a.toString().replace(/^\s+/, "").replace(/\s+$/, "")
    };
    u.round = function (a, c) {
        c || (c = 0);
        return Math.round(a * Math.pow(10, c)) / Math.pow(10, c)
    };
    u.tb = function (a, c) {
        return {
            length: 1,
            start: function () {
                return a
            },
            end: function () {
                return c
            }
        }
    };
    u.get = function (a, c, d) {
        var e = 0 === a.indexOf("file:") || 0 === window.location.href.indexOf("file:") && -1 === a.indexOf("http");
        "undefined" === typeof XMLHttpRequest && (window.XMLHttpRequest = function () {
            try {
                return new window.ActiveXObject("Msxml2.XMLHTTP.6.0")
            } catch (a) {}
            try {
                return new window.ActiveXObject("Msxml2.XMLHTTP.3.0")
            } catch (c) {}
            try {
                return new window.ActiveXObject("Msxml2.XMLHTTP")
            } catch (d) {}
            throw Error("This browser does not support XMLHttpRequest.");
        });
        var g = new XMLHttpRequest;
        try {
            g.open("GET", a)
        } catch (j) {
            d(j)
        }
        g.onreadystatechange = function () {
            4 === g.readyState && (200 === g.status || e && 0 === g.status ? c(g.responseText) : d && d())
        };
        try {
            g.send()
        } catch (k) {
            d && d(k)
        }
    };
    u.dd = function (a) {
        try {
            var c = window.localStorage || l;
            c && (c.volume = a)
        } catch (d) {
            22 == d.code || 1014 == d.code ? u.log("LocalStorage Full (VideoJS)", d) : 18 == d.code ? u.log("LocalStorage not allowed (VideoJS)", d) : u.log("LocalStorage Error (VideoJS)", d)
        }
    };
    u.jc = function (a) {
        a.match(/^https?:\/\//) || (a = u.e("div", {
            innerHTML: '<a href="' + a + '">x</a>'
        }).firstChild.href);
        return a
    };
    u.log = function () {
        u.log.history = u.log.history || [];
        u.log.history.push(arguments);
        window.console && window.console.log(Array.prototype.slice.call(arguments))
    };
    u.Oc = function (a) {
        var c, d;
        a.getBoundingClientRect && a.parentNode && (c = a.getBoundingClientRect());
        if (!c) return {
            left: 0,
            top: 0
        };
        a = document.documentElement;
        d = document.body;
        return {
            left: c.left + (window.pageXOffset || d.scrollLeft) - (a.clientLeft || d.clientLeft || 0),
            top: c.top + (window.pageYOffset || d.scrollTop) - (a.clientTop || d.clientTop || 0)
        }
    };
    u.c = u.ma.extend({
        g: function (a, c, d) {
            this.a = a;
            this.f = u.i.copy(this.f);
            c = this.options(c);
            this.L = c.id || (c.el && c.el.id ? c.el.id : a.id() + "_component_" + u.u++);
            this.Tc = c.name || h;
            this.b = c.el || this.e();
            this.D = [];
            this.rb = {};
            this.R = {};
            if ((a = this.f) && a.children) {
                var e = this;
                u.i.sa(a.children, function (a, c) {
                    c !== l && !c.loadEvent && (e[a] = e.X(a, c))
                })
            }
            this.M(d)
        }
    });
    t = u.c.prototype;
    t.C = function () {
        if (this.D) for (var a = this.D.length - 1; 0 <= a; a--) this.D[a].C && this.D[a].C();
        this.R = this.rb = this.D = h;
        this.t();
        this.b.parentNode && this.b.parentNode.removeChild(this.b);
        u.sc(this.b);
        this.b = h
    };
    t.pc = p("a");
    t.options = function (a) {
        return a === b ? this.f : this.f = u.i.gc(this.f, a)
    };
    t.e = function (a, c) {
        return u.e(a, c)
    };
    t.s = p("b");
    t.id = p("L");
    t.name = p("Tc");
    t.children = p("D");
    t.X = function (a, c) {
        var d, e;
        "string" === typeof a ? (e = a, c = c || {}, d = c.componentClass || u.Y(e), c.name = e, d = new window.videojs[d](this.a || this, c)) : d = a;
        this.D.push(d);
        "function" === typeof d.id && (this.rb[d.id()] = d);
        (e = e || d.name && d.name()) && (this.R[e] = d);
        "function" === typeof d.el && d.el() && (this.ra || this.b).appendChild(d.el());
        return d
    };
    t.removeChild = function (a) {
        "string" === typeof a && (a = this.R[a]);
        if (a && this.D) {
            for (var c = l, d = this.D.length - 1; 0 <= d; d--) if (this.D[d] === a) {
                c = f;
                this.D.splice(d, 1);
                break
            }
            c && (this.rb[a.id] = h, this.R[a.name] = h, (c = a.s()) && c.parentNode === (this.ra || this.b) && (this.ra || this.b).removeChild(a.s()))
        }
    };
    t.P = r("");
    t.d = function (a, c) {
        u.d(this.b, a, u.bind(this, c));
        return this
    };
    t.t = function (a, c) {
        u.t(this.b, a, c);
        return this
    };
    t.Q = function (a, c) {
        u.Q(this.b, a, u.bind(this, c));
        return this
    };
    t.k = function (a, c) {
        u.k(this.b, a, c);
        return this
    };
    t.M = function (a) {
        a && (this.$ ? a.call(this) : (this.Qa === b && (this.Qa = []), this.Qa.push(a)));
        return this
    };
    t.Ta = function () {
        this.$ = f;
        var a = this.Qa;
        if (a && 0 < a.length) {
            for (var c = 0, d = a.length; c < d; c++) a[c].call(this);
            this.Qa = [];
            this.k("ready")
        }
    };
    t.p = function (a) {
        u.p(this.b, a);
        return this
    };
    t.w = function (a) {
        u.w(this.b, a);
        return this
    };
    t.show = function () {
        this.b.style.display = "block";
        return this
    };
    t.v = function () {
        this.b.style.display = "none";
        return this
    };
    t.ja = function () {
        this.w("vjs-fade-out");
        this.p("vjs-fade-in");
        return this
    };
    t.Ga = function () {
        this.w("vjs-fade-in");
        this.p("vjs-fade-out");
        return this
    };
    t.oc = function () {
        this.p("vjs-lock-showing");
        return this
    };
    t.Ua = function () {
        this.w("vjs-lock-showing");
        return this
    };
    t.disable = function () {
        this.v();
        this.show = m();
        this.ja = m()
    };
    t.width = function (a, c) {
        return A(this, "width", a, c)
    };
    t.height = function (a, c) {
        return A(this, "height", a, c)
    };
    t.Kc = function (a, c) {
        return this.width(a, f).height(c)
    };

    function A(a, c, d, e) {
        if (d !== b) return a.b.style[c] = -1 !== ("" + d).indexOf("%") || -1 !== ("" + d).indexOf("px") ? d : "auto" === d ? "" : d + "px", e || a.k("resize"), a;
        if (!a.b) return 0;
        d = a.b.style[c];
        e = d.indexOf("px");
        return -1 !== e ? parseInt(d.slice(0, e), 10) : parseInt(a.b["offset" + u.Y(c)], 10)
    }
    u.o = u.c.extend({
        g: function (a, c) {
            u.c.call(this, a, c);
            var d = l;
            this.d("touchstart", function () {
                d = f
            });
            this.d("touchmove", function () {
                d = l
            });
            var e = this;
            this.d("touchend", function (a) {
                d && e.n(a);
                a.preventDefault();
                a.stopPropagation()
            });
            this.d("click", this.n);
            this.d("focus", this.La);
            this.d("blur", this.Ka)
        }
    });
    t = u.o.prototype;
    t.e = function (a, c) {
        c = u.i.B({
            className: this.P(),
            innerHTML: '<div class="vjs-control-content"><span class="vjs-control-text">' + (this.pa || "Need Text") + "</span></div>",
            ad: "button",
            "aria-live": "polite",
            tabIndex: 0
        }, c);
        return u.c.prototype.e.call(this, a, c)
    };
    t.P = function () {
        return "vjs-control " + u.c.prototype.P.call(this)
    };
    t.n = m();
    t.La = function () {
        u.d(document, "keyup", u.bind(this, this.aa))
    };
    t.aa = function (a) {
        if (32 == a.which || 13 == a.which) a.preventDefault(), this.n()
    };
    t.Ka = function () {
        u.t(document, "keyup", u.bind(this, this.aa))
    };
    u.J = u.c.extend({
        g: function (a, c) {
            u.c.call(this, a, c);
            this.Fc = this.R[this.f.barName];
            this.handle = this.R[this.f.handleName];
            a.d(this.qc, u.bind(this, this.update));
            this.d("mousedown", this.Ma);
            this.d("touchstart", this.Ma);
            this.d("focus", this.La);
            this.d("blur", this.Ka);
            this.d("click", this.n);
            this.a.d("controlsvisible", u.bind(this, this.update));
            a.M(u.bind(this, this.update));
            this.K = {}
        }
    });
    t = u.J.prototype;
    t.e = function (a, c) {
        c = c || {};
        c.className += " vjs-slider";
        c = u.i.B({
            ad: "slider",
            "aria-valuenow": 0,
            "aria-valuemin": 0,
            "aria-valuemax": 100,
            tabIndex: 0
        }, c);
        return u.c.prototype.e.call(this, a, c)
    };
    t.Ma = function (a) {
        a.preventDefault();
        u.Gc();
        this.K.move = u.bind(this, this.Gb);
        this.K.end = u.bind(this, this.Hb);
        u.d(document, "mousemove", this.K.move);
        u.d(document, "mouseup", this.K.end);
        u.d(document, "touchmove", this.K.move);
        u.d(document, "touchend", this.K.end);
        this.Gb(a)
    };
    t.Hb = function () {
        u.ld();
        u.t(document, "mousemove", this.K.move, l);
        u.t(document, "mouseup", this.K.end, l);
        u.t(document, "touchmove", this.K.move, l);
        u.t(document, "touchend", this.K.end, l);
        this.update()
    };
    t.update = function () {
        if (this.b) {
            var a, c = this.xb(),
                d = this.handle,
                e = this.Fc;
            isNaN(c) && (c = 0);
            a = c;
            if (d) {
                a = this.b.offsetWidth;
                var g = d.s().offsetWidth;
                a = g ? g / a : 0;
                c *= 1 - a;
                a = c + a / 2;
                d.s().style.left = u.round(100 * c, 2) + "%"
            }
            e.s().style.width = u.round(100 * a, 2) + "%"
        }
    };

    function B(a, c) {
        var d, e, g, j;
        d = a.b;
        e = u.Oc(d);
        j = g = d.offsetWidth;
        d = a.handle;
        if (a.f.md) return j = e.top, e = c.changedTouches ? c.changedTouches[0].pageY : c.pageY, d && (d = d.s().offsetHeight, j += d / 2, g -= d), Math.max(0, Math.min(1, (j - e + g) / g));
        g = e.left;
        e = c.changedTouches ? c.changedTouches[0].pageX : c.pageX;
        d && (d = d.s().offsetWidth, g += d / 2, j -= d);
        return Math.max(0, Math.min(1, (e - g) / j))
    }
    t.La = function () {
        u.d(document, "keyup", u.bind(this, this.aa))
    };
    t.aa = function (a) {
        37 == a.which ? (a.preventDefault(), this.vc()) : 39 == a.which && (a.preventDefault(), this.wc())
    };
    t.Ka = function () {
        u.t(document, "keyup", u.bind(this, this.aa))
    };
    t.n = function (a) {
        a.stopImmediatePropagation();
        a.preventDefault()
    };
    u.ha = u.c.extend();
    u.ha.prototype.defaultValue = 0;
    u.ha.prototype.e = function (a, c) {
        c = c || {};
        c.className += " vjs-slider-handle";
        c = u.i.B({
            innerHTML: '<span class="vjs-control-text">' + this.defaultValue + "</span>"
        }, c);
        return u.c.prototype.e.call(this, "div", c)
    };
    u.na = u.c.extend();

    function ca(a, c) {
        a.X(c);
        c.d("click", u.bind(a, function () {
            this.Ua()
        }))
    }
    u.na.prototype.e = function () {
        var a = this.options().Ic || "ul";
        this.ra = u.e(a, {
            className: "vjs-menu-content"
        });
        a = u.c.prototype.e.call(this, "div", {
            append: this.ra,
            className: "vjs-menu"
        });
        a.appendChild(this.ra);
        u.d(a, "click", function (a) {
            a.preventDefault();
            a.stopImmediatePropagation()
        });
        return a
    };
    u.I = u.o.extend({
        g: function (a, c) {
            u.o.call(this, a, c);
            this.selected(c.selected)
        }
    });
    u.I.prototype.e = function (a, c) {
        return u.o.prototype.e.call(this, "li", u.i.B({
            className: "vjs-menu-item",
            innerHTML: this.f.label
        }, c))
    };
    u.I.prototype.n = function () {
        this.selected(f)
    };
    u.I.prototype.selected = function (a) {
        a ? (this.p("vjs-selected"), this.b.setAttribute("aria-selected", f)) : (this.w("vjs-selected"), this.b.setAttribute("aria-selected", l))
    };
    u.ea = u.o.extend({
        g: function (a, c) {
            u.o.call(this, a, c);
            this.ua = this.Fa();
            this.X(this.ua);
            this.G && 0 === this.G.length && this.v();
            this.d("keyup", this.aa);
            this.b.setAttribute("aria-haspopup", f);
            this.b.setAttribute("role", "button")
        }
    });
    t = u.ea.prototype;
    t.oa = l;
    t.Fa = function () {
        var a = new u.na(this.a);
        this.options().title && a.s().appendChild(u.e("li", {
            className: "vjs-menu-title",
            innerHTML: u.Y(this.A),
            jd: -1
        }));
        if (this.G = this.sb()) for (var c = 0; c < this.G.length; c++) ca(a, this.G[c]);
        return a
    };
    t.sb = m();
    t.P = function () {
        return this.className + " vjs-menu-button " + u.o.prototype.P.call(this)
    };
    t.La = m();
    t.Ka = m();
    t.n = function () {
        this.Q("mouseout", u.bind(this, function () {
            this.ua.Ua();
            this.b.blur()
        }));
        this.oa ? C(this) : D(this)
    };
    t.aa = function (a) {
        a.preventDefault();
        32 == a.which || 13 == a.which ? this.oa ? C(this) : D(this) : 27 == a.which && this.oa && C(this)
    };

    function D(a) {
        a.oa = f;
        a.ua.oc();
        a.b.setAttribute("aria-pressed", f);
        a.G && 0 < a.G.length && a.G[0].s().focus()
    }
    function C(a) {
        a.oa = l;
        a.ua.Ua();
        a.b.setAttribute("aria-pressed", l)
    }
    u.ga = u.c.extend({
        g: function (a, c, d) {
            this.N = a;
            c = u.i.B(da(a), c);
            this.r = {};
            this.rc = c.poster;
            this.Ea = c.controls;
            c.customControlsOnMobile !== f && (u.Ub || u.ab) ? (a.controls = c.controls, this.Ea = l) : a.controls = l;
            u.c.call(this, this, c, d);
            this.Q("play", function (a) {
                u.k(this.b, {
                    type: "firstplay",
                    target: this.b
                }) || (a.preventDefault(), a.stopPropagation(), a.stopImmediatePropagation())
            });
            this.d("ended", this.Vc);
            this.d("play", this.Jb);
            this.d("firstplay", this.Wc);
            this.d("pause", this.Ib);
            this.d("progress", this.Yc);
            this.d("durationchange",
                this.Uc);
            this.d("error", this.Fb);
            this.d("fullscreenchange", this.Xc);
            u.Na[this.L] = this;
            c.plugins && u.i.sa(c.plugins, function (a, c) {
                this[a](c)
            }, this)
        }
    });
    t = u.ga.prototype;
    t.f = u.options;
    t.C = function () {
        u.Na[this.L] = h;
        this.N && this.N.player && (this.N.player = h);
        this.b && this.b.player && (this.b.player = h);
        clearInterval(this.Pa);
        this.va();
        this.h && this.h.C();
        u.c.prototype.C.call(this)
    };

    function da(a) {
        var c = {
            sources: [],
            tracks: []
        };
        u.i.B(c, u.wb(a));
        if (a.hasChildNodes()) for (var d, e = a.childNodes, g = 0, j = e.length; g < j; g++) a = e[g], d = a.nodeName.toLowerCase(), "source" === d ? c.sources.push(u.wb(a)) : "track" === d && c.tracks.push(u.wb(a));
            return c
        }
        t.e = function () {
            var a = this.b = u.c.prototype.e.call(this, "div"),
                c = this.N;
            c.removeAttribute("width");
            c.removeAttribute("height");
            if (c.hasChildNodes()) for (var d = c.childNodes.length, e = 0, g = c.childNodes; e < d; e++)("source" == g[0].nodeName.toLowerCase() || "track" == g[0].nodeName.toLowerCase()) && c.removeChild(g[0]);
            c.id = c.id || "vjs_video_" + u.u++;
            a.id = c.id;
            a.className = c.className;
            c.id += "_html5_api";
            c.className = "vjs-tech";
            c.player = a.player = this;
            this.p("vjs-paused");
            this.width(this.f.width, f);
            this.height(this.f.height,
                f);
            c.parentNode && c.parentNode.insertBefore(a, c);
            u.yb(c, a);
            return a
        };

        function E(a, c, d) {
            a.h ? F(a) : "Html5" !== c && a.N && (a.b.removeChild(a.N), a.N.pc = h, a.N = h);
            a.ba = c;
            a.$ = l;
            var e = u.i.B({
                source: d,
                parentEl: a.b
            }, a.f[c.toLowerCase()]);
            d && (d.src == a.r.src && 0 < a.r.currentTime && (e.startTime = a.r.currentTime), a.r.src = d.src);
            a.h = new window.videojs[c](a, e);
            a.h.M(function () {
                this.a.Ta();
                if (!this.j.Lb) {
                    var a = this.a;
                    a.Db = f;
                    a.Pa = setInterval(u.bind(a, function () {
                        this.r.nb < this.buffered().end(0) ? this.k("progress") : 1 == G(this) && (clearInterval(this.Pa), this.k("progress"))
                    }), 500);
                    a.h.Q("progress", function () {
                        this.j.Lb = f;
                        var a = this.a;
                        a.Db = l;
                        clearInterval(a.Pa)
                    })
                }
                this.j.Ob || (a = this.a, a.Eb = f, a.d("play", a.xc), a.d("pause", a.va), a.h.Q("timeupdate", function () {
                    this.j.Ob = f;
                    H(this.a)
                }))
            })
        }
        function F(a) {
            a.$ = l;
            a.h.C();
            a.Db && (a.Db = l, clearInterval(a.Pa));
            a.Eb && H(a);
            a.h = l
        }
        function H(a) {
            a.Eb = l;
            a.va();
            a.t("play", a.xc);
            a.t("pause", a.va)
        }
        t.xc = function () {
            this.fc && this.va();
            this.fc = setInterval(u.bind(this, function () {
                this.k("timeupdate")
            }), 250)
        };
        t.va = function () {
            clearInterval(this.fc)
        };
        t.Vc = function () {
            this.f.loop && (this.currentTime(0), this.play())
        };
        t.Jb = function () {
            u.w(this.b, "vjs-paused");
            u.p(this.b, "vjs-playing")
        };
        t.Wc = function () {
            this.f.starttime && this.currentTime(this.f.starttime)
        };
        t.Ib = function () {
            u.w(this.b, "vjs-playing");
            u.p(this.b, "vjs-paused")
        };
        t.Yc = function () {
            1 == G(this) && this.k("loadedalldata")
        };
        t.Uc = function () {
            this.duration(I(this, "duration"))
        };
        t.Fb = function (a) {
            u.log("Video Error", a)
        };
        t.Xc = function () {
            this.F ? this.p("vjs-fullscreen") : this.w("vjs-fullscreen")
        };

        function J(a, c, d) {
            if (a.h && a.h.$) a.h.M(function () {
                this[c](d)
            });
            else try {
                a.h[c](d)
            } catch (e) {
                throw u.log(e), e;
            }
        }
        function I(a, c) {
            if (a.h.$) try {
                return a.h[c]()
            } catch (d) {
                throw a.h[c] === b ? u.log("Video.js: " + c + " method not defined for " + a.ba + " playback technology.", d) : "TypeError" == d.name ? (u.log("Video.js: " + c + " unavailable on " + a.ba + " playback technology element.", d), a.h.$ = l) : u.log(d), d;
            }
        }
        t.play = function () {
            J(this, "play");
            return this
        };
        t.pause = function () {
            J(this, "pause");
            return this
        };
        t.paused = function () {
            return I(this, "paused") === l ? l : f
        };
        t.currentTime = function (a) {
            return a !== b ? (this.r.vd = a, J(this, "setCurrentTime", a), this.Eb && this.k("timeupdate"), this) : this.r.currentTime = I(this, "currentTime") || 0
        };
        t.duration = function (a) {
            return a !== b ? (this.r.duration = parseFloat(a), this) : this.r.duration
        };
        t.buffered = function () {
            var a = I(this, "buffered"),
                c = this.r.nb = this.r.nb || 0;
            a && (0 < a.length && a.end(0) !== c) && (c = a.end(0), this.r.nb = c);
            return u.tb(0, c)
        };

        function G(a) {
            return a.duration() ? a.buffered().end(0) / a.duration() : 0
        }
        t.volume = function (a) {
            if (a !== b) return a = Math.max(0, Math.min(1, parseFloat(a))), this.r.volume = a, J(this, "setVolume", a), u.dd(a), this;
            a = parseFloat(I(this, "volume"));
            return isNaN(a) ? 1 : a
        };
        t.muted = function (a) {
            return a !== b ? (J(this, "setMuted", a), this) : I(this, "muted") || l
        };
        t.Sa = function () {
            return I(this, "supportsFullScreen") || l
        };
        t.Ra = function () {
            var a = u.Nb.Ra;
            this.F = f;
            a ? (u.d(document, a.Z, u.bind(this, function () {
                this.F = document[a.F];
                this.F === l && u.t(document, a.Z, arguments.callee)
            })), this.h.j.Ia === l && this.f.flash.iFrameMode !== f && (this.pause(), F(this), u.d(document, a.Z, u.bind(this, function () {
                u.t(document, a.Z, arguments.callee);
                E(this, this.ba, {
                    src: this.r.src
                })
            }))), this.b[a.tc](), this.k("fullscreenchange")) : this.h.Sa() ? J(this, "enterFullScreen") : (this.Qc = f, this.Lc = document.documentElement.style.overflow, u.d(document, "keydown", u.bind(this,
                this.ic)), document.documentElement.style.overflow = "hidden", u.p(document.body, "vjs-full-window"), this.k("enterFullWindow"), this.k("fullscreenchange"));
            return this
        };

        function K(a) {
            var c = u.Nb.Ra;
            a.F = l;
            c ? (a.h.j.Ia === l && a.f.flash.iFrameMode !== f && (a.pause(), F(a), u.d(document, c.Z, u.bind(a, function () {
                u.t(document, c.Z, arguments.callee);
                E(this, this.ba, {
                    src: this.r.src
                })
            }))), document[c.pb](), a.k("fullscreenchange")) : a.h.Sa() ? J(a, "exitFullScreen") : (L(a), a.k("fullscreenchange"))
        }
        t.ic = function (a) {
            27 === a.keyCode && (this.F === f ? K(this) : L(this))
        };

        function L(a) {
            a.Qc = l;
            u.t(document, "keydown", a.ic);
            document.documentElement.style.overflow = a.Lc;
            u.w(document.body, "vjs-full-window");
            a.k("exitFullWindow")
        }
        t.src = function (a) {
            if (a instanceof Array) {
                var c;
                a: {
                    c = a;
                    for (var d = 0, e = this.f.techOrder; d < e.length; d++) {
                        var g = u.Y(e[d]),
                            j = window.videojs[g];
                        if (j.isSupported()) for (var k = 0, q = c; k < q.length; k++) {
                            var n = q[k];
                            if (j.canPlaySource(n)) {
                                c = {
                                    source: n,
                                    h: g
                                };
                                break a
                            }
                        }
                    }
                    c = l
                }
                c ? (a = c.source, c = c.h, c == this.ba ? this.src(a) : E(this, c, a)) : this.b.appendChild(u.e("p", {
                    innerHTML: 'Sorry, no compatible source and playback technology were found for this video. Try using another browser like <a href="http://bit.ly/ccMUEC">Chrome</a> or download the latest <a href="http://adobe.ly/mwfN1">Adobe Flash Player</a>.'
                }))
            } else a instanceof
                Object ? window.videojs[this.ba].canPlaySource(a) ? this.src(a.src) : this.src([a]) : (this.r.src = a, this.$ ? (J(this, "src", a), "auto" == this.f.preload && this.load(), this.f.autoplay && this.play()) : this.M(function () {
                this.src(a)
            }));
            return this
        };
        t.load = function () {
            J(this, "load");
            return this
        };
        t.currentSrc = function () {
            return I(this, "currentSrc") || this.r.src || ""
        };
        t.Oa = function (a) {
            return a !== b ? (J(this, "setPreload", a), this.f.preload = a, this) : I(this, "preload")
        };
        t.autoplay = function (a) {
            return a !== b ? (J(this, "setAutoplay", a), this.f.autoplay = a, this) : I(this, "autoplay")
        };
        t.loop = function (a) {
            return a !== b ? (J(this, "setLoop", a), this.f.loop = a, this) : I(this, "loop")
        };
        t.poster = function (a) {
            a !== b && (this.rc = a);
            return this.rc
        };
        t.controls = function (a) {
            a !== b && this.Ea !== a && (this.Ea = !! a, this.k("controlschange"));
            return this.Ea
        };
        t.error = function () {
            return I(this, "error")
        };
        var M, N, O;
        O = document.createElement("div");
        N = {};
        O.rd !== b ? (N.tc = "requestFullscreen", N.pb = "exitFullscreen", N.Z = "fullscreenchange", N.F = "fullScreen") : (document.mozCancelFullScreen ? (M = "moz", N.F = M + "FullScreen") : (M = "webkit", N.F = M + "IsFullScreen"), O[M + "RequestFullScreen"] && (N.tc = M + "RequestFullScreen", N.pb = M + "CancelFullScreen"), N.Z = M + "fullscreenchange");
        document[N.pb] && (u.Nb.Ra = N);
        u.da = u.c.extend({
            g: function (a, c) {
                u.c.call(this, a, c);
                a.controls() || this.disable();
                a.Q("play", u.bind(this, function () {
                    var a, c = u.bind(this, this.ja),
                        g = u.bind(this, this.Ga);
                    this.ja();
                    "ontouchstart" in window || (this.a.d("mouseover", c), this.a.d("mouseout", g), this.a.d("pause", u.bind(this, this.oc)), this.a.d("play", u.bind(this, this.Ua)));
                    a = l;
                    this.a.d("touchstart", function () {
                        a = f
                    });
                    this.a.d("touchmove", function () {
                        a = l
                    });
                    this.a.d("touchend", u.bind(this, function (c) {
                        var e;
                        a && (e = this.s().className.search("fade-in"), -1 !== e ? this.Ga() : this.ja());
                        a = l;
                        this.a.paused() || c.preventDefault()
                    }))
                }))
            }
        });
        u.da.prototype.f = {
            wd: "play",
            children: {
                playToggle: {},
                currentTimeDisplay: {},
                timeDivider: {},
                durationDisplay: {},
                remainingTimeDisplay: {},
                progressControl: {},
                fullscreenToggle: {},
                volumeControl: {},
                muteToggle: {}
            }
        };
        u.da.prototype.e = function () {
            return u.e("div", {
                className: "vjs-control-bar"
            })
        };
        u.da.prototype.ja = function () {
            u.c.prototype.ja.call(this);
            this.a.k("controlsvisible")
        };
        u.da.prototype.Ga = function () {
            u.c.prototype.Ga.call(this);
            this.a.k("controlshidden")
        };
        u.Xb = u.o.extend({
            g: function (a, c) {
                u.o.call(this, a, c);
                a.d("play", u.bind(this, this.Jb));
                a.d("pause", u.bind(this, this.Ib))
            }
        });
        t = u.Xb.prototype;
        t.pa = "Play";
        t.P = function () {
            return "vjs-play-control " + u.o.prototype.P.call(this)
        };
        t.n = function () {
            this.a.paused() ? this.a.play() : this.a.pause()
        };
        t.Jb = function () {
            u.w(this.b, "vjs-paused");
            u.p(this.b, "vjs-playing");
            this.b.children[0].children[0].innerHTML = "Pause"
        };
        t.Ib = function () {
            u.w(this.b, "vjs-playing");
            u.p(this.b, "vjs-paused");
            this.b.children[0].children[0].innerHTML = "Play"
        };
        u.Ya = u.c.extend({
            g: function (a, c) {
                u.c.call(this, a, c);
                a.d("timeupdate", u.bind(this, this.ya))
            }
        });
        u.Ya.prototype.e = function () {
            var a = u.c.prototype.e.call(this, "div", {
                className: "vjs-current-time vjs-time-controls vjs-control"
            });
            this.content = u.e("div", {
                className: "vjs-current-time-display",
                innerHTML: '<span class="vjs-control-text">Current Time </span>0:00',
                "aria-live": "off"
            });
            a.appendChild(u.e("div").appendChild(this.content));
            return a
        };
        u.Ya.prototype.ya = function () {
            var a = this.a.Mb ? this.a.r.currentTime : this.a.currentTime();
            this.content.innerHTML = '<span class="vjs-control-text">Current Time </span>' + u.Ha(a, this.a.duration())
        };
        u.Za = u.c.extend({
            g: function (a, c) {
                u.c.call(this, a, c);
                a.d("timeupdate", u.bind(this, this.ya))
            }
        });
        u.Za.prototype.e = function () {
            var a = u.c.prototype.e.call(this, "div", {
                className: "vjs-duration vjs-time-controls vjs-control"
            });
            this.content = u.e("div", {
                className: "vjs-duration-display",
                innerHTML: '<span class="vjs-control-text">Duration Time </span>0:00',
                "aria-live": "off"
            });
            a.appendChild(u.e("div").appendChild(this.content));
            return a
        };
        u.Za.prototype.ya = function () {
            this.a.duration() && (this.content.innerHTML = '<span class="vjs-control-text">Duration Time </span>' + u.Ha(this.a.duration()))
        };
        u.ac = u.c.extend({
            g: function (a, c) {
                u.c.call(this, a, c)
            }
        });
        u.ac.prototype.e = function () {
            return u.c.prototype.e.call(this, "div", {
                className: "vjs-time-divider",
                innerHTML: "<div><span>/</span></div>"
            })
        };
        u.gb = u.c.extend({
            g: function (a, c) {
                u.c.call(this, a, c);
                a.d("timeupdate", u.bind(this, this.ya))
            }
        });
        u.gb.prototype.e = function () {
            var a = u.c.prototype.e.call(this, "div", {
                className: "vjs-remaining-time vjs-time-controls vjs-control"
            });
            this.content = u.e("div", {
                className: "vjs-remaining-time-display",
                innerHTML: '<span class="vjs-control-text">Remaining Time </span>-0:00',
                "aria-live": "off"
            });
            a.appendChild(u.e("div").appendChild(this.content));
            return a
        };
        u.gb.prototype.ya = function () {
            this.a.duration() && this.a.duration() && (this.content.innerHTML = '<span class="vjs-control-text">Remaining Time </span>-' + u.Ha(this.a.duration() - this.a.currentTime()))
        };
        u.Aa = u.o.extend({
            g: function (a, c) {
                u.o.call(this, a, c)
            }
        });
        u.Aa.prototype.pa = "Fullscreen";
        u.Aa.prototype.P = function () {
            return "vjs-fullscreen-control " + u.o.prototype.P.call(this)
        };
        u.Aa.prototype.n = function () {
            this.a.F ? (K(this.a), this.b.children[0].children[0].innerHTML = "Fullscreen") : (this.a.Ra(), this.b.children[0].children[0].innerHTML = "Non-Fullscreen")
        };
        u.fb = u.c.extend({
            g: function (a, c) {
                u.c.call(this, a, c)
            }
        });
        u.fb.prototype.f = {
            children: {
                seekBar: {}
            }
        };
        u.fb.prototype.e = function () {
            return u.c.prototype.e.call(this, "div", {
                className: "vjs-progress-control vjs-control"
            })
        };
        u.Yb = u.J.extend({
            g: function (a, c) {
                u.J.call(this, a, c);
                a.d("timeupdate", u.bind(this, this.xa));
                a.M(u.bind(this, this.xa))
            }
        });
        t = u.Yb.prototype;
        t.f = {
            children: {
                loadProgressBar: {},
                playProgressBar: {},
                seekHandle: {}
            },
            barName: "playProgressBar",
            handleName: "seekHandle"
        };
        t.qc = "timeupdate";
        t.e = function () {
            return u.J.prototype.e.call(this, "div", {
                className: "vjs-progress-holder",
                "aria-label": "video progress bar"
            })
        };
        t.xa = function () {
            var a = this.a.Mb ? this.a.r.currentTime : this.a.currentTime();
            this.b.setAttribute("aria-valuenow", u.round(100 * this.xb(), 2));
            this.b.setAttribute("aria-valuetext", u.Ha(a, this.a.duration()))
        };
        t.xb = function () {
            return this.a.currentTime() / this.a.duration()
        };
        t.Ma = function (a) {
            u.J.prototype.Ma.call(this, a);
            this.a.Mb = f;
            this.nd = !this.a.paused();
            this.a.pause()
        };
        t.Gb = function (a) {
            a = B(this, a) * this.a.duration();
            a == this.a.duration() && (a -= 0.1);
            this.a.currentTime(a)
        };
        t.Hb = function (a) {
            u.J.prototype.Hb.call(this, a);
            this.a.Mb = l;
            this.nd && this.a.play()
        };
        t.wc = function () {
            this.a.currentTime(this.a.currentTime() + 5)
        };
        t.vc = function () {
            this.a.currentTime(this.a.currentTime() - 5)
        };
        u.bb = u.c.extend({
            g: function (a, c) {
                u.c.call(this, a, c);
                a.d("progress", u.bind(this, this.update))
            }
        });
        u.bb.prototype.e = function () {
            return u.c.prototype.e.call(this, "div", {
                className: "vjs-load-progress",
                innerHTML: '<span class="vjs-control-text">Loaded: 0%</span>'
            })
        };
        u.bb.prototype.update = function () {
            this.b.style && (this.b.style.width = u.round(100 * G(this.a), 2) + "%")
        };
        u.Wb = u.c.extend({
            g: function (a, c) {
                u.c.call(this, a, c)
            }
        });
        u.Wb.prototype.e = function () {
            return u.c.prototype.e.call(this, "div", {
                className: "vjs-play-progress",
                innerHTML: '<span class="vjs-control-text">Progress: 0%</span>'
            })
        };
        u.hb = u.ha.extend();
        u.hb.prototype.defaultValue = "00:00";
        u.hb.prototype.e = function () {
            return u.ha.prototype.e.call(this, "div", {
                className: "vjs-seek-handle"
            })
        };
        u.kb = u.c.extend({
            g: function (a, c) {
                u.c.call(this, a, c);
                a.h && (a.h.j && a.h.j.T === l) && this.p("vjs-hidden");
                a.d("loadstart", u.bind(this, function () {
                    a.h.j && a.h.j.T === l ? this.p("vjs-hidden") : this.w("vjs-hidden")
                }))
            }
        });
        u.kb.prototype.f = {
            children: {
                volumeBar: {}
            }
        };
        u.kb.prototype.e = function () {
            return u.c.prototype.e.call(this, "div", {
                className: "vjs-volume-control vjs-control"
            })
        };
        u.jb = u.J.extend({
            g: function (a, c) {
                u.J.call(this, a, c);
                a.d("volumechange", u.bind(this, this.xa));
                a.M(u.bind(this, this.xa));
                setTimeout(u.bind(this, this.update), 0)
            }
        });
        t = u.jb.prototype;
        t.xa = function () {
            this.b.setAttribute("aria-valuenow", u.round(100 * this.a.volume(), 2));
            this.b.setAttribute("aria-valuetext", u.round(100 * this.a.volume(), 2) + "%")
        };
        t.f = {
            children: {
                volumeLevel: {},
                volumeHandle: {}
            },
            barName: "volumeLevel",
            handleName: "volumeHandle"
        };
        t.qc = "volumechange";
        t.e = function () {
            return u.J.prototype.e.call(this, "div", {
                className: "vjs-volume-bar",
                "aria-label": "volume level"
            })
        };
        t.Gb = function (a) {
            this.a.volume(B(this, a))
        };
        t.xb = function () {
            return this.a.muted() ? 0 : this.a.volume()
        };
        t.wc = function () {
            this.a.volume(this.a.volume() + 0.1)
        };
        t.vc = function () {
            this.a.volume(this.a.volume() - 0.1)
        };
        u.bc = u.c.extend({
            g: function (a, c) {
                u.c.call(this, a, c)
            }
        });
        u.bc.prototype.e = function () {
            return u.c.prototype.e.call(this, "div", {
                className: "vjs-volume-level",
                innerHTML: '<span class="vjs-control-text"></span>'
            })
        };
        u.lb = u.ha.extend();
        u.lb.prototype.defaultValue = "00:00";
        u.lb.prototype.e = function () {
            return u.ha.prototype.e.call(this, "div", {
                className: "vjs-volume-handle"
            })
        };
        u.fa = u.o.extend({
            g: function (a, c) {
                u.o.call(this, a, c);
                a.d("volumechange", u.bind(this, this.update));
                a.h && (a.h.j && a.h.j.T === l) && this.p("vjs-hidden");
                a.d("loadstart", u.bind(this, function () {
                    a.h.j && a.h.j.T === l ? this.p("vjs-hidden") : this.w("vjs-hidden")
                }))
            }
        });
        u.fa.prototype.e = function () {
            return u.o.prototype.e.call(this, "div", {
                className: "vjs-mute-control vjs-control",
                innerHTML: '<div><span class="vjs-control-text">Mute</span></div>'
            })
        };
        u.fa.prototype.n = function () {
            this.a.muted(this.a.muted() ? l : f)
        };
        u.fa.prototype.update = function () {
            var a = this.a.volume(),
                c = 3;
            0 === a || this.a.muted() ? c = 0 : 0.33 > a ? c = 1 : 0.67 > a && (c = 2);
            this.a.muted() ? "Unmute" != this.b.children[0].children[0].innerHTML && (this.b.children[0].children[0].innerHTML = "Unmute") : "Mute" != this.b.children[0].children[0].innerHTML && (this.b.children[0].children[0].innerHTML = "Mute");
            for (a = 0; 4 > a; a++) u.w(this.b, "vjs-vol-" + a);
            u.p(this.b, "vjs-vol-" + c)
        };
        u.Ca = u.ea.extend({
            g: function (a, c) {
                u.ea.call(this, a, c);
                a.d("volumechange", u.bind(this, this.update));
                a.h && (a.h.j && a.h.j.T === l) && this.p("vjs-hidden");
                a.d("loadstart", u.bind(this, function () {
                    a.h.j && a.h.j.T === l ? this.p("vjs-hidden") : this.w("vjs-hidden")
                }));
                this.p("vjs-menu-button")
            }
        });
        u.Ca.prototype.Fa = function () {
            var a = new u.na(this.a, {
                    Ic: "div"
                }),
                c = new u.jb(this.a, u.i.B({
                    md: f
                }, this.f.zd));
            a.X(c);
            return a
        };
        u.Ca.prototype.n = function () {
            u.fa.prototype.n.call(this);
            u.ea.prototype.n.call(this)
        };
        u.Ca.prototype.e = function () {
            return u.o.prototype.e.call(this, "div", {
                className: "vjs-volume-menu-button vjs-menu-button vjs-control",
                innerHTML: '<div><span class="vjs-control-text">Mute</span></div>'
            })
        };
        u.Ca.prototype.update = u.fa.prototype.update;
        u.eb = u.o.extend({
            g: function (a, c) {
                u.o.call(this, a, c);
                (!a.poster() || !a.controls()) && this.v();
                a.d("play", u.bind(this, this.v))
            }
        });
        u.eb.prototype.e = function () {
            var a = u.e("div", {
                    className: "vjs-poster",
                    tabIndex: -1
                }),
                c = this.a.poster();
            c && ("backgroundSize" in a.style ? a.style.backgroundImage = 'url("' + c + '")' : a.appendChild(u.e("img", {
                src: c
            })));
            return a
        };
        u.eb.prototype.n = function () {
            this.a.play()
        };
        u.Vb = u.c.extend({
            g: function (a, c) {
                u.c.call(this, a, c);
                a.d("canplay", u.bind(this, this.v));
                a.d("canplaythrough", u.bind(this, this.v));
                a.d("playing", u.bind(this, this.v));
                a.d("seeked", u.bind(this, this.v));
                a.d("seeking", u.bind(this, this.show));
                a.d("seeked", u.bind(this, this.v));
                a.d("error", u.bind(this, this.show));
                a.d("waiting", u.bind(this, this.show))
            }
        });
        u.Vb.prototype.e = function () {
            return u.c.prototype.e.call(this, "div", {
                className: "vjs-loading-spinner"
            })
        };
        u.Wa = u.o.extend({
            g: function (a, c) {
                u.o.call(this, a, c);
                a.controls() || this.v();
                a.d("play", u.bind(this, this.v))
            }
        });
        u.Wa.prototype.e = function () {
            return u.o.prototype.e.call(this, "div", {
                className: "vjs-big-play-button",
                innerHTML: "<span></span>",
                "aria-label": "play video"
            })
        };
        u.Wa.prototype.n = function () {
            this.a.play()
        };
        u.q = u.c.extend({
            g: function (a, c, d) {
                u.c.call(this, a, c, d)
            }
        });
        u.q.prototype.n = u.ab ? m() : function () {
            this.a.controls() && (this.a.paused() ? this.a.play() : this.a.pause())
        };
        u.q.prototype.j = {
            T: f,
            Ia: l,
            Lb: l,
            Ob: l
        };
        u.media = {};
        u.media.Va = "play pause paused currentTime setCurrentTime duration buffered volume setVolume muted setMuted width height supportsFullScreen enterFullScreen src load currentSrc preload setPreload autoplay setAutoplay loop setLoop error networkState readyState seeking initialTime startOffsetTime played seekable ended videoTracks audioTracks videoWidth videoHeight textTracks defaultPlaybackRate playbackRate mediaGroup controller controls defaultMuted".split(" ");

        function ea() {
            var a = u.media.Va[i];
            return function () {
                throw Error('The "' + a + "\" method is not available on the playback technology's API");
            }
        }
        for (var i = u.media.Va.length - 1; 0 <= i; i--) u.q.prototype[u.media.Va[i]] = ea();
        u.m = u.q.extend({
            g: function (a, c, d) {
                this.j.T = u.m.Hc();
                this.j.Sc = !u.Ub;
                this.j.Ia = f;
                u.q.call(this, a, c, d);
                (c = c.source) && this.b.currentSrc == c.src ? a.k("loadstart") : c && (this.b.src = c.src);
                a.M(function () {
                    this.f.autoplay && this.paused() && (this.N.poster = h, this.play())
                });
                this.d("click", this.n);
                for (a = u.m.$a.length - 1; 0 <= a; a--) u.d(this.b, u.m.$a[a], u.bind(this.a, this.Nc));
                this.Ta()
            }
        });
        t = u.m.prototype;
        t.C = function () {
            u.q.prototype.C.call(this)
        };
        t.e = function () {
            var a = this.a,
                c = a.N;
            if (!c || this.j.Sc === l) c ? (a.s().removeChild(c), c = c.cloneNode(l)) : c = u.e("video", {
                id: a.id() + "_html5_api",
                className: "vjs-tech"
            }), c.player = a, u.yb(c, a.s());
            for (var d = ["autoplay", "preload", "loop", "muted"], e = d.length - 1; 0 <= e; e--) {
                var g = d[e];
                a.f[g] !== h && (c[g] = a.f[g])
            }
            return c
        };
        t.Nc = function (a) {
            this.k(a);
            a.stopPropagation()
        };
        t.play = function () {
            this.b.play()
        };
        t.pause = function () {
            this.b.pause()
        };
        t.paused = function () {
            return this.b.paused
        };
        t.currentTime = function () {
            return this.b.currentTime
        };
        t.cd = function (a) {
            try {
                this.b.currentTime = a
            } catch (c) {
                u.log(c, "Video is not ready. (Video.js)")
            }
        };
        t.duration = function () {
            return this.b.duration || 0
        };
        t.buffered = function () {
            return this.b.buffered
        };
        t.volume = function () {
            return this.b.volume
        };
        t.hd = function (a) {
            this.b.volume = a
        };
        t.muted = function () {
            return this.b.muted
        };
        t.fd = function (a) {
            this.b.muted = a
        };
        t.width = function () {
            return this.b.offsetWidth
        };
        t.height = function () {
            return this.b.offsetHeight
        };
        t.Sa = function () {
            return "function" == typeof this.b.webkitEnterFullScreen && (/Android/.test(u.O) || !/Chrome|Mac OS X 10.5/.test(u.O)) ? f : l
        };
        t.src = function (a) {
            this.b.src = a
        };
        t.load = function () {
            this.b.load()
        };
        t.currentSrc = function () {
            return this.b.currentSrc
        };
        t.Oa = function () {
            return this.b.Oa
        };
        t.gd = function (a) {
            this.b.Oa = a
        };
        t.autoplay = function () {
            return this.b.autoplay
        };
        t.bd = function (a) {
            this.b.autoplay = a
        };
        t.loop = function () {
            return this.b.loop
        };
        t.ed = function (a) {
            this.b.loop = a
        };
        t.error = function () {
            return this.b.error
        };
        u.m.isSupported = function () {
            return !!document.createElement("video").canPlayType
        };
        u.m.ob = function (a) {
            return !!document.createElement("video").canPlayType(a.type)
        };
        u.m.Hc = function () {
            var a = u.ib.volume;
            u.ib.volume = a / 2 + 0.1;
            return a !== u.ib.volume
        };
        u.m.$a = "loadstart suspend abort error emptied stalled loadedmetadata loadeddata canplay canplaythrough playing waiting seeking seeked ended durationchange timeupdate progress play pause ratechange volumechange".split(" ");
        u.ab && 3 > u.yc && (document.createElement("video").constructor.prototype.canPlayType = function (a) {
            return a && -1 != a.toLowerCase().indexOf("video/mp4") ? "maybe" : ""
        });
        u.l = u.q.extend({
            g: function (a, c, d) {
                u.q.call(this, a, c, d);
                d = c.source;
                var e = c.parentEl,
                    g = this.b = u.e("div", {
                        id: a.id() + "_temp_flash"
                    }),
                    j = a.id() + "_flash_api";
                a = a.f;
                var k = u.i.B({
                        readyFunction: "videojs.Flash.onReady",
                        eventProxyFunction: "videojs.Flash.onEvent",
                        errorEventProxyFunction: "videojs.Flash.onError",
                        autoplay: a.autoplay,
                        preload: a.Oa,
                        loop: a.loop,
                        muted: a.muted
                    }, c.flashVars),
                    q = u.i.B({
                        wmode: "opaque",
                        bgcolor: "#000000"
                    }, c.params),
                    n = u.i.B({
                        id: j,
                        name: j,
                        "class": "vjs-tech"
                    }, c.attributes);
                d && (k.src = encodeURIComponent(u.jc(d.src)));
                u.yb(g, e);
                c.startTime && this.M(function () {
                    this.load();
                    this.play();
                    this.currentTime(c.startTime)
                });
                if (c.iFrameMode === f && !u.zc) {
                    var s = u.e("iframe", {
                        id: j + "_iframe",
                        name: j + "_iframe",
                        className: "vjs-tech",
                        scrolling: "no",
                        marginWidth: 0,
                        marginHeight: 0,
                        frameBorder: 0
                    });
                    k.readyFunction = "ready";
                    k.eventProxyFunction = "events";
                    k.errorEventProxyFunction = "errors";
                    u.d(s, "load", u.bind(this, function () {
                        var a, d = s.contentWindow;
                        a = s.contentDocument ? s.contentDocument : s.contentWindow.document;
                        a.write(u.l.kc(c.swf, k, q, n));
                        d.player =
                            this.a;
                        d.ready = u.bind(this.a, function (c) {
                            c = a.getElementById(c);
                            var d = this.h;
                            d.b = c;
                            u.d(c, "click", d.bind(d.n));
                            u.l.qb(d)
                        });
                        d.events = u.bind(this.a, function (a, c) {
                            this && "flash" === this.ba && this.k(c)
                        });
                        d.errors = u.bind(this.a, function (a, c) {
                            u.log("Flash Error", c)
                        })
                    }));
                    g.parentNode.replaceChild(s, g)
                } else u.l.Mc(c.swf, g, k, q, n)
            }
        });
        t = u.l.prototype;
        t.C = function () {
            u.q.prototype.C.call(this)
        };
        t.play = function () {
            this.b.vjs_play()
        };
        t.pause = function () {
            this.b.vjs_pause()
        };
        t.src = function (a) {
            a = u.jc(a);
            this.b.vjs_src(a);
            if (this.a.autoplay()) {
                var c = this;
                setTimeout(function () {
                    c.play()
                }, 0)
            }
        };
        t.load = function () {
            this.b.vjs_load()
        };
        t.poster = function () {
            this.b.vjs_getProperty("poster")
        };
        t.buffered = function () {
            return u.tb(0, this.b.vjs_getProperty("buffered"))
        };
        t.Sa = r(l);
        var P = u.l.prototype,
            Q = "preload currentTime defaultPlaybackRate playbackRate autoplay loop mediaGroup controller controls volume muted defaultMuted".split(" "),
            R = "error currentSrc networkState readyState seeking initialTime duration startOffsetTime paused played seekable ended videoTracks audioTracks videoWidth videoHeight textTracks".split(" ");

        function fa() {
            var a = Q[S],
                c = a.charAt(0).toUpperCase() + a.slice(1);
            P["set" + c] = function (c) {
                return this.b.vjs_setProperty(a, c)
            }
        }
        function T(a) {
            P[a] = function () {
                return this.b.vjs_getProperty(a)
            }
        }
        var S;
        for (S = 0; S < Q.length; S++) T(Q[S]), fa();
        for (S = 0; S < R.length; S++) T(R[S]);
        u.l.isSupported = function () {
            return 10 <= u.l.version()[0]
        };
        u.l.ob = function (a) {
            if (a.type in u.l.Pc) return "maybe"
        };
        u.l.Pc = {
            "video/flv": "FLV",
            "video/x-flv": "FLV",
            "video/mp4": "MP4",
            "video/m4v": "MP4"
        };
        u.l.onReady = function (a) {
            a = u.s(a);
            var c = a.player || a.parentNode.player,
                d = c.h;
            a.player = c;
            d.b = a;
            d.d("click", d.n);
            u.l.qb(d)
        };
        u.l.qb = function (a) {
            a.s().vjs_getProperty ? a.Ta() : setTimeout(function () {
                u.l.qb(a)
            }, 50)
        };
        u.l.onEvent = function (a, c) {
            u.s(a).player.k(c)
        };
        u.l.onError = function (a, c) {
            u.s(a).player.k("error");
            u.log("Flash Error", c, a)
        };
        u.l.version = function () {
            var a = "0,0,0";
            try {
                a = (new window.ActiveXObject("ShockwaveFlash.ShockwaveFlash")).GetVariable("$version").replace(/\D+/g, ",").match(/^,?(.+),?$/)[1]
            } catch (c) {
                try {
                    navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin && (a = (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]).description.replace(/\D+/g, ",").match(/^,?(.+),?$/)[1])
                } catch (d) {}
            }
            return a.split(",")
        };
        u.l.Mc = function (a, c, d, e, g) {
            a = u.l.kc(a, d, e, g);
            a = u.e("div", {
                innerHTML: a
            }).childNodes[0];
            d = c.parentNode;
            c.parentNode.replaceChild(a, c);
            var j = d.childNodes[0];
            setTimeout(function () {
                j.style.display = "block"
            }, 1E3)
        };
        u.l.kc = function (a, c, d, e) {
            var g = "",
                j = "",
                k = "";
            c && u.i.sa(c, function (a, c) {
                g += a + "=" + c + "&amp;"
            });
            d = u.i.B({
                movie: a,
                flashvars: g,
                allowScriptAccess: "always",
                allowNetworking: "all"
            }, d);
            u.i.sa(d, function (a, c) {
                j += '<param name="' + a + '" value="' + c + '" />'
            });
            e = u.i.B({
                data: a,
                width: "100%",
                height: "100%"
            }, e);
            u.i.sa(e, function (a, c) {
                k += a + '="' + c + '" '
            });
            return '<object type="application/x-shockwave-flash"' + k + ">" + j + "</object>"
        };
        u.Dc = u.c.extend({
            g: function (a, c, d) {
                u.c.call(this, a, c, d);
                if (!a.f.sources || 0 === a.f.sources.length) {
                    c = 0;
                    for (d = a.f.techOrder; c < d.length; c++) {
                        var e = u.Y(d[c]),
                            g = window.videojs[e];
                        if (g && g.isSupported()) {
                            E(a, e);
                            break
                        }
                    }
                } else a.src(a.f.sources)
            }
        });

        function U(a) {
            a.wa = a.wa || [];
            return a.wa
        }
        function V(a, c, d) {
            for (var e = a.wa, g = 0, j = e.length, k, q; g < j; g++) k = e[g], k.id() === c ? (k.show(), q = k) : d && (k.H() == d && 0 < k.mode()) && k.disable();
            (c = q ? q.H() : d ? d : l) && a.k(c + "trackchange")
        }
        u.U = u.c.extend({
            g: function (a, c) {
                u.c.call(this, a, c);
                this.L = c.id || "vjs_" + c.kind + "_" + c.language + "_" + u.u++;
                this.uc = c.src;
                this.Jc = c["default"] || c.dflt;
                this.kd = c.title;
                this.ud = c.srclang;
                this.Rc = c.label;
                this.ia = [];
                this.cc = [];
                this.ka = this.la = 0;
                this.a.d("fullscreenchange", u.bind(this, this.Ec))
            }
        });
        t = u.U.prototype;
        t.H = p("A");
        t.src = p("uc");
        t.ub = p("Jc");
        t.title = p("kd");
        t.label = p("Rc");
        t.readyState = p("la");
        t.mode = p("ka");
        t.Ec = function () {
            this.b.style.fontSize = this.a.F ? 140 * (screen.width / this.a.width()) + "%" : ""
        };
        t.e = function () {
            return u.c.prototype.e.call(this, "div", {
                className: "vjs-" + this.A + " vjs-text-track"
            })
        };
        t.show = function () {
            W(this);
            this.ka = 2;
            u.c.prototype.show.call(this)
        };
        t.v = function () {
            W(this);
            this.ka = 1;
            u.c.prototype.v.call(this)
        };
        t.disable = function () {
            2 == this.ka && this.v();
            this.a.t("timeupdate", u.bind(this, this.update, this.L));
            this.a.t("ended", u.bind(this, this.reset, this.L));
            this.reset();
            this.a.R.textTrackDisplay.removeChild(this);
            this.ka = 0
        };

        function W(a) {
            0 === a.la && a.load();
            0 === a.ka && (a.a.d("timeupdate", u.bind(a, a.update, a.L)), a.a.d("ended", u.bind(a, a.reset, a.L)), ("captions" === a.A || "subtitles" === a.A) && a.a.R.textTrackDisplay.X(a))
        }
        t.load = function () {
            0 === this.la && (this.la = 1, u.get(this.uc, u.bind(this, this.Zc), u.bind(this, this.Fb)))
        };
        t.Fb = function (a) {
            this.error = a;
            this.la = 3;
            this.k("error")
        };
        t.Zc = function (a) {
            var c, d;
            a = a.split("\n");
            for (var e = "", g = 1, j = a.length; g < j; g++) if (e = u.trim(a[g])) {
                -1 == e.indexOf("--\x3e") ? (c = e, e = u.trim(a[++g])) : c = this.ia.length;
                c = {
                    id: c,
                    index: this.ia.length
                };
                d = e.split(" --\x3e ");
                c.startTime = X(d[0]);
                c.ta = X(d[1]);
                for (d = []; a[++g] && (e = u.trim(a[g]));) d.push(e);
                c.text = d.join("<br/>");
                this.ia.push(c)
            }
            this.la = 2;
            this.k("loaded")
        };

        function X(a) {
            var c = a.split(":");
            a = 0;
            var d, e, g;
            3 == c.length ? (d = c[0], e = c[1], c = c[2]) : (d = 0, e = c[0], c = c[1]);
            c = c.split(/\s+/);
            c = c.splice(0, 1)[0];
            c = c.split(/\.|,/);
            g = parseFloat(c[1]);
            c = c[0];
            a += 3600 * parseFloat(d);
            a += 60 * parseFloat(e);
            a += parseFloat(c);
            g && (a += g / 1E3);
            return a
        }
        t.update = function () {
            if (0 < this.ia.length) {
                var a = this.a.currentTime();
                if (this.Kb === b || a < this.Kb || this.Ja <= a) {
                    var c = this.ia,
                        d = this.a.duration(),
                        e = 0,
                        g = l,
                        j = [],
                        k, q, n, s;
                    a >= this.Ja || this.Ja === b ? s = this.vb !== b ? this.vb : 0 : (g = f, s = this.Cb !== b ? this.Cb : c.length - 1);
                    for (;;) {
                        n = c[s];
                        if (n.ta <= a) e = Math.max(e, n.ta), n.Da && (n.Da = l);
                        else if (a < n.startTime) {
                            if (d = Math.min(d, n.startTime), n.Da && (n.Da = l), !g) break
                        } else g ? (j.splice(0, 0, n), q === b && (q = s), k = s) : (j.push(n), k === b && (k = s), q = s), d = Math.min(d, n.ta), e = Math.max(e, n.startTime),
                            n.Da = f;
                        if (g) if (0 === s) break;
                        else s--;
                        else if (s === c.length - 1) break;
                        else s++
                    }
                    this.cc = j;
                    this.Ja = d;
                    this.Kb = e;
                    this.vb = k;
                    this.Cb = q;
                    a = this.cc;
                    c = "";
                    d = 0;
                    for (e = a.length; d < e; d++) c += '<span class="vjs-tt-cue">' + a[d].text + "</span>";
                    this.b.innerHTML = c;
                    this.k("cuechange")
                }
            }
        };
        t.reset = function () {
            this.Ja = 0;
            this.Kb = this.a.duration();
            this.Cb = this.vb = 0
        };
        u.Rb = u.U.extend();
        u.Rb.prototype.A = "captions";
        u.Zb = u.U.extend();
        u.Zb.prototype.A = "subtitles";
        u.Tb = u.U.extend();
        u.Tb.prototype.A = "chapters";
        u.$b = u.c.extend({
            g: function (a, c, d) {
                u.c.call(this, a, c, d);
                if (a.f.tracks && 0 < a.f.tracks.length) {
                    c = this.a;
                    a = a.f.tracks;
                    var e;
                    for (d = 0; d < a.length; d++) {
                        e = a[d];
                        var g = c,
                            j = e.kind,
                            k = e.label,
                            q = e.language,
                            n = e;
                        e = g.wa = g.wa || [];
                        n = n || {};
                        n.kind = j;
                        n.label = k;
                        n.language = q;
                        j = u.Y(j || "subtitles");
                        g = new window.videojs[j + "Track"](g, n);
                        e.push(g)
                    }
                }
            }
        });
        u.$b.prototype.e = function () {
            return u.c.prototype.e.call(this, "div", {
                className: "vjs-text-track-display"
            })
        };
        u.W = u.I.extend({
            g: function (a, c) {
                var d = this.ca = c.track;
                c.label = d.label();
                c.selected = d.ub();
                u.I.call(this, a, c);
                this.a.d(d.H() + "trackchange", u.bind(this, this.update))
            }
        });
        u.W.prototype.n = function () {
            u.I.prototype.n.call(this);
            V(this.a, this.ca.L, this.ca.H())
        };
        u.W.prototype.update = function () {
            2 == this.ca.mode() ? this.selected(f) : this.selected(l)
        };
        u.cb = u.W.extend({
            g: function (a, c) {
                c.track = {
                    H: function () {
                        return c.kind
                    },
                    pc: a,
                    label: function () {
                        return c.kind + " off"
                    },
                    ub: r(l),
                    mode: r(l)
                };
                u.W.call(this, a, c);
                this.selected(f)
            }
        });
        u.cb.prototype.n = function () {
            u.W.prototype.n.call(this);
            V(this.a, this.ca.L, this.ca.H())
        };
        u.cb.prototype.update = function () {
            for (var a = U(this.a), c = 0, d = a.length, e, g = f; c < d; c++) e = a[c], e.H() == this.ca.H() && 2 == e.mode() && (g = l);
            g ? this.selected(f) : this.selected(l)
        };
        u.V = u.ea.extend({
            g: function (a, c) {
                u.ea.call(this, a, c);
                1 >= this.G.length && this.v()
            }
        });
        u.V.prototype.sb = function () {
            var a = [],
                c;
            a.push(new u.cb(this.a, {
                kind: this.A
            }));
            for (var d = 0; d < U(this.a).length; d++) c = U(this.a)[d], c.H() === this.A && a.push(new u.W(this.a, {
                track: c
            }));
            return a
        };
        u.za = u.V.extend({
            g: function (a, c, d) {
                u.V.call(this, a, c, d);
                this.b.setAttribute("aria-label", "Captions Menu")
            }
        });
        u.za.prototype.A = "captions";
        u.za.prototype.pa = "Captions";
        u.za.prototype.className = "vjs-captions-button";
        u.Ba = u.V.extend({
            g: function (a, c, d) {
                u.V.call(this, a, c, d);
                this.b.setAttribute("aria-label", "Subtitles Menu")
            }
        });
        u.Ba.prototype.A = "subtitles";
        u.Ba.prototype.pa = "Subtitles";
        u.Ba.prototype.className = "vjs-subtitles-button";
        u.Sb = u.V.extend({
            g: function (a, c, d) {
                u.V.call(this, a, c, d);
                this.b.setAttribute("aria-label", "Chapters Menu")
            }
        });
        t = u.Sb.prototype;
        t.A = "chapters";
        t.pa = "Chapters";
        t.className = "vjs-chapters-button";
        t.sb = function () {
            for (var a = [], c, d = 0; d < U(this.a).length; d++) c = U(this.a)[d], c.H() === this.A && a.push(new u.W(this.a, {
                track: c
            }));
            return a
        };
        t.Fa = function () {
            for (var a = U(this.a), c = 0, d = a.length, e, g, j = this.G = []; c < d; c++) if (e = a[c], e.H() == this.A && e.ub()) {
                if (2 > e.readyState()) {
                    this.sd = e;
                    e.d("loaded", u.bind(this, this.Fa));
                    return
                }
                g = e;
                break
            }
            a = this.ua = new u.na(this.a);
            a.b.appendChild(u.e("li", {
                className: "vjs-menu-title",
                innerHTML: u.Y(this.A),
                jd: -1
            }));
            if (g) {
                e = g.ia;
                for (var k, c = 0, d = e.length; c < d; c++) k = e[c], k = new u.Xa(this.a, {
                    track: g,
                    cue: k
                }), j.push(k), a.X(k)
            }
            0 < this.G.length && this.show();
            return a
        };
        u.Xa = u.I.extend({
            g: function (a, c) {
                var d = this.ca = c.track,
                    e = this.cue = c.cue,
                    g = a.currentTime();
                c.label = e.text;
                c.selected = e.startTime <= g && g < e.ta;
                u.I.call(this, a, c);
                d.d("cuechange", u.bind(this, this.update))
            }
        });
        u.Xa.prototype.n = function () {
            u.I.prototype.n.call(this);
            this.a.currentTime(this.cue.startTime);
            this.update(this.cue.startTime)
        };
        u.Xa.prototype.update = function () {
            var a = this.cue,
                c = this.a.currentTime();
            a.startTime <= c && c < a.ta ? this.selected(f) : this.selected(l)
        };
        u.i.B(u.da.prototype.f.children, {
            subtitlesButton: {},
            captionsButton: {},
            chaptersButton: {}
        });
        if ("undefined" !== typeof window.JSON && "function" === window.JSON.parse) u.JSON = window.JSON;
        else {
            u.JSON = {};
            var Y = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
            u.JSON.parse = function (a, c) {
                function d(a, e) {
                    var k, q, n = a[e];
                    if (n && "object" === typeof n) for (k in n) Object.prototype.hasOwnProperty.call(n, k) && (q = d(n, k), q !== b ? n[k] = q : delete n[k]);
                    return c.call(a, e, n)
                }
                var e;
                a = String(a);
                Y.lastIndex = 0;
                Y.test(a) && (a = a.replace(Y, function (a) {
                    return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
                }));
                if (/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return e = eval("(" + a + ")"), "function" === typeof c ? d({
                    "": e
                }, "") : e;
                throw new SyntaxError("JSON.parse(): invalid or malformed JSON data");
            }
        }
        u.dc = function () {
            var a, c, d = document.getElementsByTagName("video");
            if (d && 0 < d.length) for (var e = 0, g = d.length; e < g; e++) if ((c = d[e]) && c.getAttribute) c.player === b && (a = c.getAttribute("data-setup"), a !== h && (a = u.JSON.parse(a || "{}"), v(c, a)));
            else {
                u.mb();
                break
            } else u.od || u.mb()
        };
        u.mb = function () {
            setTimeout(u.dc, 1)
        };
        u.Q(window, "load", function () {
            u.od = f
        });
        u.mb();
        u.$c = function (a, c) {
            u.ga.prototype[a] = c
        };
        var Z = this;
        Z.pd = f;

        function $(a, c) {
            var d = a.split("."),
                e = Z;
            !(d[0] in e) && e.execScript && e.execScript("var " + d[0]);
            for (var g; d.length && (g = d.shift());)!d.length && c !== b ? e[g] = c : e = e[g] ? e[g] : e[g] = {}
        };
        $("videojs", u);
        $("_V_", u);
        $("videojs.options", u.options);
        $("videojs.cache", u.qa);
        $("videojs.Component", u.c);
        u.c.prototype.dispose = u.c.prototype.C;
        u.c.prototype.createEl = u.c.prototype.e;
        u.c.prototype.el = u.c.prototype.s;
        u.c.prototype.addChild = u.c.prototype.X;
        u.c.prototype.children = u.c.prototype.children;
        u.c.prototype.on = u.c.prototype.d;
        u.c.prototype.off = u.c.prototype.t;
        u.c.prototype.one = u.c.prototype.Q;
        u.c.prototype.trigger = u.c.prototype.k;
        u.c.prototype.triggerReady = u.c.prototype.Ta;
        u.c.prototype.show = u.c.prototype.show;
        u.c.prototype.hide = u.c.prototype.v;
        u.c.prototype.width = u.c.prototype.width;
        u.c.prototype.height = u.c.prototype.height;
        u.c.prototype.dimensions = u.c.prototype.Kc;
        u.c.prototype.ready = u.c.prototype.M;
        $("videojs.Player", u.ga);
        u.ga.prototype.dispose = u.ga.prototype.C;
        $("videojs.MediaLoader", u.Dc);
        $("videojs.TextTrackDisplay", u.$b);
        $("videojs.ControlBar", u.da);
        $("videojs.Button", u.o);
        $("videojs.PlayToggle", u.Xb);
        $("videojs.FullscreenToggle", u.Aa);
        $("videojs.BigPlayButton", u.Wa);
        $("videojs.LoadingSpinner", u.Vb);
        $("videojs.CurrentTimeDisplay", u.Ya);
        $("videojs.DurationDisplay", u.Za);
        $("videojs.TimeDivider", u.ac);
        $("videojs.RemainingTimeDisplay", u.gb);
        $("videojs.Slider", u.J);
        $("videojs.ProgressControl", u.fb);
        $("videojs.SeekBar", u.Yb);
        $("videojs.LoadProgressBar", u.bb);
        $("videojs.PlayProgressBar", u.Wb);
        $("videojs.SeekHandle", u.hb);
        $("videojs.VolumeControl", u.kb);
        $("videojs.VolumeBar", u.jb);
        $("videojs.VolumeLevel", u.bc);
        $("videojs.VolumeHandle", u.lb);
        $("videojs.MuteToggle", u.fa);
        $("videojs.PosterImage", u.eb);
        $("videojs.Menu", u.na);
        $("videojs.MenuItem", u.I);
        $("videojs.SubtitlesButton", u.Ba);
        $("videojs.CaptionsButton", u.za);
        $("videojs.ChaptersButton", u.Sb);
        $("videojs.MediaTechController", u.q);
        u.q.prototype.features = u.q.prototype.j;
        u.q.prototype.j.volumeControl = u.q.prototype.j.T;
        u.q.prototype.j.fullscreenResize = u.q.prototype.j.Ia;
        u.q.prototype.j.progressEvents = u.q.prototype.j.Lb;
        u.q.prototype.j.timeupdateEvents = u.q.prototype.j.Ob;
        $("videojs.Html5", u.m);
        u.m.Events = u.m.$a;
        u.m.isSupported = u.m.isSupported;
        u.m.canPlaySource = u.m.ob;
        u.m.prototype.setCurrentTime = u.m.prototype.cd;
        u.m.prototype.setVolume = u.m.prototype.hd;
        u.m.prototype.setMuted = u.m.prototype.fd;
        u.m.prototype.setPreload = u.m.prototype.gd;
        u.m.prototype.setAutoplay = u.m.prototype.bd;
        u.m.prototype.setLoop = u.m.prototype.ed;
        $("videojs.Flash", u.l);
        u.l.isSupported = u.l.isSupported;
        u.l.canPlaySource = u.l.ob;
        u.l.onReady = u.l.onReady;
        $("videojs.TextTrack", u.U);
        u.U.prototype.label = u.U.prototype.label;
        $("videojs.CaptionsTrack", u.Rb);
        $("videojs.SubtitlesTrack", u.Zb);
        $("videojs.ChaptersTrack", u.Tb);
        $("videojs.autoSetup", u.dc);
        $("videojs.plugin", u.$c);
        $("videojs.createTimeRange", u.tb);
    })(); //@ sourceMappingURL=video.js.map