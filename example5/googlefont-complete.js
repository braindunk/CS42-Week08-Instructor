// audio example

// create a scene
var scene1 = {
  key: 'scene1',
  active: true,
  preload: scene1Preload,
  create: scene1Create,
  update: scene1Update
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
  scene: [scene1]
};

let game = new Phaser.Game(config);

//
// scene 1 (only scene in this example)
//
let scene1image;
let sound1;

// scene 1 preload
function scene1Preload() {
  this.load.image('title','title.png');
  console.log('scene1');
}
// scene 1 create
function scene1Create() {
  scene1image = this.add.image( 400, 300, 'title' );
  let textobject1;
  textobject1 = this.add.text(
    400, // x coord (left by default, changed by setOrigin() to center)
    50, // y coord (top by default, changed to center below)
    'Hello World', // text string content to display
    { 
      fontFamily: 'Comic Neue',
      fontSize: 64, 
      color: '#00ff00',
      align: 'center' 
    } // text characteristics object value
  );
  // set anchor to middle of object
  textobject1.setOrigin(0.5);
  // setScrollFactor(0) keeps text object from moving when camera scroll moves
  textobject1.setScrollFactor(0);

  let textobject2;
  textobject2 = this.add.text(
    400, // x coord (left by default, changed by setOrigin() to center)
    550, // y coord (top by default, changed to center below)
    'The game rules are ...', // text string content to display
    { 
      fontFamily: 'Spicy Rice',
      fontSize: 64, 
      color: 'yellow',
      align: 'center' 
    } // text characteristics object value
  );
  // set anchor to middle of object
  textobject2.setOrigin(0.5);
}
// scene 1 update
function scene1Update() {
}