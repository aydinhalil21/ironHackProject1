class Obstacle2 {
    constructor(gameScreen, left, top, height, width) {
      this.gameScreen = gameScreen
      this.left = left
      this.top = top;
      this.height = height
      this.width = width
      this.element2 = document.createElement('img')
  
      this.element2.src = '../images/enemy2.png'
  
      this.element2.style.position = 'absolute'
      this.element2.style.left = `${this.left}px`
      this.element2.style.top = `${this.top}px`
      this.element2.style.height = `${this.height}px`
      this.element2.style.width = `${this.width}px`
  
      this.gameScreen.appendChild(this.element2)
    }
  
    move() {
      this.updatePosition()
      this.element2.style.left = `${this.left}px`
    }
  
    updatePosition() {
      this.left -= 1
    }
  }