var url = 'http://classborn.byethost7.com/php/geturl.php?urlpage=https://api.blockchain.info/charts/market-price%3Ftimespan=60days%26format=json';
var iframe;
var smarket_cap;
var schange;
var s24;
var s1;
var s7;
var s24h_volume;
var plot4;
var dataJSN = [];

function loadchart(data) {    
    plot4 = $.jqplot('divChart', [data], {
        grid: {
            background: 'transparent',
            drawBorder: false,
            shadow: false
        },
        
        legend: { show: false, location: 'e', background: 'transparent', textColor: 'white' },
        seriesColors: ['#FFFFFF', '#CCF1FF', '#99E3FF', '#66D5FF', '#33C7FF', '#00B9FF'],        
        axesDefaults: {
            labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
            fontSize: '4vw'
        },
        seriesDefaults: {
            rendererOptions: {
                smooth: true
            }
        },
        axes: {            
            xaxis: {
                renderer: $.jqplot.DateAxisRenderer,
                tickRenderer: $.jqplot.CanvasAxisTickRenderer,
                tickOptions: { formatString: '%b %#d', angle: -30, textColor: '#00B9FF' },
            },
            yaxis: {
                tickOptions: {
                    formatString: "$%'d",
                    showMark: false,
                    textColor: '#00B9FF'
                }
            }
        },
        highlighter: {
            show: true,
            sizeAdjust: 7.5,
            formatString: '<div style="background:black;color:#00B9FF;font-size: 5vh;font-weight: bold;">%s</div><div style="background:black;color:#00B9FF;font-size: 5vh;font-weight: bold;">%s</div>',
            tooltipLocation : 's'
        },
        series: [{ lineWidth: 4, markerOptions: { style: 'circle', size : 1 } }]
    });
    document.getElementById('imgWait').style.display = 'none';    
}


function listenMessage(msg) {    
    var json = JSON.parse(msg.data);
    if (json.values) {                
        var sarray = json.values;
        for (var item in sarray) {
            var sX = timeConverter(parseFloat(sarray[item].x));
            var sY = parseInt(sarray[item].y);
            
            dataJSN.push([sX, sY]);
           
        }        
        loadchart(dataJSN);
    }
}

function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);    
    var months = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = year + '-' + month + '-' + date;
    return parseDate(time);
}

function parseDate(input) {
    var parts = input.match(/(\d+)/g);
    return new Date(parts[0], parts[1] - 1, parts[2]);
}

if (window.addEventListener) {
    window.addEventListener("message", listenMessage, false);
} else {
    window.attachEvent("onmessage", listenMessage);
}

function onloadPage() {
    var chart = document.createElement('div');
    chart.id = 'divChart';
    chart.setAttribute('style', 'position:absolute;left:0%;top:1%;width:90%;height:90%;');
    document.body.appendChild(chart);

    img = document.createElement('img');
    img.id = 'imgWait';
    img.src = '../images/zmr_wait.gif';
    img.setAttribute('style' , 'position:absolute;left:0%;top:0%;width:100%;height:100%;');
    document.body.appendChild(img);

    iframe = document.createElement('iframe');
    iframe.id = 'json1';
    iframe.src = setProtocol(url);
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
            loadchart(dataJSN);
        }
    });
}

function accesData() {
    var t = iframe;
}


