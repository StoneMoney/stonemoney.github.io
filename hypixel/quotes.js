// JavaScript Document
var quotes=new Array();
quotes[0] = "At least its not a small bag of coins";
quotes[1] = "Decreases the chances of you falling off the map by 20%!";
quotes[2] = "Still not as long as the sales for ranks";
quotes[3] = "Has science gone too far!?"
quotes[4] = "Came out sooner than guild fortresses"
quotes[5] = "More updates than cops and crims"
quotes[6] = "I swear these are random"
quotes[7] = "Everyone, Get in here!"
quotes[8] = "More mysterious then mystery boxes"

var q = quotes.length;
var whichquote=Math.round(Math.random()*(q-1));
function showquote(){document.write(quotes[whichquote]);}
showquote();