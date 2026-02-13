const selected = (selector, context = document) => {
  if(document.querySelector(selector) === null){
    throw new Error("Missing or Incorrect Element selected for " + selector + ".\nLocation:")
  }else{
    return context.querySelector(selector);
  }
}
const selectedAll = (selector, context = document) => {
  if(document.querySelectorAll(selector) === null){
    throw new Error("Missing or Incorrect Element selected for " + selector + ".\nLocation:")
  }else{
    context.querySelectorAll(selector);
  }
}

const doEvent = (event, selected_Element, func) => selected_Element.addEventListener(event, func);
const terminal = (output) => console.log(output)
const uplp = (starting_point, end_point, body) => {
  if(starting_point > end_point){
    throw new Error(`${starting_point} is greater than ${end_point}. \nLocation:`)
  }else{
    for(let i = starting_point; i < end_point; i++){
      body(i)
    }
  }
}
const downlp = (starting_point, end_point, body) => {
  if(starting_point > end_point){
    throw new Error(`${starting_point} is less than ${end_point}. \nLocation:`)
  }else{
    for(let i = starting_point; i < end_point; i--){
      body(i)
    }
  }
}



terminal("hello")

const h1 = selected("div h1");
doEvent("click", h1, () => {
  h1.textContent = "Hello";
  uplp(0, 5, (i) => {
    terminal(i)
  });
});
