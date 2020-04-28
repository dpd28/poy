function setup() {
    let npoyCanvas = createCanvas(600, 400);
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
    // stroke('#2d2d2d');
    line(1072/2, 230, 1072/2, 1000);

    text("Female", 465, 200);
    textAlign(RIGHT);

    text("Male", 590, 200);
    textAlign(LEFT);

    image(img85, 590, 240);

    stroke(strokeColor);
    line(1072/2-10, 230, 1072/2+10, 230);
    background()

  }