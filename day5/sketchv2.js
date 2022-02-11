// #AltEdu2022 day 5 v2 ちゃんと綺麗にした
  
function setup(){
  //例
  createCanvas(400,400,WEBGL);
  ortho(-width/2,width/2,-height/2,height/2,400*0.87,400);
  frameRate(10);
  background(0)
}

function draw(){
  //例
  ambientLight(255);
  orbitControl();
  push();
 
  normalMaterial();
  rotateX(TAU/4)
  translate(0,0,100);
  //box(100,100);
  pop()
  let data=[[-0.15,-0.26,0,-0.71,0.55,0,-0.82,0.64,0],[-1.18,0.75,0.07,-0.85,0.37,0.19,-0.36,-0.11,0.03],[0.18,0.51,0,0.43,0.66,0,0.93,0.65,0.03],[0.89,-0.48,-0.02,0.54,-0.84,0,0.01,-0.73,0.03]];

  //★ コピー必須 作成した関数の呼び出し。引数は上記bezierのデータとサイズ（仮に100)
  drawBezier3d(data,100);

}

let currentDataNum=0;
function drawBezier3d(data, size){

  //ここでは閉じた図形を書くので、最後のbezierのデータのアンカーポイントは開始と同じ。
  const lastb = data[data.length-1]
  let x = lastb[6] * size;
  let y = lastb[7] * size;
  let z = lastb[8] * size;
  
  if(currentDataNum>=data.length-1){
    background(0);
    currentDataNum=0;
  }    
 
  j=frameCount % 30;
  let t = j / 30;
  let bx,by,bz;
  if(currentDataNum==0){
    bx = bezierPoint(x, data[currentDataNum][0] * size, data[currentDataNum][3] * size, data[currentDataNum][6] * size, t); // bezier 曲線上の x 座標を算出
    by = bezierPoint(y, data[currentDataNum][1] * size, data[currentDataNum][4] * size, data[currentDataNum][7] * size, t); // bezier 曲線上の y 座標を算出
    bz = bezierPoint(z, data[currentDataNum][2] * size, data[currentDataNum][5] * size, data[currentDataNum][8] * size, t); // bezier 曲線上の y 座標を算出

  }else{
    bx = bezierPoint(data[currentDataNum-1][6] * size, data[currentDataNum][0] * size, data[currentDataNum][3] * size, data[currentDataNum][6] * size, t); // bezier 曲線上の x 座標を算出
    by = bezierPoint(data[currentDataNum-1][7] * size, data[currentDataNum][1] * size, data[currentDataNum][4] * size, data[currentDataNum][7] * size, t); // bezier 曲線上の y 座標を算出
    bz = bezierPoint(data[currentDataNum-1][8] * size, data[currentDataNum][2] * size, data[currentDataNum][5] * size, data[currentDataNum][8] * size, t); // bezier 曲線上の y 座標を算出
    
  }
  // 算出したxy座標上に円を描画
  push();
  translate(bx,by,bz);
  sphere(5) 
  pop();
  if(j==0){
    currentDataNum++;
  }
 
}

 