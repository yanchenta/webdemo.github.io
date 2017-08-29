
var shaked = false;
var SHAKE_THRESHOLD = 1000;
var x, y, z, last_x, last_y, last_z, lastUpdate = 0;
var canShake = true;
var max_speed = 0;
var indexPoint = 0;

var isRunPoint = false;
function addListener() {
	if (window.DeviceMotionEvent) {
			window.addEventListener('devicemotion', deviceMotionHandler, false);
			return true;

    } else if (window.DeviceOrientationEvent) {
        window.addEventListener("deviceorientation", deciceOrientationHandler, false);
        return true;
    } else {
        return false;
    }
}

function removeListener() {
    if (window.DeviceMotionEvent) {
        window.removeEventListener("devicemotion", deviceMotionHandler,false);

    } else if (window.DeviceOrientationEvent) {
        window.removeEventListener("deviceorientation", deciceOrientationHandler,false);
    }
}

function deciceOrientationHandler(eventData) {
	
    var curTime = new Date().getTime();
    if ((curTime - lastUpdate) > 100) {
        var diffTime = (curTime - lastUpdate);
        lastUpdate = curTime;
        x = eventData.alpha;
        y = eventData.beta;
        z = eventData.gamma;
        var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 1000;
        if (speed > SHAKE_THRESHOLD) {
            shaked = true;
			if(speed > max_speed){
				max_speed = speed;	
			}
        } else {
            if (shaked) {
                shaked = false;
                if(canShake){
					canShake = false;
					//removeListener();
					setTimeout(setanimation, 1000);
				}
                
            }
        }
        last_x = x;
        last_y = y;
        last_z = z;
    }
}

function deviceMotionHandler(eventData) {
	//alert('yaoyiyao aa');
    var acceleration = eventData.accelerationIncludingGravity;
    var curTime = new Date().getTime();
    if ((curTime - lastUpdate) > 100) {
        var diffTime = (curTime - lastUpdate);
        lastUpdate = curTime;
        x = acceleration.x;
        y = acceleration.y;
        z = acceleration.z;
		
        var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;
        if (speed > SHAKE_THRESHOLD) {
            shaked = true;
			if(speed > max_speed){
				max_speed = speed;	
			}
        } else {
            if (shaked) {
				shaked = false;
                if(canShake){
					canShake = false;
					//removeListener();
					setTimeout(setanimation, 1000);
				}
            }
        }
        last_x = x;
        last_y = y;
        last_z = z;
    }
}
function setanimation(){
	removeListener();
	if(!isRunPoint){
		isRunPoint = true;
		
		step1();
	}
}
function tryAgain(){
	max_speed = 0;
	indexPoint = 0;
	shaked = false;
	canShake = true;
	isRunPoint = false;
	lastUpdate = 0
	addListener();
}