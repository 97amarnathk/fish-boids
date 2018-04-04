// Flock class consisting of multiple boids
function Flock(){
  this.boids = [];
}

// Method of the Flock class to add a new boid to the flock
Flock.prototype.addBoid = function(boid){
  this.boids.push(boid)
}

Flock.prototype.moveBoids = function(){
  console.log('Reached moveBoids with '+this.boids.length+ 'boids')
  for (var i = 0; i < this.boids.length; i++) {

    this.boids[i].update(i);
    this.boids[i].borders();
    this.boids[i].render();
  }

}
