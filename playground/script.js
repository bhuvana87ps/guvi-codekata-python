let pyodide = null
let editor = null

let currentProblemId = null


window.onload = async function(){

editor = CodeMirror.fromTextArea(
document.getElementById("editor"),
{
mode:"python",
theme:"dracula",
lineNumbers:true
}
)

await loadPython()
loadProblems()
updateProgress()

}


async function loadPython(){

document.getElementById("output").innerText="Loading Python..."

pyodide = await loadPyodide({
indexURL:"https://cdn.jsdelivr.net/pyodide/v0.23.4/full/"
})

document.getElementById("output").innerText="Python Ready"

}


const problems = [

{
id:1,
title:"Hello World",
difficulty:"Easy",
desc:"Print Hello World",
code:'print("Hello World")'
},

{
id:2,
title:"Square Number",
difficulty:"Easy",
desc:"Input number and print square",
code:'n=int(input())\nprint(n*n)'
},

{
id:3,
title:"Add Two Numbers",
difficulty:"Easy",
desc:"Add two numbers",
code:'a,b=map(int,input().split())\nprint(a+b)'
},

{
id:4,
title:"Reverse String",
difficulty:"Easy",
desc:"Reverse a string",
code:'s=input()\nprint(s[::-1])'
}

]


function loadProblems(){

const list=document.getElementById("problemList")
list.innerHTML=""

problems.forEach((p)=>{

const card=document.createElement("div")

card.className="card problem-card mb-2"
card.dataset.difficulty=p.difficulty

card.innerHTML=`
<div class="card-body">
<b>${p.id}. ${p.title}</b>
<span class="badge bg-success ms-2">${p.difficulty}</span>
</div>
`

card.onclick=()=>{

currentProblemId=p.id

document.getElementById("problemTitle").innerText=p.title
document.getElementById("problemDesc").innerText=p.desc

editor.setValue(p.code)

}

list.appendChild(card)

})

}



function searchProblems(){

const query=document.getElementById("searchBox").value.toLowerCase()

const cards=document.querySelectorAll(".problem-card")

cards.forEach(card=>{

if(card.innerText.toLowerCase().includes(query))
card.style.display="block"
else
card.style.display="none"

})

}


function filterProblems(){

const diff=document.getElementById("difficultyFilter").value

const cards=document.querySelectorAll(".problem-card")

cards.forEach(card=>{

if(diff=="" || card.dataset.difficulty==diff)
card.style.display="block"
else
card.style.display="none"

})

}


function clearOutput(){

document.getElementById("output").innerText=""

}


async function runCode(){

if(!pyodide){
document.getElementById("output").innerText="Python still loading..."
return
}

const code=editor.getValue()
const input=document.getElementById("userInput").value

const output=document.getElementById("output")

output.innerText="Running..."


try{

pyodide.runPython(`
import sys
from io import StringIO

_input = """${input}""".split("\\n")
_input_iter = iter(_input)

def input():
    return next(_input_iter)

sys.stdout = StringIO()
`)

await pyodide.runPythonAsync(code)

let result=pyodide.runPython("sys.stdout.getvalue()")

if(result.trim()==="")
result="Program executed successfully"

output.innerText=result

markSolved(currentProblemId)

}

catch(err){

output.innerText=err

}

}



function markSolved(problemId){

if(!problemId) return

let solved = JSON.parse(localStorage.getItem("solved") || "[]")

if(!solved.includes(problemId)){

solved.push(problemId)

localStorage.setItem("solved",JSON.stringify(solved))

}

updateProgress()

}



function updateProgress(){

let solved = JSON.parse(localStorage.getItem("solved") || "[]")

let total = problems.length

let percent = (solved.length/total)*100

document.getElementById("progressBar").style.width = percent+"%"

document.getElementById("progressText").innerText =
"Solved "+solved.length+" / "+total

}