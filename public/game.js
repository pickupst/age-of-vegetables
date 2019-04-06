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

var scenes = { preload: preload, create: create }
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'age-of-vegetables', scenes);


function preload ()
{
    this.load.image ('grass_tile', './assets/landscapeGrey.png', 132, 100);
}

function create ()
{
    var groundSprites = new Array();
    var h = 33;
    var adet = 16;

var addForLoop2X = 0;
var addForLoop2Y = 0;
for (var j = 1; j <= adet; j++) {
  for (var i = 0; i < adet; i++) {
    var turnUp = h * i;
    var turnLeft = h * i;

    var turnAdd = (i * 2 * h) - turnUp;

    groundSprites[i] = this.add.tileSprite(h + turnAdd + turnLeft + addForLoop2X
      , h / 2 + turnAdd + addForLoop2Y, 132, 100, 'grass_tile');
    groundSprites[i].scale.setTo(0.5, 0.5);

    groundSprites[i + 1] = this.add.tileSprite(0 + turnAdd + turnLeft + addForLoop2X
      , h + turnAdd + addForLoop2Y, 132, 100, 'grass_tile');
    groundSprites[i + 1].scale.setTo(0.5, 0.5);

    groundSprites[i + 2] = this.add.tileSprite(h * 2 + turnAdd + turnLeft + addForLoop2X
      , h + turnAdd + addForLoop2Y, 132, 100, 'grass_tile');
    groundSprites[i + 2].scale.setTo(0.5, 0.5);

    groundSprites[i + 3] = this.add.tileSprite(h + turnAdd + turnLeft + addForLoop2X
      , (2 * h * 74.25) / 100 + turnAdd + addForLoop2Y, 132, 100, 'grass_tile');
    groundSprites[i + 3].scale.setTo(0.5, 0.5);

  }

  if (j <= adet / 2) {
    addForLoop2X = (j * -2) * h;
    addForLoop2Y = (j * 2) * h / 2;
    } else {
      addForLoop2X =((j - 4) * 2) * h;
      addForLoop2Y = ((j - 4) * -2) * h / 2;
  }

}

}
