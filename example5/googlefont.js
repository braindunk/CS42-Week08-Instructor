// audio example for soundtrack looping

// define a scene configuration in its own variable
let scene1 = {
  key: 'scene1',
  active: true,
  preload: scene1Preload,
  create: scene1Create,
  update: scene1Update
};

// define game config settings
let config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade"
  },
  scene: [scene1] // square brackets let us create a list/array of scenes for our game (1 only for now)
};

// create game instance
let game = new Phaser.Game(config);

//
// scene 1 functions follow
//

// global vars for scene1 or all scenes
let scene1image;
let sound1;
let textobject1, textobject2;

function scene1Preload() {
  // preload our image and audio file
  this.load.image('title', 'title.png');
}

function scene1Create() {
  // make a image game object to show our bkgnd image
  scene1image = this.add.image( 400, 300, 'title');
  // make a text game object
  textobject1 = this.add.text(
    400, // x coord for text is usally left pos, but i will center the anchor later
    50, // y coord
    'Hello world', // content to show
    {
      fontFamily: 'Comic Neue',
      fontSize: 64,
      color: '#00ff00',
      align: 'center'
    } // props for text
  );
  textobject1.setOrigin(0.5);
  // keep the text object on screen even if the camera scrolls to follow the player sprite
  textobject1.setScrollFactor(0);


  // make a text game object
  textobject2 = this.add.text(
    400, // x coord for text is usally left pos, but i will center the anchor later
    550, // y coord
    'game instructions go here', // content to show
    {
      fontFamily: 'Spicy Rice',
      fontSize: 64,
      color: '#00ff00',
      align: 'center'
    } // props for text
  );
  textobject2.setOrigin(0.5);
}

function scene1Update() {

}