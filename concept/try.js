import * as dom from "../app.js"

// SAMPLE CODE
dom.html('my-element', (elm) => {
  elm.innerHTML = `
    <div>
      <h1>Hello World</h1>
      <p>This is rendered in the DOM.</p>
      <p>
        and it is working as expected, infact it works so well
        you could write all you want in here and it is probably fine.
        you're fine, i am fine, we are all fine!
      </p>
    </div>
  `;

  const h1 = dom.selected("div h1");
  dom.trigger("click", h1, () => {
    dom.addTxt(h1, "clicked!")
    dom.addCSS(h1, {
      color: "red",
      backgroundColor: "blue",
      fontSize: "16px"
    });
    dom.loop(0, ">", 5, (i) => {
      dom.logs(i)
    });
  });
});
