var url = 'http://classborn.byethost7.com/php/geturl.php?urlpage=https://chasing-coins.com/api/v1/top-coins/1';
var iframe;
var ssymbol;
var scap;
var schange;
var shour;
var sday;
var sprice;
var scoinheat;
var slink;

function loadcontents() {
    var logo = document.createElement('img');
    logo.id = 'imgLogo';
    logo.src = '../images/coin/' + ssymbol + '.png';
    logo.setAttribute('style','position:absolute;left:0%;top:10%;width:20%;height:25%;cursor:pointer;');
    logo.onclick = onclick;
    document.body.appendChild(logo);

    var title = document.createElement('div');
    title.id = 'divTitle';
    title.innerText = ssymbol;
    title.className = 'cbFont';
    title.setAttribute('style','position:absolute;left:0%;top:0.10%;width:100%;text-align: center;color:white;cursor:pointer;');
    title.onclick = onclick;
    document.body.appendChild(title);
   
    var price = document.createElement('div');
    price.id = 'divPrice';
    price.innerText = '$' + Math.round(parseFloat(sprice), 0).toString().trim();
    price.className = 'cbFont';
    price.setAttribute('style','position:absolute;left:0%;top:35%;width:100%;text-align: center;color:white;');
    document.body.appendChild(price);
   
    var marketcap = document.createElement('div');
    marketcap.id = 'divMarketCap';
    marketcap.innerText = 'Market Cap: $' + scap;
    marketcap.className = 'cbFont2';
    marketcap.setAttribute('style','position:absolute;left:0%;top:75%;width:100%;text-align: center;color:white;font-weight: bold;');
    document.body.appendChild(marketcap);
    
    var hr24 = document.createElement('div');
    var scolor = 'color:white;';
    if (parseFloat(sday) < 0) { scolor = 'color:#00B9FF;' };
    hr24.id = 'divhr24';
    hr24.innerText = '24Hr: ' + sday + '%';
    hr24.className = 'cbFont2';
    hr24.setAttribute('style', 'display:none;position:absolute;left:0%;top:90%;font-weight: bold;' + scolor);
    document.body.appendChild(hr24);

    var hr = document.createElement('div');
    var scolor = 'color:white;';
    if (parseFloat(shour) < 0) { scolor = 'color:#00B9FF;' };
    if (parseFloat(sday) < 0) { scolor = 'color:#00B9FF;' };
    hr.id = 'divhr';
    hr.innerText = '1Hr: ' + shour + '%';
    hr.innerText = '24Hr: ' + sday + '%';
    hr.className = 'cbFont2';
    hr.setAttribute('style', 'position:absolute;left:40%;top:90%;font-weight: bold;' + scolor);
    document.body.appendChild(hr);

    var heat = document.createElement('div');
    var scolor = 'color:white;';
    if (parseFloat(shour) < 0) { scolor = 'color:#00B9FF;' };
    heat.id = 'divHeat';
    heat.innerText = 'Heat: ' + scoinheat + '%';
    heat.className = 'cbFont2';
    heat.setAttribute('style', 'display:none;position:absolute;left:75%;top:90%;font-weight: bold;' + scolor);
    document.body.appendChild(heat);

    document.getElementById('imgWait').style.display = 'none';

}

function removecontents() {
    $('#imgLogo').remove();
    $('#divTitle').remove();
    $('#divPrice').remove();
    $('#divMarketCap').remove();
    $('#divhr24').remove();
    $('#divhr').remove();
    $('#divHeat').remove();
    document.getElementById('imgWait').style.display = 'block';
}

function onclick() {
    window.open(slink);
}

function listenMessage(msg) {    
    var json = JSON.parse(msg.data);    
    for (var item in json) {
        ssymbol = json[item].symbol;
        scap = json[item].cap;
        schange = json[item].change;
        shour = schange.hour;
        sday = schange.day;
        sprice = json[item].price;
        scoinheat = json[item].coinheat;
        slink = json[item].url;
    }    
    loadcontents();
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


