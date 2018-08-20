const request = require('request');
const utils = require('./utils');

const serverURL = "http://netflix-and-chat.com";

// Initial selection : fill comments to page
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {command: "get-track"}, function(response) {
      
        var trackId = utils.fnv32a(response.track); // hash the string
        
        if(trackId){
            fillComments(trackId);
            fillName();
        }else{
            console.log("Track query not found in url.")
        }
    });
  });

// Listener for comment posting
document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('btn-chat');
    // onClick's logic below:
    link.addEventListener('click', function() {
        getTrackAndPostComment();
    });
});

// Listener to post comment by pressing Enter
document.getElementById('btn-input')
        .addEventListener('keyup', (event) => {
            event.preventDefault();
            if(event.keyCode === 13){
                getTrackAndPostComment();
            }
        });
        
// Listener for background greying if name is set
document.addEventListener('DOMContentLoaded', function() {
    var inputLink = document.getElementById('name-input');

    inputLink.addEventListener('input', function() {
        checkFilled();
    });

    inputLink.addEventListener('focus', function() {
        checkFilled();
    });

    inputLink.addEventListener('focusout', function() {
        checkFilled();
    });
});

// Gets the track id from URL; posts request; reloads comments
function getTrackAndPostComment(){
    // fetch comment from document
    var curComment = document.getElementById('btn-input').value;
    
    if(curComment=='' || typeof curComment == "undefined"){
        return -1;
    }

    /// get name from document
    var curName = getCurrentName(); 

    // post comment to the backend
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {command: "get-track"}, function(response) {
            var trackName = response.track;
            var trackId = utils.fnv32a(trackName); // hash the string
            if(trackId){
                postComment({
                    track_id:trackId, 
                    name:curName, 
                    text:curComment, 
                    track_name: trackName
                }, 
                fillAfterwards=true);
            }else{
                console.log("Track query not found.")
            }
        });
    });
};

function getCurrentName(){

    var name = document.getElementById('name-input').value;
    if(name.length === 0){
        name = "Anonymous";
    }   
    else{
        chrome.storage.local.set({'name': name}, (res)=>{
            console.log("Name is stored.");
        });
    }

    return name;
};

// send the post request for given parameters
function postComment(message, fillAfterwards){

    request({
        url: serverURL + '/comment',
        method: 'POST',
        json: message
    }, function(err, resp, body){
            if(err){
                console.log('Could not post comment.');
                console.log(err);
            }

            if(fillAfterwards === true){
                document.getElementById('content').innerHTML = "";
                document.getElementById('btn-input').value = "";
                fillComments(message.track_id);    
            }
        }
   );
};

// GET comments of track from backend; fill the HTML with them
function fillComments(trackId){  
    request({
    url: serverURL + `/comment/${trackId}`, 
    json: true
    }, function (error, response, body) {
        if(error) console.log('error:', error); 
    
        var comments = body.comments;
        
        var to_append_concat = "";
        for(var i=0; i < comments.length; i++){
            var comment = comments[i];
            var to_append = utils.getCommentListItem(comment);
            to_append_concat += to_append;
        }
        document.getElementById('content').innerHTML = to_append_concat;
        document.body.scrollTop = 10000000000; // TODO : Change this
    });
};

function fillName(){
    chrome.storage.local.get(['name'], (res)=>{
        if(res.name){
            document.getElementById('name-input').value = res.name;
        }
        checkFilled();
    });
}

function checkFilled(){
    var inputElement = document.getElementById("name-input");
    
    if (inputElement === document.activeElement || inputElement.value == "") {
        inputElement.style.backgroundColor = "";
    }else{
        inputElement.style.backgroundColor = "#a78189";
    }
};