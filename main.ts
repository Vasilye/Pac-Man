function respawn () {
    if (PM.get(LedSpriteProperty.X) == ghost.get(LedSpriteProperty.X) && PM.get(LedSpriteProperty.Y) == ghost.get(LedSpriteProperty.Y)) {
        basic.showLeds(`
            # . . . #
            . # . # .
            . . # . .
            . # . # .
            # . . . #
            `)
        life += -1
        food.set(LedSpriteProperty.X, randint(0, 5))
        food.set(LedSpriteProperty.Y, randint(0, 5))
        if (food.get(LedSpriteProperty.X) < 2 && food.get(LedSpriteProperty.Y) < 2) {
            ghost.set(LedSpriteProperty.X, 4)
            ghost.set(LedSpriteProperty.Y, 4)
        } else if (food.get(LedSpriteProperty.X) > 2 && food.get(LedSpriteProperty.Y) < 2) {
            ghost.set(LedSpriteProperty.X, 0)
            ghost.set(LedSpriteProperty.Y, 4)
        } else if (food.get(LedSpriteProperty.X) < 2 && food.get(LedSpriteProperty.Y) > 2) {
            ghost.set(LedSpriteProperty.X, 4)
            ghost.set(LedSpriteProperty.Y, 0)
        } else {
            ghost.set(LedSpriteProperty.X, 0)
            ghost.set(LedSpriteProperty.Y, 0)
        }
    }
}
input.onButtonPressed(Button.A, function () {
    game.pause()
    basic.showString("" + (life))
    game.resume()
})
function motiongg () {
    if (input.acceleration(Dimension.X) > 100) {
        PM.change(LedSpriteProperty.X, 1)
    } else if (input.acceleration(Dimension.X) < -100) {
        PM.change(LedSpriteProperty.X, -1)
    }
    if (input.acceleration(Dimension.Y) > 100) {
        PM.change(LedSpriteProperty.Y, 1)
    } else if (input.acceleration(Dimension.Y) < -100) {
        PM.change(LedSpriteProperty.Y, -1)
    }
}
function EatAndRespawn () {
    if (PM.get(LedSpriteProperty.X) == food.get(LedSpriteProperty.X) && PM.get(LedSpriteProperty.Y) == food.get(LedSpriteProperty.Y)) {
        game.addScore(1)
        food.set(LedSpriteProperty.X, randint(0, 5))
        food.set(LedSpriteProperty.Y, randint(0, 5))
        if (food.get(LedSpriteProperty.X) < 2 && food.get(LedSpriteProperty.Y) < 2) {
            ghost.set(LedSpriteProperty.X, 4)
            ghost.set(LedSpriteProperty.Y, 4)
        } else if (food.get(LedSpriteProperty.X) > 2 && food.get(LedSpriteProperty.Y) < 2) {
            ghost.set(LedSpriteProperty.X, 0)
            ghost.set(LedSpriteProperty.Y, 4)
        } else if (food.get(LedSpriteProperty.X) < 2 && food.get(LedSpriteProperty.Y) > 2) {
            ghost.set(LedSpriteProperty.X, 4)
            ghost.set(LedSpriteProperty.Y, 0)
        } else {
            ghost.set(LedSpriteProperty.X, 0)
            ghost.set(LedSpriteProperty.Y, 0)
        }
    }
}
function spawn () {
    life = 5
    PM = game.createSprite(2, 2)
    food = game.createSprite(4, 4)
    ghost = game.createSprite(0, 0)
    food.set(LedSpriteProperty.Blink, 4)
    ghost.set(LedSpriteProperty.Brightness, 4)
}
input.onButtonPressed(Button.B, function () {
    game.pause()
    basic.showString("" + (game.score()))
    game.resume()
})
function ghostMotion () {
    if (ghost.get(LedSpriteProperty.X) < PM.get(LedSpriteProperty.X)) {
        ghost.change(LedSpriteProperty.X, 1)
    } else if (ghost.get(LedSpriteProperty.X) > PM.get(LedSpriteProperty.X)) {
        ghost.change(LedSpriteProperty.X, -1)
    } else if (ghost.get(LedSpriteProperty.Y) < PM.get(LedSpriteProperty.Y)) {
        ghost.change(LedSpriteProperty.Y, 1)
    } else if (ghost.get(LedSpriteProperty.Y) > PM.get(LedSpriteProperty.Y)) {
        ghost.change(LedSpriteProperty.Y, -1)
    }
}
let food: game.LedSprite = null
let ghost: game.LedSprite = null
let PM: game.LedSprite = null
let life = 0
spawn()
while (life > 0) {
    basic.pause(400)
    basic.pause(400)
    motiongg()
    ghostMotion()
    EatAndRespawn()
    respawn()
}
game.gameOver()
