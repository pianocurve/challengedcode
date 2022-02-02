//#AltEdu2022 コーディングチャレンジ，2/1（火）
//その2
function setup(){

  
  cv=createCanvas(400,400)
    
  frameRate(1);
  
  //これも線が重なったときの色に影響
  pixelDensity(1);

  circleSize=200;
  
  //0.5ロボット 、0.7文字的な何か、 0.8 菅田将暉風ヘア
  circleRatio=.8;
  
  firstMisalignment=-50;//最初の円のずれ
  
  // noLoop();

}

function draw(){
  
  background(255);

  noSmooth();
  noFill();
  
  //この辺りで線が重なったときの色の調整
  strokeCap(SQUARE);
  stroke(100);
  strokeWeight(1);
  blendMode(MULTIPLY)

  //中心座標
  translate(width/2,height/2)

  const v=getCross(88,91);
  
  if (frameCount==1){
    
    circle(0,0,circleSize);
    
    circle(0,firstMisalignment,circleSize);
  
  }else{
    circleSize*=circleRatio;
    v.forEach(vo=>{
      ellipse(vo.x,vo.y,circleSize)
    });
  }


}

function getCross(ts,te){
  let v=[];
  //交点を返す
  loadPixels();
  
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = 4 * (y * height + x);
      if (pixels[idx]<te && pixels[idx]>ts ){
        //中央原点座標に変換
        v.push(createVector(x-width/2,y-height/2))
        //console.log(x-width/2,y-height/2,pixels[idx])
      }
    }
  }
  return v

}

function keyPressed() {
  switch (keyCode){
    case 82://r
      redraw();
      break;

    case 83:// s
      const date = new Date();
      const formatdate=date.getFullYear() + '' + ('0' + (date.getMonth() + 1)).slice(-2) + '' +('0' + date.getDate()).slice(-2) + '' +  ('0' + date.getHours()).slice(-2) + '' + ('0' + date.getMinutes()).slice(-2) + '' + ('0' + date.getSeconds()).slice(-2);
 
      saveCanvas(cv, "sudasan" + formatdate , 'jpg');
      
      break;
      
    default:
      break;
  }
}

