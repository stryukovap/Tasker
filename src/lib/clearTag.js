function clearTag(tagId) {
    var app = document.getElementById(tagId);
	app.innerHTML = '';
}

module.exports = clearTag;