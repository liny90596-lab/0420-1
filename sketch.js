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

  push();
  // 將座標原點移至影像顯示區域的右側，並水平翻轉 (-1)
  translate(x + vWidth, y);
  scale(-1, 1);
  // 因為座標系已經翻轉，我們從 (0, 0) 開始繪製影像即可
  image(capture, 0, 0, vWidth, vHeight);
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
