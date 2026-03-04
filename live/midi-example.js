/* start tone.js audio library to get an AudioContext started */
Tone.start();

/* create phaser game config properties */
let config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: {
    preload: preloadCode,
    create: createCode,
    update: updateCode
  },
  backgroundColor: '#000000',
  physics: {
    default: 'arcade'
  },
  audio: {
    // need this to ensure phaser generated sound plays back as well as Tone MIDI sounds
    context: Tone.context._context
  }
};

/* create phaser game */
new Phaser.Game(config);

function preloadCode() {
  console.log('preloadCode');
}

function createCode() {
  // trigger audio playback for Tone.js has to be in a user event handler
  this.input.on(
    'pointerdown',
    function(pointer) {
      console.log('click happened');
      midiAudioStart();
    }
  );
}

function updateCode() {

}

