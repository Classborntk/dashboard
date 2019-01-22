var url = 'http://classborn.byethost7.com/php/geturl.php?urlpage=https://coincap.io/front';
var iframe;
var ssymbol;
var scap;
var schange;
var shour;
var sday;
var sprice;
var scoinheat;

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
    var json = JSON.parse(msg.data);
    var tbl = document.createElement('table');
    tbl.id = 'tblList';
    tbl.setAttribute('style', 'width:100%;height:1px;');
    var stop = 0;
    for (var item in json) {
        ssymbol = json[item].short;
        scap = json[item].mktcap;
        schange = json[item].cap24hrChange;
        shour = schange;
        sday = '';
        sprice = json[item].price;
        scoinheat = '';
        var sdata = json[item].long.toLowerCase();
        sdata = sdata.replace(/\ /g, "-");
        var tr = tbl.insertRow();
        var cell1 = tr.insertCell(0);
        var cell2 = tr.insertCell(1);
        var cell3 = tr.insertCell(2);
        var cell4 = tr.insertCell(3);
        var cell5 = tr.insertCell(4);
        var cell6 = tr.insertCell(5);

        var logo = document.createElement('img');
        logo.id = 'imgLogo' + stop.toString();
        logo.src = '../images/coin/' + ssymbol + '.png';
        logo.setAttribute('style', 'width:25px;height:25px;cursor:pointer;');
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
        price.innerText = '$' + sprice;
        price.className = 'cbFont2';
        price.setAttribute('style','text-align: left;color:white;');
        
        var hr24 = document.createElement('div');
        var scolor = 'color:white;';
        if (parseFloat(sday) < 0) { scolor = 'color:#00B9FF;' };
        hr24.id = 'divhr24' + stop.toString();
        hr24.innerText = '';
        hr24.className = 'cbFont3';
        hr24.setAttribute('style','font-weight: bold;' + scolor);
        

        var hr = document.createElement('div');
        var scolor = 'color:white;';
        if (parseFloat(shour) < 0) { scolor = 'color:#00B9FF;' };
        hr.id = 'divhr' + stop.toString();
        hr.innerText =  shour + '%';
        hr.className = 'cbFont3';
        hr.setAttribute('style','font-weight: bold;' + scolor);
        

        var heat = document.createElement('div');
        var scolor = 'color:white;';
        if (parseFloat(shour) < 0) { scolor = 'color:#00B9FF;' };
        heat.id = 'divHeat' + stop.toString();
        heat.innerText = '';
        heat.className = 'cbFont3';
        heat.setAttribute('style', 'font-weight: bold;' + scolor);
      

        cell1.appendChild(logo);
        cell2.appendChild(title);
        cell3.appendChild(price);
        cell4.appendChild(hr24);
        cell5.appendChild(hr);
        cell6.appendChild(heat);
        stop = stop + 1;
        if (stop == 100) { break; }
    }
    document.body.appendChild(tbl);
    document.getElementById('imgWait').style.display = 'none';
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
        removecontents();
        iframe.src = url;
    }, 300000);
    
}

function accesData() {
    var t = iframe;
}


