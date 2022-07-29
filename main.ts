let mySprite = Render.getRenderSpriteVariable()
tiles.setCurrentTilemap(tilemap`level`)
Render.setAttribute(Render.attribute.wallZScale, 2)
Render.setViewAngleInDegree(-90)
tiles.placeOnTile(mySprite, tiles.getTileLocation(8, 49))
let cockpit = sprites.create(assets.image`myImage`, SpriteKind.Projectile)
let textSprite = textsprite.create("aSasa")
textSprite.setPosition(80, 60)
textSprite.setFlag(SpriteFlag.RelativeToCamera, true)
cockpit.setFlag(SpriteFlag.RelativeToCamera, true)
Render.moveWithController(0, 0, 0)
mySprite.setVelocity(0, -50)
game.onUpdate(function () {
    if (controller.left.isPressed()) {
        mySprite.vx = -50
    } else if (controller.right.isPressed()) {
        mySprite.vx = 50
    } else {
        mySprite.vx = 0
    }
})
