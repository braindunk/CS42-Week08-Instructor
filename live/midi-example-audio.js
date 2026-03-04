/*
 * audio scripts using Tone.js and MidiConvert
 * 
 * libraries found at:
 *  https://tonejs.github.io/
 *  https://github.com/baweaver/MidiConvert
 */

// start audio playback of any midi file
function midiAudioStart() {
  // step 1. to work with Tone.js to play audio, we have to first call it's start()
  Tone.start();
  
  // step 2. since Tone.js is a digital audio workstation (DAW) with synths built-in
  // define programmatically (without a sample waveform) 2 instruments
  let synth1 = new Tone.PluckSynth().toDestination();
  synth1.volume.value = -6;

  let synth2 = new Tone.Synth().toDestination();
  synth2.volume.value = -12;

  // step 3. (has many substeps) call midiconvert to load our external midi file to playback
  MidiConvert.load(
    // load() takes 2 arguments inside the round parens
    // 1: path to the midi file (string)
    'assets/VivaldisSummerTheme.mid',
    // 2: a function we want to run AFTER the file loads (all deals with Tone.js)
    function(midiData) {
      console.log('mini loaded and in json', midiData);
      // step 3.1. set the tempo of the music being played (with Tone.js)
      Tone.Transport.bpm.value = midiData.header.bpm;
      
      // step 3.2. create a Tone.Part for one of midi tracks that one synth can play
      let midiPart1 = new Tone.Part(
        // Tone.Part() takes 2 arguments:
        // 1) function that reads the timing and note value (A-G)
        function(time, note) {
          // the robot synth plays a note in this function
          synth1.triggerAttackRelease(
            note.midi,
            note.duration,
            time,
            note.velocity
          );
        },
        // 2) the array of musical notes and timings to play
        midiData.tracks[1].notes
      );
      // tell Tone to play back this part as soon as the transport starts
      midiPart1.start();
      
      // step 3.3. create a Tone.Part for second midi tracks that one synth can play
      let midiPart2 = new Tone.Part(
        // Tone.Part() takes 2 arguments:
        // 1) function that reads the timing and note value (A-G)
        function(time, note) {
          // the robot synth plays a note in this function
          synth2.triggerAttackRelease(
            note.midi,
            note.duration,
            time,
            note.velocity
          );
        },
        // 2) the array of musical notes and timings to play
        midiData.tracks[2].notes
      );
      // tell Tone to play back this part as soon as the transport starts
      midiPart2.start();
  
      // step 3.4. start playing!
      Tone.Transport.start();
    }
  );
}