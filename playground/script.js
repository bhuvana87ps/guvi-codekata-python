let editor = CodeMirror.fromTextArea(
document.getElementById("editor"),
{
mode: "python",
theme: "dracula",
lineNumbers: true
}
);

let pyodide = null;

/* Load Python */

async function loadPython(){

document.getElementById("output").innerText = "Loading Python...";

pyodide = await loadPyodide({
indexURL: "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/"
});

document.getElementById("output").innerText = "Python ready!";
}

loadPython();

/* Problem List */

const problems = [

{
title:"Hello World",
desc:"Print Hello World",
code:'print("Hello World")'
},

{
title:"Square Number",
desc:"Input a number and print square",
code:'n=int(input())\nprint(n*n)'
},

{
title:"Add Two Numbers",
desc:"Input two numbers and print sum",
code:'a,b=map(int,input().split())\nprint(a+b)'
},

{
title:"Reverse String",
desc:"Input a string and print reverse",
code:'s=input()\nprint(s[::-1])'
}

];

/* Sidebar */

const list = document.getElementById("problemList");

problems.forEach((p,i)=>{

const card = document.createElement("div");

card.className = "card problem-card mb-2";

card.innerHTML =
`<div class="card-body"><b>${i+1}. ${p.title}</b></div>`;

card.onclick = () => {

document.getElementById("problemTitle").innerText = p.title;

document.getElementById("problemDesc").innerText = p.desc;

editor.setValue(p.code);

};

list.appendChild(card);

});

/* Run Code */

async function runCode(){

if(!pyodide){
document.getElementById("output").innerText = "Python still loading...";
return;
}

let code = editor.getValue();

try{

let wrappedCode = `
import sys
from io import StringIO

buffer = StringIO()
sys.stdout = buffer

${code}

output = buffer.getvalue()
output
`;

let result = await pyodide.runPythonAsync(wrappedCode);

document.getElementById("output").innerText = result;

}

catch(error){

document.getElementById("output").innerText = error;

}

}
