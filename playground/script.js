let editor = CodeMirror.fromTextArea(
document.getElementById("editor"),
{
mode:"python",
theme:"dracula",
lineNumbers:true
}
);

let pyodide;
let pyodideReady=false;

async function loadPython(){

document.getElementById("output").innerText="Loading Python...";

pyodide = await loadPyodide();

pyodideReady=true;

document.getElementById("output").innerText="Python ready!";
}

loadPython();

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
desc:"Input a string and reverse it",
code:'s=input()\nprint(s[::-1])'
}

];

const list=document.getElementById("problemList");

problems.forEach((p,i)=>{

const card=document.createElement("div");

card.className="card problem-card mb-2";

card.innerHTML=`
<div class="card-body">
<b>${i+1}. ${p.title}</b>
</div>
`;

card.onclick=()=>{

document.getElementById("problemTitle").innerText=p.title;

document.getElementById("problemDesc").innerText=p.desc;

editor.setValue(p.code);

};

list.appendChild(card);

});

async function runCode(){

if(!pyodideReady){

document.getElementById("output").innerText="Python loading...";
return;

}

const code=editor.getValue();

try{

let result=await pyodide.runPythonAsync(code);

document.getElementById("output").innerText=result ?? "Code executed";

}

catch(error){

document.getElementById("output").innerText=error;

}

}