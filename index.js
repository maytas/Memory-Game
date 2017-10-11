var app=angular.module("game",[]);

app.controller("gameCtrl",["$scope",function($scope){

$scope.totalPoints=0;
$scope.matchedPairCount=0;
$scope.BoxOpened = "";
$scope.ImgOpened = "";
$scope.ImgFound = 0;
var timeInSecond;
var timeout;
var d=90;
var Source = "#boxcard";

var ImgSource = [
  "http://img5.uploadhouse.com/fileuploads/17699/176992640c06707c66a5c0b08a2549c69745dc2c.png",
  "http://img6.uploadhouse.com/fileuploads/17699/17699263b01721074bf094aa3bc695aa19c8d573.png",
  "http://img6.uploadhouse.com/fileuploads/17699/17699262833250fa3063b708c41042005fda437d.png",
  "http://img9.uploadhouse.com/fileuploads/17699/176992615db99bb0fd652a2e6041388b2839a634.png",
  "http://img4.uploadhouse.com/fileuploads/17699/176992601ca0f28ba4a8f7b41f99ee026d7aaed8.png",
  "http://img3.uploadhouse.com/fileuploads/17699/17699259cb2d70c6882adc285ab8d519658b5dd7.png",
  "http://img2.uploadhouse.com/fileuploads/17699/1769925824ea93cbb77ba9e95c1a4cec7f89b80c.png",
  "http://img7.uploadhouse.com/fileuploads/17699/1769925708af4fb3c954b1d856da1f4d4dcd548a.png",
];

$scope.RandomFunction=function(MaxValue, MinValue) {
		return Math.round(Math.random() * (MaxValue - MinValue) + MinValue);
	}
	
$scope.ShuffleImages=function() {
	var ImgAll = $(Source).children();
	var ImgThis = $(Source + " div:first-child");
	var ImgArr = new Array();
   
	for (var i = 0; i < ImgAll.length; i++) {
		ImgArr[i] = $("#" + ImgThis.attr("id") + " img").attr("src");
		ImgThis = ImgThis.next();
	}
	
	ImgThis = $(Source + " div:first-child");
	
	for (var z = 0; z < ImgAll.length; z++) {
	var RandomNumber = $scope.RandomFunction(0, ImgArr.length - 1);

		$("#" + ImgThis.attr("id") + " img").attr("src", ImgArr[RandomNumber]);
		ImgArr.splice(RandomNumber, 1);
		ImgThis = ImgThis.next();
	}
}

$scope.resetGame=function() {
	$scope.ShuffleImages();
	$(Source + " div img").hide();
	$(Source + " div").css("visibility", "visible");
	
	d=90;
	$scope.BoxOpened = "";
	$scope.ImgOpened = "";
	$scope.ImgFound = 0;
	$scope.totalPoints=0;
	$scope.matchedPairCount=0;
	$("#counter").html("" + 0);
	$("#matchedPair").html("" + 0 +"/8");
	return false;
}

function OpenCard() {
	var id = $(this).attr("id");

	if ($("#" + id + " img").is(":hidden")) {
		$(Source + " div").unbind("click", OpenCard);
	
		$("#" + id + " img").slideDown('fast');

		if ($scope.ImgOpened == "") {
			$scope.BoxOpened = id;
			$scope.ImgOpened = $("#" + id + " img").attr("src");
			setTimeout(function() {
				$(Source + " div").bind("click", OpenCard)
			}, 500);
		} else {
			CurrentOpened = $("#" + id + " img").attr("src");
			if ($scope.ImgOpened != CurrentOpened) {
				setTimeout(function() {
					$("#" + id + " img").slideUp('fast');
					$("#" + $scope.BoxOpened + " img").slideUp('fast');
					$scope.BoxOpened = "";
					$scope.ImgOpened = "";
				}, 400);
			} else {
				setTimeout(function() {
					$("#" + id + " img").parent().css("visibility", "hidden");
					$("#" + $scope.BoxOpened + " img").parent().css("visibility", "hidden");
					$scope.ImgFound++;
					$scope.totalPoints+=20;
					$scope.matchedPairCount+=1;
					$scope.BoxOpened = "";
					$scope.ImgOpened = "";
					$("#counter").html("" + $scope.totalPoints);
					$("#matchedPair").html("" + $scope.matchedPairCount+"/8");
					if($scope.matchedPairCount==8){
						timeout= setTimeout(function() {
							clearInterval(timeInSecond);
							var sec=90-d;
							var bonus=0;
							var totalScore=0;
							if(d>75)
								bonus=100;
							else if(d>60)
								bonus=75;
							else if(d>45)
								bonus=50;
							else if(d>30)
								bonus=25;
							else
								bonus=0;

							totalScore=$scope.totalPoints+bonus;
							alert("Congrats! You have won.\n\nTime taken: "+sec+" seconds\n\nScore: "+$scope.totalPoints+"\n\nBonus: "+bonus+"\n\nTotal Score: "+totalScore+"\n\nClose this to start again");
							$scope.resetGame();
							timeInSeconds();
						}, 500);
					}
				}, 500);
			}
			setTimeout(function() {
				$(Source + " div").bind("click", OpenCard)
			}, 400);
		}
	}	
}

	for (var y = 1; y < 3 ; y++) {
		$.each(ImgSource, function(i, val) {
			$(Source).append("<div id=card" + y + i + "><img src=" + val + " />");
		});
	}
	$(Source + " div").click(OpenCard);
	$scope.ShuffleImages();

	function timeInSeconds(){
		timeInSecond = setInterval(myTimer, 1000);
		function myTimer() {
		    d = d-1;
		    document.getElementById("timeBox").innerHTML = d;
		    if(d==0){
		    	alert("Time Over and your Score is "+$scope.totalPoints+"\n\nClose this to start again");
				clearInterval(timeInSecond);
				$scope.resetGame();
				clearTimeout(timeout);
				timeInSeconds();
				
		    }
		}

	}
	timeInSeconds();
}]);

