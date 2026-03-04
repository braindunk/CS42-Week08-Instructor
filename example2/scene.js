// audio example for soundtrack looping

// define scene 1 (attractor/welcome/instructions) configuration in its own variable
let scene1 = {
  key: 'scene1',
  active: true,
  preload: scene1Preload,
  create: scene1Create,
  update: scene1Update
};

// define scene 2 (actual game) configuration in its own variable
let scene2 = {
  key: 'scene2',
  active: false,
  preload: scene2Preload,
  create: scene2Create,
  update: scene2Update
};

// define scene 3 (game over screen) configuration in its own variable
let scene3 = {
  key: 'scene3',
  active: false,
  preload: scene3Preload,
  create: scene3Create,
  update: scene3Update
};

// define game config settings
let config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade"
  },
  scene: [scene1, scene2, scene3] // square brackets let us create a list/array of scenes for our game (1 only for now)
};

// create game instance
let game = new Phaser.Game(config);

//
// scene 1 functions follow
//

// global vars for scene1 or all scenes
let scene1image;
let sound1;

function scene1Preload() {
  // preload our image and audio file
  this.load.image('title', 'title.png');
  // load audio asset files use this.load.audio()
  this.load.audio('music', 'overture.mp3');
}

function scene1Create() {
  // make a image game object to show our bkgnd image
  scene1image = this.add.image( 400, 300, 'title');
  // make a sound audio object (not shown but heard when played)
  sound1 = this.sound.add('music');
  // to play an audio object, we have to call the play() method
  sound1.play(
    {
      volume: 0.5, // set to 50% of volume level
      loop: true // make audio play repeat over and over
    }
  );
  // add detection for user-generate pointer click event
  // args: 1) string for event to detect, 2) name of function to trigger, 3) this for ref to current scene
  this.input.on('pointerup', scene1Transition, this);
}

function scene1Update() {}

function scene1Transition() {
  // to move from the current active scene to a diff one, use either this.scene.start() or
  // this.scene.transition()
  // this.scene.start('scene2');
  this.scene.transition(
    {
      target: 'scene2',
      duration: 2000,
      moveBelow: true,
      allowInput: false,
      onUpdate: function(progress) {
        scene1image.alpha = 1 - progress; // progress is set by Phaser each update starts @ 0
      }
    }
  );
}

//
// scene 2
//

let scene2image;
let effect2;

function scene2Preload() {
  this.load.image( 'game', 'game.png');
  this.load.audio( 'zap', 'blaster.mp3');
}

function scene2Create() {
  scene2image = this.add.image( 400, 300, 'game');
  effect2 = this.sound.add('zap');
  this.input.on('pointerup', scene2Transition, this);
}

function scene2Update() {

}

function scene2Transition() {
  effect2.play(
    {
      volume:0.8,
      loop: false
    }
  );
  this.scene.start('scene3');
}

//
// scene 3
//

let scene3image;

function scene3Preload() {
  this.load.image('end','end.png');
}

function scene3Create() {
  scene3image = this.add.image(400,300,'end');
  sound1.pause();
  this.input.on('pointerup', scene3Transition, this);
}

function scene3Update() {

}

function scene3Transition() {
  this.scene.start('scene1');
}