﻿var url = 'http://classborn.byethost7.com/php/geturl.php?urlpage=https://coincap.io/front';
var iframe;
var plot4;
var dataJSN = [];

function removecontents() {    
    $('#divChart').remove();
    document.getElementById('imgWait').style.display = 'block';
}

function loadchart(data) {
    var chart = document.createElement('div');
    chart.id = 'divChart';
    chart.setAttribute('style', 'position:absolute;left:0%;top:7%;width:100%;height:90%;');
    document.body.appendChild(chart);
    plot4 = $.jqplot('divChart', [data], {
        seriesColors: ['#09c700'],
        negativeSeriesColors: ['#ff0000'],
        grid: {
            background: 'transparent',
            drawBorder: false,
            shadow: false,
            drawGridlines: false
        },
        axesDefaults: {
	    labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
            fontSize: '4vw'
        },
        seriesDefaults:{
            renderer:$.jqplot.BarRenderer,
            rendererOptions: {
                smooth: true,
                varyBarColor: false,
                fillToZero: true,
                useNegativeColors: true
            },
            pointLabels: { show: false }
        },
        axes: {
            yaxis: {
                tickOptions: {
                    suffix: '%',
                    showMark: false,
                    textColor: '#00B9FF'
                }
            },
            xaxis: {
		renderer: $.jqplot.CategoryAxisRenderer,
		tickRenderer: $.jqplot.CanvasAxisTickRenderer,              
                tickOptions: { angle: -90, textColor: 'white' },
                drawMajorGridlines: false                
            }
        }
    });
    document.getElementById('imgWait').style.display = 'none';    
}


function listenMessage(msg) {
    var json = JSON.parse(msg.data);
    var stop = 0;
    for (var item in json) {                    
        var ssymbolC = json[item].short;
        var scapC = json[item].cap24hrChange;
        if (round(scapC, 0) != 0) {
            dataJSN.push([ssymbolC, round(scapC, 0)]);
        }
        stop = stop + 1;
        if (stop == 100) { break; }
    }
    loadchart(dataJSN.sort(function (a, b) { return a[1] - b[1]; }));
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
    img.setAttribute('style', 'position:absolute;left:0%;top:0%;width:100%;height:100%;');
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

    $(window).on('resize', function () {
        /*plot4.replot({ resetAxes: true });*/
        if (plot4) {
            plot4.destroy();
            loadchart(dataJSN.sort(function (a, b) { return a[1] - b[1]; }));	    
        }
    });

    var rrefresh = setInterval(function () {
        removecontents();
        iframe.src = url;
    }, 300000);

}

function accesData() {
    var t = iframe;
}