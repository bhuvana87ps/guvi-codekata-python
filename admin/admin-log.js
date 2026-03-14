function viewLogs(){

let logs = JSON.parse(localStorage.getItem("analytics") || "[]")

console.table(logs)

}

function clearLogs(){

localStorage.removeItem("analytics")

}