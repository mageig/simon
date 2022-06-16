const buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userPicks = [];

var score = 0;
var playing = false;
var curr = 0;



$(document).on('keydown', function (e) {
    var i = e.key;
    if (!playing) {
        playing = true;
        nextSequence();
        $("#level-title").text("playing");
        $("#quit").css({ "visibility": "visible" });
        $("#mid-btn").text(curr);
        $("#mid-btn").css({ "font-size": "5rem" });
    }
    else if (playing && i == 'q') {
        gameOver(score);
    }
});


$(document).ready(function () {
    $(".btn").click(function () {
        if (playing) {
            var currColor = $(this).attr('id')
            clicked(currColor);
        }
    })

});

function playSound(color) {
    var aud = new Audio("sounds/" + color + ".mp3");
    aud.play();
}

function clicked(currColor) {
    pressBtn(currColor);
    userPicks.push(currColor);
    // console.log(userPicks);
    checkAns(curr, currColor);

    setTimeout(function () {
        if (playing) {
            if (curr >= gamePattern.length - 1) {
                score++;
                $("#mid-btn").text(score);
                nextSequence();
                curr = 0;
                userPicks = [];
            }
            else {
                curr++;
            }
        }
    }, 200);

}

function checkAns(curr, color) {
    if (gamePattern[curr] == userPicks[curr]) {
        playSound(color)
    }
    else {
        gameOver(score);
    }
}

function gameOverSound() {
    var go = new Audio("sounds/gameOver.mp3")
    go.play();
}

function gameOver(score) {
    gameOverSound();
    setTimeout(function () {
        alert("Game over! Score: " + score);
        reset();
    }, 200);
}

function pressBtn(currColor) {
    $("#" + currColor).css({ "background-color": "white", "opacity": "90%" });
    setTimeout(function () {
        $("#" + currColor).css({ "background-color": currColor, "opacity": "100%" });
    }, 90);
}

function reset() {
    $("#level-title").text("press any key to start");
    $("#quit").css({ "visibility": "hidden" });
    $("#mid-btn").text("simon");
    $("#mid-btn").css({ "font-size": "1.5rem" });
    playing = false;
    gamePattern = [];
    curr = 0;
    userPicks = [];
    score = 0;
}


function nextSequence() {

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    // console.log(gamePattern);


    for (let i = 0; i < gamePattern.length; i++) {
        setTimeout(function () {
            setTimeout(function timer() {
                playSound(gamePattern[i]);
                pressBtn(gamePattern[i]);
            }, i * 600);
        }, 1000);



    }


}




