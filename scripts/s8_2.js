var url = 'http://classborn.byethost7.com/php/geturl.php?urlpage=https://api.coincap.io/v2/assets?limit=2000';

var iframe;
var smarket_cap;
var schange;
var s24;
var s1;
var s7;
var s24h_volume;

function loadcontents() {
    var title = document.createElement('div');
    title.id = 'divTitle';
    title.innerText = 'Market Cap $' + smarket_cap;
    title.className = 'cbFont2';
    title.setAttribute('style','position:absolute;left:0%;top:0.10%;width:100%;text-align: center;color:white;font-weight: bold;');
    document.body.appendChild(title);

    var hr24 = document.createElement('div');
    var scolor = 'color:white;';
    if (parseFloat(s24) < 0) { scolor = 'color:#00B9FF;' };
    hr24.id = 'divhr24';
    hr24.innerText = '24Hr: ' + s24 + '%';
    hr24.className = 'cbFont2';
    hr24.setAttribute('style', 'display:none;position:absolute;left:0%;top:90%;font-weight: bold;' + scolor);
    document.body.appendChild(hr24);

    var hr = document.createElement('div');
    scolor = 'color:white;';
    if (parseFloat(s1) < 0) { scolor = 'color:#00B9FF;' };
    hr.id = 'divhr';
    hr.innerText = '1Hr: ' + s1 + '%';
    hr.className = 'cbFont2';
    hr.setAttribute('style', 'display:none;position:absolute;left:37%;top:90%;font-weight: bold;' + scolor);
    document.body.appendChild(hr);

    var heat = document.createElement('div');
    scolor = 'color:white;';
    if (parseFloat(s7) < 0) { scolor = 'color:#00B9FF;' };
    heat.id = 'div7Day';
    heat.innerText = '7Day: ' + s7 + '%';
    heat.className = 'cbFont2';
    heat.setAttribute('style','display:none;position:absolute;left:65%;top:90%;font-weight: bold;' + scolor);
    document.body.appendChild(heat);    
}

function removecontents() {
    $('#divTitle').remove();
    $('#divhr24').remove();
    $('#divhr').remove();
    $('#div7Day').remove();
    $('#divChart').remove();
    document.getElementById('imgWait').style.display = 'block';
}

function loadchart(data) {
    var chart = document.createElement('div');
    chart.id = 'divChart';
    chart.setAttribute('style','position:absolute;left:0%;top:7%;width:100%;height:90%;');
    document.body.appendChild(chart);

    var plot4 = $.jqplot('divChart', [data], {
        grid: {
            background: 'transparent',
            drawBorder: false,
            shadow: false
        },
        legend: { show: true, location: 'e', background: 'transparent', textColor: 'white', fontSize: '4vw' },
        seriesColors: ['#FFFFFF', '#CCF1FF', '#99E3FF', '#66D5FF', '#33C7FF','#00B9FF'],
        seriesDefaults: {
            renderer: $.jqplot.DonutRenderer,
            rendererOptions: {
                sliceMargin: 3,
                startAngle: -90,
                showDataLabels: true,
                dataLabels: 'value',
                totalLabel: false
            },
            highlighter: {
                show: true,
                formatString: '%s',
                tooltipLocation: 'sw',
                useAxesFormatters: false
            }
        }
    });
    $('.jqplot-data-label').css('font-size', '5vw');
    document.getElementById('imgWait').style.display = 'none';
    $(window).on('resize', function () {
        plot4.replot({ resetAxes: true });
        $('.jqplot-data-label').css('font-size', '5vw');
    });
}


function listenMessage(msg) {    
    var json = JSON.parse(msg.data);
    smarket_cap = 0;
    var data = [];
    var rest = parseFloat(0);
    for (var item in json.data) {
        if (json.data[item]) {            
            if (json.data[item].marketCapUsd) { smarket_cap = smarket_cap + parseFloat(json.data[item].marketCapUsd); }        
        }
    }
    for (var item in json.data) {
        if (json.data[item]) {
            if (json.data[item].rank) {
                if (parseInt(json.data[item].rank) <= 5) {
                    var ssymbolC = json.data[item].symbol;
                    var scapC = json.data[item].marketCapUsd;
                    rest = rest + parseFloat(scapC);
                    data.push([ssymbolC, (parseFloat(scapC) / parseFloat(smarket_cap)) * 100]);
                }
            } else {
                break;
            }
        }
    }
    smarket_cap = round(smarket_cap, 0);
    schange = '';
    s24 = '0';
    s1 = '0';
    s7 = '0';
    s24h_volume = '0';
    loadcontents();
    var drest = ((parseFloat(smarket_cap) - rest) / parseFloat(smarket_cap)) * 100;
    data.push(['*', drest]);
    loadchart(data);
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
    img.setAttribute('style','position:absolute;left:0%;top:0%;width:100%;height:100%;');
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
        removecontents();
        iframe.src = url;
    }, 300000);

}

function accesData() {
    var t = iframe;
}


