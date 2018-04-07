// The flock of boids
var flock;
var predatorFlock;
var rangeSlider;
var canvas;
var totalBoids = 100;
var totalPredators = 5;

var canvasWidth;
var canvasHeight;

var totalColors = 2;
var greenColor;
var blueColor; 
var colorsArray;

// GUI Sliders for prey
var cohesionSliderPrey;
var alignmentSliderPrey;
var separationSliderPrey;

var radiusCohesionSliderPrey;
var radiusAlignmentSliderPrey;
var radiusSeparationSliderPrey;

// GUI Slider values for prey
var cohesionSliderValuePrey;
var alignmentSliderValuePrey;
var separationSliderValuePrey;

var radiusCohesionSliderValuePrey;
var radiusAlignmentSliderValuePrey;
var radiusSeparationSliderValuePrey; 

// GUI Sliders for Predator
var separationSliderPredator;
var radiusSeparationSliderPredator;
var radiusPreySliderPredator;

// GUI Slider values for Predator
var separationSliderValuePredator;
var radiusSeparationSliderValuePredator;
var radiusPreySliderValuePredator;

var controllerXPrey; 
var controllerYPrey;
var controllerOffset;
var labelOffset;

var controllerXPredator;
var controllerYPredator;

function createGUIElements() {
    controllerXPrey = 5;
    controllerYPrey = 5;
    controllerOffset = 18;
    labelOffset = 15;

    controllerXPredator = windowWidth - canvasWidth;
    controllerYPredator = 5;
    // Prey
    cohesionSliderPrey = createSlider(0, 2, 1, 0.05);
    separationSliderPrey = createSlider(0, 2, 1, 0.05);
    alignmentSliderPrey = createSlider(0, 2, 1, 0.05);

    radiusCohesionSliderPrey = createSlider(0,60,45,0.01);
    radiusAlignmentSliderPrey = createSlider(0,60,25,0.01);
    radiusSeparationSliderPrey = createSlider(0,60,12,0.01);

    cohesionSliderPrey.position(controllerXPrey, controllerYPrey + 0 * controllerOffset);
    cohesionSliderPreyLabel = createDiv('Cohesion Coefficient For Prey');
    cohesionSliderPreyLabel.position(cohesionSliderPrey.x + cohesionSliderPrey.width + labelOffset, 
        cohesionSliderPrey.y);

    separationSliderPrey.position(controllerXPrey, controllerYPrey + 1 * controllerOffset);
    separationPreyLabel = createDiv('Separation Coefficient For Prey');
    separationPreyLabel.position(separationSliderPrey.x + separationSliderPrey.width + labelOffset, 
        separationSliderPrey.y);

    alignmentSliderPrey.position(controllerXPrey, controllerYPrey + 2 * controllerOffset);
    alignmentPreyLabel = createDiv('Alignment Coefficient For Prey');
    alignmentPreyLabel.position(alignmentSliderPrey.x + alignmentSliderPrey.width + labelOffset, 
        alignmentSliderPrey.y);

    radiusCohesionSliderPrey.position(controllerXPrey, controllerYPrey + 3 * controllerOffset);
    radiusCohesionPreyLabel = createDiv('Radius of cohesion for prey');
    radiusCohesionPreyLabel.position(radiusCohesionSliderPrey.x + radiusCohesionSliderPrey.width
        + labelOffset, radiusCohesionSliderPrey.y);

    radiusSeparationSliderPrey.position(controllerXPrey, controllerYPrey + 4 * controllerOffset);
    radiusSeparationPreyLabel = createDiv('Radius of Separation for prey');
    radiusSeparationPreyLabel.position(radiusSeparationSliderPrey.x + radiusSeparationSliderPrey.width
        + labelOffset, radiusSeparationSliderPrey.y);

    radiusAlignmentSliderPrey.position(controllerXPrey, controllerYPrey + 5 * controllerOffset);
    radiusAlignmentPreyLabel = createDiv('Radius of alignment for prey');
    radiusAlignmentPreyLabel.position(radiusAlignmentSliderPrey.x + radiusAlignmentSliderPrey.width
        + labelOffset, radiusAlignmentSliderPrey.y);

    // Predator
    separationSliderPredator = createSlider(0, 2, 1, 0.05);
    radiusSeparationSliderPredator = createSlider(0, 60, 12, 0.01);
    radiusPreySliderPredator = createSlider(0, 60, 50, 0.01);

    separationSliderPredator.position(controllerXPredator, controllerYPredator 
        + 0 * controllerOffset);
    radiusSeparationSliderPredator.position(controllerXPredator, controllerYPredator 
        + 1 * controllerOffset);
    radiusPreySliderPredator.position(controllerXPredator, controllerYPredator 
        + 2 * controllerOffset);

    separationPredatorLabel = createDiv('Separation Coefficient For Predator');
    separationPredatorLabel.position(separationSliderPredator.x + separationSliderPredator.width 
        + labelOffset, separationSliderPredator.y);
    radiusSeparationPredatorLabel = createDiv('Radius of Separation for predator');
    radiusSeparationPredatorLabel.position(radiusSeparationSliderPredator.x + 
        radiusSeparationSliderPredator.width + labelOffset, radiusSeparationSliderPredator.y);
    radiusPreyPredatorLabel = createDiv('Radius of vision for predator');
    radiusPreyPredatorLabel.position(radiusPreySliderPredator.x + 
        radiusPreySliderPredator.width + labelOffset, radiusPreySliderPredator.y);
}
function centerCanvas() {
    var x = (windowWidth - canvasWidth) / 2;
    var y = (windowHeight - canvasHeight) / 2;
    canvas.position(x, y);
}

function windowResized() {
    centerCanvas();
}

function setup() {
    canvasWidth = (2 * windowWidth) / 4;
    canvasHeight = (2.5 * windowHeight) / 4;
    canvas = createCanvas(canvasWidth, canvasHeight);
    createGUIElements();
    centerCanvas();
    
    flock = new Flock();
    predatorFlock = new Flock();

    for (var i = 0; i < totalBoids; i++) {
        xOffSet = random(canvasWidth / 2);
        yOffSet = random(canvasHeight / 2);
        var boid = new Boid(canvasWidth / 2 - xOffSet, canvasHeight / 2 - yOffSet);
        flock.addBoid(boid);
    }
    for (var i = 0; i < totalPredators; i++) {
        xOffSet = random(canvasWidth / 2);
        yOffSet = random(canvasHeight / 2);
        var boid = new Predator(canvasWidth / 2 - xOffSet, canvasHeight / 2 - yOffSet);
        predatorFlock.addBoid(boid);
    }

    greenColor = color(0, 255, 0);
    blueColor = color(0, 0, 255);
    colorsArray = [greenColor, blueColor];

    


}

function draw() {
    background(253, 233, 103);
    
    radiusSeparationSliderValuePrey = radiusSeparationSliderPrey.value();
    radiusAlignmentSliderValuePrey = radiusAlignmentSliderPrey.value();
    radiusCohesionSliderValuePrey = radiusCohesionSliderPrey.value();

    separationSliderValuePrey = separationSliderPrey.value();
    alignmentSliderValuePrey = alignmentSliderPrey.value();
    cohesionSliderValuePrey = cohesionSliderPrey.value();

    separationSliderValuePredator = separationSliderPredator.value();
    radiusSeparationSliderValuePredator = radiusSeparationSliderPredator.value();

    separationSliderValuePredator = separationSliderPredator.value();
    radiusSeparationSliderValuePredator = radiusSeparationSliderPredator.value();
    radiusPreySliderValuePredator = radiusPreySliderPredator.value();

    flock.moveBoids();
    predatorFlock.moveBoids();
}
