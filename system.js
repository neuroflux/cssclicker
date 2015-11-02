window.onload = function() {
	coder.init();
};

var coder = {
	/** variables **/
	stats: {
		totalCaffeine: 0.00,
		caffeine: 0.00,
		caffeinePerClick: 1,
		caffeinePerSecond: 0.02,
		caffeineInterval: 1000,
		clicks: 0,
		totalCash: 0.00,
		cash: 0.00,
		cashMultiplier: 2,
		dailyInterval: 30000, //1min
		siteEarnings: 0.00,
		editCount: 0,
		timePlayed: 0,
		totalSize: 0,
		totalUpgraded: 0,
		adverts: 0,
		advertMultiplier: 1.5,
		cssedits: [],
		animationedits: [],
		otheredits: []
	},
	temp: {
		cost: 0,
		caffeinePerSecond: 0,
		caffeineInterval: 0,
		browser: ""
	},
	caffeineTimer: null,
	dailyTimer: null,
	
	/** functions **/
	start: function() {
		$('#title').css({
			fontSize: 18,
			paddingTop: 0,
			width: 1100,
			margin: "0 auto"
		});
		$('#welcome').fadeOut(500);
		setTimeout(function() {
			$('#innerWebsite').fadeIn(500);
		}, 500);
		$('#morestats,#caffeine,#cash').fadeIn(500);
		$('#cash span').html('0.00');
		if (window.localStorage.getItem("saveGame")) {
			coder.load();
			coder.startTimers();
			coder.calcPrice();
			coder.calcPercentage();
			coder.checkUpgrades();
		} else {
			coder.startTimers();
			coder.calcPrice();
			coder.calcPercentage();
			coder.checkUpgrades();
		}
		setInterval(function() {
			coder.stats.timePlayed++;
		}, 1000);
		$('#cup').animate({
			marginTop: 48
		}, 350);
	},
	init: function() {
		coder.stats.totalSize = cssupgrades.length + animationupgrades.length;// + otherupgrades.length;
		coder.resize();
	},
	calcPrice: function() {
		var totalcost = 0;
		for (var n = 0; n < animationupgrades.length; n++ ){
			totalcost += animationupgrades[n].cost;
		}
		for (var n = 0; n < cssupgrades.length; n++ ){
			totalcost += cssupgrades[n].cost;
		}
		var totalcost2 = 0;
		for (var n = 0; n < otherupgrades.length; n++ ){
			totalcost2 += otherupgrades[n].cost;
		}
		$('#totalcost').html("Total costs: &cent;" + totalcost + " and &pound;" + totalcost2);
	},
	decimal: function(amt) {
		return Math.round(amt*Math.pow(10,2))/Math.pow(10,2);
	},
	calcPercentage: function() {
		var result = coder.stats.totalUpgraded / coder.stats.totalSize * 100;
		var p = coder.decimal(result);
		$('#percent').html(p);
	},
	resize: function() {
		//$('#website,#console').height($(window).height()-90);
		$('#innerWebsite').css({
			'height': $('#website').height()-52,
			'max-height': $('#website').height()-52
		});
	},
	startTimers: function() {
		coder.caffeineTimer = setInterval(function() {
			coder.stats.caffeine += coder.stats.caffeinePerSecond;
			coder.stats.totalCaffeine += coder.stats.caffeinePerSecond;
			coder.stats.caffeine = coder.decimal(coder.stats.caffeine);
			coder.stats.totalCaffeine = coder.decimal(coder.stats.totalCaffeine);
			coder.displayUpgrades();
			coder.display();
		}, coder.stats.caffeineInterval);
		
		coder.dailyTimer = setInterval(function() {
			coder.earnCash();
		}, coder.stats.dailyInterval);
	},
	earnCash: function() {
		if (coder.stats.editCount > 0) {
			coder.stats.cash += coder.decimal((coder.stats.editCount * coder.stats.cashMultiplier) / 100) + coder.decimal((coder.stats.adverts * coder.stats.advertMultiplier) / 100);
			coder.stats.cash = coder.decimal(coder.stats.cash);
			$('#cash span').html(coder.stats.cash);
		}
	},
	deleteSave: function() {
		window.localStorage.setItem("saveGame",null);
		window.localStorage.removeItem("saveGame");
		coder.error("delete");
		alert("Deleted\r\nRestarting Now...");
		window.location.reload();
	},
	save: function() {
		var toSave = JSON.stringify(coder.stats);
		window.localStorage.setItem("saveGame", toSave);
		coder.error("save");
	},
	load: function() {
		var toLoad = window.localStorage.getItem("saveGame");
		toLoad = JSON.parse(toLoad);
		coder.stats = toLoad;
		console.log(coder.stats.cssedits);
		$('#cash span').html(coder.stats.cash);
		for (var c = 0; c < coder.stats.cssedits.length; c++) {
			var cssAttribute = cssupgrades[coder.stats.cssedits[c]].css;
			var target = cssupgrades[coder.stats.cssedits[c]].target;
			var effect = cssupgrades[coder.stats.cssedits[c]].effect;
			$(target).css(cssAttribute , effect);
		}
		for (var o = 0; o < coder.stats.otheredits.length; o++) {
			coder.temp.cost = coder.stats.otheredits[o].cost;
			coder.temp.caffeinePerSecond = coder.stats.otheredits[o].caffeinePerSecond;
			coder.temp.caffeinePerClick = coder.stats.otheredits[o].caffeinePerClick;
			coder.temp.caffeineInterval = coder.stats.otheredits[o].caffeineInterval;
			coder.temp.browser = coder.stats.otheredits[o].browser;
			//otherupgrades.splice(thisIndex,1);
			$(this).remove();
			
			coder.stats.cash -= coder.temp.cost;
			coder.stats.cash = coder.decimal(coder.stats.cash);
			if (coder.temp.caffeinePerSecond > 0) {
				coder.stats.caffeinePerSecond += coder.temp.caffeinePerSecond;
			}
			if (coder.temp.caffeinePerClick > 0) {
				coder.stats.caffeinePerClick += coder.temp.caffeinePerClick;
			}
			if (coder.temp.caffeineInterval > 0) {
				clearInterval(coder.caffeineTimer);
				coder.caffeineTimer = null;
				coder.stats.caffeineInterval -= coder.temp.caffeineInterval;
				
				coder.caffeineTimer = setInterval(function() {
					coder.stats.caffeine += coder.stats.caffeinePerSecond;
					coder.stats.caffeine = coder.decimal(coder.stats.caffeine);
					coder.display();
					coder.displayUpgrades();
				}, coder.stats.caffeineInterval);
			}
			console.log("Browser image didn't change!");
		}
		coder.error("load");
		coder.calcPercentage();
	},
	display: function() {
		$('#caffeine span').html(coder.stats.caffeine);
		$('#interval').html((coder.stats.caffeineInterval / 1000));
		$('#intervalAmount').html(coder.stats.caffeinePerSecond);
		$('#perclick').html(coder.stats.caffeinePerClick);
		$('#adverts').html(coder.stats.adverts);
	},
	checkAchievements: function() {
		for (var a = 0; a < achievements.length; a++) {
			if (achievements[a].clicks == coder.stats.clicks) {
				$('#achievement').stop().animate({
					marginTop: -200
				}, 50);
				var bonus = "";
				if (achievements[a].bonus > 0) {
					bonus = "Bonus: " + achievements[a].bonus + " caffeine";
				}
				$('#achievement').html("<h1>x" + achievements[a].clicks + " CLICK ACHIEVEMENT!</h1><h2>" + achievements[a].name + "<sup><br />" + bonus + "</sup></h2>");
				coder.stats.caffeine += achievements[a].bonus;
				coder.display();
				$('#achievement').animate({
					marginTop: 18
				}, 350);
				$('#achievement').delay(4000).animate({
					marginTop: -200
				}, 350);
			}
		}
	},
	displayUpgrades: function() {
		$('.cssupgrade').each(function() {
			if ($(this).children('price').text() < coder.decimal(coder.stats.caffeine+25)) {
				$(this).css('display','block');
			} else {
				$(this).css('display','none');
			}
			if ($(this).children('price').text() > coder.decimal(coder.stats.caffeine)) {
				$(this).css({
					'background-color': '#666',
					'color': '#fff'
				});
			} else {
				$(this).css({
					'background-color': '#7f96c6',
					'color': '#111'
				});
			}
		});
		$('.animationupgrade').each(function() {
			if ($(this).children('price').text() < coder.decimal(coder.stats.caffeine+25)) {
				$(this).css('display','block');
			} else {
				$(this).css('display','none');
			}
			if ($(this).children('price').text() > coder.decimal(coder.stats.caffeine)) {
				$(this).css({
					'background-color': '#666',
					'color': '#fff'
				});
			} else {
				$(this).css({
					'background-color': '#7f96c6',
					'color': '#111'
				});
			}
		});
	},
	error: function(typ) {		
		var text = "";
		if (typ == "cash") {
			text = "You need more cash!";
		} else if (typ == "caffeine") {
			text = "You need more caffeine!";
		} else if (typ == "animation") {
			text = "You need more caffeine!";
		} else if (typ == "save") {
			text = "GAME SAVED!";
		} else if (typ == "load") {
			text = "GAME LOADED!";
		} else if (typ == "delete") {
			text = "GAME DELETED!";
		}
		$('#achievement').html("<h1 style='color:red; margin-bottom: 0px; padding-bottom: 0px; line-hieght: 16px;'>ERROR!</h1><h2 style='margin: 0px; padding: 0px; line-height: 22px; height: 16px;'><sup><br />" + text + "</sup></h2>");
		$('#achievement').animate({
			marginTop: 18
		}, 350, function() {
			setTimeout(function() {
				$('#achievement').stop().animate({
					marginTop: -200
				}, 350);
			}, 2500);
		});
	},
	checkUpgrades: function() {
		var compHTML = "";
		for (var u = 0; u < cssupgrades.length; u++) {
			var hidden = "none";
			if (cssupgrades[u].cost <= coder.stats.caffeine + 25) {
				hidden = "block";
			}
			var css = "";
			if (u <= 3) {
				css = "font-weight: bold;"; //css for website components
			}
			compHTML += '<a href="#" class="cssupgrade" style="display: ' + hidden + ';' + css + '" name="' + u + '" title="' + cssupgrades[u].group + '">' + cssupgrades[u].name + ' <price>' + cssupgrades[u].cost + '</price></a>';
		}
		$('#cssupgrades').append(compHTML);
		
		var compHTML = "";
		for (var u = 0; u < animationupgrades.length; u++) {
			var hidden = "none";
			if (animationupgrades[u].cost <= coder.stats.caffeine + 25) {
				hidden = "block";
			}
			compHTML += '<a href="#" class="animationupgrade" style="display: ' + hidden + ';" name="' + u + '">' + animationupgrades[u].name + ' <price>' + animationupgrades[u].cost + '</price></a>';
		}
		$('#animationupgrades').append(compHTML);
		
		var compHTML = "";
		for (var u = 0; u < otherupgrades.length; u++) {
			compHTML += '<a href="#" class="otherupgrade" name="' + u + '">' + otherupgrades[u].name + ' <price>&pound;' + otherupgrades[u].cost + '</price></a>'
		}
		$('#otherupgrades').append(compHTML);
			
		$('.cssupgrade').on('click', function(e) {
			e.preventDefault();
			var thisIndex = parseInt($(this).attr('name'));
			if (coder.stats.caffeine >= cssupgrades[thisIndex].cost) {
				coder.stats.editCount++;
				if (coder.stats.editCount == 1) {
					$('#notfound').css('display','none');
				}
				coder.stats.caffeine -= cssupgrades[thisIndex].cost;
				coder.stats.caffeine = coder.decimal(coder.stats.caffeine);
				
				var cssAttribute = cssupgrades[thisIndex].css;
				var target = cssupgrades[thisIndex].target;
				var effect = cssupgrades[thisIndex].effect;
				$(target).animate({
					opacity: 0
				}, 250, function() {
					$(this).css(cssAttribute , effect).animate({
						opacity: 1
					}, 250);
				});
				coder.stats.cssedits.push(thisIndex);
				coder.stats.totalUpgraded++;
				coder.calcPercentage();
				coder.display();
				coder.resize();
				$(this).remove();
				coder.displayUpgrades();
				if (cssupgrades[thisIndex].name == "Stat links") {
					$('nav#normal').css('display','none');
				}
				//cssupgrades.splice(thisIndex,1);
			} else {
				coder.error("caffeine");
			}
		});
		$('.animationupgrade').on('click', function(e) {
			e.preventDefault();
			var thisIndex = parseInt($(this).attr('name'));
			if (coder.stats.caffeine >= animationupgrades[thisIndex].cost) {
				coder.stats.editCount++;
				coder.stats.caffeine -= animationupgrades[thisIndex].cost;
				coder.stats.caffeine = coder.decimal(coder.stats.caffeine);
				
				var aniAttribute = animationupgrades[thisIndex].animation;
				var aniAttributeEnd = animationupgrades[thisIndex].animationend;
				var target = animationupgrades[thisIndex].target;
				
				$(target).on('mouseover', function() {
					$(this).stop().animate(aniAttribute, 150);
				}).on('mouseout', function() {
					$(this).stop().animate(aniAttributeEnd, 150);					
				});
				coder.stats.animationedits.push(thisIndex);
				coder.stats.totalUpgraded++;
				coder.calcPercentage();
				coder.display();
				coder.resize();
				$(this).remove();
				coder.displayUpgrades();
				//animationupgrades.splice(thisIndex,1);
			} else {
				coder.error("animation");
			}
		});
		$('.otherupgrade').on('click', function(e) {
			e.preventDefault();
			var ele = $(this);
			var thisIndex = parseInt($(this).attr('name'));
			if (coder.stats.cash >= otherupgrades[thisIndex].cost) {				
				coder.temp.cost = otherupgrades[thisIndex].cost;
				coder.temp.caffeinePerSecond = otherupgrades[thisIndex].caffeinePerSecond;
				coder.temp.caffeinePerClick = otherupgrades[thisIndex].caffeinePerClick;
				coder.temp.caffeineInterval = otherupgrades[thisIndex].caffeineInterval;
				coder.temp.adverts = otherupgrades[thisIndex].adverts;
				coder.temp.browser = otherupgrades[thisIndex].browser;
				//otherupgrades.splice(thisIndex,1);
				if (otherupgrades[thisIndex].name !== "Advertising") {
					$(this).remove();
				}
				
				coder.stats.cash -= coder.temp.cost;
				coder.stats.cash = coder.decimal(coder.stats.cash);
				if (coder.temp.caffeinePerSecond > 0) {
					coder.stats.caffeinePerSecond += coder.temp.caffeinePerSecond;
				}
				if (coder.temp.caffeinePerClick > 0) {
					coder.stats.caffeinePerClick += coder.temp.caffeinePerClick;
				}
				if (coder.temp.adverts > 0) {
					coder.stats.adverts += coder.temp.adverts;
					otherupgrades[thisIndex].cost = coder.decimal(otherupgrades[thisIndex].cost * 1.5);
					$(ele).children("price").html(otherupgrades[thisIndex].cost);
				}
				if (coder.temp.caffeineInterval > 0) {
					clearInterval(coder.caffeineTimer);
					coder.caffeineTimer = null;
					coder.stats.caffeineInterval -= coder.temp.caffeineInterval;
					
					coder.caffeineTimer = setInterval(function() {
						coder.stats.caffeine += coder.stats.caffeinePerSecond;
						coder.stats.caffeine = coder.decimal(coder.stats.caffeine);
						coder.display();
						coder.displayUpgrades();
					}, coder.stats.caffeineInterval);
				}
				if (coder.temp.browser.length > 0) {
					$('#browser').attr('src',coder.temp.browser + ".jpg");
				}
				coder.stats.otheredits.push(thisIndex);
				//coder.stats.totalUpgraded++;
				$('#cash span').html(coder.stats.cash);
				coder.resize();
				coder.calcPercentage();
			} else {
				coder.error("cash");
			}
			coder.displayUpgrades();
		});
	}
};

$('#cup').on('click', function() {
	$(this).stop().animate({
		paddingTop: 8
	}, 25, function() {
		coder.stats.caffeine += coder.stats.caffeinePerClick;
		coder.stats.totalCaffeine += coder.stats.caffeinePerClick;
		coder.stats.clicks++;
		coder.stats.caffeine = coder.decimal(coder.stats.caffeine);
		coder.stats.totalCaffeine = coder.decimal(coder.stats.totalCaffeine);
		coder.displayUpgrades();
		coder.checkAchievements();
		coder.display();
		$(this).stop().animate({
			paddingTop: 0
		}, 25);
	});
	return false;
});

$('#start').on('click', function(e) {
	coder.start();
	e.preventDefault();
});
$('#save').on('click', function(e) {
	coder.save();
	e.preventDefault();
});
$('#load').on('click', function(e) {
	coder.load();
	e.preventDefault();
});
$('#delete').on('click', function(e) {
	coder.deleteSave();
	e.preventDefault();
});

var cssOpen = 1;
$('#toggleCss').on('click', function() {
	$('#cssupgrades').slideToggle();
	if (cssOpen == 1) {
		$('#toggleCss span').html("+");
		cssOpen = 0;
	} else {
		$('#toggleCss span').html("-");
		cssOpen = 1;
	}
});
var animationOpen = 1;
$('#toggleAnimations').on('click', function() {
	$('#animationupgrades').slideToggle();
	if (animationOpen == 1) {
		$('#toggleAnimations span').html("+");
		animationOpen = 0;
	} else {
		$('#toggleAnimations span').html("-");
		animationOpen = 1;
	}
});
var otherOpen = 1;
$('#toggleOther').on('click', function() {
	$('#otherupgrades').slideToggle();
	if (otherOpen == 1) {
		$('#toggleOther span').html("+");
		otherOpen = 0;
	} else {
		$('#toggleOther span').html("-");
		otherOpen = 1;
	}
});

$('#stats-lb').on('click', function() {
	$('.lightboxcontent').html("");
	var statsHtml = "<h1>Statistics!</h1><p>";
	statsHtml += "<strong>Time Played:</strong> <span id='timePlayed'></span> seconds<br />";
	statsHtml += "<strong>Clicks:</strong> <span id='totalClicks'></span><br />";
	statsHtml += "<strong>Total Caffeine:</strong> <span id='totalCaffeine'></span><br />";
	statsHtml += "<strong>Total Cash:</strong> &pound;<span id='totalCash'></span><br />";
	statsHtml += "<strong>Total Site Edits:</strong> <span id='totalEdits'></span><br />";
	
	$('.lightboxcontent').html(statsHtml);
	
	$('#timePlayed').html(coder.stats.timePlayed);
	$('#totalCaffeine').html(coder.stats.totalCaffeine);
	$('#totalCash').html(coder.stats.totalCash);
	$('#totalEdits').html(coder.stats.editCount);
	$('#totalClicks').html(coder.stats.clicks);
	
	$('.lightboxbg').fadeIn(500);
	$('.lightboxcontent').fadeIn(500);
	$('.lightboxbg,.lightboxcontent').on('click', function() {
		$('.lightboxbg,.lightboxcontent').fadeOut(500);
		return false;
	});
	return false;
});

$(window).resize(function() {
	coder.resize();
}).scroll(function() {
	coder.resize();
});

if (window.addEventListener) {
    var keys = [],
        konami = "38,38,40,40,37,39,37,39,66,65";
    window.addEventListener("keydown", function(e){
        keys.push(e.keyCode);
        if (keys.toString().indexOf(konami) >= 0) {
			$('header').html("I used the Konami code to cheat!");
			coder.stats.caffeine += 9999;
			coder.stats.cash += 99.00;
			$('#cash span').html(coder.stats.cash);
			coder.display();
			coder.displayUpgrades();
			
            keys = [];
        };
    }, true);
};