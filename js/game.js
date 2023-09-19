class Game {
  constructor() {
    this.startScreen = document.getElementById('game-intro')
    this.gameScreen = document.getElementById('game-screen')
    this.gameEndScreen = document.getElementById('game-end')
    this.height = 600
    this.width = 1000
    this.player = new Player(this.gameScreen, 230, 550, 80, 40)
    this.obstacles = []
    this.obstacles2 = []



    this.animateId = 0
    this.score = 0
    this.lives = 3
    this.gameOver = false
  }

  start() {
    this.startScreen.style.display = 'none'
    this.gameEndScreen.style.display = 'none'
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
          1200, Math.random() * (this.gameScreen.clientHeight - 40) + 50,

          80,
          40
        )

      )
      

    }


    document.getElementById('score').innerText = this.score
    document.getElementById('lives').innerText = this.lives

    if (this.lives < 1) {
      this.gameOver = true
    }

    if (this.gameOver) {
      this.gameScreen.style.display = 'none'
      this.gameEndScreen.style.display = 'block'
    } else {
      this.animateId = requestAnimationFrame(() => this.gameLoop())
    }
  }
  shoot() {
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