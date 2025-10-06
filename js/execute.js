let bplrNotice = document.getElementById("bplrNotice");

document.getElementById("clearBplrLocalStorage").addEventListener("click", function () {
    bplrNotice.innerHTML = "Local Storage cleared!";
    setTimeout(function(){bplrNotice.innerHTML = "";},3000);
});

document.getElementById("bplrPlayerInfo").addEventListener("click", function () {
    bplrNotice.innerHTML = "Check browser console for details.";
    setTimeout(function(){bplrNotice.innerHTML = "";},3000);
});

document.getElementById("playerInfoEmbed").addEventListener("click", function () {
    bplrNotice.innerHTML = "Check table for details.";
    setTimeout(function(){bplrNotice.innerHTML = "";},3000);
});

document.getElementById("enableDebug").addEventListener("click", function () {
    bplrNotice.innerHTML = "Debug mode enabled/disabled!";
    setTimeout(function(){bplrNotice.innerHTML = "";},3000);
});