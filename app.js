const selected = (selctor, contxt = document) => {
  const elm = contxt.querySelector(selctor);
  if (elm === null) throw new Error("Missing/wrong element selected for " + selctor + ".\nLocation:"); return elm;  }
const selectedAll = (selctor, contxt = document) => {
  const elms = contxt.querySelectorAll(selctor);
  if(elms.length === 0) throw new Error("Missing/wrong Elements selected for " + selctor + ".\nLocation:"); return elms;  }
const doEvent = (event, selected_elm, func) => selected_elm.addEventListener(event, func);
const logs = (output) => console.log(output)
const addTxt = (elm, content) => elm.textContent = content;
//Note: dot notation (elm.style.color) is for fixed property names, bracket notation (elm.style[prop]) is for dynamic property names.
// EDIT: switch to objects because why not enchance the experience
const addCSS = (elm, propVal) => {
    if (elm === null) throw new Error("Missing/wrong element selected for " + selctor + ".\nLocation:");
    return Object.assign(elm.style, propVal);   }
const loop = (start, symbol, end, body) => {
  switch(symbol){
    case ">":
      if(start < end) throw new Error(`${start} is less than ${end}. \nLocation:`);
        for(let i = start; i > end; i++){ body(i) };
      break;
    case ">=":
      if(start < end) throw new Error(`${start} is less than ${end}. \nLocation:`);
        for(let i = start; i >= end; i++){ body(i) };
      break;
    case "<":
      if(start > end) throw new Error(`${start} is greater than ${end}. \nLocation:`);
        for(let i = start; i > end; i++){ body(i) };
      break;
    case "<=":
      if(start > end) throw new Error(`${start} is greater than ${end}. \nLocation:`); 
        for(let i = start; i <= end; i++){ body(i); }
      break;
    default:
      logs("please enter in symbol");
  }
}
const html = (tagName, body) => {
  const elmClass = class extends HTMLElement {
    connectedCallback() {
      // 'this' is the HTML element
      // pass it to the 'body' params callback function to add HTML
      body(this);
    }
  };
  customElements.define(tagName, elmClass);
};
//SAMPLE CODE
// const h1 = selected("div h1");
// doEvent("click", h1, () => {
//   addTxt(h1, "hello")
//   addCSS(h1, {
//     color: "red",
//     backgroundColor: "blue",
//     fontSize: "16px"
//   })
//   loop(0, ">", 5, (i) => {
//     logs(i)
//   });
// });

// html('my-element', (elm) => {
//   elm.innerHTML = `
//     <h1>Hello World</h1>
//     <p>This is rendered in the DOM.</p>
//     <p>and it is working as expected</p>
//   `;
// });
