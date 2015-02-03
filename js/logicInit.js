var m = 8;
var n = 8;

n0 = new Image();
n1 = new Image();
n2 = new Image();
n3 = new Image();

n0.src = "images/red.gif";
n1.src = "images/blue.gif";
n3.src = "images/blank.gif";
n2.src = "images/black.gif";

var flag = [n0.src, n1.src];
var player = 1;
var score = [0, 0];
var hedge = [];
var vedge = [];
var box = [];
var nn, x, y, zz, count, loop, u, v;

nn = 2 * n + 1;
init(m,n);
drawFormLogic();

