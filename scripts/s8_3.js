var url = 'http://classborn.byethost7.com/php/geturl.php?urlpage=https://api.coincap.io/v2/assets?limit=100';
var iframe;
var ssymbol;
var scap;
var schange;
var shour;
var sday;
var sprice;
var scoinheat;
var runonce = false;

function onclick(obj) {
    var sobjid = '#' + $(obj)[0].currentTarget.id;
    var sdata = $(sobjid).attr('datatitle');
    var slink = 'https://coinmarketcap.com/currencies/' + sdata;
    window.open(slink);
}

function removecontents() {
    $('#tblList').remove();
    document.getElementById('imgWait').style.display = 'block';
}

function listenMessage(msg) {
    if (runonce == false) {
        runonce = true;
        var json = JSON.parse(msg.data);
        var tblDiv = document.createElement('div');
        tblDiv.id = 'divList';
        tblDiv.setAttribute('style', 'position:absolute;left:0%;top:0%;width:100%;height:100%;overflow-y:auto;overflow-x:hidden;');
        var tbl = document.createElement('table');
        tbl.id = 'tblList';
        tbl.setAttribute('style', 'width:100%;');
        var stop = 0;
        for (var item in json.data) {
            ssymbol = json.data[item].symbol;
            scap = json.data[item].marketCapUsd;
            schange = json.data[item].changePercent24Hr;
            shour = schange;
            sday = '';
            sprice = json.data[item].priceUsd;
            scoinheat = '';
            var sdata = json.data[item].name.toLowerCase();
            sdata = sdata.replace(/\ /g, "-");
            var tr = tbl.insertRow();
            var cell1 = tr.insertCell(0);
            var cell2 = tr.insertCell(1);
            var cell3 = tr.insertCell(2);
            var cell4 = tr.insertCell(3);            
            var avoidCache = (new Date()).getTime();
            var logo = document.createElement('img');
            logo.id = 'imgLogo' + stop.toString();
            logo.src = '../images/coin/' + ssymbol + '.png?adcache=' + avoidCache;
            logo.setAttribute('style', 'width: 32px; height: 32px; cursor:pointer;');
            logo.setAttribute('datatitle', sdata);
            logo.onclick = onclick;

            var title = document.createElement('div');
            title.id = 'divTitle' + stop.toString();
            title.innerText = ssymbol;
            title.className = 'cbFont2';
            title.setAttribute('style', 'text-align: left;color:white;cursor:pointer;');
            title.setAttribute('datatitle', sdata);
            title.onclick = onclick;

            var price = document.createElement('div');
            price.id = 'divPrice' + stop.toString();
            var sresult;
            if (parseFloat(sprice) < 1) {
                sresult = round(sprice, 6);
            } else {
                sresult = round(sprice, 2);
            }
            price.innerText = '$' + sresult;
            price.className = 'cbFont2';
            price.setAttribute('style', 'text-align: left;color:white;');
                        
            var hr = document.createElement('div');
            var scolor = 'color:white;';
            if (parseFloat(shour) < 0) { scolor = 'color:#00B9FF;' };
            hr.id = 'divhr' + stop.toString();
            hr.innerText = round(shour, 2) + '%';
            hr.className = 'cbFont2';
            hr.setAttribute('style', 'text-align: right; font-weight: bold;' + scolor);

            cell1.setAttribute('style', 'width: 25%; height: 15%;');
            cell2.setAttribute('style', 'width: 25%; height: 15%;');
            cell3.setAttribute('style', 'width: 25%; height: 15%;');
            cell4.setAttribute('style', 'width: 25%; height: 15%;');

            cell1.appendChild(logo);
            cell2.appendChild(title);
            cell3.appendChild(price);
            cell4.appendChild(hr);
            
            stop = stop + 1;
            if (stop == 100) { break; }
        }
        tblDiv.appendChild(tbl);
        document.body.appendChild(tblDiv);
        document.getElementById('imgWait').style.display = 'none';
    }
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
    setTimeout(function () {
        iframe.src = url;
    }, 2000);    

    var rrefresh = setInterval(function () {
        runonce = false;
        removecontents();
        iframe.src = url;
    }, 300000);
    
}

function accesData() {
    var t = iframe;
}


