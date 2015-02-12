var i = 0;
function timedCount() {
    i = i + 1;
    postMessage(i);  
}
function init() {
    //setTimeout(timedCount, 500);
    setInterval(timedCount, 500);
}
init();

