// scene example

// create multiple scenes
var scene1 = {
  key: 'scene1',
  active: true,
  preload: scene1Preload,
  create: scene1Create,
  update: scene1Update
};
let scene2 = {
  key: 'scene2',
  active: false,
  preload: scene2Preload,
  create: scene2Create,
  update: scene2Update
};
let scene3 = {
  key: 'scene3',
  active: false,
  preload: scene3Preload,
  create: scene3Create,
  update: scene3Update
};
// establish config settings
let config = {
  type: Phaser.AUTO,
  // enable scaleManager to make game canvas centered and fit to screen 
  scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: 800,
      height: 600
  },
  physics: {
    default: "arcade"
  },
  scene: [scene1, scene2, scene3]
};

let game = new Phaser.Game(config);

//
// scene 1
//
let scene1image;
let sound1;

// scene 1 preload
function scene1Preload() {
  this.load.image('title','title.png');
  console.log('scene1');
  // load audio file
  this.load.audio('music','overture.mp3');
}
// scene 1 create
function scene1Create() {
  scene1image = this.add.image( 400, 300, 'title' );
  this.input.on('pointerup', scene1Trans, this);
  // audio sound playback example: watch out for use of SoundManager add()
  sound1 = this.sound.add('music');
  sound1.play(
  	{
  		volume: 0.5,
  		loop: true
  	}
  );
}
// scene 1 update
function scene1Update() {
}
// scene 1 transition to 2
function scene1Trans() {
  console.log('clicked#1');
  // this.scene.start('scene2');
  this.scene.transition(
    {
      target: 'scene2',
      duration: 2000,
      moveBelow: true,
      allowInput: false,
      onUpdate: function(progress) {
        scene1image.alpha = 1 - progress;
      }
    }
  );
}

//
// scene 2
//
let scene2image;
let effect2;

// scene 2 preload
function scene2Preload() {
  this.load.image( 'game', 'game.png' );
  console.log( 'scene2' );
  this.load.audio( 'zap', 'blaster.mp3');
}
// scene 2 create
function scene2Create() {
  scene2image = this.add.image( 400, 300, 'game' );
  this.input.on('pointerup', scene2Trans, this);
  // audio effect example: watch out for use of SoundManager add()
  effect2 = this.sound.add('zap');
  
  // add key detection and attach event trigger with on()
  let fkey = this.input.keyboard.addKey('F'); 
  fkey.on(
    'down', // arg 1: event to detect
    function () {
      if (this.scale.isFullscreen) {
        this.scale.stopFullscreen();
      } else {
        this.scale.startFullscreen();
      }
    }, // arg 2: anonymous function contains code Phaser runs on event
    this // arg 3: reference to current scene via this keyword
  );
}
// scene 2 update
function scene2Update() {
}
// scene 2 transition to 3
function scene2Trans() {
  console.log('clicked#2');
  effect2.play(
  	{
  		volume: 0.8,
  		loop: false
  	}
  );
  // this.scene.start('scene3');
  this.scene.transition(
    {
      target: 'scene3',
      duration: 2000,
      moveBelow: true,
      allowInput: false,
      onUpdate: function(progress) {
        scene2image.alpha = 1 - progress;
        scene2image.angle = progress * 360;
      }
    }
  );
}

//
// scene 3
//
let scene3image;

// scene 3 preload
function scene3Preload() {
  this.load.image( 'end', 'end.png' );
  console.log('scene3');
}
// scene 3 create
function scene3Create() {
  scene3image = this.add.image( 400, 300, 'end' );
  this.input.on('pointerup', scene3Trans, this);
  sound1.pause();
}
// scene 3 update
function scene3Update() {

}
// scene 3 transition to 1
function scene3Trans() {
  console.log('clicked#3');
  // this.scene.start('scene1');
  this.scene.transition(
    {
      target: 'scene1',
      duration: 2000,
      moveBelow: true,
      allowInput: false,
      onUpdate: function(progress) {
        scene3image.alpha = 1 - progress;
      }
    }
  );
}