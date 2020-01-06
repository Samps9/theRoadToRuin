document.addEventListener("DOMContentLoaded", function() {
	displayRecentNews();
	document.getElementById("more-news-button").addEventListener("click", showMoreNews);
	document.getElementById("less-news-button").addEventListener("click", showLessNews);
})

function displayRecentNews() {
	let i = 0
	while(i < 3) {
		document.getElementsByClassName("post")[i].classList.add("show");
		i++
	}
}

function showMoreNews() {
	let lastVisiblePostId = Array.from(document.getElementsByClassName("post")).filter(function(post) { return post.classList.contains("show") }).length - 1;
	let nextPostId = lastVisiblePostId + 1;
	while (nextPostId < lastVisiblePostId + 4) {
		document.getElementsByClassName("post")[nextPostId].classList.add("show");
		nextPostId++;
	}

	enforceNewsControlState(nextPostId);
}

function showLessNews() {
	let lastVisiblePostId = Array.from(document.getElementsByClassName("post")).filter(function(post) { return post.classList.contains("show") }).length - 1;
	let nextPostId = lastVisiblePostId
	while (nextPostId > lastVisiblePostId - 3) {
		document.getElementsByClassName("post")[nextPostId].classList.remove("show");
		nextPostId--;
	}

	enforceNewsControlState(nextPostId);
}

function enforceNewsControlState(nextPostId) {
	if(nextPostId > 2) { 
		document.getElementById("less-news-button").style.display = "block";
	} else {
		document.getElementById("less-news-button").style.display = "none";
	}

	if(nextPostId > document.getElementsByClassName("post").length - 1 ){
		document.getElementById("more-news-button").style.display = "none";
	} else {
		document.getElementById("more-news-button").style.display = "block";
	}
}