function onloadPage() {
    createElements();
    enableDrag();
}

function createElements() {
    $('<div class="cbTitle cbFont">Classborn - Dashboard</div>').appendTo(document.body);
    $('<img class="cbLogo" alt="" src="images/classbrn2.png" />').appendTo(document.body);
    $('<img id="imgTop" class="topBackground" src="images/top1.jpg" />').appendTo(document.body);
    $('<div class="s8_container" id="s8Container"></div>').appendTo(document.body);
    $('<img id="imgBottom" class="bottomBackground" src="images/bottom1.jpg" />').appendTo(document.body);    
    $('<img id="imgBTC" title="BTC" class="cbIcon" style="position:absolute;right:55%; top:1%;z-index: 4;cursor:pointer;" src="images/give-money.png" />').appendTo(document.body);
    $('<img id="imgMKC" title="Market Cap" class="cbIcon" style="position:absolute;right:45%; top:1%;z-index: 4;cursor:pointer;" src="images/chart-donut.png" />').appendTo(document.body);
    $('<img id="imgLST" title="Top 100" class="cbIcon" style="position:absolute;right:35%; top:1%;z-index: 4;cursor:pointer;" src="images/list.png" />').appendTo(document.body);
    $('<img id="imgCRT" title="BTC 60 Days" class="cbIcon" style="position:absolute;right:25%; top:1%;z-index: 4;cursor:pointer;" src="images/edu-chart.png" />').appendTo(document.body);
    $('<img id="imgTLE" title="Market Cap - Top 100" class="cbIcon" style="position:absolute;right:15%; top:1%;z-index: 4;cursor:pointer;" src="images/tiles.png" />').appendTo(document.body);
    $('<img id="imgCLS" title="24 hr change" class="cbIcon" style="position:absolute;right:5%; top:1%;z-index: 4;cursor:pointer;" src="images/edu-chart.png" />').appendTo(document.body);
    $('<div id="txt_cr" class="cbCR cbFont"></div>').appendTo(document.body);
    $('<div id="txt_vr" class="cbVR cbFont">Ver 1.0</div>').appendTo(document.body);
    var objContent = document.getElementById('s8Container');
    if (objContent) {
        var scls = 's8_window_background';
        var sstyle = '';
        var w6Height = $(window).height() * .35;
        var w6Width = $(window).width() * .28;
        var sline = '<div class="s8line"></div>';
        for (eachwin = 1; eachwin <= 6; eachwin++) {
            var sscroll = 'auto';            
            var sContent = '<iframe id="pageContainer' + eachwin.toString() + '" name="pgContainer' + eachwin.toString() + '" class="modal-content" ' + sstyle + ' scrolling="' + sscroll + '" frameborder="0"></iframe>';          
            var sInner = '<div id="win' + eachwin.toString() + '" class="s8_window resize-drag ' + scls + ' s8_' + eachwin.toString() + '">' + sline + sContent + '</div>';
            $(sInner).appendTo(objContent);            
        }
        for (eachwin = 1; eachwin <= 6; eachwin++) {
            getPage(eachwin.toString());
        }        
    }
        
    $('#imgBTC').on('click', function () { getPage2(1); });
    $('#imgMKC').on('click', function () { getPage2(2); });
    $('#imgLST').on('click', function () { getPage2(3); });
    $('#imgCRT').on('click', function () { getPage2(4); });
    $('#imgTLE').on('click', function () { getPage2(5); });
    $('#imgCLS').on('click', function () { getPage2(6); });    
}

function getPage(Selected) {
    var spage = 'pageContainer' + Selected;
    var avoidCache = (new Date()).getTime();
    var objFrame = document.getElementById(spage);
    if (objFrame) {       
        objFrame.src = 'html/' + 's8_' + Selected + '.html?avdcache=' + avoidCache;       
    }
}

function getPage2(Selected) {
    var avoidCache = (new Date()).getTime();
    var objFrame = document.getElementById('pageContainer');
    if (objFrame) {
        var spage = 's8_' + Selected + '.html';
        var localwidth = '90%';
        if (Selected.toString().trim() == '1' || Selected.toString().trim() == '2') { localwidth = '70%'; }
        $(objFrame).css('width', localwidth);
        switch (Selected.toString()) {            
            default:
                objFrame.src = 'html/' + spage + '?avdcache=' + avoidCache;
                break;
        }
        var modal = document.getElementById('bckModal');
        modal.style.display = 'block';
    }
}

function enableDrag() {
    interact('.resize-drag')
      .draggable({
          onmove: function (event) {
              var target = event.target,

                  x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
                  y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

              target.style.webkitTransform =
              target.style.transform =
                'translate(' + x + 'px, ' + y + 'px)';
              
              target.setAttribute('data-x', x);
              target.setAttribute('data-y', y);
          }
      })
      .resizable({
          preserveAspectRatio: false,
          edges: { left: true, right: true, bottom: true, top: true }
      })
      .on('resizemove', function (event) {
          var target = event.target,
              x = (parseFloat(target.getAttribute('data-x')) || 0),
              y = (parseFloat(target.getAttribute('data-y')) || 0);

          
          target.style.width = event.rect.width + 'px';
          target.style.height = event.rect.height + 'px';

          
          x += event.deltaRect.left;
          y += event.deltaRect.top;

          target.style.webkitTransform = target.style.transform =
              'translate(' + x + 'px,' + y + 'px)';

          target.setAttribute('data-x', x);
          target.setAttribute('data-y', y);
          
      });
}