/*! Simple AJAX infinite scroll by Taufik Nurrohman dte.web.id */
!function (t, e) {
    t.InfiniteScroll = function (n) {
        function r(t, n) {
            return n = n || e, n.querySelectorAll(t)
        }

        function o(t) {
            return void 0 !== t
        }

        function a(t) {
            return "function" == typeof t
        }

        function i(t, e) {
            t = t || {};
            for (var n in e) t[n] = "object" == typeof e[n] ? i(t[n], e[n]) : e[n];
            return t
        }

        function s(t, e, n) {
            return o(t) ? o(e) ? void (o(n) ? g[t][n] = e : g[t].push(e)) : g[t] : g
        }

        function d(t, e) {
            o(e) ? delete g[t][e] : g[t] = []
        }

        function l(t, e) {
            if (o(g[t])) for (var n in g[t]) g[t][n](e)
        }

        function c() {
            return L.innerHTML = p.text.loading, v = !0, M ? (y.classList.add(p.state.loading), l("loading", [p]), void u(M, function (t, n) {
                y.className = x + " " + p.state.load, h = e.createElement("div"), h.innerHTML = t;
                var o = r("title", h),
                    a = r(p.target.post, h),
                    i = r(p.target.anchors + " " + p.target.anchor, h),
                    s = r(p.target.post, H);
                if (o = o && o[0] ? o[0].innerHTML : "", a.length && s.length) {
                    var d = s[s.length - 1];
                    e.title = o, d.insertAdjacentHTML("afterend", " "), h = e.createElement("div");
                    for (var c = 0, u = a.length; u > c; ++c) h.appendChild(a[c]);
                    d.insertAdjacentHTML("afterend", h.innerHTML), f(), M = i.length ? i[0].href : !1, v = !1, q++, l("load", [p, t, n])
                }
            }, function (t, e) {
                y.classList.add(p.state.error), v = !1, f(1), l("error", [p, t, e])
            })) : (y.classList.add(p.state.loaded), L.innerHTML = p.text.loaded, l("loaded", [p]))
        }

        function f(t) {
            if (L.innerHTML = "", T) {
                h.innerHTML = p.text[t ? "error" : "load"];
                var e = h.firstChild;
                e.onclick = function () {
                    return 2 === p.type && (T = !1), c(), !1
                }, L.appendChild(e)
            }
        }
        var u = "infinite-scroll-state-",
            p = {
                target: {
                    posts: ".posts",
                    post: ".post",
                    anchors: ".anchors",
                    anchor: ".anchor"
                },
                text: {
                    load: "%s",
                    loading: "%s",
                    loaded: "%s",
                    error: "%s"
                },
                state: {
                    load: u + "load",
                    loading: u + "loading",
                    loaded: u + "loaded",
                    error: u + "error"
                }
            },
            g = {
                load: [],
                loading: [],
                loaded: [],
                error: []
            };
        p = i(p, n || {}), p.on = s, p.off = d;
        var h = null,
            u = function (e, n, r) {
                if (t.XMLHttpRequest) {
                    var o = new XMLHttpRequest;
                    o.onreadystatechange = function () {
                        if (4 === o.readyState) {
                            if (200 !== o.status) return void (r && a(r) && r(o.responseText, o));
                            n && a(n) && n(o.responseText, o)
                        }
                    }, o.open("GET", e), o.send()
                }
            },
            T = 1 !== p.type,
            v = !1,
            H = r(p.target.posts)[0],
            L = r(p.target.anchors)[0],
            M = r(p.target.anchor, L),
            m = e.body,
            y = e.documentElement,
            x = y.className || "",
            E = H.offsetTop + H.offsetHeight,
            j = t.innerHeight,
            A = 0,
            b = null,
            q = 1;
        if (M.length) {
            M = M[0].href, H.insertAdjacentHTML("afterbegin", " "), h = e.createElement("div"), f();
            var w = function () {
                E = H.offsetTop + H.offsetHeight, j = t.innerHeight, A = m.scrollTop || y.scrollTop, v || E > A + j || c()
            };
            w(), 0 !== p.type && t.addEventListener("scroll", function () {
                T || (b && t.clearTimeout(b), b = t.setTimeout(w, 200))
            }, !1)
        }
        return p
    }
}(window, document);

if (typeof InfiniteScroll !== "undefined") {
    var infinite_scroll = new InfiniteScroll({
        type: 0,
        target: {
            posts: ".blogP",
            post: "article.p",
            anchors: ".blogN",
            anchor: ".np"
        },
        text: {
            load: "<div class='j button' expr:aria-label='data:messages.loadMorePosts' expr:data-text='data:messages.loadMorePosts' role='button'/>",
            loading: "<div class='j m button' expr:data-text='data:messages.loading'><svg viewBox='0 0 50 50' x='0px' y='0px'><path d='M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z'><animateTransform attributeName='transform' attributeType='xml' dur='0.6s' from='0 25 25' repeatCount='indefinite' to='360 25 25' type='rotate'/></path></svg></div>",
            loaded: "<div class='j m n button' expr:data-text='data:messages.noResultsFound'/>",
            error: "<div class='j e button' expr:aria-label='data:messages.loadMorePosts' expr:data-text='data:messages.moreEllipsis' role='button'/>"
        }
    });
}