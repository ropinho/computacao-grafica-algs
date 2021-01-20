let x1 = 0;
let x2 = 3;
let y1 = 3;
let y2 = 9;

var xRoot1 = x1;
var xRoot2 = x2;
var xReflection;
var xList = [];

var yRoot1 = y1;
var yRoot2 = y2;
var yReflection;
var yList = [];

const deltaX = x2 - x1;
const deltaY = y2 - y1;

var m = (y2-y1)/(x2-x1);
var mReflection;

var e = m - 0.5;
var eReflection;

var swapXY;
var swapX;
var swapY;


const octantProblem = () => {
    if (deltaX >= deltaY && deltaX >= 0 && deltaY >= 0) {
        return false;
    }

    return true;
}

const swap = (v1, v2) => {
    var aux;
    aux = v1;
    v1 = v2;
    v2 = aux;

    return {v1, v2};
}

const swapSignal = (v1) => {
    return v1 = v1 * -1;
}

function reflection () {
    if (m > 1 || m < -1) {
        swap(x1, y1);
        swap(x2, y2); 

        var p1 = swap(x1, y1);
        var p2 = swap(x2, y2);

        x1 = p1.v1;
        y1 = p1.v2;
        x2 = p2.v1;
        y2 = p2.v2;

        mReflection = (y2-y1)/(x2-x1);
        eReflection = mReflection - 0.5;

        swapXY = true;

        console.log("X1: " + x1 + " Y1: " + y1 + " X2: " + x2 + " Y2: " + y2)

        console.log("Novo valor de m': " + mReflection);
        console.log("Novo valor de e': " + eReflection);

    }

    if (x1 > x2) {
        x1 = swapSignal(x1);
        x2 = swapSignal(x2);
        swapX = true;
    }

    if (y1 > y2) {
        y1 = swapSignal(y1);
        y2 = swapSignal(y2);
        swapY = true;
    }

    if (swapX == true || swapXY == true) {
        xReflection = x1;
    }

    if (swapY == true || swapXY == true) {
        yReflection = y1;
    }
}

function reflectionReverse() {
    if (swapY == true) {
        for (var i = 0; i < yList.length; i++) {
            yList[i] = swapSignal(yList[i]);
        }
    }

    if (swapX == true) {
        for (var i = 0; i < xList.length; i++) {
            xList[i] = swapSignal(xList[i]);
        }
    }

    if (swapXY == true) {
        for (var i = 0; i < xList.length; i++) {
            var aux = swap(xList[i], yList[i]);
            xList[i] = aux.v1;
            yList[i] = aux.v2;
        }
    }
}

function showPoints() {
    console.log("\n===================\n");
    for (var i = 0; i < xList.length; i++) {
        console.log("X: " + xList[i] + " - Y: " + yList[i]);
    }
    console.log("\n===================\n");
}


if (octantProblem() == true) {

    console.log("Octant Problem")


    reflection();
    mat.paint(x1, y1, color="royalblue");
    mat.paint(x2, y2, color="royalblue");
    // drawnPoint();

    console.log("====> X: " + xReflection + " | X2: " + x2);
    while(xReflection < x2) {
        if(eReflection >= 0) {
            yReflection++;
            eReflection--;
        }

        xReflection = xReflection + 1;
        eReflection = eReflection + mReflection;

        xList.push(xReflection);
        yList.push(yReflection);


        mat.paint(xReflection,yReflection);

        if (xReflection == x2 && yReflection == y2) {
            mat.paint(xReflection,yReflection, color="royalblue");
        }

        showPoints();
    }

    reflectionReverse();

    showPoints();

} else {
    // drawnPoint()
    while(x < x2) {
        if(e >= 0) {
            y++;
            e--;
        }

        x = x + 1;
        e = e + m;
        // drawnPoint()
    }
}

mat.paint(xRoot1, yRoot1, color="royalblue");

for (var i = 0; i < xList.length; i++) {
    mat.paint(xList[i],yList[i]);   
}

mat.paint(xRoot2, yRoot2, color="royalblue");


