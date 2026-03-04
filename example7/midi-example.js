/* start tone.js audio library to get an AudioContext started */
Tone.start();

/* create phaser game */
let gameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: {
      preload: preloadCode,
      create: createCode,
      update: updateCode
    },
    backgroundColor: '#000000',
    physics: {
      default: 'arcade',
      arcade: { debug: false }
    },
    /* this trick gets Phaser to share AudioContext with Tone.js, 
       so Phaser takes audio context out of suspension with user interaction
       to work with browser audio autoplay restrictions */
    audio: {
      context:Tone.context._context 
    }
};

/* create phaser game */
let gameObject = new Phaser.Game(gameConfig);

function preloadCode() {

}

function createCode() {
  // trigger audio start from mouse click in this demo
  this.input.on(
    'pointerdown', 
    function (pointer) {
      midiAudioStart();
    }
  );
}

function updateCode() {

}