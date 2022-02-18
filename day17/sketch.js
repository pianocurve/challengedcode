//対角線
//範囲を充填する
//一つ図形をランダムに置く
//次の付けいをランダムに置く
//衝突したら跳ね返る
//最後に再描画
let cells=[];
let stoq=false;
//let data=[[-0.06,-0.63,-0.11,-0.68,-0.15,-0.63],[-0.35,-0.3,-0.1,-0.22,0,0],[0.1,-0.22,0.35,-0.3,0.15,-0.63],[0.11,-0.68,0.06,-0.63,0,-0.58]];
//let data=[[-0.08,-0.66,-0.07,-0.52,0,0.09],[0.07,-0.52,0.08,-0.66,0,-0.67]];
let data=[[0,-0.11,-0.06,-0.21,-0.14,-0.34],[-0.06,-0.16,-0.01,-0.14,-0.03,-0.09],[-0.34,-0.49,-0.56,-0.59,-0.72,-0.57],[-0.82,-0.57,-0.78,-0.46,-0.72,-0.43],[-0.64,-0.37,-0.64,-0.31,-0.61,-0.25],[-0.62,-0.23,-0.61,-0.17,-0.59,-0.16],[-0.61,-0.06,-0.55,0,-0.43,-0.02],[-0.55,0.05,-0.57,0.13,-0.54,0.19],[-0.53,0.25,-0.5,0.3,-0.45,0.33],[-0.41,0.37,-0.36,0.41,-0.28,0.43],[-0.18,0.48,-0.13,0.17,-0.04,0.01],[-0.03,0.04,-0.03,0.12,0,0.17],[0.03,0.12,0.03,0.04,0.04,0.01],[0.13,0.17,0.18,0.48,0.28,0.43],[0.36,0.41,0.41,0.37,0.45,0.33],[0.5,0.3,0.53,0.25,0.54,0.19],[0.57,0.13,0.55,0.05,0.43,-0.02],[0.55,0,0.61,-0.06,0.59,-0.16],[0.61,-0.17,0.62,-0.23,0.61,-0.25],[0.64,-0.31,0.64,-0.37,0.72,-0.43],[0.78,-0.46,0.82,-0.57,0.72,-0.57],[0.56,-0.59,0.34,-0.49,0.03,-0.09],[0.01,-0.14,0.06,-0.16,0.14,-0.34],[0.06,-0.21,0,-0.11,-0.01,-0.14]];
//let data=[[-0.05,-0.23,-0.05,-0.46,-0.2,-0.47],[-0.3,-0.46,-0.41,-0.39,-0.41,-0.33],[-0.45,-0.34,-0.55,-0.32,-0.56,-0.23],[-0.62,-0.24,-0.69,-0.12,-0.69,-0.07],[-0.75,-0.04,-0.78,0.07,-0.73,0.11],[-0.52,0.19,-0.37,0.26,-0.24,0.35],[-0.13,0.43,-0.07,0.5,-0.04,0.59],[-0.02,0.67,-0.02,0.82,0.04,0.98],[0.02,0.82,0.02,0.67,0.04,0.59],[0.07,0.5,0.13,0.43,0.24,0.35],[0.37,0.26,0.52,0.19,0.73,0.11],[0.78,0.07,0.75,-0.04,0.69,-0.07],[0.69,-0.12,0.62,-0.24,0.56,-0.23],[0.55,-0.32,0.45,-0.34,0.41,-0.33],[0.41,-0.39,0.3,-0.46,0.2,-0.47],[0.05,-0.46,0.05,-0.23,0,0.16]];

let petalNum=1;
//const colors=[[255,0,85],[255,172,200],[154,175,128]];
const colors=[[255,172,200],[69,99,67],[154,175,128]];


function setup() {
  F=120

  frameRate(F);
  cv=createCanvas(W=1024, H=1024);

  pixelDensity(1)
  strokeCap(SQUARE)
  noSmooth()
  noStroke()

  v=createVector
  blendMode(MULTIPLY)

  //重なり判定用の色
  fill(80);

}
function draw() {
  
  //1、描画前を保存
  PG=get();
  
  //2描く
  let pos=[];
    //範囲内のランダムなXY作成 
  x1=random(W);
  y1=random(H);
  pos.push([x1,y1]);
  
  //対角で埋めていくので
  x2=(W/2-x1)+W/2;
  y2=(H/2-y1)+H/2;
  pos.push([x2,y2]);

  //その他のデータ
  rw=16//random([8,16,32]);
  rh=random([8,16,32]);
  //r=noise(x1,y1)*TAU;
  r=0;

  for(let i=0;i<pos.length;i++){
    push();
    translate(pos[i][0],pos[i][1]);
    rotate(r * (0-i));
    drawFigure(data,petalNum,rw,rh);
    pop();
  }


  let v=getCross(30,40);
  if( v.length >0){
    clear();
    image(PG,0,0);//再描画してリトライ
  }else{

    cells.push({
      "x":x1,
      "y":y1,
      "rx":x1,
      "ry":y1,
      "rw":rw,
      "rh":rh,
      "r":r,
   
    });
    cells.push({
      "x":x2,
      "y":y2,
      "rx":x2,
      "ry":y2,
      "rw":rw,
      "rh":rh,
      "r":-r,

    })
  

  }


  if (!isLooping()){
    console.log(frameCount)
    clear() 
    background(255);

    //そこまで再描画
    // console.log(cells)
    for (const c of cells){
      push()
      translate(c.rx,c.ry);
      rotate(c.r);
      fill(random(colors))
      drawFigure(data,petalNum,c.rw*0.8,c.rh*0.8);

      pop();
    }

  }


}




function drawFigure(data,petalNum,w,h){

  sankaku(0,0,w,h);
//  //花をデザインするときは繰り返す
//  if(petalNum>1){
//    angle=0;
//    for(let i=0;i<petalNum;i++){

//      angle = 1/petalNum*TAU;
//      rotate(angle);
//      drawBezier(data,bezierSize);
//    }
//  }else{
//    drawBezier(data,bezierSize);
//  }

}

//x,yを中心とした底辺の長さw、高さhの三角
function sankaku(x,y,w,h){
  triangle(x, y-h/2, x-w/2, y+h/2, x+w/2, y+h/2);
}


function getCross(ts,te){
  let v=[]
  //交点を返す
  loadPixels()
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const idx = 4 * (y * H + x);
      if (pixels[idx]<te && pixels[idx]>ts ){
        //中央原点座標に変換
        v.push(createVector(x-W/2,y-H/2))
      }
      // pixels[idx] += 50; // r
      // pixels[idx+1] = 100; // g
      // pixels[idx+2] = 100; // b
      // pixels[idx+3] = 100; // a
    }
  }
  return v

}

function drawBezier(data, size) {

  //ここでは閉じた図形を書くので、最後のbezierのデータのアンカーポイントは開始と同じ。
  const lastb = data[data.length-1]
  let x = lastb[4] * size;
  let y = lastb[5] * size;

  beginShape();
  vertex(x, y);
  for(let i=0;i<data.length;i++){
    let ankerX=data[i][4] * size;
    let ankerY=data[i][5] * size;
    //最後だけそのまま
    if(i == data.length-1){
      ankerX = x;
      ankerY = y;
    }
    bezierVertex(
      data[i][0] * size, data[i][1] * size, 
      data[i][2] * size, data[i][3] * size,
      ankerX , ankerY 
    );
  } 
  endShape(CLOSE); 
}

// キーが押された瞬間の処理
function keyPressed() {
  switch (keyCode){
    case 81://q
      noLoop()
      
      break;
    case 83:// s
      const date = new Date();
      const formatdate=date.getFullYear() + '' + ('0' + (date.getMonth() + 1)).slice(-2) + '' +('0' + date.getDate()).slice(-2) + '' +  ('0' + date.getHours()).slice(-2) + '' + ('0' + date.getMinutes()).slice(-2) + '' + ('0' + date.getSeconds()).slice(-2);
      saveCanvas(cv, "cc" + formatdate , 'jpg');
      break;
  
    default:
  }

}

