let pyodide = null
let editor = null


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

}


/* LOAD PYTHON */

async function loadPython(){

document.getElementById("output").innerText="Loading Python..."

pyodide = await loadPyodide({
indexURL:"https://cdn.jsdelivr.net/pyodide/v0.23.4/full/"
})

document.getElementById("output").innerText="Python Ready"

}


/* PROBLEMS */

const problems = [

{
title:"Hello World",
difficulty:"Easy",
desc:"Print Hello World",
code:'print("Hello World")'
},

{
title:"Square Number",
difficulty:"Easy",
desc:"Input a number and print its square",
code:'n=int(input())\nprint(n*n)'
},

{
title:"Add Two Numbers",
difficulty:"Easy",
desc:"Input two numbers and print sum",
code:'a,b=map(int,input().split())\nprint(a+b)'
},

{
title:"Reverse String",
difficulty:"Easy",
desc:"Reverse a string",
code:'s=input()\nprint(s[::-1])'
}

]


/* LOAD SIDEBAR */

function loadProblems(){

const list=document.getElementById("problemList")

problems.forEach((p,i)=>{

const card=document.createElement("div")

card.className="card problem-card mb-2"

card.innerHTML=`
<div class="card-body">
<b>${i+1}. ${p.title}</b>
<span class="badge bg-success ms-2">${p.difficulty}</span>
</div>
`

card.onclick=()=>{

document.getElementById("problemTitle").innerText=p.title
document.getElementById("problemDesc").innerText=p.desc
editor.setValue(p.code)

}

list.appendChild(card)

})

}


/* SEARCH */

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


/* CLEAR OUTPUT */

function clearOutput(){
document.getElementById("output").innerText=""
}


/* RUN PYTHON */

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

data = """${input}""".splitlines()
data_iter = iter(data)

def input():
    return next(data_iter)

sys.stdout = StringIO()
`)

await pyodide.runPythonAsync(code)

let result=pyodide.runPython("sys.stdout.getvalue()")

if(result.trim()==="")
result="Program executed successfully"

output.innerText=result

}

catch(err){

output.innerText=err

}

}