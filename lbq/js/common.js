var myScroll;
function loaded() {
	myScroll = new iScroll('wrapper', {
		hScrollbar: false,
	});


}
document.addEventListener('DOMContentLoaded', loaded, false);