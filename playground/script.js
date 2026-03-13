/* -------------------------
CODE EDITOR
------------------------- */

let editor = CodeMirror.fromTextArea(
document.getElementById("editor"),
{
mode: "python",
theme: "dracula",
lineNumbers: true
}
);

/* -------------------------
LOAD PYTHON (PYODIDE)
------------------------- */

let pyodide = null;

async function loadPython(){

document.getElementById("output").innerText = "Loading Python...";

pyodide = await loadPyodide({
indexURL: "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/"
});

document.getElementById("output").innerText = "Python Ready";

}

loadPython();

/* -------------------------
PROBLEM LIST
------------------------- */

const problems = [

{
title:"Hello World",
difficulty:"Easy",
desc:"Print Hello World",
code:'print("Hello World")'
},

{
title: "Square Number",
desc: "Input a number and print its square",
code: 'n=int(input())\nprint(n*n)'
},

{
title: "Add Two Numbers",
desc: "Input two numbers and print their sum",
code: 'a,b=map(int,input().split())\nprint(a+b)'
},

{
title: "Reverse String",
desc: "Input a string and print reverse",
code: 's=input()\nprint(s[::-1])'
}

];

/* -------------------------
SIDEBAR PROBLEMS
------------------------- */

const list = document.getElementById("problemList");

problems.forEach((p,i)=>{

const card = document.createElement("div");

card.className = "card problem-card mb-2";

card.innerHTML = `
<div class="card-body">
<b>${i+1}. ${p.title}</b>
<span class="badge bg-success ms-2">${p.difficulty}</span>
</div>
`;

card.onclick = () => {

document.getElementById("problemTitle").innerText = p.title;

document.getElementById("problemDesc").innerText = p.desc;

editor.setValue(p.code);

};

list.appendChild(card);

});

/* -------------------------
RUN PYTHON CODE
------------------------- */
async function runCode(){

const output = document.getElementById("output");
const inputText = document.getElementById("userInput").value;

if(!pyodide){
output.innerText="Python loading...";
return;
}

let code = editor.getValue();

try{

let wrapped = `
import sys
from io import StringIO

input_data = """${inputText}""".split("\\n")
input_index = 0

def input():
    global input_index
    value = input_data[input_index]
    input_index += 1
    return value

buffer = StringIO()
sys.stdout = buffer

${code}

sys.stdout = sys.__stdout__
buffer.getvalue()
`;

let result = await pyodide.runPythonAsync(wrapped);

output.innerText = result || "Code executed";

}
catch(e){
output.innerText = e;
}

}