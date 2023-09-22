class Obstacle2 {
    constructor(gameScreen, left, top, height, width) {
      this.gameScreen = gameScreen
      this.left = left
      this.top = top;
      this.height = height
      this.width = width
      this.element = document.createElement('img')
  
      this.element.src = 'images/enemy2.png'
  
      this.element.style.position = 'absolute'
      this.element.style.left = `${this.left}px`
      this.element.style.top = `${this.top}px`
      this.element.style.height = `${this.height}px`
      this.element.style.width = `${this.width}px`
  
      this.gameScreen.appendChild(this.element)
    }
  
    move() {
      this.left += 3
      this.updatePosition()
      
    }
  
    updatePosition() {
      this.element.style.left = `${this.left}px`
    }
    didCollide(obstacle) {
      const playerRect = this.element.getBoundingClientRect()
      const obstacleRect = obstacle.element.getBoundingClientRect()
  
      if (
        playerRect.left < obstacleRect.right &&
        playerRect.right > obstacleRect.left &&
        playerRect.top < obstacleRect.bottom &&
        playerRect.bottom > obstacleRect.top
      ) {
        return true
      } else {
        return false
      }
    } 
    
  }