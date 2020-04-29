function setup() {
    let npoyCanvas = createCanvas(1072, 1000);
    npoyCanvas.parent('npoy');
    strokeWeight(1);
  }

function preload() {
    img85 = loadImage('images/npoy/tmbs/13007.ringman85@1x.jpg');
    img86 = loadImage('images/npoy/tmbs/13232.clift.86@1x.jpg');
    img87 = loadImage('images/npoy/tmbs/14648.greene.87@1x.jpg');
    img88 = loadImage('images/npoy/tmbs/15744.kaplan.88@1x.jpg');

}
  var strokeColor = '#2d2d2d';
  
  function draw() {
    text("Female", 465, 200);
    textAlign(RIGHT);

    text("Male", 590, 200);
    textAlign(LEFT);

    // stroke('#2d2d2d');
    // position the top bar
      line(1072/2-10, 230, 1072/2+10, 230);
    // position the first segment
    line(1072/2, 230, 1072/2, 300);

    text("1986", 1072/2-14, 320);
    textAlign(CENTER);

    image(img85, 590, 240);
// position the second segment
    line(1072/2, 330, 1072/2, 540);
    text("1987", 1072/2, 560);
    textAlign(CENTER);


    stroke(strokeColor);


    background()

  }