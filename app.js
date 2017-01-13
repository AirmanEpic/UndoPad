var past=[]
var currentid=0
timer=window.setInterval(updateUI,1)

var main=function(){
	retreive()
	$('textarea').on('input', function(x){
		window.clearInterval(timer)
		timer=window.setInterval(savestate,500)
	})
}

function savestate(){
	if (currentid<past.length)
		{
			for (i=currentid;i<past.length;i++)
			{
				past.splice(i,1)
			}

			past[currentid]={id:currentid,cont:$('textarea').val()}
			currentid=past.length+1
			
		}
	else
		{
			currentid=past.length+1
			past[past.length]={id:past.length,cont:$('textarea').val()}
		}

	store()
	window.clearInterval(timer)
	updateUI()
}

function updateUI(){
	if (currentid!=0)
		{
			undostr="<button class='undo'>undo</button>"
		}
		else
		{
			undostr=""
		}

	past.map(function(l){
		if (currentid!=l.id)
			undostr+="<a class='pastclick' data-targ="+l.id+">"+l.id+"</a>"
		else
		{
			undostr+="<a> Current </a>"
		}
	})

	if (currentid!=past.length){undostr+="<button class='redo'>redo</button>"}

	$('.undobar').html(undostr)

	$('.pastclick').click(function(){
		gotostate($(this).data('targ'))
	})

	$('.undo').click(function(){
		gotostate(currentid-1)
	})

	$('.redo').click(function(){
		gotostate(currentid+1)
	})
}

function gotostate(id)
{
	$('textarea').val(past[id].cont)
	currentid=id

	updateUI()
}


function store(){
	if (typeof(Storage) !== "undefined")
	{
	    // Code for localStorage/sessionStorage.
	    localStorage.setItem("States",JSON.stringify(past))
	    localStorage.setItem("State_pos",currentid)
	}
}

function retreive(){
	if (typeof(Storage) !== "undefined")
	if (localStorage.States!=undefined)
	{
		past=JSON.parse(localStorage.States)
		currentid=JSON.parse(localStorage.State_pos)
		gotostate(past.length-1)
		savestate()
	}
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