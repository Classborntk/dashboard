﻿var url = 'http://classborn.byethost7.com/php/geturl.php?urlpage=https://api.coincap.io/v2/assets';
var iframe;
var ssymbol;
var scap;
var schange;
var shour;
var sday;
var sprice;
var scoinheat;
var slink;
var dataset = [];
var options = {
    VideoTileTitle: "Market Cap - Top 100",
    leafmargin: 1,
    mouseenter: function (branch, box) {

    },
    mousemove: function (branch, box) {

    },
    mouseleave: function (branch, box) {

    },
    click: function (branch, box) {

    },
    CenterBranchTitleVertically: true,
    branchCSS: function (branch, box) {
        return GradientColors(branch, box);
    }
};

function GradientColors(branch, box) {
    var sclass = 'GradientGray';
    var getdata = branch.data;
    switch (getdata) {        
        case 'red':
            sclass = 'GradientRed';
            break;        
        case 'green':
            sclass = 'GradientGreen';
            break;
    }
    return sclass;
}


function onclick() {
    window.open(slink);
}

function listenMessage(msg) {    
    var json = JSON.parse(msg.data);    
    var stop = 0;
    for (var item in json.data) {
        ssymbol = json.data[item].symbol;
        scap = json.data[item].marketCapUsd;
        schange = json.data[item].changePercent24Hr;
        shour = '';
        sday = '';
        sprice = json.data[item].priceUsd;
        scoinheat = '';
        slink = '';
        var scolor = 'green';
        if (schange) {
            if (parseFloat(schange) < 0) {
                scolor = 'red';
            }
        }
        dataset.push({ title: ssymbol, value: parseFloat(scap), tooltip: round(scap, 0), data: scolor, color: 'white' });
        stop = stop + 1;
        if (stop == 100) { break; }
    }
    
    
    $('#treemap1').videotile(dataset, options);
    document.getElementById('imgWait').style.display = 'none';
    $(window).on('resize', function () {
        $('#treemap1').videotile(dataset, options);
    });
}

if (window.addEventListener) {
    window.addEventListener("message", listenMessage, false);
} else {
    window.attachEvent("onmessage", listenMessage);
}

function onloadPage() {
    img = document.createElement('img');
    img.id = 'imgWait';
    img.src = '../images/zmr_wait.gif';
    img.setAttribute('style' , 'position:absolute;left:0%;top:0%;width:100%;height:100%;');
    document.body.appendChild(img);

    iframe = document.createElement('iframe');
    iframe.id = 'json1';
    iframe.src = url;
    iframe.style.display = 'none';
    if (iframe.attachEvent) {
        iframe.attachEvent("onload", function () {
            accesData();
        });
    } else {
        iframe.onload = function () {
            accesData();
        };
    }
    document.body.appendChild(iframe);
    var rrefresh = setInterval(function () {
        dataset = [];
        document.getElementById('imgWait').style.display = 'block';
        iframe.src = url;
    }, 300000);
}

function accesData() {
    var t = iframe;
}


