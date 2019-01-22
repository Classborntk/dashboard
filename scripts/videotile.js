(function ($) {
    VideoTile.branchtitlemargin = 20;
    VideoTile.prototype.sumarize = function (Branches) {
        var result = 0;
        var length = Branches.length;
        for (var i = 0; i < length; i++)
            result += Branches[i].value;
        return result;
    };
    function Leaf(x, y, width, height, margin) {
        this.width = width; this.height = height; this.margin = margin; this.x = x; this.y = y;
    }
    Leaf.prototype.location = function () {
        return {
            width: (this.width - this.margin) + "px", height: (this.height - this.margin) + "px", top: this.y + 'px', left: this.x + 'px'
        };
    };
    Leaf.prototype.overflow = function () {
        return this.width > this.height;
    };
    VideoTile.prototype.BranchTitleFontSize = function ($branchtitle, branch) {
        var branchBounds = branch.bounds;
        var fontSize = parseFloat($branchtitle.css('font-size'));
        var stext = $branchtitle[0].innerText;
        var icount = stext.length;
        if (icount == 0) { icount = 1; }
        if (fontSize >= branchBounds.height) { fontSize = branchBounds.height; }
        if (fontSize * icount >= branchBounds.width) { fontSize = branchBounds.width / icount; }
        $branchtitle.css('font-size', fontSize + 'px');
        $branchtitle.css('display', 'block');
        this.renderEvent($branchtitle, branch);
    };
    function VideoTile($div, options) {
        options = options || {};
        this.$div = $div;
        if (options.VideoTileTitle) {
            var $mainTitle = $('<div id="' + $div[0].id + '_maintitle' + '" class="cbvideotile-maintitle">' + options.VideoTileTitle + '</div>');
            $div.parent().prepend($mainTitle);
        }
        $div.css('position', 'relative');
        this.leaf = new Leaf(0, 0, $div.width(), $div.parent().height(), 0);
        this.branchCSS = function () { return ""; };
        this.click = function () { };
        this.mouseenter = function () { };
        this.mouseleave = function () { };
        this.mousemove = function () { };
        this.renderEvent = function () { };
        this.rendered = function () { };
        this.leafmargin = 0;
        this.textSize = 12;
        this.CenterBranchTitleVertically = true;
        $.extend(this, options);
    }
    VideoTile.prototype.render = function (Branches) {
        var avoidcache = (new Date()).getTime();
        var savoidcache = 'true';
        Branches = this.renderize(Branches, this.leaf);
        for (var i = 0; i < Branches.length; i++) {
            var branch = Branches[i];
            var branchBounds = branch.bounds;
            var boxId = branch.id || 'cbvideotile-branch-' + i;
            var $branch = $('<div id=' + boxId + '></div>');
            $branch.css($.extend(branchBounds.location(), { 'position': 'absolute' }));
            $branch.addClass('cbvideotile-branch');
            $branch.attr('data-title', branch.data);
            var self = this;
            $branch.bind('mouseenter', branch, function (e) { self.mouseenter(e.data, e); });
            $branch.bind('mouseleave', branch, function (e) { self.mouseleave(e.data, e); });
            $branch.bind('mousemove', branch, function (e) { self.mousemove(e.data, e); });
            $branch.bind('click', branch, function (e) { self.click(e.data, e); });
            $branch.appendTo(this.$div);
            $branch.css('background-color', branch.backgroundcolor);
            if (branch.avoidcache) {
                savoidcache = branch.avoidcache;
            }
            if (branch.backgroundimage) {
                var scache1 = "";
                var sprefx1 = "?";
                if (savoidcache == 'true') {
                    if (branch.backgroundimage.indexOf('?') > -1) { sprefx1 = "&"; }
                    scache1 = sprefx1 + 'avoidcache=' + avoidcache;
                }
                var cUrl = 'url(' + branch.backgroundimage + scache1 + ')';
                $branch.css('background-image', cUrl);
                $branch.css('-webkit-background-size', '100% 100%');
                $branch.css('-moz-background-size', '100% 100%');
                $branch.css('-o-background-size', '100% 100%');
                $branch.css('background-size', '100% 100%');
            }
            if (branch.video) {
                if (branch.video.indexOf('youtu') >= 0 && branch.video.indexOf('http') >= 0) {
                    var scache2 = "";
                    var sprefx2 = "&";
                    if (savoidcache == 'true') {
                        scache2 = sprefx2 + 'avoidcache=' + avoidcache;
                    }
                    var svideoid = branch.video.replace('https://www.youtube.com/watch?v=', '');
                    var svidimage = 'https://i.ytimg.com/vi/' + svideoid + '/hqdefault.jpg';
                    var cUrl = 'url(' + svidimage + ')';
                    $branch.css('background-image', cUrl);
                    $branch.css('-webkit-background-size', '100% 100%');
                    $branch.css('-moz-background-size', '100% 100%');
                    $branch.css('-o-background-size', '100% 100%');
                    $branch.css('background-size', '100% 100%');
                    var $playbutton = $('<img style="height: 15%; width: 15%; left: 50%; top: 50%; position: absolute; cursor:pointer;" src="../images/play.png" onmouseout="this.style.opacity=1;this.filters.alpha.opacity=100" onmouseover="this.style.opacity=0.6;this.filters.alpha.opacity=60" />');
                    var svidpath = branch.video.replace('/watch?v=', '/embed/') + '?autoplay=1&autohide=1&border=0&wmode=opaque&enablejsapi=1' + scache2;
                    var iwidth = $branch.width();
                    var iheight = $branch.height();             
                    $playbutton.attr('data-youtube', svidpath);
                    $playbutton.attr('data-width', iwidth);
                    $playbutton.attr('data-height', iheight);
                    $playbutton.click(function () {
                        var spath = $(this).attr('data-youtube');
                        var sswidth = $(this).attr('data-width');
                        var ssheight = $(this).attr('data-height');
                        var youtube = '<iframe style="visibility:hidden;" onload="this.style.visibility=' + String.fromCharCode(39) + 'visible' + String.fromCharCode(39) + ';" width="' + sswidth + '" height="' + ssheight + '" src="' + spath + '" frameborder="0" allowfullscreen></iframe>';
                        $(this).parent().css('background', 'black');
                        $(this).parent()[0].innerHTML = youtube;
                    });
                    $branch.append($playbutton);
                }
                else {
                    var showctr = "";
                    var sloop = "";
                    var sautoplay = "autoplay";
                    var smuted = "";
                    var sposter = '';
                    if (branch.showcontrols == "true") { showctr = "controls"; }
                    if (branch.loop == "true") { sloop = "loop"; }
                    if (branch.autoplay == "false") { sautoplay = "autoplay"; }
                    if (branch.muted == "true") { smuted = "muted"; }
                    if (branch.poster != '') { sposter = ' poster = "' + branch.sposter + '" '; }
                    var scache3 = "";
                    var sprefx3 = "?";
                    if (savoidcache == 'true') {
                        if (branch.video.indexOf('?') > -1) { sprefx3 = "&"; }
                        scache3 = sprefx3 + 'avoidcache=' + avoidcache;
                    }
                    var $video = $('<video class="cbvidVideoTile" preload="auto" ' + sautoplay + ' ' + showctr + ' ' + sloop + ' ' + smuted + ' ' + sposter + '><source src="' + branch.video + scache3 + '" />HTML5 video not supported</video>');
                    var $vidcc = $("<div></div>");
                    $vidcc.css({
                        'display': 'block',
                        'position': 'relative',
                        'width': '100%',
                        'height': '100%',
                        'z-index': '99'
                    });
                    $vidcc.append($video);
                    $branch.append($vidcc);
                }
            }
            if (branch.url) {
                var $url = $('<iframe style="width:' + $(window).width() + 'px;height:' + $(window).height() + 'px;" src="' + branch.url + '" frameborder="0" scrolling="no" allowTransparency="true"></iframe>');
                var bh1 = $branch.height() / $(window).height();
                var bw1 = $branch.width() / $(window).width();
                var $divpage = $('<div style="overflow: hidden;width:' + $branch.width() + 'px;height:' + $branch.height() + 'px;"></div>');
                $url.css({
                    '-webkit-transform-origin': '0 0',
                    '-ms-transform-origin': '0 0',
                    '-moz-transform-origin': '0 0',
                    'transform-origin': '0 0',
                    '-webkit-transform': 'scale(' + bw1 + ',' + bh1 + ')',
                    '-ms-transform': 'scale(' + bw1 + ',' + bh1 + ')',
                    '-moz-transform': 'scale(' + bw1 + ',' + bh1 + ')',
                    'transform': 'scale(' + bw1 + ',' + bh1 + ')'
                });
                $divpage.append($url);
                $branch.append($divpage);
            }
            $branch.css('color', branch.color);
            $branch.addClass(this.branchCSS(branch, $branch));
            $branch.attr('title', branch.tooltip);
            var $content = $("<div>" + branch.title + "</div>");
            $content.addClass('cbvideotile-title');
            $content.css({
                'display': 'inline',
                'position': 'relative',
                'text-align': 'center',
                'font-size': this.textSize + 'px'
            });
            $branch.append($content);
            this.BranchTitleFontSize($content, branch);
            if (this.CenterBranchTitleVertically) { $content.css('margin-top', (parseInt($branch.height()) / 2) - (parseInt($content.height()) / 2) + 'px'); }
        }
        this.rendered();
    };
    VideoTile.prototype.renderize = function (Branches, leaf) {
        Branches.sort(function (a, b) {
            return b.value - a.value;
        });
        this.renderBoundaries(Branches, leaf);
        return Branches;
    };
    VideoTile.prototype.renderBoundaries = function (Branches, targetLeaf) {
        if (Branches.length === 0) { return; }
        if (Branches.length == 1) { Branches[0].bounds = targetLeaf; return; }
        var boundaries = this.distribute(Branches);
        var leftboundary = this.sumarize(boundaries.left);
        var righboundary = this.sumarize(boundaries.right);
        var totalboundary = righboundary + leftboundary;
        if (targetLeaf.overflow()) {
            var centerboundary = Math.round((leftboundary * targetLeaf.width) / totalboundary);
            this.renderBoundaries(boundaries.left, new Leaf(targetLeaf.x, targetLeaf.y, centerboundary, targetLeaf.height, this.leafmargin)); this.renderBoundaries(boundaries.right, new Leaf(targetLeaf.x + centerboundary, targetLeaf.y, targetLeaf.width - centerboundary, targetLeaf.height, this.leafmargin));
        } else {
            var centerboundary = Math.round((leftboundary * targetLeaf.height) / totalboundary);
            this.renderBoundaries(boundaries.left, new Leaf(targetLeaf.x, targetLeaf.y, targetLeaf.width, centerboundary, this.leafmargin)); this.renderBoundaries(boundaries.right, new Leaf(targetLeaf.x, targetLeaf.y + centerboundary, targetLeaf.width, targetLeaf.height - centerboundary, this.leafmargin));
        }
    };
    VideoTile.prototype.distribute = function (Branches) {
        var init = 0;
        var length = Branches.length;
        var boundary = this.sumarize(Branches) / 2;
        for (var i = 0; i < length; i++) {
            if (i > 0 && (init + Branches[i].value > boundary)) { break; }
            init += Branches[i].value;
        }
        return { left: Branches.slice(0, i), right: Branches.slice(i) };
    };
    $.fn.videotile = function (json, options) {
        var self = this;
        var stitle = '#' + self[0].id + '_maintitle';
        $(stitle).remove();
        self.empty();
        return new VideoTile(self, options).render(json);
    };
})(jQuery);
