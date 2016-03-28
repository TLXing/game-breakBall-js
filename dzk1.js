var my = document.getElementById('my');
var myBall = document.getElementById('myBall');
var mapWidth = document.documentElement.clientWidth;
var mapHeight = document.documentElement.clientHeight;
window.onload = function () {
	// 在开始前将my和小球定位到屏幕中下方
	my.style.left = (mapWidth - my.offsetWidth)/2+"px";
	my.style.top = document.documentElement.clientHeight - my.offsetHeight+"px";

	document.onmousemove = function (ev) {
		var oEvent = ev||event;
		var myL = oEvent.clientX - my.offsetWidth/2;
		if (myL<0) {
			myL = 0;
		} else if (myL>mapWidth-my.offsetWidth) {
			myL = mapWidth-my.offsetWidth;
		}
		my.style.left = myL+"px";

	}

	document.oncontextmenu = function () {		
		return false;
	}

	document.onmousedown = whichButton;

	clearMap();
	

}

function whichButton(ev){
	var oEvent = ev||window.event;
	var btnNum = oEvent.button;
	if (ball.start!=0) {return;}
	if (btnNum==2){
		//alert("您点击了鼠标右键！")
		ball.start = 1;
		ball.dir = 1;
	}
	else if(btnNum==0){
		//alert("您点击了鼠标左键！")
		ball.start = 1;
		ball.dir = 2;
	}
	else if(btnNum==1){
		//alert("您点击了鼠标中键！");
	}
	else{
		//alert("您点击了" + btnNum+ "号键，我不能确定它的名称。");
	}
}




// 当屏幕尺寸改变时自适应
window.onresize = function () {
	mapWidth = document.documentElement.clientWidth;
	mapHeight = document.documentElement.clientHeight;
	my.style.top = document.documentElement.clientHeight - my.offsetHeight+"px";
	// console.log(mapWidth,mapHeight);
}


// 创建小球
var ball = new Ball(0, my.offsetLeft + (my.offsetWidth-8)/2, my.offsetTop - 8, 2, 2);

// 球
function Ball(start,x,y,speed,dir) {
	this.start = start;
	this.x = x;
	this.y = y;
	this.speed = speed;
	this.dir = dir;
	this.moveUp = function () {
		this.y -= this.speed;
	}
	this.moveDown = function () {
		this.y += this.speed;
	}
	this.moveLeft = function () {
		this.x -= this.speed;
	}
	this.moveRight = function () {
		this.x += this.speed;
	}
	this.ctBall = function () {
		// ↗:0  ↘:1  ↙:2  ↖:3
		switch (this.dir){
			case 0:
				this.moveUp();
				this.moveRight();
				break;
			case 1:
				this.moveRight();
				this.moveDown();
				break;
			case 2:
				this.moveDown();
				this.moveLeft();
				break;
			case 3:
				this.moveLeft();
				this.moveUp();
		}
	}
	this.ctDirBall = function () {
		if (this.start==0) {
			this.x = my.offsetLeft + (my.offsetWidth-8)/2;
			this.y = my.offsetTop - 8;
		} else {
			//document.title = this.x+","+this.y;
			if (this.x<0) {
				if (this.dir == 2) {
					this.dir = 1;
				} else {
					this.dir = 0;
				}
			} else if (this.x>(mapWidth-myBall.offsetWidth)) {
				if (this.dir == 1) {
					this.dir = 2;
				} else {
					this.dir = 3;
				}
			} else if (this.y<0) {
				if (this.dir == 0) {
					this.dir = 1;
				} else {
					this.dir = 2;
				}
			} else if (this.y>=(my.offsetTop-8) && this.x>=my.offsetLeft && this.x<=(my.offsetLeft+my.offsetWidth-8)) {
				// alert("ok")
				if (this.dir==1) {
					this.dir = 0;
				} else {
					this.dir = 3;
				}				
			} else if (this.y>mapHeight) {
				
				window.clearInterval(timer);
				alert("game over");
				this.x = my.offsetLeft + (my.offsetWidth-8)/2;
				this.y = my.offsetTop - 8;
				this.start = 0;
				clearMap();
			}
			this.ctBall();

		}
	}
}

// 刷新Map
function clearMap() {
	timer = setInterval(function () {
		ball.ctDirBall();
		myBall.style.left = ball.x+"px";
		myBall.style.top = ball.y+"px";
	},30)
}