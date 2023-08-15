/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Event } from 'power-helper'
import { LongTake, Loader, Sprite, ImageSprite, TextSprite, Animate } from 'longtake'

const width = 1600
const height = 1024
const loader = new Loader()

loader.add('bg', '/images/snow-mountain.jpg')
loader.add('move', '/images/move.png')
loader.add('move-car', '/images/move-car.png')
loader.add('success', 'images/success.png')
loader.add('dog-hat', '/images/dog-hat.png')
loader.add('fail', '/images/fail.png')
loader.start()

class MoveDog extends Sprite {
    oriX = 0
    oriY = 0
    aniNow = 0
    success = true
    event = new Event<{
        done: any
    }>()

    animate = new Animate({
        duration: 2000,
        easing: 'easeInQuart',
        action: (t) => {
            this.x = this.oriX - ((this.oriX - 200) * t)
            this.y = this.oriY - ((this.oriY - (height + this.height / 1.2)) * t)
            this.scale(0.1 + (t / 6), 0.1 + (t / 6))
            this.aniNow = t
        }
    })

    constructor(success: boolean) {
        super()
        const move = new ImageSprite(loader.get('move')!)
        const moveCar = new ImageSprite(loader.get('move-car')!)
        move.setAnchor(0.5)
        moveCar.setAnchor(0.5)
        moveCar.y = 200
        this.success = success
        this.setAnchor(0.5)
        this.addChildren(moveCar)
        this.addChildren(move)
        this.scale(0.1, 0.1)
        this.x = width - this.width - 100
        this.y = height / 1.75
        this.oriX = this.x
        this.oriY = this.y
    }

    update() {
        this.animate.move()
        if (this.success === false && this.aniNow >= 0.4) {
            this.remove()
            this.event.emit('done', {})
        } else {
            if (this.animate.over) {
                this.remove()
                setTimeout(() => this.event.emit('done', {}), 500)
            }
        }
    }
}

class Hat extends ImageSprite {
    text = new TextSprite({
        padding: 30,
        fontSize: 72,
        fontFamily: 'myfont',
        color: '#fff',
        stroke: {
            color: 'red',
            lineJoin: 'round',
            lineWidth: 6
        }
    })

    offsetY = 200
    animate = new Animate({
        duration: 250,
        easing: 'easeInQuart',
        action: (_t, d) => {
            this.offsetY = 200 * d
        }
    })

    constructor(number: number) {
        super(loader.get('dog-hat')!)
        this.scale(-1.5, 1.5)
        this.x = this.width * 1.5
        this.y = -125
        this.text.scaleWidth = -1
        this.text.setContent(number.toString())
        this.text.setAnchor(0.5)
        this.text.x = this.width / 2
        this.text.y = this.height / 2 - 25
        this.addChildren(this.text)
    }

    update() {
        this.animate.move()
        this.y = -125 - this.offsetY
    }
}

class FailDog extends ImageSprite {
    oriX = 0
    oriY = 0
    animate = new Animate({
        duration: 1250,
        easing: 'easeOutExpo',
        action: (t) => {
            this.x = this.oriX - t * 80
            this.y = this.oriY + t * 80
        }
    })

    constructor(x: number, y: number) {
        super(loader.get('fail')!)
        this.scale(0.13, 0.13)
        this.x = x
        this.y = y
        this.oriX = this.x
        this.oriY = this.y
        this.rotation -= 20
        this.setAnchor(0.5, 0.5)
    }

    update() {
        this.animate.move()
    }
}

class SuccessDog extends ImageSprite {
    animate = new Animate({
        duration: 1000,
        easing: 'easeOutElastic',
        action: (t) => {
            this.y = height - this.height * t
        }
    })

    constructor(number: number) {
        super(loader.get('success')!)
        this.y = height
        this.x = width / 2 - this.width / 2
        this.addChildren(new Hat(number))
    }

    update() {
        this.animate.move()
    }
}

export const createAnimate = (el: HTMLCanvasElement, number = 0) => {
    el.width = width
    el.height = height
    const longtake = new LongTake(el, width, height)
    loader.onload(() => {
        const bg = new ImageSprite(loader.get('bg')!)
        longtake.addChildren(bg)
        const moveDog = new MoveDog(number >= 0)
        longtake.addChildren(moveDog)
        moveDog.event.on('done', () => {
            if (number < 0) {
                const failText = new TextSprite({
                    fontSize: 96,
                    padding: 30,
                    color: 'red',
                    fontFamily: 'myfont',
                    stroke: {
                        color: '#fff',
                        lineJoin: 'round',
                        lineWidth: 12
                    }
                })
                failText.x = width / 2
                failText.y = 200
                failText.setAnchor(0.5)
                failText.setContent('銘謝惠顧')
                longtake.addChildren(new FailDog(moveDog.x, moveDog.y))
                longtake.addChildren(failText)
            } else {
                longtake.addChildren(new SuccessDog(number + 1))
            }
        })
    })
    return {
        close: () => {
            longtake.close()
        }
    }
}
