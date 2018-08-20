
// 32 bit FNV-1a hash
// Ref.: http://isthe.com/chongo/tech/comp/fnv/
// From : https://gist.github.com/vaiorabbit/5657561
function fnv32a( str ){

	var FNV1_32A_INIT = 0x811c9dc5;
	var hval = FNV1_32A_INIT;
	for ( var i = 0; i < str.length; ++i )
	{
		hval ^= str.charCodeAt(i);
		hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
	}
	return hval >>> 0;
};

function getCommentListItem(comment){
    var commentItem = `<li class="left clearfix">
        <span class="chat-img pull-left">
            <img src="http://placehold.it/50/cb294a/fff&text=${getFirstLetter(comment.name)}" 
                alt="User Avatar" class="img-circle"/>
        </span>
        <div class="chat-body clearfix">
            <div class="header">
                <strong class="primary-font"> 
                    ${comment.name} 
                </strong> <small class="pull-right text-muted">
                    <span class="glyphicon glyphicon-time"></span>
                    ${comment.date}
                    </small>
            </div>
            <p>${ sanitizeString(comment.text) }</p>
        </div>
        </li>
        `;
    return commentItem;
};

function getFirstLetter( name ){

    var letter = name.charAt(0);
    if(!letter.match(/^[0-9a-z]+$/i)){
        letter = 'X';
    }
    
    if(letter.match(/^[a-z]+$/)){
        letter = letter.toUpperCase();
    }

    return letter;
};

function sanitizeString( text ){

    text = text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    // text = text.replace(/(https?:\/\/[^\s]+)/g, "&lt;link removed&gt;");
    return text
}

module.exports = {
    fnv32a,
    getCommentListItem,
    getFirstLetter
};