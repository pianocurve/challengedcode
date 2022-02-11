// #AltEdu2022 day 7

//フルスクリーン

function preload(){
  //自分のパソコンのこの画面を表示した状態のキャプチャ
  bkimg=loadImage("screenshot2.jpg");
}

function setup(){
  createCanvas(screen.width,screen.height);
}

function draw(){
  const now = new Date();
  const m = now.getMonth()+1;
  const d = now.getDate();
  const day=now.getDay();
  const hh = now.getHours();
  const nn = now.getMinutes();
  const weekdays=[ "日", "月", "火", "水", "木", "金", "土" ];
  image(bkimg,0,0,screen.width,screen.height);
  textSize(12);
  text(`${m}月${d}日(${weekdays[day]})  ${hh}:${nn}`, screen.width-125, 16);

}
//fキーでフルスクリーンとノーマル画面の切り替え
function keyPressed() {
  switch (keyCode){
    case 70: //f
      let fs = fullscreen();
      fullscreen(!fs);
      break;

  }

}