let editor;
let pyodide;

require.config({
paths:{
vs:"https://unpkg.com/monaco-editor@0.34.0/min/vs"
}
});

require(["vs/editor/editor.main"],function(){

editor = monaco.editor.create(
document.getElementById("editor"),
{
value:`print("Hello Python Playground")`,
language:"python",
theme:"vs-dark"
}
);

});

async function loadPyodideRuntime(){

pyodide = await loadPyodide();

}

loadPyodideRuntime();

async function runCode(){

let code = editor.getValue();

let output = document.getElementById("output");

try{

let result = await pyodide.runPythonAsync(code);

output.textContent = result;

}
catch(err){

output.textContent = err;

}

}