function isChrome() {
    var bresult = false;
    var isChromium = window.chrome,
        winNav = window.navigator,
        vendorName = winNav.vendor,
        isOpera = winNav.userAgent.indexOf("OPR") > -1,
        isIEedge = winNav.userAgent.indexOf("Edge") > -1,
        isIOSChrome = winNav.userAgent.match("CriOS");
    if (isIOSChrome) {
        bresult = true;
    } else if (isChromium !== null && isChromium !== undefined && vendorName === "Google Inc." && isOpera == false && isIEedge == false) {
        bresult = true;
    } else {
        bresult = false;
    }
    return bresult;
}

function roundNumber(num, scale) {
    var number = Math.round(num * Math.pow(10, scale)) / Math.pow(10, scale);
    if (num - number > 0) {
        return (number + Math.floor(2 * Math.round((num - number) * Math.pow(10, (scale + 1))) / 10) / Math.pow(10, scale));
    } else {
        return number;
    }
}

function round(value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

function setFocus(sId) {
    var obj = document.getElementById(sId);
    obj.focus();
    obj.scrollIntoView();
}

function closeModal_onclick() {
    var modal = document.getElementById('bckModal');
    modal.style.display = "none";
    var objFrame = document.getElementById('pageContainer');
    if (objFrame) {
        objFrame.src = 'html/empty.html';
    }
}

Element.prototype.hasClassName = function (a) {
    return new RegExp("(?:^|\\s+)" + a + "(?:\\s+|$)").test(this.className);
};

Element.prototype.addClassName = function (a) {
    if (!this.hasClassName(a)) {
        this.className = [this.className, a].join(" ");
    }
};

Element.prototype.removeClassName = function (b) {
    if (this.hasClassName(b)) {
        var a = this.className;
        this.className = a.replace(new RegExp("(?:^|\\s+)" + b + "(?:\\s+|$)", "g"), " ");
    }
};

Element.prototype.toggleClassName = function (a) {
    this[this.hasClassName(a) ? "removeClassName" : "addClassName"](a);
};

function setProtocol(url) {
    var getProtocol = window.location.protocol;
    if (getProtocol == 'https:') {
        url = url.replace(/\http:/g, "https:");
    }
    return url;
}