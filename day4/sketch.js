// #AltEdu2022 day 4

//人という漢字は人と人とが支えあってできている　
//嘘らしいけど
//"またあるとき、ローズウォーターは精神科医にこう言った、
//「思うんだがね、あんたたちはそろそろ、
//すてきな新しい嘘をたくさんこしらえなきゃいけないんじゃないか。
//でないと、みんな生きていくのがいやんなっちゃうぜ」”
//カートボネガット
//そういうこと。

let i$ ={

  "W":500,
  "H":500,
  "objX":250,
  "objY":250,
  "bgcolor":200,
  "Color":0,
  "HColor":[200,200,0],
  
  "setup":()=>{
    createCanvas(i$.W,i$.H);
    strokeCap(ROUND);
    angleMode(DEGREES);

    data=[
      [[-0.13,-0.94,-0.23,-0.9,-0.17,-0.86],[-0.18,-0.75,-0.29,-0.48,-0.39,-0.28],[-0.55,0.05,-0.74,0.27,-0.97,0.5],[-0.75,0.43,-0.82,0.52,-0.62,0.32],[-0.38,0.05,-0.5,0.2,-0.31,-0.09],[-0.25,-0.19,-0.22,-0.27,-0.19,-0.3],[-0.03,-0.19,0.06,-0.05,0.27,0.17],[0.46,0.35,0.38,0.27,0.54,0.41],[0.63,0.47,0.95,0.53,0.99,0.47],[0.98,0.42,0.95,0.36,0.87,0.32],[0.76,0.3,0.58,0.28,0.44,0.18],[0.32,0.09,0.22,0.01,0.16,-0.04],[0.09,-0.1,-0.08,-0.25,-0.19,-0.31],[-0.09,-0.54,-0.03,-0.67,0,-0.77],[0.03,-0.83,0.02,-0.89,-0.03,-0.92]],
      [[-0.16,-0.83,-0.26,-0.89,-0.27,-0.76],[-0.15,-0.68,-0.21,-0.53,-0.63,-0.79],[-0.63,-0.64,-0.47,-0.59,-0.35,-0.5],[-0.43,-0.02,-0.78,0.16,-0.96,0.13],[-0.92,0.22,-0.73,0.34,-0.31,-0.09],[-0.25,-0.19,-0.22,-0.27,-0.19,-0.3],[-0.18,-0.16,0.15,-0.09,0.28,0.03],[0.45,0.08,0.31,0.17,0.52,0.39],[0.51,-0.08,0.78,0.54,0.96,0.41],[0.28,-0.01,0.54,-0.31,0.45,-0.33],[0.42,-0.18,0.32,-0.14,0.29,-0.23],[0.29,-0.39,0.12,-0.33,0.13,-0.24],[0.27,-0.1,-0.06,-0.24,-0.19,-0.31],[0.01,-0.55,-0.16,-0.57,-0.04,-0.71],[0.03,-0.83,0.02,-0.89,-0.09,-0.94]],
    ]
    
    bm = new bezierMorphing(data,1000,3000);

  },

  "draw":()=>{

    
    background(i$.bgcolor);
    translate(i$.objX,i$.objY);
  
    
    push();
    noStroke();
    fill(i$.Color)
    currentData =bm.getBezier();

    i$.drawBezier(currentData,100);
    pop()
  },

  "drawBezier":(data, size)=>{

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
  },
  //x,yを中心とした底辺の長さw、高さhの二等辺三角を描く
  "sankaku":(x,y,w,h)=>{
    triangle(x, y-h/2, x-w/2, y+h/2, x+w/2, y+h/2)
  },
}

//p5の関数から実行
function setup() {
  saveIdru();
  setupList();
  i$.setup();
}

function draw() {
  i$.draw();
}

function mouseClicked(){    
  if(mouseX>0 && mouseX<width && mouseY>0 && mouseY<height ){
    i$.objX=mouseX;
    i$.objY=mouseY;
  }
}

function mouseReleased(){
  if(mouseX>0 && mouseX<width && mouseY>0 && mouseY<height ){
    saveIdru();

    //テキストエリアに書く
    document.getElementById('code').value=toJSON(i$);
  }
}

//ストレージに時刻をつけて現在のソースを保存
function saveIdru(){

  //ファイル名で使う時刻作成
  const date = new Date();
  const formatdate=date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '' +('0' + date.getDate()).slice(-2) + '-' +  ('0' + date.getHours()).slice(-2) + '' + ('0' + date.getMinutes()).slice(-2) + '-' + ('0' + date.getSeconds()).slice(-2);
  const title=document.title;
  
  //セッションストレージにi$を保管
  sessionStorage.setItem(title+formatdate, toJSON(i$) );

  //保管したものに名前をつけて後で呼び出せるようにリストに追加
  const selectHistory = document.getElementById('history');

  //一旦optionは削除
  while(selectHistory.firstChild){
    selectHistory.removeChild(selectHistory.firstChild)
  }

  //セッションストレージに保管されているものを取得してリスト化
  keys=Object.keys(sessionStorage);
  keys.sort().reverse();
  keys.forEach(key=>{
    if (sessionStorage.hasOwnProperty(key) && key.indexOf(title)>=0 )  {
      //option要素を新しく作る
      const op = document.createElement('option');
      op.value = key;
      op.textContent = key;

      //select要素にoption要素を追加する
      selectHistory.appendChild(op)
    }
  });
}

function setupList(){
  //リストを選んだときの処理。
  const selectHistory = document.getElementById('history');
  selectHistory.addEventListener('change', (e)=>{
    //一旦キャンバスを削除
    const element = document.querySelector('canvas');
    element.remove();
    //選択したキーの情報を取得してi$に読み込む
    const selectHistoryName = e.target.value;
    const catData=sessionStorage.getItem(selectHistoryName);
    i$ = fromJSON(catData);
    //実行
    i$.setup();
    //テキストエリアに書く
    document.getElementById('code').value=catData;
  });
}

//関数を書き出せるようにする　参考　https://qiita.com/suetake/items/52ec9d22e978ceb3111c
//省略形も書き出せるように変更
function toJSON(value){
  return JSON.stringify(value,(k,v)=>{
    if (typeof v === 'function') {
      return v.toString()
    }
    return v;
  });
}
function fromJSON(value){
  return JSON.parse(value, (k,v)=>{
    if (typeof v === 'string' && v.match(/^function|^\(/) ) {
      return Function.call(this, 'return ' + v)();
    }
    return v;
  });
}
class bezierMorphing {
  constructor(bezierAllay,delay,duration){
    this.startTime = millis();
    this.elapsed = 0;
    this.season = 0; //0 Spring　1 Summer　2 Autumn　3 Winter and more imagine.
    this.nextSeason =1;
    this.delay = delay;
    this.duration = duration;
    this.p=0.0;//Progress

    this.bezierAllay = bezierAllay;
    this.currentPetal=[];

  }
  
  getBezier(){

    const now = millis();
    
    this.currentPetal=JSON.parse(JSON.stringify(this.bezierAllay[this.season]));


    this.elapsed = now - this.startTime;
    
    if (this.elapsed >= this.delay) {
      
      // Season++ and Reset startTime / 
      this.p =(this.elapsed - this.delay) / this.duration; //progress　0.0 - 1.0   
      if (this.p >= 1) {

        this.season = this.nextSeason;
        this.nextSeason++;
        if (this.nextSeason  == this.bezierAllay.length) {
          this.nextSeason = 0;
        }
         
        this.currentPetal = JSON.parse(JSON.stringify(this.bezierAllay[this.season]))
 
        this.startTime = millis();

      }else{
        //bezierのモーフィング
        for(let i=0;i<this.currentPetal.length;i++){
          for(let j=0;j<this.currentPetal[i].length;j++){
            this.currentPetal[i][j]=
                  this.bezierAllay[this.nextSeason][i][j] * this.p 
                  + this.bezierAllay[this.season][i][j] * (1 - this.p)    
          }
        }
        
      }
    }
    return this.currentPetal;
  }
}
