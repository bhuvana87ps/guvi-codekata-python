
/* -----------------------------------
Basic Local Analytics Tracker
Stores page visits in localStorage
----------------------------------- */

function trackPage(page){

    let logs = JSON.parse(localStorage.getItem("analytics") || "[]");

    logs.push({
        page: page,
        time: new Date().toISOString()
    });

    localStorage.setItem("analytics", JSON.stringify(logs));

}


/* -----------------------------------
View logs in browser console
Only developer can see this
----------------------------------- */

function viewLogs(){

    let logs = JSON.parse(localStorage.getItem("analytics") || "[]");

    console.table(logs);

}


/* -----------------------------------
Clear analytics logs
----------------------------------- */

function clearLogs(){

    localStorage.removeItem("analytics");
    console.log("Analytics logs cleared");

}


/* -----------------------------------
Auto-track current page
----------------------------------- */

document.addEventListener("DOMContentLoaded", function(){

    let page = window.location.pathname;

    trackPage(page);

});


/* -----------------------------------
Dev Mode indicator
----------------------------------- */

if(location.hostname !== "bhuvana87ps.github.io"){
    console.log("Developer Mode Enabled");
}
