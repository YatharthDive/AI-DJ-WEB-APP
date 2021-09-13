leftWristX = 0
leftWristY = 0
rightWristX = 0
rightWristY = 0
scoreRW = 0
song = ""
scoreLW = 0

function preload() {
    song = loadSound("music.mp3")
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    v1 = createCapture(VIDEO);
    v1.hide()
    posenet = ml5.poseNet(v1, modelLoaded)
    posenet.on("pose", gotPoses)
}

function gotPoses(results) {
    if (results.length > 0) {
        //console.log(results)
        scoreLW = results[0].pose.keypoints[9].score;
        scoreRW = results[0].pose.keypoints[10].score;
        console.log(scoreRW)
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
    }
}

function modelLoaded() {
    console.log("modelLoaded")
}

function draw() {
    image(v1, 0, 0, 600, 500)
    fill("blue")
    stroke("blue")
    if (scoreRW > 0.2) {

    console.log(rightWristY)
        circle(rightWristX, rightWristY, 20)
        if (rightWristY > 0 && rightWristY <= 100) {
            document.getElementById("speed").innerHTML = "Speed = 0.5x";
            song.rate(0.5);
        } else if (rightWristY > 100 && rightWristY <= 200) {
            document.getElementById("speed").innerHTML = "Speed = 1x";
            song.rate(1.0);
        } else if (rightWristY > 200 && rightWristY <= 300) {
            document.getElementById("speed").innerHTML = "Speed = 1.5x";
            song.rate(1.5);
        }
        if (rightWristY > 300 && rightWristY <= 400) {
            document.getElementById("speed").innerHTML = "Speed = 2x";
            song.rate(2.0);
        } else if (rightWristY > 400 && rightWristY <= 500) {
            document.getElementById("speed").innerHTML = "Speed = 2.5x";
            song.rate(2.5);
        }
    }
    if (scoreLW > 0.2) {

        circle(leftWristX, leftWristY, 20)
        to_number_leftWristY = Number(leftWristY)
        //console.log(to_number_leftWristY)
        remove_decimals = floor(to_number_leftWristY)
        //console.log(remove_decimals)
        volume = remove_decimals / 500;
        document.getElementById("volume").innerHTML = "Volume = " + volume;
        song.setVolume(volume);
    }
}

function play() {
    song.play();
    song.setVolume(1)
    song.rate(1)
}
function stop() {
    song.stop()
}