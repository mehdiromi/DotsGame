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

           
function drawLine(e) {
    context = this.getContext('2d');

    xClick = getCursorPosition(e)[0] - this.offsetLeft;
    yClick = getCursorPosition(e)[1] - this.offsetTop;

    var radius = 9;
    var xBorder = 25;
    var yBorder = 25;
    var width = 6;
    var line = 50;
    var canvasW = 800;
    var canvasH = 800;
    var fillStyle = 'green';
    //var strockStyle = '#003300'
    //var gap = 2 * radius + 2 * width + line;


    var isVertial = false;

    var xAbs =  xBorder +  Math.round((xClick - xBorder) / line) * line;

    //alert('Abs : ' + xAbs + '  ,  actual :' + xClick);
    var xDiff = xClick - xAbs ;
    if (xDiff <0) {
        xDiff = -1 * xDiff;
    }
    var yAbs = yBorder + Math.round((yClick - yBorder) / line) * line;

    //alert('Abs : ' + yAbs + '  ,  actual :' + yClick);
    var yDiff = yClick - yAbs;
    if (yDiff < 0) {
        yDiff = -1 * yDiff;
    }

    if (xDiff < yDiff) {
        isVertial = true;
    }



    var startPointX = 0;
    var startPointY = 0;

    if (isVertial) {
        //alert('vert');

        startPointX = Math.round((xClick - xBorder) / line);
        startPointY = parseInt((yClick - yBorder) / line);

        //vertial line 
        var x1 =  xBorder + startPointX * line;
        var y1 = width + yBorder + startPointY * line;

        var y2 = y1 + line - 2 * width;
        var x2 = x1;
    }
    else {
         //alert('hor');
         startPointX = parseInt((xClick - xBorder) / line);
         startPointY = Math.round((yClick - yBorder) / line);

        //Horizontal line 
         var x1 = width + xBorder + startPointX * line;
         var y1 = yBorder + startPointY * line;

         var x2 = x1 + line - 2 * width;
         var y2 = y1;

    }
 
   
   

   

    //alert(startPointX);
    //alert(xDotLocation);

    context.beginPath();

    context.moveTo(x1, y1);
    context.lineTo(x2, y2);

    //context.moveTo(xBorder +  x2 * (x0 + line + radius + width),  yDotLocation * (x0 + line + radius + width));
    //context.lineTo((xDotLocation + 1) * (x0 + line + radius + width), yDotLocation * (x0 + line + radius + width) );
    //context.lineWidth = line + 2 * (width + radius);
    context.lineWidth = 3;
    context.strokeStyle = 'red';
    context.stroke();




    //if (clicks != 1) {
    //    clicks++;
    //} else {
    //    context.beginPath();
    //    context.moveTo(lastClick[0], lastClick[1]);
    //    context.lineTo(x, y, 6);

    //    context.strokeStyle = '#000000';
    //    context.stroke();

    //    clicks = 0;
    //}

    //lastClick = [x, y];
}
                
function drawCircle(x,y, radius, width, fillStyle, strockStyle ) {
    var canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI, false);
    context.fillStyle = fillStyle;
    context.fill();
    context.lineWidth = width;
    context.strokeStyle = strockStyle ;
    context.stroke();
}



function initDots() {
    //Draw dots on the board
    var radius = 6;
    var xBorder = 25;
    var yBorder = 25;
    var width = 3;
    var line = 50;
    var canvasW = 800;
    var canvasH = 800;
    var fillStyle = 'white';
    var strockStyle = '#003300'
    //var gap = 2 * radius + 2 * width + line;
    var gap = line;
    for (i = 0; i < canvasW; i = i + gap) {
        for (j = 0; j < canvasH; j = j + gap) {
            drawCircle(xBorder + i, yBorder + j, radius, width, fillStyle, strockStyle);
        }
    }
}


