var past=[]
var currentid=0
timer=window.setInterval(updateUI,1)

var main=function(){
	$('textarea').on('input', function(x){
		window.clearInterval(timer)
		timer=window.setInterval(savestate,500)

	})
}

function savestate(){
	currentid=past.lenth
	past[past.length]={id:past.length,cont:$('textarea').val()}
	window.clearInterval(timer)
	updateUI()
}

function updateUI(){
	undostr=""

	past.map(function(l){
		if (currentid!=l.id)
		undostr+="<a class='pastclick' data-targ="+l.id+">"+l.id+"</a>"
		else
		{
		undostr+="<a> Current </a>"
		}
	})

	$('.undobar').html(undostr)
	$('.pastclick').click(function(){
		gotostate($(this).data('targ'))
	})
}

function gotostate(id)
{
	$('textarea').val(past[id].cont)
	currentid=id

	updateUI()
}

function detectmob() { 
 if( navigator.userAgent.match(/Android/i)
 || navigator.userAgent.match(/webOS/i)
 || navigator.userAgent.match(/iPhone/i)
 || navigator.userAgent.match(/iPad/i)
 || navigator.userAgent.match(/iPod/i)
 || navigator.userAgent.match(/BlackBerry/i)
 || navigator.userAgent.match(/Windows Phone/i)
 ){
    return true;
  }
 else {
    return false;
  }
}

window.onresize = function(event) {
resizeDiv();
}


function resizeDiv() {
	vpw = $(window).width();
	vph = $(window).height();

	m=detectmob()
}


$(document).ready(main)
$(document).ready(resizeDiv)