function updateLeaderboard(){

let solved = JSON.parse(localStorage.getItem("solved") || "[]")

document.getElementById("leaderSolved").innerText = solved.length

}