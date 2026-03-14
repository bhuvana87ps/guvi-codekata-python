async function loadAnalytics(){

const res = await fetch("../analytics_data.json")

const data = await res.json()

document.getElementById("totalVisits").innerText = data.length

const pages = {}

data.forEach(x=>{
pages[x.page] = (pages[x.page] || 0) + 1
})

document.getElementById("uniquePages").innerText =
Object.keys(pages).length

const labels = Object.keys(pages)
const values = Object.values(pages)

new Chart(
document.getElementById("visitChart"),
{
type:"bar",

data:{
labels:labels,
datasets:[{
label:"Visits",
data:values
}]
}

})
}

loadAnalytics()