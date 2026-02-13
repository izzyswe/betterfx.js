const selected = (selctor, contxt = document) => {
  const elm = contxt.querySelector(selctor);
  if (elm === null) throw new Error("Missing/wrong element selected for " + selctor + ".\nLocation:"); return elm;
}
const selectedAll = (selctor, contxt = document) => {
  const elms = contxt.querySelectorAll(selctor);
  if(elms.length === 0) throw new Error("Missing/wrong Elements selected for " + selctor + ".\nLocation:"); return elms;
}
const doEvent = (event, selected_elm, func) => selected_elm.addEventListener(event, func);
const logs = (output) => console.log(output)
const addTxt = (elm, content) => elm.textContent = content;
//Note: dot notation (elm.style.color) is for fixed property names, bracket notation (elm.style[prop]) is for dynamic property names.
const addCSS = (elm, propVal) => {
    if (elm === null) throw new Error("Missing/wrong element selected for " + selctor + ".\nLocation:");
    return Object.assign(elm.style, propVal);
};

const uploop = (start, end, body) => {
  if(start > end){
    throw new Error(`${start} is greater than ${end}. \nLocation:`)
  }else{
    for(let i = start; i < end; i++){
      body(i)
    }
  }
}
const dwnloop = (start, end, body) => {
  if(start > end){
    throw new Error(`${start} is less than ${end}. \nLocation:`)
  }else{
    for(let i = start; i < end; i--){
      body(i)
    }
  }
}


//SAMPLE CODE
// const h1 = selected("div h1");
// doEvent("click", h1, () => {
//   addTxt(h1, "hello")
//   addCSS(h1, {
//     color: "red",
//     backgroundColor: "blue",
//     fontSize: "16px"
//   })
//   uploop(0, 5, (i) => {
//     logs(i)
//   });
// });
