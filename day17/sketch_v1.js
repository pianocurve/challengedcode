// #AltEdu2022 day 17

//図形でコードを書く 3種の色　3種の図形
//円はループ
//三角は分岐
//四角は処理


let i$ ={
  "W":400,
  "H":400,
  "x":0,
  "y":0,
  "FR":30,

  "setup":()=>{
  
    createCanvas(i$.W,i$.H);
    frameRate(i$.FR)
  
  },

  "draw":()=>{
    
    background(220);

    if (mouseIsPressed) {
      if(mouseX>=0 && mouseX<=width && mouseY>=0 && mouseY<=height){
        i$.W=mouseX;
        i$.H=mouseY
      }
    }

    push();
    noFill();
    strokeWeight(5);
    stroke(200,0,0);
    rect(0,0,i$.W,i$.H);
    pop();



  },
  "sg":(n)=>{
    return Math.round(n*10)/10;
  },

    //x,yを中心とした底辺の長さw、高さhの三角
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


//ストレージに時刻をつけて現在のソースを保存
function saveIdru(){

  //ファイル名で使う時刻作成
  const date = new Date();
  const formatdate=date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '' +('0' + date.getDate()).slice(-2) + '-' +  ('0' + date.getHours()).slice(-2) + '' + ('0' + date.getMinutes()).slice(-2) + '-' + ('0' + date.getSeconds()).slice(-2);
  const title=document.title;
  
  //セッションストレージにi$を保管
  sessionStorage.setItem(title + formatdate, toJSON(i$) );

  //保管したものに名前をつけて後で呼び出せるようにリストに追加
  const selectHistory = document.createElement('select');
  selectHistory.setAttribute('id', 'history');
  document.body.prepend(selectHistory);
 
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
  //テキストエリアに書く 
  const codeErea = document.createElement('textarea');
  codeErea.setAttribute('id', 'code');
  codeErea.value=toJSON(i$).replace(/\\n/g, '\n');
  document.body.prepend(codeErea);

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
    document.getElementById('code').value=catData.replace(/\\n/g, '\n');
  });

  //テキストエリアを編集したときも更新する
  codeErea.addEventListener('change', (e)=>{
    //一旦キャンバスを削除
    const element = document.querySelector('canvas');
    element.remove();
    //情報を取得してi$に読み込む
    i$ = fromJSON(e.target.value.replace(/\n/g, '\\n'));
    //実行
    i$.setup();
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
