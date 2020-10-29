input.onButtonPressed(Button.A, function () {
    game.pause()
    basic.showString("" + (game.score()))
    game.resume()
})
input.onButtonPressed(Button.B, function () {
    game.pause()
    basic.showString("" + (life))
    game.resume()
})
let life = 0
life = 5
let PM = game.createSprite(2, 2)
let food = game.createSprite(4, 4)
let ghost = game.createSprite(0, 0)
food.set(LedSpriteProperty.Blink, 4)
ghost.set(LedSpriteProperty.Brightness, 4)
while (life > 0) {
    basic.pause(400)
    basic.pause(400)
    if (ghost.get(LedSpriteProperty.X) < PM.get(LedSpriteProperty.X)) {
        ghost.change(LedSpriteProperty.X, 1)
    } else if (ghost.get(LedSpriteProperty.X) > PM.get(LedSpriteProperty.X)) {
        ghost.change(LedSpriteProperty.X, -1)
    } else if (ghost.get(LedSpriteProperty.Y) < PM.get(LedSpriteProperty.Y)) {
        ghost.change(LedSpriteProperty.Y, 1)
    } else if (ghost.get(LedSpriteProperty.Y) > PM.get(LedSpriteProperty.Y)) {
        ghost.change(LedSpriteProperty.Y, -1)
    }
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
game.gameOver()
ghost.set(LedSpriteProperty.X, 4)
