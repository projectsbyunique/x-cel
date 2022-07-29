namespace SpriteKind {
    export const Jet = SpriteKind.create()
    export const Scenery = SpriteKind.create()
    export const e_bullet_spawn = SpriteKind.create()
}
function makeFakeBuilding () {
    for (let value of tiles.getTilesByType(assets.tile`myTile5`)) {
        hallway = sprites.create(assets.image`myImage7`, SpriteKind.Scenery)
        tiles.placeOnTile(hallway, tiles.getTileLocation(value.column, value.row))
        hallway.y += 8
        Render.setZOffset(hallway, -1)
    }
    tiles.replaceAllTiles(assets.tile`myTile5`, assets.tile`transparency16`)
    for (let value of tiles.getTilesByType(assets.tile`myTile6`)) {
        hallway = sprites.create(assets.image`myImage8`, SpriteKind.Scenery)
        tiles.placeOnTile(hallway, tiles.getTileLocation(value.column, value.row))
        hallway.y += 8
        Render.setZOffset(hallway, -1)
    }
    tiles.replaceAllTiles(assets.tile`myTile6`, assets.tile`transparency16`)
    for (let value of tiles.getTilesByType(assets.tile`myTile7`)) {
        hallway = sprites.create(assets.image`car30`, SpriteKind.Scenery)
        tiles.placeOnTile(hallway, tiles.getTileLocation(value.column, value.row))
        scaling.scaleToPercent(hallway, 50, ScaleDirection.Uniformly, ScaleAnchor.Bottom)
        Render.setZOffset(hallway, -1)
    }
    tiles.replaceAllTiles(assets.tile`myTile7`, assets.tile`transparency16`)
    for (let value of tiles.getTilesByType(assets.tile`myTile13`)) {
        ENEMY_BULLET_SPAWNER = sprites.create(assets.image`myImage9`, SpriteKind.e_bullet_spawn)
        tiles.placeOnTile(ENEMY_BULLET_SPAWNER, tiles.getTileLocation(value.column, value.row))
        scaling.scaleToPercent(ENEMY_BULLET_SPAWNER, 200, ScaleDirection.Uniformly, ScaleAnchor.Bottom)
        Render.setZOffset(ENEMY_BULLET_SPAWNER, -1)
    }
    tiles.replaceAllTiles(assets.tile`myTile13`, assets.tile`transparency16`)
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Player, function (sprite, otherSprite) {
    statusbar.value += -5
    sprite.destroy()
})
function makeHallways () {
    for (let value of tiles.getTilesByType(assets.tile`myTile2`)) {
        hallway = sprites.create(assets.image`myImage4`, SpriteKind.Scenery)
        tiles.placeOnTile(hallway, tiles.getTileLocation(value.column, value.row))
        hallway.y += 8
        Render.setZOffset(hallway, 16)
        animation.runImageAnimation(
        hallway,
        assets.animation`myAnim`,
        200,
        true
        )
    }
    tiles.replaceAllTiles(assets.tile`myTile2`, assets.tile`transparency16`)
}
statusbars.onZero(StatusBarKind.Health, function (status) {
	
})
scene.onHitWall(SpriteKind.Projectile, function (sprite, location) {
    music.bigCrash.play()
    sprite.destroy()
})
let mySprite2: Sprite = null
let projectile: Sprite = null
let ENEMY_BULLET_SPAWNER: Sprite = null
let hallway: Sprite = null
let statusbar: StatusBarSprite = null
let float = 7
let mySprite = Render.getRenderSpriteVariable()
scaling.scaleToPercent(mySprite, 1, ScaleDirection.Uniformly, ScaleAnchor.Middle)
tiles.setCurrentTilemap(tilemap`level`)
scene.setBackgroundImage(assets.image`cityscape`)
Render.setAttribute(Render.attribute.wallZScale, 2)
Render.setViewAngleInDegree(-90)
tiles.placeOnTile(mySprite, tiles.getTileLocation(8, 48))
mySprite.x += -8
let jet = sprites.create(assets.image`myImage`, SpriteKind.Jet)
jet.setFlag(SpriteFlag.RelativeToCamera, true)
Render.moveWithController(0, 0)
statusbar = statusbars.create(20, 4, StatusBarKind.Health)
makeHallways()
makeFakeBuilding()
game.onUpdate(function () {
    if (controller.left.isPressed()) {
        jet.setImage(assets.image`myImage2`)
        mySprite.ax = -50
    } else if (controller.right.isPressed()) {
        jet.setImage(assets.image`myImage3`)
        mySprite.ax = 50
    } else {
        jet.setImage(assets.image`myImage`)
        mySprite.vx = mySprite.vx * 0.8
    }
    if (controller.up.isPressed()) {
        if (float < 30) {
            jet.setImage(assets.image`myImage1`)
            float += 1
        } else {
            jet.setImage(assets.image`myImage`)
        }
    } else if (controller.down.isPressed()) {
        if (float > 6) {
            jet.setImage(assets.image`myImage0`)
            float += -1
        } else {
            jet.setImage(assets.image`myImage`)
        }
    }
    Render.setZOffset(mySprite, float)
    mySprite.vy = -50
    info.setScore(float)
})
forever(function () {
    if (controller.A.isPressed()) {
        timer.throttle("action", 200, function () {
            music.pewPew.play()
            projectile = sprites.createProjectileFromSprite(assets.image`explosion1`, Render.getRenderSpriteInstance(), Render.getAttribute(Render.attribute.dirX) * 80, Render.getAttribute(Render.attribute.dirY) * 55)
            projectile.y += -50
        })
    }
})
forever(function () {
	
})
forever(function () {
    if (!(sprites.allOfKind(SpriteKind.e_bullet_spawn).length == 0)) {
        for (let value of sprites.allOfKind(SpriteKind.e_bullet_spawn)) {
            mySprite2 = sprites.create(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . 2 2 . . . . . . . 
                . . . . . . 3 1 1 3 . . . . . . 
                . . . . . 2 1 1 1 1 2 . . . . . 
                . . . . . 2 1 1 1 1 2 . . . . . 
                . . . . . . 3 1 1 3 . . . . . . 
                . . . . . . . 2 2 . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, SpriteKind.Projectile)
            Render.setZOffset(mySprite2, 10)
            mySprite2.setPosition(value.x, value.y)
            mySprite2.follow(mySprite, 100)
            pause(100)
        }
    }
})
