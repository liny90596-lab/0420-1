let capture;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // 擷取攝影機影像
  capture = createCapture(VIDEO);
  capture.hide(); // 隱藏預設的影片標籤
}

function draw() {
  background('#e7c6ff');

  // 計算顯示影像的大小（全螢幕寬高的 60%）
  let vWidth = windowWidth * 0.6;
  let vHeight = windowHeight * 0.6;
  
  // 計算置中座標
  let x = (windowWidth - vWidth) / 2;
  let y = (windowHeight - vHeight) / 2;

  image(capture, x, y, vWidth, vHeight);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
