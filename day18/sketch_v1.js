const MUSIC_FILE_PATH ='PianoPeace0141031.wav'

var easing = 0.05; //イージングの係数
var adjD = 0;     //イージングで調整した円の直径

const COLOR_LIST = [[254,253,250],[238,253,255],[238,238,170],[216,216,238]]; //[r,g,b],[r,g,b],... and more.
const P_COLOR_LIST = [[249,200,207],[114,187,133],[235,108,89],[255,255,255]]; //[r,g,b],[r,g,b],... and more.

// const COLOR_LIST = [[255,195,255],[195,255,255],[255,255,127],[195,195,255]]; //[r,g,b],[r,g,b],... and more.

const DELAY_TIME = 5000; //ms
const DURATION_TIME = 2000; //ms

const PLAYBUTTON = 'playbutton'

let cm;// Declare ColorMorphing objects
let cm_p;// Declare ColorMorphing objects for particles

let sound;
let analyzer;

// an array to add multiple particles
let particles = [];

let tmp_season=0;

function setup() {
  
  myCanvas = createCanvas(windowWidth, windowHeight);
  myCanvas.style('z-index:-1');
  
  cm = new ColorMorphing(COLOR_LIST,DELAY_TIME,DURATION_TIME);
  cm_p = new ColorMorphing(P_COLOR_LIST,DELAY_TIME,DURATION_TIME);

  // for(let i = 0;i<width/10;i++){
  //   particles.push(new Particle());
  // }

  analyzer = new p5.Amplitude();
  analyzer.setInput(sound);

  fft = new p5.FFT();
  peakDetect = new p5.PeakDetect(null,null,0.02)

  const elt = document.getElementById(PLAYBUTTON);
  elt.addEventListener('click', playSong);

  sound = loadSound(MUSIC_FILE_PATH,onSoundLoadSuccess,null,onSoundLoadProgress);

}


function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}
let tmp_gain=10;

function draw() {

  // const c = cm.getColor();//Return array [r,g,b]
  background("#111111");


  const c_p = cm_p.getColor();//Return array [r,g,b]
  var rms = analyzer.getLevel();
  // fill(31, 127, 255);
  // noStroke();
  // //RMSの値を直径にして円を描く
  // ellipse(width / 2, height / 2, rms * width);

  // var d = map(rms, 0, 1, 0, 100); //入力値(0から1)を0から500に換算←(5)
  // var sa = d - adjD;           //入力値から直接計算した値と今の直径との差 
  // if (abs(sa) > 1) {           //差の絶対値が1より大きい時だけ直径を変える
  //   adjD = adjD + sa * easing; //差の0.1分ずつ変化
  // }

  fft.analyze();
  peakDetect.update(fft);

  if ( peakDetect.isDetected ) {
    particles.push(new Particle());
  }

  for(let i = 0;i<particles.length;i++) {
    particles[i].col=c_p;
    particles[i].size=rms*50;
    particles[i].createParticle();
    particles[i].moveParticle();
  }
  fill(c_p);
  drawMap(DRAW_MAP);

}


DRAW_MAP=[[20,20],[100,20]];

function drawMap(drawmapdata){
  drawmapdata.forEach(e =>{
    rect(e[0],e[1],20,20);
  });
}


class ColorMorphing {
  constructor(colors,delay,duration){
    this.startTime = millis();
    this.elapsed = 0;
    this.season = 0; //0 Spring　1 Summer　2 Autumn　3 Winter and more imagine.
    this.nextSeason =1;
    this.colors = colors.concat(); //Colors copy
    this.delay = delay;
    this.duration = duration;
    this.c = colors[0].concat();//Default Color copy
    this.p=0.0;　//Progress
  }
  
  getColor(){

    const now = millis();

    this.elapsed = now - this.startTime;
    
    if (this.elapsed >= this.delay) {
      
      // Season++ and Reset startTime / 
      if (this.elapsed - this.delay >= this.duration) {

        this.season = this.nextSeason;
        this.nextSeason++;
        if (this.nextSeason  == this.colors.length) {
          this.nextSeason = 0;
        }

        this.startTime = millis();

      }else{
        this.p =(this.elapsed - this.delay) / this.duration; //progress　0.0 - 1.0  
        this.c[0] = int(this.colors[this.nextSeason][0] * this.p + this.colors[this.season][0] * (1 - this.p));
        this.c[1] = int(this.colors[this.nextSeason][1] * this.p + this.colors[this.season][1] * (1 - this.p));
        this.c[2] = int(this.colors[this.nextSeason][2] * this.p + this.colors[this.season][2] * (1 - this.p));
      }
    }
    return this.c;
  }
}


// this class describes the properties of a single particle.
class Particle {
  // setting the co-ordinates, radius and the
  // speed of a particle in both the co-ordinates axes.
    constructor(){
      this.x = random(0,width);
      this.y = random(0,height);
      this.r = random(1,8);
      this.size = random(0.1,0.8);

      this.w = this.r + this.r * this.size ;
      this.h = this.r + this.r * this.size ;

      this.xSpeed = random(-2,2);
      this.ySpeed = random(-1,1.5);
      //季節ごとにいろを変える
      this.col = random(P_COLOR_LIST[0]);
    }
    chengeColor(season){
      this.col = random(P_COLOR_LIST[season]);
    }
  // creation of a particle.
    createParticle() {
 
      noStroke();
      fill('rgba(' + this.col[0] + ', ' + this.col[1] + ',' +  this.col[2] + ',0.5)');
      ellipse(this.x,this.y,this.r + this.r * this.size,this.r + this.r * this.size);
      
    }
  
  // setting the particle in motion.
    moveParticle() {
      if(this.x < 0 || this.x > width)
        this.xSpeed*=-1;
      if(this.y < 0 || this.y > height)
        this.ySpeed*=-1;
      this.x+=this.xSpeed;
      this.y+=this.ySpeed;
    }
  
}


function onSoundLoadSuccess(e){
  const elt = document.getElementById(PLAYBUTTON);
  elt.value="Play music";
  elt.removeAttribute("disabled")
  console.log("load sound success",e);
}
function onSoundLoadProgress(e){
  const elt = document.getElementById(PLAYBUTTON);
  elt.value="Now loading..." + int(e * 100) +"%" ;
 // console.log("load sound progress",e);
}


function playSong(){
  if(sound.isPlaying() == false) {
    sound.loop();
  }else{
    sound.stop();
  }
}
  