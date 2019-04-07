var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 100 }
        }
    },
    debug: true,
    scene: {
        preload: preload,
        create: create
    }
};
var camSpeed = 10;
var marker;

var scenes = { preload: preload, create: create , update: update}
var game = new Phaser.Game(1600, 1200, Phaser.AUTO, 'age-of-vegetables', scenes);


function preload ()
{
  // In order to have the camera move, we need to increase the size of our world bounds.
    game.world.setBounds(0, 0, 1600, 1200);
    game.camera.x = 400;
    game.camera.y = 125;

    marker = game.add.graphics();
    marker.lineStyle(2, 0x000000, 1);
    marker.drawRect(0, 0, 32, 32);

    this.load.image ('grass_tile', './assets/landscapeGrey.png', 132, 99);
    this.load.image ('building', './assets/building.png', 133, 127);
    //game.load.image('tiles', './assets/tilesheet_complete_2X.png');

    game.time.advancedTiming = true;

        // Add and enable the plug-in.
        game.plugins.add(new Phaser.Plugin.Isometric(game));

        // This is used to set a game canvas-based offset for the 0, 0, 0 isometric coordinate - by default
        // this point would be at screen coordinates 0, 0 (top left) which is usually undesirable.
        game.iso.anchor.setTo(0.5, 0.2);


}

function create ()
{
game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

  // Create a group for our tiles.
          isoGroup = game.add.group();
          buildingGroup = game.add.group();


          // Let's make a load of tiles on a grid.
          var tile;
          for (var xx = 0; xx < 400; xx += 71) {
              for (var yy = 0; yy < 400; yy += 71) {
                  // Create a tile using the new game.add.isoSprite factory method at the specified position.
                  // The last parameter is the group you want to add it to (just like game.add.sprite)
                  tile = game.add.isoSprite(xx, yy, 0, 'grass_tile', 0, isoGroup);
                  tile.anchor.set(0.5, 0);
              }
            }

          // Provide a 3D position for the cursor
          cursorPos = new Phaser.Plugin.Isometric.Point3();

          cursors = game.input.keyboard.createCursorKeys();


          game.input.onDown.add(() => {
              game.scale.startFullScreen(false);
            // Loop through all tiles and test to see if the 3D position from above intersects with the automatically generated IsoSprite tile bounds.
            isoGroup.forEach(function (tile) {
                var inBounds = tile.isoBounds.containsXY(cursorPos.x, cursorPos.y);
                // If it does, do a little animation and tint change.
                if (inBounds && !tile.hasBuilding) {
                    const building = game.add.isoSprite(tile.isoBounds.x, tile.isoBounds.y, 0, 'building', 0, buildingGroup);
                    building.anchor.set(0.5, 0.25);
                    //building.scale.setTo(0.5, 0.5);

                    tile.hasBuilding = true;

                    tile.selected = true;
                    tile.tint = 0x86bfda;
                    game.add.tween(tile).to({ isoZ: 0 }, 200, Phaser.Easing.Quadratic.InOut, true);
                }
                // If not, revert back to how it was.
                else if (tile.selected && !inBounds) {
                    tile.selected = false;
                    tile.tint = 0xffffff;
                    game.add.tween(tile).to({ isoZ: 0 }, 200, Phaser.Easing.Quadratic.InOut, true);
                }

                game.iso.simpleSort(buildingGroup);
            });
          });


/*
  this.physics.startSystem(Phaser.Physics.ARCADE);

  const data = '0,1,2,3\n3,4,5,6\n7,8';

  this.cache.addTilemap('dynamicMap', null, data, Phaser.Tilemap.CSV);


  map = this.add.tilemap('dynamicMap', 222, 256);
  map.addTilesetImage('tiles', 'tiles', 222, 256);

  layer = map.createLayer(0);

    //  Scroll it
  layer.resizeWorld();

  game.physics.startSystem(Phaser.Physics.ARCADE);

  cursors = game.input.keyboard.createCursorKeys();
  */

/*
  map = this.add.tilemap('tiles', 111, 128);

  map.addTilesetImage('yer');

  //map.addTilesetImage('Desert', 'tiles');

  layer = map.createLayer('Ground');

  layer.resizeWorld();

  //sprite = game.add.sprite(450, 80, 'car');
  //sprite.anchor.setTo(0.5, 0.5);

  //game.physics.enable(sprite);

  //game.camera.follow(sprite);

  //cursors = game.input.keyboard.createCursorKeys();

  //game.input.onDown.add(fillTiles, this);


  */
//this.add.tileSprite(0, 0, 132, 100, 'grass_tile');
/*
    let sprite;
    for (var i = 0; i < 20; i++) {

      for (var j = 0; j < 15; j++) {
        sprite = this.add.tileSprite(66 * j, (i * 50 - (i * 16)), 132, 100, 'grass_tile');
        sprite.scale.setTo(0.5, 0.5);
      }

      for (var k = 0; k < 15; k++) {
        sprite = this.add.tileSprite(66 * k + 33, (17 + (i * 50) - (i * 16)), 132, 100, 'grass_tile');
        sprite.scale.setTo(0.5, 0.5);

      }

  }

*/
  this.add.image (0, 0, 'building');



  }

  function update() {

    // Update the cursor position.
        // It's important to understand that screen-to-isometric projection means you have to specify a z position manually, as this cannot be easily
        // determined from the 2D pointer position without extra trickery. By default, the z position is 0 if not set.
        game.iso.unproject(game.input.activePointer.position, cursorPos);

    marker.x = game.input.activePointer.worldX;
    marker.y = game.input.activePointer.worldY;

    if (cursors.left.isDown)
    {
        game.camera.x-=camSpeed;
    }
    else if (cursors.right.isDown)
    {
        game.camera.x+=camSpeed;
    }

    if (cursors.up.isDown)
    {
        game.camera.y-=camSpeed;
    }
    else if (cursors.down.isDown)
    {
        game.camera.y+=camSpeed;
    }

    isoGroup.forEach(function (tile) {
        var inBounds = tile.isoBounds.containsXY(cursorPos.x, cursorPos.y);
        // If it does, do a little animation and tint change.
          if (!tile.selected && inBounds) {
            tile.selected = true;
            tile.tint = 0x86bfda;
            game.add.tween(tile).to({ isoZ: 0 }, 200, Phaser.Easing.Quadratic.InOut, true);
        }
        // If not, revert back to how it was.
        else if (tile.selected && !inBounds) {
            tile.selected = false;
            tile.tint = 0xffffff;
            game.add.tween(tile).to({ isoZ: 0 }, 200, Phaser.Easing.Quadratic.InOut, true);
        }
    });


}
