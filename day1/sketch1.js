//#AltEdu2022 コーディングチャレンジ，2/1（火）

function setup() {
  createCanvas(400, 400,WEBGL);
  circleSize=100;
  miniCircle=5;
}

function draw() {
 
  orbitControl();
  
  x=sin(frameCount)*circleSize;
  y=cos(frameCount)*circleSize;
  circre(x,y,miniCircle); 
  
}















































































































function circre(x,y,size){
  
  lx=sin(frameCount*2)*size*10;
  ly=cos(frameCount*2)*size*10;
  circle(lx+x,ly+y,size);
  
  
}