// #AltEdu2022 day 15


//Natsukashi 線で書いたのを点にする

//p5の関数から実行
function setup() {

  cv=createCanvas(windowWidth,windowHeight);
  background(255);
  strokeWeight(3);
  
  //点の読み込み間隔　frame単位
  p=30;
  
  //数字のサイズ
  fontSize=10;

  //点のデータ格納用
  points=[];

  //描き初めのフレーム番号を保持
  firstFrame=0;

}

function draw() {

  if (mouseIsPressed === true) {
    
    //適当な感覚で配列にマウスの位置を保存

    if(!points.length ){
      //描き初めのフレーム番号を保持
      firstFrame=frameCount;
    }
    if ((frameCount-firstFrame)%p==0){
      points.push([mouseX,mouseY]);
    }
    stroke(0);
    line(pmouseX,pmouseY,mouseX,mouseY);
  } else {
    noStroke();
  }
}

function lineToPoints(){

  background(255);
  push();
  stroke(0); 
  textSize(fontSize);
  for(let i=0;i < points.length;i++){

    strokeWeight(1);
    text(i+1, points[i][0],points[i][1]-12);
    strokeWeight(6);
    point(points[i][0],points[i][1]);
  }
  pop();
  console.log(points)
}

function allClear(){

  background(255);
  points=[];

}

function inputEvent() {
  p=this.value();
}

// キーが押された瞬間の処理
function keyPressed() {
  switch (keyCode){
    case 67://c
      allClear();
      break;
    case 71://g
      lineToPoints();
      break;

    case 83:// s
      const date = new Date();
      const formatdate=date.getFullYear() + '' + ('0' + (date.getMonth() + 1)).slice(-2) + '' +('0' + date.getDate()).slice(-2) + '' +  ('0' + date.getHours()).slice(-2) + '' + ('0' + date.getMinutes()).slice(-2) + '' + ('0' + date.getSeconds()).slice(-2);

      saveCanvas(cv, 'Line to Points' + formatdate , 'jpg');
      break;
  }
}
