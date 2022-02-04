// #AltEdu2022 day 3

//鬼を描く プログラムを書くプログラム

//1階のプログラムの変数定数関数は一つのオブジェクトに入れて読み書きできるようにする
//鬼をマウスで動かすことでコードを変更する（予定）
//現在クリックして移動したポジションだけ反映

let i$ ={

  "W":500,
  "H":500,
  "oniX":250,
  "oniY":250,
  "bgcolor":200,
  "oniColor":[200,0,0],
  "oniHColor":[200,200,0],
  "oniEyeColor":0,
  
  "setup":()=>{
    createCanvas(i$.W,i$.H);
    strokeCap(ROUND);
    angleMode(DEGREES);
  },

  "draw":()=>{
    background(i$.bgcolor);
    translate(i$.oniX,i$.oniY);
  
    //各パーツはだいたいx,y,width,height,rotate
    //腕
    i$.ude(0,30,4,60,0);
    i$.ude(-12,27,4,60,-33);

    //足
    i$.ashi(-3,70,4,30,0);
    i$.ashi(3,70,4,30,0);

    //胴体
    i$.dou(0,40,16,60,0);

    //輪郭
    i$.rinkaku(0,-5,87,73);
   
    //角
    i$.tsuno(0,-52,20,30,0);

    //目
    i$.eye(-20,-7,20,20,-5);
    i$.eye(20,-7,20,20,5);
    
    //牙
    i$.kiba(-7,-22,4,10,0);
    i$.kiba(7,-22,4,10,0);

  },
  
  "rinkaku":(x,y,w,h,r=0)=>{
    push();
    fill(i$.oniColor);
    noStroke();
    rotate(r);
    ellipse(x,y,w,h);
    pop()
  },

  "tsuno":(x,y,w,h,r=0)=>{
    push();
    stroke(i$.oniColor);
    strokeWeight(4);
    fill(i$.oniHColor);
    rotate(r);
    i$.sankaku(x,y,w,h);
    pop();
  },

  "eye":(x,y,w,h,r=0)=>{
    push();

    //白目
    fill(i$.oniHColor);
    stroke(i$.oniColor);
    rotate(r);
    beginShape();
    vertex(x+w/2, y);
    bezierVertex(x+w/3,y-h/2,x-w/3,y-h/2,x-w/2,y);
    bezierVertex(x-w/3,y+h/2,x+w/3,y+h/2,x+w/2,y);
    endShape(CLOSE); 
    
    //黒目
    noStroke();
    fill(i$.oniEyeColor);
    w*=0.7;
    h*=0.8;
    beginShape();
    vertex(x+w/2, y);
    bezierVertex(x+w/3,y-h/2,x-w/3,y-h/2,x-w/2,y);
    bezierVertex(x-w/3,y+h/2,x+w/3,y+h/2,x+w/2,y);
    endShape(CLOSE); 
    
    //キラキラ
    fill(i$.oniHColor);
    ellipse(x-2,y-2,w*.2)

    pop();
  },

  "nose":(x,y,w,h,r=0)=>{
    push();
    stroke(i$.oniHColor)
    fill(i$.oniColor);
    rotate(r+180);
    i$.sankaku(x,y,w,h);
    pop();
  },

  "kiba":(x,y,w,h,r=0)=>{
    push();
    strokeWeight(0)
    fill(i$.oniHColor);
    rotate(r+180);
    i$.sankaku(x,y,w,h);
    pop();
  },

  "dou":(x,y,w,h,r=0)=>{
    push();
    strokeWeight(0)
    fill(i$.oniColor);
    rotate(r);
    i$.sankaku(x,y,w,h);
    pop();
  },

  "ashi":(x,y,w,h,r=0)=>{
    push();
    strokeWeight(0)
    fill(i$.oniColor);
    rotate(r);
    i$.sankaku(x,y,w,h);
    pop();
  },

  "ude":(x,y,w,h,r=0)=>{
    push();
    noFill();
    stroke(i$.oniColor);
    rotate(r+10);
    beginShape();
    vertex(x+w/2, y);
    bezierVertex(x+w/3,y+h/2,x-w/3,y+h/2,x-w/2,y+h/2);
    endShape();
    pop();
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
    i$.oniX=mouseX;
    i$.oniY=mouseY;
  }
}

function mouseReleased(){
  if(mouseX>0 && mouseX<width && mouseY>0 && mouseY<height ){
    saveIdru();

    //テキストエリアに書く
    document.getElementById('oniData').value=toJSON(i$);
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
  const selectOni = document.getElementById('oni');

  //一旦optionは削除
  while(selectOni.firstChild){
    selectOni.removeChild(selectOni.firstChild)
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
      selectOni.appendChild(op)
    }
  });
}

function setupList(){
  //リストを選んだときの処理。
  const selectOni = document.getElementById('oni');
  selectOni.addEventListener('change', (e)=>{
    //一旦キャンバスを削除
    const element = document.querySelector('canvas');
    element.remove();
    //選択したキーの情報を取得してi$に読み込む
    const selectOniName = e.target.value;
    const catData=sessionStorage.getItem(selectOniName);
    i$ = fromJSON(catData);
    //実行
    i$.setup();
    //テキストエリアに書く
    document.getElementById('oniData').value=catData;
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
