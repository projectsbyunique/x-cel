namespace SpriteKind {
    export const Jet = SpriteKind.create()
    export const Scenery = SpriteKind.create()
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
}
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
scene.onHitWall(SpriteKind.Projectile, function (sprite, location) {
    music.bigCrash.play()
})
let projectile: Sprite = null
let hallway: Sprite = null
let float = 7
let mySprite = Render.getRenderSpriteVariable()
tiles.setCurrentTilemap(tilemap`level`)
scene.setBackgroundImage(assets.image`cityscape`)
Render.setAttribute(Render.attribute.wallZScale, 2)
Render.setViewAngleInDegree(-90)
tiles.placeOnTile(mySprite, tiles.getTileLocation(8, 49))
let jet = sprites.create(assets.image`myImage`, SpriteKind.Jet)
let textSprite = textsprite.create("aSasa")
textSprite.setPosition(80, 60)
jet.setFlag(SpriteFlag.RelativeToCamera, true)
Render.moveWithController(0, 0)
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
        if (float < 18) {
            jet.setImage(assets.image`myImage1`)
            float += 1
        } else {
            jet.setImage(assets.image`myImage`)
        }
    } else if (controller.down.isPressed()) {
        if (float > -4) {
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
            Render.setZOffset(projectile, float)
            projectile.y += -50
        })
    }
})
