// #AltEdu2022 day 10

//Colors

let i$ ={
  
  "setup":()=>{
    createCanvas(400,400,WEBGL);
    colorMode(HSB)
  },

  "draw":()=>{

    background(359,0,100,1);
    stroke(255);
    fill(341,69,82,1);
    rotateX(radians(rotationX));
    rotateY(radians(rotationY));
    //translate(width/2,height/2)
    sphere(100);
    // ellipse(0,0,100)

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
    document.getElementById('code').value=catData.replace('\\','') ;//catData;
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

