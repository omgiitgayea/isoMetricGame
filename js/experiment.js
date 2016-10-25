/**
 * Created by Godai Yuusaku on 10/19/2016.
 * I'm trying to make, at least at the beginning, a game board set up in an isometric grid pattern
 * The next step would be some sort of pathfinding algorithm then some sort of actual game mechanics
 * Right now, I'm thinking of basically making it a JS Civilization game
 * Will start making it non-responsive
 */
var TILE_WIDTH = 72;
var TILE_HEIGHT = 42;
var TILE_VERT_OFFSET = 72;
var TILE_HORIZ_OFFSET = 42;
var TILE_LEFT_OFFSET = 18;
var TILE_LEFT_OFFSET_OFFEDGE = -18;
var TILE_TOP_OFFSET = 3;
var TILE_TOP_OFFSET_OFFEDGE = -18;

var boardWidth = $(".gridSection").css("width");
var boardHeight = $(".gridSection").css("height");

boardWidth = Number(boardWidth.slice(0, boardWidth.length - 2));
boardHeight = Number(boardHeight.slice(0, boardHeight.length - 2));

initializeBoard(boardWidth, boardHeight);

function initializeBoard(width, height) {
    var horizTiles = width / TILE_WIDTH;
    var vertTiles = height / TILE_HEIGHT;
    var basicTile = $("<div class='tile'></div>");
    basicTile.attr("passable", "false");
    var aSpace = $("<div></div>");
    aSpace.append(basicTile);
    aSpace.addClass("basicGridSection");

    // makes checkerboard that fits in the area
    for (var j = 0; j < vertTiles; j++) {
        aSpace.css("top", TILE_TOP_OFFSET + TILE_HORIZ_OFFSET * j + "px");
        for (var i = 0; i < horizTiles; i++) {
            aSpace.css("left", TILE_LEFT_OFFSET + TILE_VERT_OFFSET * i + "px");
            aSpace.clone().prependTo($(".gridSection"));
        }
    }

    // makes checkerboard that goes in between above checkerboard
    for (var j = 0; j <= vertTiles; j++) {
        aSpace.css("top", TILE_TOP_OFFSET_OFFEDGE + TILE_HORIZ_OFFSET * j + "px");
        if (j === 0 || j === vertTiles) {
            basicTile.removeAttr("passable");
            basicTile.css("background-color", "black");
            basicTile.attr("passable", "false");
        }
        else {
            basicTile.css("background-color", "#9d9d9d");
            basicTile.attr("passable", "true");
        }
        console.log(basicTile.attr("passable"));
        for (var i = 0; i <= horizTiles; i++) {
            aSpace.css("left", TILE_LEFT_OFFSET_OFFEDGE + TILE_VERT_OFFSET * i + "px");
            aSpace.clone().prependTo($(".gridSection"));
            console.log(basicTile.attr("passable"));
        }
    }
}

$(".tile").contextmenu(function (event) {
    event.preventDefault();
    console.log($(this).parent().css("top") + " " + $(this).parent().css("left"));
    console.log(Boolean($(this).attr("passable")));
    if (Boolean($(this).attr("passable")))
    {
        var bgColor = $(this).css("background-color");
        bgColor = rgb2hex(bgColor);
        if (bgColor === "#9d9d9d") {
            $(this).css("background-color", "green");
        }
        else {
            $(this).css("background-color", "#9d9d9d");
        }
    }
});

function rgb2hex(rgb) {
    rgb = rgb.match(/^rgb\((\d+), \s*(\d+), \s*(\d+)\)$/);
    return ("#" + dec2HexString(rgb[1]) + dec2HexString(rgb[2]) + dec2HexString(rgb[3]));
}
function dec2HexString(decString) {
    var hexString = Number(decString).toString(16);
    if (hexString.length < 2) {
        hexString = "0" + hexString;
    }
    return hexString;
}