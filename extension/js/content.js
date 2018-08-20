
function getTrackName() {
    var root = document.getElementsByClassName('text-control video-title')[0].firstChild.firstChild;
    var trackID = [];

    while (typeof root != 'undefined' && root !== null && root.textContent.length > 0) {
        trackID.push(root.textContent);
        root = root.nextSibling;
    }

    trackID = trackID.join('//');

    return trackID;
}

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        // console.log(sender.tab ?
        //     "from a content script:" + sender.tab.url :
        //     "from the extension");
        if (request.command == "get-track") {
            track = getTrackName();
            sendResponse({
                track
            });
        }
    });
