// steps for making a phaser based game

// 1. define global variables
let myGame;
let gameWidth=390, gameHeight=844;
let tileWidth=50, tileHeight=50, tileTextFill="#000", tileTextStroke="#fff", tileBgColor="transparent";
let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ ";
let motif_bottom, bricks, guesses, circle, startAngle, endAngle;
let scoreObject, questionObject;
let scoreValue=0, level=0, questionNum=0, guessCounter=0, guessWord="";
let questionAnswer = [ 
  {
  	questions: [
	  {
		question: "Deep-fried Portguese treat",
		answer: "MALASADA"
	  },
	  {
		question: "Tuna salad",
		answer: "POKE"
	  },
	  {
		question: "Hawaiian smoothie purveyor",
		answer: "GOVINDA"
	  }
  	]
  },
  {
  	questions: [
	  {
		question: "Deep-fried Portguese treat",
		answer: "MALASADA"
	  },
	  {
		question: "Tuna salad",
		answer: "POKE"
	  },
	  {
		question: "Hawaiian smoothie purveyor",
		answer: "GOVINDA"
	  }
  	]
  },
  {
  	questions: [
	  {
		question: "Deep-fried Portguese treat",
		answer: "MALASADA"
	  },
	  {
		question: "Tuna salad",
		answer: "POKE"
	  },
	  {
		question: "Hawaiian smoothie purveyor",
		answer: "GOVINDA"
	  }
  	]
  }
];

// 2. defining a set of game configuration properties to pass those values to the phaser game engine later on when we create a new Phaser.Game object
let config = {
  type: Phaser.WEBGL,
  width: gameWidth,
  height: gameHeight,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  },
  scene: {
    preload: myPreload,
    create: myCreate,
    update: myUpdate
  }
};

// 3. request webfont load, upon success, create a new phaser game object and pass the config properties to Phaser
//
WebFont.load({
  /*
  google: {
    families: [ 'Freckle Face' ]
  },
  */
  custom: {
    families: [ 'Freckle Face', 'Jacquarda Bastarda' ]
  },
  active: function() {
    // fonts loaded, start game
    myGame = new Phaser.Game( config );
  },
  inactive: function() {
    // fonts could not be loaded, start game anyway
    myGame = new Phaser.Game( config );
  }
});

// 4. functions to successfully create a single scene: preload, create, update
function myPreload() {
  this.load.image( 'brick', 'assets/brick.png' );
  this.load.image( 'plumeria-top', 'assets/plumeria-flower-8.png' );
  this.load.image( 'plumeria-bottom', 'assets/plumeria-pistal-8.png' );
  this.load.image( 'sign', 'assets/sign-8.png' );
  this.load.image( 'scoreboard', 'assets/wreath-8.png' );
  this.load.image( 'tiki1', 'assets/tiki1-8.png' );
  this.load.image( 'tiki2', 'assets/tiki2-8.png' );
  createLetterTextures(this);
}

function myCreate() {
  let r, c;

  // set background for game stage
  this.cameras.main.setBackgroundColor('#0D6C38');

  // set up central motif top
  motif_top = this.physics.add.image( gameWidth/2, gameHeight/2, 'plumeria-top' );

  // set up animating letter bricks
  bricks = this.physics.add.group(
    {
      key: 'text- ',
      quantity: 10,
      x: -100,
      y: -100 
    }
  );
  for(c=0; c<10; c++) {
    r=Phaser.Math.Between(0, 25);
    bricks.children.entries[c].setTexture( 'text-' + letters.charAt(r) );
    bricks.children.entries[c].setState( letters.charAt(r) );
    bricks.children.entries[c].setInteractive();
  }
  this.input.on('gameobjectdown', tileTapped)

  circle = new Phaser.Geom.Circle(motif_top.x, motif_top.y, gameWidth/3);
  Phaser.Actions.SetXY([circle], motif_top.x, motif_top.y - 10);

  startAngle = this.tweens.addCounter({
    from: 0,
    to: 6.28,
    duration: 6000,
    repeat: -1
  })

  endAngle = this.tweens.addCounter({
    from: 6.28,
    to: 12.56,
    duration: 6000,
    repeat: -1
  })

  // set up central motif bottom
  motif_bottom = this.physics.add.image( gameWidth/2, gameHeight/2, 'plumeria-bottom' );

  // sign
  this.physics.add.image( gameWidth/2 - 20, gameHeight-150, 'sign' ).setDepth(-1).setScale(0.65);

  // scoreboard
  this.physics.add.image( gameWidth/2, 30, 'scoreboard' ).setDepth(-1).setScale(0.15);

  // tikis
  this.physics.add.image( 30, 40, 'tiki1' ).setDepth(-1).setScale(0.1);
  this.physics.add.image( gameWidth - 30, 40, 'tiki2' ).setDepth(-1).setScale(0.1);

  // score text object
  scoreObject = this.add.text( 0, 5, scoreValue, {
    fontSize: '24px',
    fontFamily: 'Jacquarda Bastarda',
    color: '#83C342',
    align: 'center',
    backgroundColor: 'transparent'
  } );
  scoreObject.setFixedSize(gameWidth, 50);
  scoreObject.setPadding(0, 10, 0, 0);

  // question text object
  questionObject = this.add.text( 0, 70, "", {
    fontSize: '24px',
    fontFamily: 'Jacquarda Bastarda',
    color: '#ffffff',
    align: 'center',
    backgroundColor: 'transparent'
  } );
  questionObject.setFixedSize(gameWidth, 100);

  // guesses
  guesses = this.physics.add.group(
    {
      key: 'text- ',
      quantity: 8,
      setScale: {
        x: 0.9,
        y: 0.9
      },
      gridAlign: {
        width: 8,
        height: 1,
        cellWidth: tileWidth * 0.9,
        cellHeight: tileHeight * 0.9,
        x: (gameWidth - (tileWidth * 0.9 * 8)) * 1.25,
        y: gameHeight - 150
      }
    }
  );
  for(c=0; c<8; c++) {
    guesses.children.entries[c].setState( "guess" );
    guesses.children.entries[c].setInteractive();
  }

  // start first question
  renderQuestion();
}

function myUpdate() {
  // in update if motif_bottom moves
  // Phaser.Actions.SetXY([circle], motif_bottom.x, motif_bottom.y);

  Phaser.Actions.PlaceOnCircle(
    bricks.getChildren(), 
    circle, 
    startAngle.getValue(), 
    endAngle.getValue()
  );
  
}

// 5. custom functions to respond to specific events

function renderQuestion() {
  questionObject.setText( questionAnswer[level].questions[questionNum].question );
  // reset guesses and guess counter
  resetGuesses();
  // set choices
  setChoices();
}

function resetGuesses() {
  guessCounter = 0;
  guessWord = "";
  for(let c=0; c<8; c++) {
    guesses.children.entries[c].setTexture( 'text- ' );
    guesses.children.entries[c].setState( "guess" );
  }
}

function checkGuess() {
  if (guessWord === questionAnswer[level].questions[questionNum].answer) {
    // right
    scoreValue += 10;
    updateScore();
    questionNum++;
    if (questionNum < questionAnswer[level].questions.length) {
      renderQuestion();
    } else {
      // all questions completed
    }
  } else {
    // wrong
    resetGuesses();
  }
}

function updateScore() {
  scoreObject.setText(scoreValue);
}

function setChoices() {
  let r, c, i=0, arr = [];
  // fill starting from first letters in answer
  for(c=0; c < questionAnswer[level].questions[questionNum].answer.length; c++) {
    if ( !arr.includes( questionAnswer[level].questions[questionNum].answer.charAt(c) ) ) {
      arr[i] = questionAnswer[level].questions[questionNum].answer.charAt(c);
      i++;
    }
  }
  console.log(arr);
  // fill array with random letters 
  for(c=i; c < 10; c++) {
    r = Phaser.Math.Between(0, 25);
    arr.push( letters.charAt(r) );
  }
  console.log(arr);
  // scramble swap all
  shuffle(arr);
  for(c=0; c < 10; c++) {
    bricks.children.entries[c].setTexture( 'text-' + arr[c]);
    bricks.children.entries[c].setState(arr[c]);
  }
  console.log(arr);
}

function tileTapped(pointer, gameObject) {
  console.log(gameObject.state);
  switch (gameObject.state) {
    case "guess":
      checkGuess();
      break;
    case "guessed":
      checkGuess();
      break;
    default:
      guesses.children.entries[guessCounter].setTexture("text-" + gameObject.state);
      guesses.children.entries[guessCounter].setState("guessed");
      guessWord += gameObject.state;
      console.log(guessWord);
      guessCounter++;
      if (guessCounter > 7) {
        guessCounter = 0;
      } 
  }
}

function createLetterTextures(that) {
  let text, texture;
  for (let c=0; c<letters.length; c++) {
    // create text object
    text = that.make.text({
      add: false,
      x: 0,
      y: 0,
      text: letters.charAt(c),
      style: {
        fontSize: '32px',
        fontFamily: 'Arial',
        color: tileTextFill,
        align: 'center',
        backgroundColor: tileBgColor
      }
    });
    // size and stroke text object
    text.setFixedSize(tileWidth, tileHeight);
    text.setPadding(tileWidth/10, tileHeight/8, tileWidth/10, 0);
    text.setStroke(tileTextStroke, 3);
    // save canvas bitmap of text object as a texture
    texture = that.textures.addCanvas('text-' + letters.charAt(c), text.canvas);
    // retrieve the canvas for the texture saved from the text object
    let ctx = texture.getSourceImage().getContext('2d');
    // console.log(ctx);
    // set drawing to go behind existing text
    ctx.globalCompositeOperation = 'destination-over';
    // draw a circle stroked with no fill
    ctx.beginPath();
    ctx.strokeStyle = "#FF0000";
    ctx.lineWidth = 2;
    let grad=ctx.createLinearGradient(0, 0, 170, 0);
    grad.addColorStop(0, "rgba(255,0,0,0.75)");
    grad.addColorStop(0.5, "rgba(255,255,255,0.75)");
    grad.addColorStop(1, "rgba(255,0,0,0.75)");
    ctx.fillStyle = grad;
    ctx.arc(tileWidth/2, tileHeight/2, tileHeight/2-1, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    // make sure webgl reloads the updated texture
    texture.refresh();
  }
}

// array shuffle
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

// useful resources:
// https://www.html5gamedevs.com/topic/39497-rotate-game-objects-around-a-moving-object/
// https://www.html5gamedevs.com/topic/37577-updating-existing-texture-with-canvas-content/
