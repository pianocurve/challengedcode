//Day 18
let isPlaying=false;

let oscNum=4;
let osc=new Array(oscNum);
let env=new Array(oscNum);
let currentOsc=0;

function setup() {

  pixelDensity(1);
  frameRate(60);

  
  myCanvas = createCanvas(2560,1440 );
  myCanvas.style('width:95vw;height:auto;');
  


  x=0;//x軸はここでは時間軸
  noteons={}// #note on のノートナンバーと x 時刻を保管

  SCOREROW=akari;

  PLAYTIME=akari[0].length;

  background(0);

  //同時4音
  for(let i=0;i<oscNum;i++){
    osc[i] = new p5.TriOsc();
    env[i] = new p5.Envelope();
  };

  noLoop();


}

function draw() {

  fill("#D4E157");
  drawAkari();

}

function drawAkari(){
  
  notes=[];
  noteoffs=[];
  veros=[];
  cc=[];


  for (let y = 0; y < SCOREROW.length;y++ ){
    
   // console.log(x,y,SCOREROW[y][x]);

    if (SCOREROW[y][x]!=0){

      if (y >= 0 && y <= 127){
        notes.push(127-y)
      }

      if (y >= 128 && y <= 255){
        veros.push(127-(y-128))
      }

      if (y >= 256 && y <= 383){
        noteoffs.push(127-(y-256));
      }

      if (y>=384 && y <= 512){ //pedal
        cc.push(127-(y-384))
      }
    }
  }

  //pedal
  cc.forEach(c=>{
    // msg = mido.Message('control_change', control=64, value=c, time=0)
    // print (x,msg)
    // outport.send(msg)
  });

  notes.forEach(n=>{

    // //#verocityは代表して
    // msg = mido.Message('note_on', note=n, velocity=veros[0], time=0)
    // print (x,msg)
    // outport.send(msg)

    freq = midiToFreq(n);
    
    
    osc[currentOsc].freq(freq);
    env[currentOsc].ramp(osc[currentOsc], 0, veros[0]/127, 0.01);

    currentOsc+=1;
    if(currentOsc>=osc.length){
      currentOsc=0;
    }

    console.log(n,freq,currentOsc);
    
    //#ノートon のX軸を保管
    noteons[n] = x;
    
    rect(x % width, 127 - n + (Math.floor(x/width)*128),veros[0]/7,veros[0]/7);
  
  });


  noteoffs.forEach(nf=>{

      // msg = mido.Message('note_off', note=nf, velocity=0, time=0)
      // print (x,msg)
      // outport.send(msg)

      delete noteons[nf];
  });

  x += 1;

  if (x >= PLAYTIME){
    x=0; 
    background(0);
    isPlaying = false;
    osc.forEach(o=>{
      o.stop();
    });
    noLoop();
    
  }

}
// キーが押された瞬間の処理
function keyPressed() {
  switch (keyCode){
    case 70: //f
      let fs = fullscreen();
      fullscreen(!fs);
      break;


    case 80://p サウンド再生
      
      if(isPlaying == false) {
          
        //sound.play();

        isPlaying = true;
        
        for(let i=0;i<oscNum;i++){
          osc[i].start();
          env[i].ramp(osc[i], 0, 0, 0);
        };
          
        loop();

      }else{
        //sound.pause();

        isPlaying = false;
        osc.forEach(o=>{
          o.stop();
        });
        noLoop();
        
      }
      break;

    default:
  }

}
  