window.addEventListener('load', () => {
  const startButton = document.getElementById('start-button')
  const restartButton = document.getElementById('restart-button')
  const restartButtonWon = document.getElementById('restart-buttonWon')
  const audio = document.getElementById('myAudio');
  const playButton = document.getElementById('playButton');
  const pauseButton = document.getElementById('pauseButton');
  const easyButton = document.getElementById('easy-button')
    const mediumButton = document.getElementById('medium-button')
    const hardButton = document.getElementById('hard-button')
  
    easyButton.addEventListener('click', () => {
      
      game = new Game()
      game.easy()
      
    });
    mediumButton.addEventListener('click', () => {
      game = new Game()
      game.medium()
    });
    hardButton.addEventListener('click', () => {
      game = new Game()
      game.hard()
    });  
  playButton.addEventListener('click', () => {
    audio.play();
    audio.style.display = 'none'; });

  

  pauseButton.addEventListener('click', () => {
    audio.pause();
    audio.style.display = 'none';
  });

  let game

  function startGame() {
    console.log('start game')
    game = new Game()
    game.start()
  }
  function restartGame() {
    console.log('start game')
    game = new Game()
    game.restart()
  }

  startButton.addEventListener('click', function () {
    startGame()
  })

  restartButton.addEventListener('click', function () {
    game.player.element.remove()
    restartGame()
  })
  restartButtonWon.addEventListener('click', function () {
    game.player.element.remove()
    restartGame()
  })
  

  document.addEventListener('keydown', event => {
    console.log('down', event)
    if (event.code === 'KeyA' || event.code === 'ArrowLeft') {
      game.player.directionX = -1
    } else if (event.code === 'KeyD' || event.code === 'ArrowRight') {
      game.player.directionX = 1
    }
    if (event.code === 'KeyW' || event.code === 'ArrowUp') {
      game.player.directionY = -1
    } else if (event.code === 'KeyS' || event.code === 'ArrowDown') {
      game.player.directionY = 1
    }
    if (event.code === 'Space' ) {
      game.shoot()
    } 
   
  })

  document.addEventListener('keyup', event => {
    console.log('up', event)
    if (
      event.code === 'KeyA' ||
      event.code === 'KeyD' ||
      event.code === 'ArrowLeft' ||
      event.code === 'ArrowRight'
    ) {
      game.player.directionX = 0
    }
    if (event.code === 'KeyW' || event.code === 'ArrowUp' || event.code === 'KeyS' || event.code === 'ArrowDown') {
      game.player.directionY = 0
    }
  })
})