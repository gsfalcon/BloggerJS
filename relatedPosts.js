!function (e, t, a) {
    if ("object" == typeof labelArray && labelArray.length) {
        for (var l = t.createElement("em"), i = 0, s = labelArray.length; i < s; ++i) {
            l.innerHTML = labelArray[i];
            labelArray[i] = l.textContent;
        }
    }

    var n = (new Date).getTime(),
        r = {
            widgetTitle: "<h3 class='title'>Related Posts</h3>",
            widgetStyle: 1,
            homePage: "//gsfalcontrophies.blogspot.com",
            numPosts: 6,
            summaryLength: 180,
            titleLength: "auto",
            thumbnailSize: 300,
            noImage: "data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=",
            containerId: "relatedPost",
            newTabLink: !1,
            moreText: "Veja Mais",
            callBack: function () { }
        };

    if ("object" == typeof relatedPostConfig) {
        for (var i in relatedPostConfig) r[i] = relatedPostConfig[i];
    }

    r.homePage = r.homePage.replace(/\/\?m=\d+(\&|$)|\/+$/, "");

    var o = function (e) {
        var l = t.createElement("script");
        l.src = e;
        a.appendChild(l);
    },
        m = function (e) {
            var t, a, l = e.length;
            if (0 === l) return !1;
            for (; --l;) {
                t = Math.floor(Math.random() * (l + 1));
                a = e[l];
                e[l] = e[t];
                e[t] = a;
            }
            return e;
        },
        h = "object" == typeof labelArray && labelArray.length ? "/-/" + encodeURIComponent(m(labelArray)[0]) : "";

    e["do_related_post_" + n] = function (e) {
        var a, l, i, s, n, ct, dt, Y, M, D, MM,
            o = t.getElementById(r.containerId),
            h = m(e.feed.entry),
            c = r.widgetStyle,
            d = r.widgetTitle + '<div class="itemR type-' + c + ' flex wrap scrlH" role="feed">',
            u = r.newTabLink ? ' target="_blank"' : "",
            mm = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

        if (o) {
            for (var p = h.length, A = 0; A < r.numPosts && A !== p; A++) {
                l = h[A].title.$t;
                i = "auto" !== r.titleLength && r.titleLength < l.length ? l.substring(0, r.titleLength) + "&hellip;" : l;
                s = "media$thumbnail" in h[A] && !1 !== r.thumbnailSize ? h[A].media$thumbnail.url.replace(/\/s\d+(\-c)?\//, "/s" + r.thumbnailSize + "/") : r.noImage;
                n = "summary" in h[A] && r.summaryLength > 0 ? h[A].summary.$t.replace(/<br *\/?\>/gi, " ").replace(/<.*?>/g, "").replace(/[<>]/g, "").substring(0, r.summaryLength) + "&hellip;" : "";
                ct = h[A].category[0].term;
                dt = h[A].published.$t.substring(0, 29);
                Y = dt.substring(0, 4);
                M = dt.substring(5, 7);
                D = dt.substring(8, 10);
                MM = mm[parseInt(M - 1)];

                for (var f = 0, y = h[A].link.length; f < y; f++) {
                    if ("alternate" == h[A].link[f].rel) {
                        a = h[A].link[f].href;
                        break;
                    }
                }

                d += '<article class="flex"><div class="pI shrink"><a aria-label="Thumbnail" class="image" href="' + a + '"' + u + '><div class="mi lazy" data-style="background-image:url(' + s + ')"></div></a></div><div class="pC grow"><div class="pH info flex fontM"><time class="time ellips opacity shrink" data-text="' + MM + ' ' + D + '" datetime="' + dt + '" title="Published on: ' + MM + ' ' + D + ', ' + Y + '"></time><div class="label ellips cInherit"><a aria-label="Tag" data-text="' + ct + '" href="' + r.homePage + '/search/label/' + ct + '" rel="tag"></a></div></div><div class="pT cInherit"><h4 class="name"><a class="clamp" href="' + a + '"' + u + ">" + i + "</a></h4></div></div></article>';
            }
            o.innerHTML = d += "</div>";
            r.callBack(e);
        }
    };

    e["do_related_post_start_" + n] = function (e) {
        var t, a, l = e.feed.openSearch$totalResults.$t - r.numPosts,
            i = (t = 1, a = l > 0 ? l : 1, Math.floor(Math.random() * (a - t + 1)) + t);

        o(r.homePage + "/feeds/posts/summary" + h + "?alt=json-in-script&orderby=updated&start-index=" + i + "&max-results=" + r.numPosts + "&callback=do_related_post_" + n);
    };

    o(r.homePage + "/feeds/posts/summary?alt=json-in-script&orderby=updated&max-results=0&callback=do_related_post_start_" + n);
}(window, document, document.getElementsByTagName("head")[0]);