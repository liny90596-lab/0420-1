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

  pg.clear(); 
  
  capture.loadPixels();
  // 確保攝影機像素資料已載入
  if (capture.pixels.length > 0) {
    pg.textAlign(CENTER, CENTER);
    pg.textSize(8);
    pg.fill(255); // 設定文字顏色為白色，方便在視訊上閱讀

    for (let py = 0; py < pg.height; py += 20) {
      for (let px = 0; px < pg.width; px += 20) {
        // 將 pg 的座標對應回攝影機原始解析度的座標
        let camX = floor(map(px, 0, pg.width, 0, capture.width));
        let camY = floor(map(py, 0, pg.height, 0, capture.height));
        let index = (camX + camY * capture.width) * 4;

        let r = capture.pixels[index];
        let g = capture.pixels[index + 1];
        let b = capture.pixels[index + 2];
        let avg = floor((r + g + b) / 3);

        // 在該單位位置顯示計算後的數值
        pg.text(avg, px + 10, py + 10);
      }
    }
  }

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
