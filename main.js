document.addEventListener("DOMContentLoaded", function() {
	// displayRecentNews() is now called by content-renderer.js after news posts are loaded
	// Wait a bit for the news to be rendered, then attach event listeners
	setTimeout(function() {
		const moreButton = document.getElementById("more-news-button");
		const lessButton = document.getElementById("less-news-button");
		if (moreButton) moreButton.addEventListener("click", showMoreNews);
		if (lessButton) lessButton.addEventListener("click", showLessNews);
	}, 100);
})

function displayRecentNews() {
	let i = 0
	const posts = document.getElementsByClassName("post");
	while(i < 3 && i < posts.length) {
		if (posts[i]) {
			posts[i].classList.add("show");
		}
		i++
	}
}

function showMoreNews() {
	const posts = document.getElementsByClassName("post");
	let lastVisiblePostId = Array.from(posts).filter(function(post) { return post.classList.contains("show") }).length - 1;
	let nextPostId = lastVisiblePostId + 1;
	while (nextPostId < lastVisiblePostId + 4 && nextPostId < posts.length) {
		if (posts[nextPostId]) {
			posts[nextPostId].classList.add("show");
		}
		nextPostId++;
	}

	enforceNewsControlState(nextPostId);
}

function showLessNews() {
	const posts = document.getElementsByClassName("post");
	let lastVisiblePostId = Array.from(posts).filter(function(post) { return post.classList.contains("show") }).length - 1;
	let nextPostId = lastVisiblePostId
	while (nextPostId > lastVisiblePostId - 3 && nextPostId >= 0) {
		if (posts[nextPostId]) {
			posts[nextPostId].classList.remove("show");
		}
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
