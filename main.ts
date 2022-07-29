namespace SpriteKind {
    export const Jet = SpriteKind.create()
}
scene.onHitWall(SpriteKind.Player, function (sprite, location) {
    game.over(false)
})
function makeHallways () {
    for (let value of tiles.getTilesByType(assets.tile`myTile2`)) {
        hallway = sprites.create(assets.image`myImage4`, SpriteKind.Player)
        tiles.placeOnTile(hallway, tiles.getTileLocation(value.column, value.row))
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
        transformSprites.rotateSprite(jet, 0)
    }
    if (controller.up.isPressed()) {
        if (float < 18) {
            jet.setImage(assets.image`myImage1`)
            float += 1
        } else {
            jet.setImage(assets.image`myImage`)
        }
    } else if (controller.down.isPressed()) {
        if (float > -7) {
            jet.setImage(assets.image`myImage0`)
            float += -1
        } else {
            jet.setImage(assets.image`myImage`)
        }
    }
    Render.setZOffset(mySprite, float)
    info.setScore(float)
})
