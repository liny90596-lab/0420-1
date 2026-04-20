let capture;
let pg;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // 擷取攝影機影像
  capture = createCapture(VIDEO);
  capture.hide(); // 隱藏預設的影片標籤
  // 建立一個與視訊顯示大小相同的繪圖層
  pg = createGraphics(windowWidth * 0.6, windowHeight * 0.6);
}

function draw() {
  background('#e7c6ff');

  // 計算顯示影像的大小（全螢幕寬高的 60%）
  let vWidth = windowWidth * 0.6;
  let vHeight = windowHeight * 0.6;
  
  // 計算置中座標
  let x = (windowWidth - vWidth) / 2;
  let y = (windowHeight - vHeight) / 2;

  // 在 graphics 繪圖層上畫東西
  pg.clear(); // 確保背景透明
  pg.fill(255, 255, 0);
  pg.noStroke();
  pg.ellipse(pg.width / 2, pg.height / 2, 50, 50); // 在中間畫個黃色圓點
  pg.fill(0);
  pg.textAlign(CENTER, CENTER);
  pg.text("Graphics Layer", pg.width / 2, pg.height / 2 + 40);

  push();
  // 將座標原點移至影像顯示區域的右側，並水平翻轉 (-1)
  translate(x + vWidth, y);
  scale(-1, 1);
  // 因為座標系已經翻轉，我們從 (0, 0) 開始繪製影像即可
  image(capture, 0, 0, vWidth, vHeight);
  // 將 graphics 層疊加在視訊上方
  image(pg, 0, 0, vWidth, vHeight);
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  pg.resizeCanvas(windowWidth * 0.6, windowHeight * 0.6);
}
