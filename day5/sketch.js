// #AltEdu2022 day 5

let i$ ={

  "W":400,
  "H":400,
  "objX":0,
  "objY":0,
  "bgcolor":200,
  "Color":0,
  "HColor":[200,200,0],
  
  "setup":()=>{
    createCanvas(i$.W,i$.H,WEBGL);
    //strokeCap(ROUND);
    angleMode(DEGREES);
    //ortho(-200,200,-200,200,350,400),
    data=[
      [[-0.48,-0.88,0,-0.84,-0.41,0.1,-1,0,0],[-0.88,0.48,-0.07,-0.53,0.84,0,-0.03,1.2,0.55],[0.48,0.88,0,0.84,0.54,0,0.9,-0.3,0],[0.88,-0.48,0,0.54,-0.84,0,0,-1,0]]

      //[

        // [-0.19,-0.71,0, -0.21,-0.59,0,  -0.49,-0.01,0  ],
        // [-0.55, 0.18,0, -0.68, 0.34,0,  -0.90, 0.74,0.01  ],
        // [-0.98, 0.67,.1,-0.96, 0.72,.2, -0.99, 0.62,0.1  ],
        // [-1.01, 0.52,.4,-0.95, 0.29,.4,-0.88, 0.15,0.1  ],
        // [-0.74,-0.11,.1,-0.51,-0.24,.01,-0.41,-0.21,0.01  ],
        // [-0.03, 0.02, 0, 0.49, 0.63,0,  0.74, 0.75,0.01  ],
        // [ 0.82, 0.39, 0, 0.66,-0.08,0,  -0.16,-0.89,0.01]
      //],
      
      // [
      //   [-0.19,-0.71,0, -0.21,-0.59,0,  -0.49,-0.01,0  ],
      //   [-0.55, 0.18,0, -0.68, 0.34,0,  -0.90, 0.74,0.1  ],
      //   [-0.98, 0.67,.1,-0.96, 0.72,.2, -0.99, 0.62,0.3  ],
      //   [-1.01, 0.52,.4,-0.95, 0.29,.4,-0.88, 0.15,0.5  ],
      //   [-0.74,-0.11,.3,-0.51,-0.24,.2,-0.41,-0.21,0.1  ],
      //   [-0.03, 0.02, 0, 0.49, 0.63,0,  0.74, 0.75,0.2  ],
      //   [ 0.82, 0.39, 0, 0.66,-0.08,0,  -0.16,-0.89,0.1]
      // ],

      // [
      //   [-0.19,-0.71, 0, -0.21,-0.59, 0,  -0.49,-0.01,0  ],
      //   [-0.55, 0.18, 0, -0.68, 0.34, 0,  -0.90, 0.74,0  ],
      //   [-0.98, 0.67, 0,-0.96, 0.72,  0, -0.99,  0.62,0  ],
      //   [-1.01, 0.52, 0,-0.95, 0.29,  0, -0.88,  0.15,0  ],
      //   [-0.74,-0.11, 0,-0.51,-0.24,  0, -0.41, -0.21,0  ],
      //   [-0.03, 0.02, 0, 0.49, 0.63,  0,  0.74,  0.75,0  ],
      //   [ 0.82, 0.39, 0, 0.66,-0.08,  0,  -0.16,-0.89, 0]
      // ],



    ]
    
    bm = new bezierMorphing(data,1000,3000);

  },

  "draw":()=>{

    
    orbitControl();
 
    background(i$.bgcolor);
    
    push();
    translate(i$.objX,i$.objY,0);
    
    //normalMaterial();
    stroke(0);
    fill(i$.Color)
    noFill()
    //currentData =bm.getBezier();
   // i$.drawBezier3D(currentData,100);
    i$.drawBezier3D(data[0],100);
    pop()
  },

  "drawBezier3D":(data, size)=>{

    //ここでは閉じた図形を書くので、最後のbezierのデータのアンカーポイントは開始と同じ。
    const lastb = data[data.length-1]
    let x = lastb[6] * size;
    let y = lastb[7] * size;
    let z = lastb[8] * size;
    
  
    beginShape();
    vertex(x, y,z);
    for(let i=0;i<data.length;i++){
      //最後は描かない（つなげない
      if(i != data.length-1){       
        bezierVertex(
          data[i][0] * size, data[i][1] * size, data[i][2] * size,
          data[i][3] * size, data[i][4] * size, data[i][5] * size,
          data[i][6] * size, data[i][7] * size,data[i][8] * size,
        );
        for(let j = 0; j <= 30; j++){
          let t = j / 30;
          let bx,by,bz;
          if(i==0){
            bx = bezierPoint(x, data[i][0] * size, data[i][3] * size, data[i][6] * size, t); // bezier 曲線上の x 座標を算出
            by = bezierPoint(y, data[i][1] * size, data[i][4] * size, data[i][7] * size, t); // bezier 曲線上の y 座標を算出
            bz = bezierPoint(z, data[i][2] * size, data[i][5] * size, data[i][8] * size, t); // bezier 曲線上の y 座標を算出
  
          }else{
            bx = bezierPoint(data[i-1][6] * size, data[i][0] * size, data[i][3] * size, data[i][6] * size, t); // bezier 曲線上の x 座標を算出
            by = bezierPoint(data[i-1][7] * size, data[i][1] * size, data[i][4] * size, data[i][7] * size, t); // bezier 曲線上の y 座標を算出
            bz = bezierPoint(data[i-1][8] * size, data[i][2] * size, data[i][5] * size, data[i][8] * size, t); // bezier 曲線上の y 座標を算出
            
          }

          //ellipse (bx, by, 5, 5); // 算出したxy座標上に円を描画
          push()
          translate(bx,by,bz);
          sphere(2);
          pop()
        }
      }
    } 
    endShape(); 
  },

  "drawBezierClose":(data, size)=>{

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
    endShape(); 
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

// function mouseClicked(){    
//   if(mouseX>0 && mouseX<width && mouseY>0 && mouseY<height ){
//     i$.objX=mouseX;
//     i$.objY=mouseY;
//   }
// }

// function mouseReleased(){
//   if(mouseX>0 && mouseX<width && mouseY>0 && mouseY<height ){
//     saveIdru();

//     //テキストエリアに書く
//     document.getElementById('code').value=toJSON(i$);
//   }
// }

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
