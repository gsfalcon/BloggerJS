function getOS() {
    let userAgent = navigator.userAgent;
    let platform = navigator.platform;
    let os = "Unknown";

    if (/Win/i.test(platform)) {
        if (/Windows NT 10.0/i.test(userAgent)) os = "Windows 10/11";
        else if (/Windows NT 6.3/i.test(userAgent)) os = "Windows 8.1";
        else if (/Windows NT 6.2/i.test(userAgent)) os = "Windows 8";
        else if (/Windows NT 6.1/i.test(userAgent)) os = "Windows 7";
        else if (/Windows NT 6.0/i.test(userAgent)) os = "Windows Vista";
        else if (/Windows NT 5.1/i.test(userAgent)) os = "Windows XP";
    } else if (/Mac/i.test(platform)) {
        os = "MacOS";
    } else if (/Linux/i.test(platform)) {
        os = "Linux";
    } else if (/Android/i.test(userAgent)) {
        os = "Android";
    } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
        os = "iOS";
    }
    return os;
}

function getBrowser() {
    let userAgent = navigator.userAgent;
    let browser = "Unknown";

    if (/Edg/i.test(userAgent)) browser = "Microsoft Edge";
    else if (/Chrome\/([0-9\.]+)/i.test(userAgent)) browser = `Google Chrome ${userAgent.match(/Chrome\/([0-9\.]+)/i)[1]}`;
    else if (/Firefox\/([0-9\.]+)/i.test(userAgent)) browser = `Mozilla Firefox ${userAgent.match(/Firefox\/([0-9\.]+)/i)[1]}`;
    else if (/Safari\/([0-9\.]+)/i.test(userAgent) && !/Chrome/i.test(userAgent)) browser = `Safari ${userAgent.match(/Version\/([0-9\.]+)/i)[1]}`;
    else if (/MSIE ([0-9\.]+)/i.test(userAgent) || /Trident.*rv:([0-9\.]+)/i.test(userAgent)) browser = `Internet Explorer ${userAgent.match(/(MSIE|rv:)([0-9\.]+)/i)[2]}`;

    return browser;
}

function fetchIP() {
    fetch('https://ipapi.co/json/')
        .then(response => response.json())
        .then(data => {
            document.getElementById("ip").textContent = data.ip;
            document.getElementById("location").textContent = `${data.city}, ${data.region}, ${data.country_name}`;
        })
        .catch(() => {
            document.getElementById("ip").textContent = "Not found";
            document.getElementById("location").textContent = "Not available";
        });
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("os").textContent = getOS();
    document.getElementById("browser").textContent = getBrowser();
    fetchIP();
});