//var proj  = proj || {};



function log(text) {
    document.getElementById('log').innerHTML = text + ' \r\n' +
        document.getElementById('log').innerHTML;
}
function bind(scope, fn) {
    return function () {       
        return fn.apply(scope, arguments);
    }
}
function getCursorPosition(e) {
    var x;
    var y;
    if (e.pageX != undefined && e.pageY != undefined) {
        x = e.pageX;
        y = e.pageY;
    } else {
        x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    return [x, y];
}
var proj = function (_layerBorad, _layerBg, _layerTheme, _layerTheme2, _layerDots, _layerLines, x, y, effect) {
    this.init(_layerBorad, _layerBg, _layerTheme, _layerTheme2, _layerDots, _layerLines, x, y, effect);
    //var _theme = new theme(_layerBorad, _layerBg, _layerTheme, _layerTheme2, _layerDots, _layerLines, x, y);
    this.DrawBoard();
    //This method is buggy
    //this.takeLines(parseInt((this.xLineNum * (this.yLineNum + 1) + this.yLineNum * (this.xLineNum + 1)) / 4));
    //Listener in Lines layer
    document.getElementById(_layerLines).addEventListener('click', bind(this, this.DrawALineOnClick), false);
};
proj.prototype.initWallAndBox = function () {
    this.box = new Array();
    this.wall = new Array();
    for (i = 0; i < 2 * this.xLineNum + 1 ; i++) {
        this.box[i] = new Array();
        this.wall[i] = new Array();
        for (j = 0; j < this.yLineNum + 1  ; j++) {
            this.box[i][j] = 0;
            this.wall[i][j] = 0;
        }
    }
};
proj.prototype.init = function (_layerBorad, _layerBg, _layerTheme, _layerTheme2, _layerDots, _layerLines, x, y, effect) {
    this.layerBoard = document.getElementById(_layerBorad);
    this.layerBg = document.getElementById(_layerBg);
    this.layerDots = document.getElementById(_layerDots);
    this.layerLines = document.getElementById(_layerLines);
    this.contextBg = this.layerBg.getContext('2d');
    this.contextDots = this.layerDots.getContext('2d');
    this.contextLines = this.layerLines.getContext('2d');
    this.xLineNum = x;
    this.yLineNum = y;

    this.theme = effect;
    this.radius = 6;
    this.xBorder = 20;
    this.yBorder = 20;
    this.drawingWidth = 4;
    this.fillStyle = '#FFCC99';
    this.strockStyle = 'blue';
    this.canvasOffsetLeft = this.layerBoard.offsetLeft;
    this.canvasOffsetTop = this.layerBoard.offsetTop;
    this.canvasW = this.layerBg.width;
    this.canvasH = this.layerBg.height;
    this.xLineSize = (this.canvasW - 2 * (this.xBorder)) / this.xLineNum;
    this.yLineSize = (this.canvasH - 2 * (this.yBorder)) / this.yLineNum;
    this.strockStyleCount = 'black';
    this.initWallAndBox();
};

proj.prototype.DrawALineOnClick = function (e) {    
    var context = this.contextLines;
    var xClick = getCursorPosition(e)[0] - this.canvasOffsetLeft;
    var yClick = getCursorPosition(e)[1] - this.canvasOffsetTop;
    var radius = this.radius;
    var xBorder = this.xBorder;
    var yBorder = this.yBorder;
    var drawingWidth = this.drawingWidth;
    var canvasW = this.canvasW;
    var canvasH = this.canvasH;
    var fillStyle = 'white';
    var strockStyle = '#003300'
    var xLineNum = this.xLineNum;
    var yLineNum = this.yLineNum;
    var xLineSize = (canvasW - 2 * (xBorder)) / xLineNum;
    var yLineSize = (canvasH - 2 * (yBorder)) / yLineNum;
    var xAbs = xBorder + Math.round((xClick - xBorder) / xLineSize) * xLineSize;
    var yAbs = yBorder + Math.round((yClick - yBorder) / yLineSize) * yLineSize;
    var xDiff = xClick - xAbs;
    if (xDiff < 0) {
        xDiff = -1 * xDiff;
    }
    var yDiff = yClick - yAbs;
    if (yDiff < 0) {
        yDiff = -1 * yDiff;
    }
    var isVertial = false;
    if (xDiff < yDiff) {
        isVertial = true;
    }
    var startPointX = 0;
    var startPointY = 0;
    var endPointX = 0;
    var endPointY = 0;
    var MatrixX = 0;
    var MatrixY = 0;
    //calc point
    if (isVertial) {
        //Vertial line 
        startPointY = Math.round((xClick - xBorder) / xLineSize);
        startPointX = parseInt((yClick - yBorder) / yLineSize);
        //if (startPointY >= yLineNum) {
        //    startPointY--;
        //}
        endPointY = startPointY;
        endPointX = startPointX + 1;
    }
    else {
        //Horizontal line 
        startPointY = parseInt((xClick - xBorder) / xLineSize);
        startPointX = Math.round((yClick - yBorder) / yLineSize);
        //if (startPointX >= xLineNum) {
        //    startPointX--;
        //}
        endPointY = startPointY + 1;
        endPointX = startPointX;
    }
    //Calc coordinates
    if (isVertial) {
        var MatrixX = 2 * startPointX + 1;
        var MatrixY = startPointY;
        //coordinations
        var x1 = xBorder + startPointY * xLineSize;
        var y1 = yBorder + radius + startPointX * yLineSize;
        var y2 = y1 + yLineSize - 2 * radius;
        var x2 = x1;
    }
    else {
        var MatrixX = 2 * startPointX;
        var MatrixY = startPointY;
        //coordinations
        var x1 = radius + xBorder + startPointY * xLineSize;
        var y1 = yBorder + startPointX * yLineSize;
        var x2 = x1 + xLineSize - 2 * radius;
        var y2 = y1;
    }
    //log('start ' + startPointX + ',' + startPointY);
    if (this.wall[MatrixX][MatrixY] != 1) {
        this.wall[MatrixX][MatrixY] = 1;
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.lineWidth = 5;
        context.strokeStyle = this.strockStyleCount;
        context.stroke();
    }
    //this.Checkbox(MatrixY, MatrixX);
    if (this.strockStyleCount == 'black') {
        this.strockStyleCount = 'blue';
    }
    else {
        this.strockStyleCount = 'black';
    }
};
proj.prototype.DrawBoard = function () {
    //this.DrawCircle( this.xLineSize,  this.yLineSize);
    for (i = 0; i < this.xLineNum + 1; i++) {
        for (j = 0; j < this.yLineNum + 1 ; j++) {
            this.DrawCircle(i * this.xLineSize, j * this.yLineSize);
        }
    }
    for (i = 0; i < this.xLineNum + 1; i++) {
        for (j = 0; j < this.yLineNum + 1 ; j++) {            
            this.DrawLine(i, j);
        }
    }
   

};
proj.prototype.DrawCircle = function (x, y) {
    var context = this.contextDots;
    context.beginPath();
    context.arc(this.xBorder + x, this.yBorder + y, this.radius, 0, 2 * Math.PI, false);
    context.fillStyle = this.fillStyle;
    context.fill();
    context.lineWidth = this.drawingWidth;
    context.strokeStyle = this.strockStyle;
    context.stroke();
    
};

proj.prototype.DrawLine = function (x, y) {
    var context = this.contextDots;
    context.lineWidth = 1;
    context.strokeStyle = 'pink';    
    if (!context.setLineDash) {
        context.setLineDash = function () { }
    }
    context.beginPath();
    context.setLineDash([4, 12]);
    //Hor line
    var x1 = this.xBorder + this.xLineSize * x;
    var y1 = this.yBorder + y * this.yLineSize + this.radius;
    var x2 = x1 ;
    var y2 = y1 + this.yLineSize - 2 * this.radius;
    if (y != this.yLineNum) {
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
    }
    //context.stroke();
    x1 = x1 + this.radius;
    x2 = x1  - 2 *  this.radius;
    y1 = y1 - this.radius;
    x2 = x1 + this.xLineSize - 2 * this.radius;
    y2 = y1;
    if (x != this.xLineNum) {
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
    }
    context.stroke();
    context.closePath();
};
proj.prototype.takeLines = function (num) {
    while (num >0) {    
        var x = Math.floor(Math.random() * ( this.yLineNum * 2  +1)  );        
        var y = Math.floor(Math.random() * (this.xLineNum +1 ) );
        if ( (x % 2) == 0) {
            if (y == this.xLineNum) {
                x--;
            }
        }
        else {
            if (x == this.yLineNum) {
                y--;
            }
        }
        if (this.wall[x][y] != 1) {
            this.TakeLine(x,y);
            num--;
        }
    }
};
proj.prototype.TakeLine = function (MatrixX, MatrixY) {
    var context = this.contextLines;
    if ( (MatrixX % 2) == 0) {
        //Vertial         
        var x1 = this.radius + this.xBorder + MatrixY * this.xLineSize ;
        var y1 = this.yBorder + MatrixX * this.yLineSize / 2 ;
        var x2 = x1 + this.xLineSize - 2 * this.radius;
        var y2 = y1;
        //log('ver');
    }
    else {
    //Horizontal
        var x1 = this.xBorder + MatrixY  * this.xLineSize;
        var y1 = this.yBorder + this.radius + parseInt(MatrixX/2)  * this.yLineSize;
        var y2 = y1 + this.yLineSize - 2 * this.radius;
        var x2 = x1;
       // log('hor');
    }
    if (this.wall[MatrixX][MatrixY] != 1) {
        this.wall[MatrixX][MatrixY] = 1;
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.lineWidth = 1;
        context.strokeStyle = this.strockStyleCount;
        context.stroke();
        //log('from ' + x1 + ',' + y1 + 'to ' + x2 + ',' + y2);
    }
    if (this.strockStyleCount == 'black') {
        this.strockStyleCount = 'blue';
    }
    else {
        this.strockStyleCount = 'black';
    }
};
proj.prototype.FillBox = function (i,j, color) {
};
//The following is not working properaly
proj.prototype.Checkbox = function (wx, wy) {
    if ((wx % 2) == 0) { //vert
        var x = wx;
        var y = wy;
        ctx = this.contextLines;
        ctx.beginPath();
        ctx.rect(this.xBorder + this.xLineSize * x + 3, this.yBorder + this.yLineSize * y + 3, this.xLineSize - 3, this.yLineSize - 3);
        ctx.closePath();
        ctx.fill();
    }
    else {
        var x = wx - 1;
        var y = wy;
        ctx = this.contextLines;
        ctx.beginPath();
        ctx.rect(x + 3, y + 3, this.xLineSize - 3, this.yLineSize - 3);
        ctx.closePath();
        ctx.fill();
    }
};
   