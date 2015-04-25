var nTopsH2;
var nCurrentWizDialog;
var tWizDialog;
var msSwitch = 5000;

$(document).ready(function() {
	// $(".WizDialogBox").disableSelection();
	disableSelection("WizDialogBox");
	$(".WizDialog").click( clickNextWizDialog );

	tWizDialog = setInterval(autoNextWizDialog, msSwitch);

	nTopsH2   = [0];
	var allH2 = $(".WikiaArticle h2:not(#toctitle>)");
	for (var i = 1; i < allH2.length; i++) {
		nTopsH2.push( allH2.eq(i).position().top );
	};
	nTopsH2.push(1e9);

	var nCurrentWizDialog = 0;
	$(".WizDialogBox").hide();
	$(".WizDialogBox").eq(0).show();
});

// the changer of all Wiz Dialogues.
function autoNextWizDialog() {
	showNextWizDialog();
}

function clickNextWizDialog() {
	clearInterval(tWizDialog);
	showNextWizDialog();
	tWizDialog = setInterval(autoNextWizDialog, msSwitch);
}

function showNextWizDialog() {
	var WizDialogLines = $(".WizDialogBox:visible > .WizDialogOnce");
	var nMaxDialogAmt  = WizDialogLines.length;

	for (var i = 0; i < nMaxDialogAmt; i++) {
		if ("none" != WizDialogLines.eq(i).css("display"))
			break;
	};

	WizDialogLines.eq(i).hide();
	i = (i+1) % nMaxDialogAmt;
	WizDialogLines.eq(i).show();
}

// the detect of scroll.
$(window).scroll(function() {
	var nCurrentScrollTop = $(window).scrollTop();

	for (var i = 0; i < nTopsH2.length-1; i++) {
		if ( nTopsH2[i] <= nCurrentScrollTop && nCurrentScrollTop <= nTopsH2[i+1] )
			break;
	};

	if ( i != nCurrentWizDialog ) {
		clearInterval(tWizDialog);

		nCurrentWizDialog = i;
		$(".WizDialogBox:visible > .WizDialogOnce").hide();
		$(".WizDialogBox").hide();
		$(".WizDialogBox").eq(i).show();
		$(".WizDialogBox:visible > .WizDialogOnce").eq(0).show();

		tWizDialog = setInterval(autoNextWizDialog, msSwitch);
	}
});

function disableSelection(targetClass) {
	var arrTarget = document.getElementsByClassName(targetClass);
	for (var i = 0; i < arrTarget.length; i++) {
		target = arrTarget[i];
		if (typeof target.onselectstart != "undefined")				// IE route
			target.onselectstart = function() { return false; }
		else if (typeof target.style.MozUserSelect != "undefined")	// Firefox route
			target.style.MozUserSelect = "none"
		else // All other route (ie: Opera)
			target.onmousedown = function() { return false; }
		target.style.cursor = "default"
	};
}
