//#AltEdu2022 コーディングチャレンジ，2/2（水）
//タイムマシーン
//アイデア　コードもデータもまるっと保存、まるっと復元させたい
  //トリガー（実行するたび？）で保存
  //保存履歴を辿っていつの時点の内容にも戻れる

  //こうしたい　バージョンに名前をつけられる
  //

//課題
  //stringify　は関数NG...でもReplacerとかrecieverとかでなんとかなるらしい。

const i$={
  "W":400,
  "H":400,
  "bgcolor":220,
  "circleSize":100,

  "setup":function(){
    
    createCanvas(i$.W, i$.H);

  },
  "draw":function(){
    background(i$.bgcolor);
    circle(i$.W/2,i$.H/2,i$.circleSize)
  },

}

function setup() {

  const date = new Date();
  const formatdate=date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '' +('0' + date.getDate()).slice(-2) + '-' +  ('0' + date.getHours()).slice(-2) + '' + ('0' + date.getMinutes()).slice(-2) + '-' + ('0' + date.getSeconds()).slice(-2);
  sessionStorage.setItem(document.title+formatdate, JSON.stringify(i$) );
  
  i$.setup();

}

function draw() {
  i$.draw();
}