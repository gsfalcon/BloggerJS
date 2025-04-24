/*<![CDATA[*/
/* Javascript TimeAgo, source: coderwall.com/p/uub3pw/javascript-timeago-func-e-g-8-hours-ago */
/* PORTUGUESE BRAZIL */
(function timeAgo(selector) {
    var templates = {
        prefix: "",
        suffix: " atrás",
        seconds: "alguns segundos",
        minute: "um minuto",
        minutes: "%d minutos",
        hour: "uma hora",
        hours: "%d horas",
        day: "um dia",
        days: "%d dias",
        month: "um mês",
        months: "%d meses",
        year: "um ano",
        years: "%d anos"
    };

    var template = function (t, n) {
        return templates[t] && templates[t].replace(/%d/i, Math.abs(Math.round(n)));
    };

    var timer = function (time) {
        if (!time) return;
        time = time.replace(/\.\d+/, "");
        time = time.replace(/-/, "/").replace(/-/, "/");
        time = time.replace(/T/, " ").replace(/Z/, " UTC");
        time = time.replace(/([\+\-]\d\d)\:?(\d\d)/, " $1$2");
        time = new Date(time * 1000 || time);

        var now = new Date();
        var seconds = ((now.getTime() - time) * .001) >> 0;
        var minutes = seconds / 60;
        var hours = minutes / 60;
        var days = hours / 24;
        var years = days / 365;

        return templates.prefix + (
            seconds < 45 && template("seconds", seconds) ||
            seconds < 90 && template("minute", 1) ||
            minutes < 45 && template("minutes", minutes) ||
            minutes < 90 && template("hour", 1) ||
            hours < 24 && template("hours", hours) ||
            hours < 42 && template("day", 1) ||
            days < 30 && template("days", days) ||
            days < 45 && template("month", 1) ||
            days < 365 && template("months", days / 30) ||
            years < 1.5 && template("year", 1) ||
            template("years", years)
        ) + templates.suffix;
    };

    var elements = document.getElementsByClassName("timeAgo");
    for (var i in elements) {
        var $this = elements[i];
        if (typeof $this === "object") {
            $this.innerHTML = timer($this.getAttribute("datetime") || $this.getAttribute("data-time"));
        }
    }

    setTimeout(timeAgo, 1000);
})();
/*]]>*/
