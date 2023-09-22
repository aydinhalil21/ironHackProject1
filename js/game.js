class Game {
  constructor() {
    this.startScreen = document.getElementById('game-intro')
    this.gameScreen = document.getElementById('game-screen')
    this.gameEndScreen = document.getElementById('game-end')
    this.gameWonScreen = document.getElementById('game-won')
    const easyButton = document.getElementById('easy-button')
    const mediumButton = document.getElementById('medium-button')
    const hardButton = document.getElementById('hard-button')
    this.level = 15;
    
   

    this.blaster = document.getElementById('myAudioBlaster');
    this.height = 600
    this.width = 1000
    this.player = new Player(this.gameScreen, 230, 550, 80, 40)
    this.obstacles = []
    this.obstacles2 = []
    this.heart = []



    this.animateId = 0
    this.score = 0
    this.lives = 3
    this.gameOver = false
    this.gameWon = false
  }
    
  easy(){
    this.startScreen.style.display = 'none'
    this.gameEndScreen.style.display = 'none'
    this.gameWonScreen.style.display = 'none'
    this.gameScreen.style.display = 'block'

    this.gameScreen.style.height = `${this.height}px`
    this.gameScreen.style.width = `${this.width}px`
    this.level = 25;

    this.gameLoop()
  }
  medium(){
    this.startScreen.style.display = 'none'
    this.gameEndScreen.style.display = 'none'
    this.gameWonScreen.style.display = 'none'
    this.gameScreen.style.display = 'block'

    this.gameScreen.style.height = `${this.height}px`
    this.gameScreen.style.width = `${this.width}px`
    this.level = 35;

    this.gameLoop()
  }
  hard(){
    this.startScreen.style.display = 'none'
    this.gameEndScreen.style.display = 'none'
    this.gameWonScreen.style.display = 'none'
    this.gameScreen.style.display = 'block'

    this.gameScreen.style.height = `${this.height}px`
    this.gameScreen.style.width = `${this.width}px`
    this.level = 50;

    this.gameLoop()
  }
  restart() {
    this.startScreen.style.display = 'block'
    this.gameEndScreen.style.display = 'none'
    this.gameWonScreen.style.display = 'none'
    this.gameScreen.style.display =  'none'

    
  }

  start() {
    this.startScreen.style.display = 'none'
    this.gameEndScreen.style.display = 'none'
    this.gameWonScreen.style.display = 'none'
    this.gameScreen.style.display = 'block'

    this.gameScreen.style.height = `${this.height}px`
    this.gameScreen.style.width = `${this.width}px`

    this.gameLoop()

  }

  gameLoop() {
    this.update()
    

    if (this.animateId % 500 === 0) {
      this.obstacles.push(
        new Obstacle(
          this.gameScreen,
          1200, Math.random() * (this.gameScreen.clientHeight+80 ) + 80,

          80,
          40
        )

      )
      

    }
    if (this.score > 0  ) {
      this.heart.push(
        new Heart(
          this.gameScreen,
          1200, Math.random() * (this.gameScreen.clientHeight+80 ) + 80,

          40,
          40
        )

      )
      
    }


    document.getElementById('score').innerText = this.score
    document.getElementById('lives').innerText = this.lives

    if (this.lives < 1  ) {
      this.gameOver = true
    }
    if (this.score >= this.level  ) {
      this.gameWon = true
    }
    

    if (this.gameOver) {
      this.gameEndScreen.style.display = 'block'
    this.gameWonScreen.style.display = 'none'
    this.gameScreen.style.display = 'none'
    } else if(this.gameWon){
      this.gameEndScreen.style.display = 'none'
    this.gameWonScreen.style.display = 'block'
    this.gameScreen.style.display = 'none'

    }
    else {
      this.animateId = requestAnimationFrame(() => this.gameLoop())
    }
  }
  shoot() {
    function playSound() {
      let audio = new Audio("./sound/blaster.mp3");
      audio.play();
  }
    playSound();
    const playerRect = this.player.element.getBoundingClientRect()
    this.obstacles2.push(
      new Obstacle2(
        this.gameScreen,
        playerRect.left-190 , playerRect.top,

        15,
        30
      )

    )
  }
  update() {
    this.player.move()

    //console.log(this.obstacles)
    const nextObstacles = []
    //console.log(this.obstacles2)

    const nextObstacles2 = []
    this.obstacles2.forEach(obstacle => {
      obstacle.move();
    })
    /*this.obstacles.forEach(obstacle => {
      obstacle.move()
      if (this.player.didCollide(obstacle)) {
        this.lives -= 1
        obstacle.element.remove()
      } else if (obstacle.left <= 0) {
        this.score += 1
        obstacle.element.remove()
      } else {
        nextObstacles.push(obstacle)
      }
      this.obstacles2.forEach(obstacle2 => {

        if (obstacle2.didCollide(obstacle)) {
          this.score += 5
          obstacle2.element.remove()
          obstacle.element.remove()
        } else if (obstacle2.left > this.gameScreen.clientWidth) {

          obstacle2.element.remove()

        } else {
          nextObstacles2.push(obstacle2)
        }
      })
    })*/
    const obstaclesToKeep = this.obstacles2.map(element=>element);
    for(let i=0;i<this.obstacles.length;i++){
      let obstacle = this.obstacles[i];
      obstacle.move();
      if (this.player.didCollide(obstacle)) {
        this.lives -= 1
        obstacle.element.remove()
        this.obstacles.splice(i,1);
        i -= 1;
      } else if (obstacle.left <= 0) {
        this.score += 1
        obstacle.element.remove()
        this.obstacles.splice(i,1);
        i -= 1;
      }
      this.obstacles2.forEach((obstacle2,index) => {
        if (obstacle2.didCollide(obstacle)) {
          this.score += 5
          obstacle2.element.remove()
          obstacle.element.remove()
          obstaclesToKeep.splice(index,1);
          this.obstacles.splice(i,1);
        i -= 1;
          
        } else if (obstacle2.left > this.gameScreen.clientWidth) {

          obstacle2.element.remove()
          obstaclesToKeep.splice(index,1);

        } 
      }) 

      this.obstacles2 = obstaclesToKeep;
    }

    
  }
}
/*class projectile{
  this.fire = fire[];
  gameLoopProjectile() {
    this.updateProjectile()
    this.fire.push(
      this.gameScreen,
          1200,Math.random() * (this.gameScreen.clientHeight-80) + 50,
          
          80,
          40
      

    )
  }
  updateProjectile(){
    this.fire.move();

  }
}*/