

var theme = function (_layerBorad, _layerBg, _layerTheme, _layerTheme2, _layerDots, _layerLines, xx, yy) {
    this.radius = 6;
    this.xBorder = 20;
    this.yBorder = 20;
    this.drawingWidth = 1;
    this.fillStyle = '#FFCC99';
    this.strockStyle = 'blue';
    this.layerBoard = document.getElementById(_layerBorad);
    this.layerBg = document.getElementById(_layerBg);
    this.layerTheme = document.getElementById(_layerTheme);

    this.layerTheme2 = document.getElementById(_layerTheme2);

    this.layerDots = document.getElementById(_layerDots);
    this.layerLines = document.getElementById(_layerLines);
    this.contextBg = this.layerBg.getContext('2d');
    this.contextTheme = this.layerTheme.getContext('2d');

    this.contextTheme2 = this.layerTheme2.getContext('2d');

    this.contextDots = this.layerDots.getContext('2d');
    this.contextLines = this.layerLines.getContext('2d');


    //this.canvasOffsetLeft = this.layerBg.offsetLeft;
    //this.canvasOffsetTop = this.layerBg.offsetTop;

    this.canvasOffsetLeft = this.layerBoard.offsetLeft;
    this.canvasOffsetTop = this.layerBoard.offsetTop;
    this.canvasW = this.layerBg.width;
    this.canvasH = this.layerBg.height;
    this.xLineNum = xx;
    this.yLineNum = yy;
    this.xLineSize = (this.canvasW - 2 * (this.xBorder)) / this.xLineNum;
    this.yLineSize = (this.canvasH - 2 * (this.yBorder)) / this.yLineNum;

    this.x = 200;
    this.y = 200;
    this.dx = 2;
    this.dy = 4;

    var t = this;
    setInterval(function () { t.start(); }, 20);
};
theme.prototype.start = function () {
    this.startAll();
};

theme.prototype.startAll = function () {
    this.engine();  //last line
    this.sub1();
    this.sub2();
};

theme.prototype.engine = function () {
    if (this.x + this.dx > this.canvasW || this.x + this.dx < 0)
        this.dx = -this.dx;
    if (this.y + this.dy > this.canvasH || this.y + this.dy < 0)
        this.dy = -this.dy;
    this.x += this.dx;
    this.y += this.dy;
};
theme.prototype.sub1 = function () {
    var ctx = this.contextTheme2;

    ctx.clearRect(0, 0, 800, 800);
    ctx.fillStyle = "#444444";
    ctx.save();
    ctx.translate(400, 400);
    ctx.rotate(this.x / 20);
    ctx.fillRect(-15, -15, 100, 100);
    ctx.restore();
};


theme.prototype.sub2 = function () {
    var ctx = this.contextTheme;
    ctx.clearRect(0, 0, this.canvasW, this.canvasH);
    ctx.fillStyle = "#FAF7F8";
    ctx.beginPath();
    ctx.rect(0, 0, this.canvasW, this.canvasH);
    ctx.closePath();
    ctx.fill();
    //ctx.fillStyle = "#444444";
    ctx.fillStyle = "#FF88BB";
    ctx.beginPath();
    ctx.arc(this.x, this.y, 50, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
};

