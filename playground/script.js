let pyodide = null
let editor = null

let currentProblemId = null
let problems = []   // problems will come from JSON


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
await loadProblems()
updateProgress()

}


/* -------------------------
LOAD PYTHON
------------------------- */

async function loadPython(){

document.getElementById("output").innerText="Loading Python..."

pyodide = await loadPyodide({
indexURL:"https://cdn.jsdelivr.net/pyodide/v0.23.4/full/"
})

document.getElementById("output").innerText="Python Ready"

}


/* -------------------------
LOAD PROBLEMS FROM JSON
------------------------- */

async function loadProblems(){

try{

const res = await fetch("../problems.json")

problems = await res.json()

renderProblems()

}
catch(err){

console.error("Problem loading failed",err)

}

}


/* -------------------------
RENDER SIDEBAR PROBLEMS
------------------------- */

function renderProblems(){

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


/* -------------------------
SEARCH
------------------------- */

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


/* -------------------------
FILTER DIFFICULTY
------------------------- */

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


/* -------------------------
CLEAR OUTPUT
------------------------- */

function clearOutput(){

document.getElementById("output").innerText=""

}


/* -------------------------
RUN PYTHON CODE
------------------------- */

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


/* -------------------------
MARK SOLVED
------------------------- */

function markSolved(problemId){

if(!problemId) return

let solved = JSON.parse(localStorage.getItem("solved") || "[]")

if(!solved.includes(problemId)){

solved.push(problemId)

localStorage.setItem("solved",JSON.stringify(solved))

}

updateProgress()

}


/* -------------------------
UPDATE PROGRESS BAR
------------------------- */

function updateProgress(){

let solved = JSON.parse(localStorage.getItem("solved") || "[]")

let total = problems.length || 1

let percent = (solved.length/total)*100

document.getElementById("progressBar").style.width = percent+"%"

document.getElementById("progressText").innerText =
"Solved "+solved.length+" / "+total

}


/* -------------------------
TEST CASE ENGINE
------------------------- */

async function runTestCases(code,tests){

for(let t of tests){

let input = t.input
let expected = t.output

let result = await executePython(code,input)

if(result.trim() != expected.trim())
return false

}

return true

}