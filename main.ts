namespace SpriteKind {
    export const Jet = SpriteKind.create()
    export const Scenery = SpriteKind.create()
}
scene.onHitWall(SpriteKind.Player, function (sprite, location) {
    game.over(false)
})
function makeFakeBuilding () {
    for (let value of tiles.getTilesByType(assets.tile`myTile5`)) {
        hallway = sprites.create(assets.image`myImage7`, SpriteKind.Scenery)
        tiles.placeOnTile(hallway, tiles.getTileLocation(value.column, value.row))
        hallway.y += 8
        Render.setZOffset(hallway, 0)
    }
    tiles.replaceAllTiles(assets.tile`myTile5`, assets.tile`transparency16`)
    for (let value of tiles.getTilesByType(assets.tile`myTile6`)) {
        hallway = sprites.create(assets.image`myImage8`, SpriteKind.Scenery)
        tiles.placeOnTile(hallway, tiles.getTileLocation(value.column, value.row))
        hallway.y += 8
        Render.setZOffset(hallway, 0)
    }
    tiles.replaceAllTiles(assets.tile`myTile6`, assets.tile`transparency16`)
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
mySprite.setVelocity(0, -50)
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
    info.setScore(float)
})
