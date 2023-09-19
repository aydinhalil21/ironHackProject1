class Obstacle {
    constructor(gameScreen, left, top, height, width) {
      this.gameScreen = gameScreen
      this.left = left
      this.top = top;
      this.height = height
      this.width = width
      this.element = document.createElement('img')
  
      this.element.src = '../images/enemy.png'
  
      this.element.style.position = 'absolute'
      this.element.style.left = `${this.left}px`
      this.element.style.top = `${this.top}px`
      this.element.style.height = `${this.height}px`
      this.element.style.width = `${this.width}px`
  
      this.gameScreen.appendChild(this.element)
    }
  
    move() {
      this.updatePosition()
      this.element.style.left = `${this.left}px`
    }
  
    updatePosition() {
      this.left -= 1
    }
    didCollide(obstacle) {
      const obsRect = this.element.getBoundingClientRect()
      const obstacle2Rect = obstacle2.element.getBoundingClientRect()
  
      if (
        obsRect.left < obstacle2Rect.right &&
        obsRect.right > obstacle2Rect.left &&
        obsRect.top < obstacle2Rect.bottom &&
        obsRect.bottom > obstacle2Rect.top
      ) {
        return true
      } else {
        return false
      }
    }
  }