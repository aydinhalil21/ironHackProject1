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
      this.gameLoopProjectile()
    }
  
    gameLoop() {
      this.update()
  
      if (this.animateId % 500 === 0) {
        this.obstacles.push(
          new Obstacle(
            this.gameScreen,
            1200,Math.random() * (this.gameScreen.clientHeight-40) + 50,
            
            80,
            40
          )

        )
        const playerRect = this.player.element.getBoundingClientRect()
        document.addEventListener('keydown', event => {
          console.log('down', event)
          if (event.code === 'Space' ) {
            this.obstacles2.push(
              new Obstacle2(
                this.gameScreen,
                playerRect.left-250,playerRect.top,
                 
                15,
                30
              )
              
            )
          } 
          
         
        })
        
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
  
    update() {
      this.player.move()
      
      console.log(this.obstacles)
      const nextObstacles = []
      console.log(this.obstacles2)
      const nextObstacles2 = []
      this.obstacles.forEach(obstacle => {
        obstacle.move()
        if (this.player.didCollide(obstacle)) {
          this.lives -= 1
          obstacle.element.remove()
        } else if (obstacle.top > this.gameScreen.clientHeight) {
          this.score += 1
          obstacle.element.remove()
        } else {
          nextObstacles.push(obstacle)
        }
      })
      this.obstacles2.forEach(obstacle2 => {
        obstacle2.move()
        if (this.player.didCollide(obstacle2)) {
          this.lives -= 1
          obstacle2.element.remove()
        } else if (obstacle2.top > this.gameScreen.clientHeight) {
          this.score += 1
          obstacle2.element.remove()
        } else {
          nextObstacles2.push(obstacle2)
        }
      })
      this.obstacles = nextObstacles
      this.obstacles2 = nextObstacles2
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