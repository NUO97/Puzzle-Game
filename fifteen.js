/*
    Assignment 4: Fifteen Puzzle
    Name: Nuo Chen
    Section: AF
    Date: 04/25/2017
    This Javascript file is for the fifteen puzzle page, Fifteen puzzle is 
    a classic game consisting of a 4x4 grid of numbered squares with one square missing. 
    The objective of the game is to arrange the tiles into numerical order by repeatedly 
    sliding a square that neighbors the missing square into its empty space

*/

(function() {
    
    'use strict';
    
    var $ = function(id) { return document.getElementById(id); };
    
    /* Tracking the cordinates of the empty tile */
    var emptyX = "300px";
    var emptyY = "300px";
    
    /* Constants for the dimension and size of the puzzle */
    var SIZE = 100;
    var DIMENSION = 4;
    
    window.onload = function() {
        createPuzzle();
        $("shufflebutton").onclick = shufflePuzzle; 
        var tiles = document.querySelectorAll(".puzzletile");
        for (var i = 0; i < tiles.length; i++) {
            tiles[i].onclick = function() {
                moveTile(this);
            };
            tiles[i].onmouseover = hoverEvent;
            tiles[i].onmouseout = outEvent;
                
        }
    };
    
    // This function makes fifteen puzzle pieces appear in the correct position
    // and make the correct part of the background show through behind each tile
    // This function will also label the fifteen puzzle pieces with numbers one 
    // through fifteen.
    function createPuzzle() {
        var index = 1;
        for (var i = 0; i < DIMENSION; i++) {
            for (var j = 0; j < DIMENSION; j++) {
                if (index < DIMENSION * DIMENSION) {
                    var tile = document.createElement("div");
                    tile.classList.add("puzzletile");
                    $("puzzlearea").appendChild(tile);
                    tile.innerHTML = index;
                    tile.style.left = j * SIZE + "px";
                    tile.style.top = i * SIZE + "px";
                    tile.style.backgroundPosition = j * -SIZE + "px " + i * -SIZE + "px";
                    index = index + 1;
                }
            }
        }
    }
    
    // This function handles the onclick event of the puzzle tiles, If the clicked
    // puzzle tiles are allowed to move, the clicked tile will move 
    // from its current location to the empty tile's location, leaving a new empty
    // tile behind. If the clicked tile is not allowed to move, the function does
    // nothing.
    function moveTile(tile) {
        if (isMovable(tile)) {
        
            var currentX = tile.style.left;
            var currentY = tile.style.top;
            
            tile.style.left = emptyX;
            tile.style.top = emptyY;
            
            emptyX = currentX;
            emptyY = currentY;
            
        }
        
    }
    
    // This function takes in a DOM object which represents a puzzle tile as parameter
    // and returns in boolean whether that particular puzzle tile is ready to be moved. 
    // The only puzzle tiles that can be moved are the tiles adjacent to the empty tile. 
    function isMovable(tile) {
        var currentX = tile.style.left;
        var currentY = tile.style.top;
        if (currentX == emptyX && Math.abs(parseInt(currentY) - parseInt(emptyY)) == SIZE ||
            currentY == emptyY && Math.abs(parseInt(currentX) - parseInt(emptyX)) == SIZE){
            return true;
        } else {
            return false;
        }
    }
    
    // This function handles the mouseover event when the cursor is on a movable puzzle
    // tile. When the mouse hovers over a square that can be moved, its border and text color
    // become red. Also, the mouse cursor will change into a "hand" cursor pointing at the 
    // square. 
    function hoverEvent() {
        if (isMovable(this)) {
            this.classList.add("movabletile");
        } 
    }
    
    // This function handles the event when the cursor moves out of the movable puzzle
    // tile. Once the cursor is no longer hovering on the square, its appearance
    // will revert to its original state.
    function outEvent() {
        if (isMovable(this)) {
            this.classList.remove("movabletile");
        } 
    }
    
    // This function handles the onclick event of the shuffle button and shuffles the
    // puzzle pieces by randomly rearrange the tiles of the puzzle. When the Shuffle button 
    // is clicked, the puzzle tiles are rearranged into a random ordering so that the
    // user has a challenging puzzle to solve. After executing this function, the puzzle 
    // pieces will still remain in a solvable state. 
    function shufflePuzzle() {
        
        for (var i = 0; i < 1000; i++) {
            var neighbors = [];
            var tiles = document.querySelectorAll(".puzzletile");
            for (var j = 0; j < tiles.length; j++) {
                if (isMovable(tiles[j])) {
                    neighbors.push(tiles[j]);
                }
            }
            var randomNumber = parseInt(Math.random() * neighbors.length);
            var randomSelection = neighbors[randomNumber];
            moveTile(randomSelection);
        }
    }
    
    
})();