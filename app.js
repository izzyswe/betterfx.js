export function html() {
  return {
    selected: (selctor, contxt = document) => {
      const elm = contxt.querySelector(selctor);
      if (elm === null) throw new Error("Missing/wrong element selected for " + selctor + ".\nLocation:"); return elm;  
    },
    selectedAll: (selctor, contxt = document) => {
      const elms = contxt.querySelectorAll(selctor);
      if(elms.length === 0) throw new Error("Missing/wrong Elements selected for " + selctor + ".\nLocation:"); return elms;  
    },
    trigger: (event, selected_elm, func) => selected_elm.addEventListener(event, func),
    logs: (output) => console.log(output),
    addTxt: (elm, content) => elm.textContent = content,
    //Note: dot notation (elm.style.color) is for fixed property names, bracket notation (elm.style[prop]) is for dynamic property names.
    // EDIT: switch to objects because why not enchance the experience
    addCSS: (elm, propVal) => {
      if (elm === null) throw new Error("Missing/wrong element selected for " + selctor + ".\nLocation:");
      return Object.assign(elm.style, propVal);   
    },
    DOM: {
      element_(elementName, ...body, { className, id, style, href, onClick, src }){
        const e = document.createElement(elementName)
        e.append(...body)
      }
    }
  }
}


export function utility(formCtrl) {
	const deepFreeze = (obj) => {
		if (obj === null || typeof obj !== "object") return obj;
		Object.keys(obj).forEach((key) => deepFreeze(obj[key]));
		return Object.freeze(obj);
	};
	// with the obj we get we will split the keyvalue pair and keep the key where it is but associate it with the function with its value
	const MapTo = (obj, fn) =>
		Object.fromEntries(Object.entries(obj).map(([key, val]) => [key, fn(val)]));
	return Object.freeze({
		mapToApi: MapTo,
		readonly: deepFreeze,
		//if the mapToApi is confusing for this, replace the fn(val) in your mind and change it to " val tranforms to formContext.ui.tabs.get(val)" and that what it is
		getTabsFrom: (mapObj) =>
			MapTo(mapObj, (val) => {
				const tab = formCtrl.ui.tabs.get(val);
				if (!tab) console.warn("[ USER ERROR ] -> Tab not found on form:", val);
				return tab;
			}),
		getControlsFrom: (mapObj) =>
			MapTo(mapObj, (val) => {
				const ctrl = formCtrl.getControl(val);
				if (!ctrl)
					console.warn("[ USER ERROR ] -> Control not found on form:", val);
				return ctrl;
			}),
		getAttributesFrom: (mapObj) =>
			MapTo(mapObj, (val) => {
				const attr = formCtrl.getAttribute(val);
				if (!attr)
					console.warn("[ USER ERROR ] -> Attribute not found on form:", val);
				return attr;
			}),
		getSectionsFrom: (tabName, mapObj) =>
			MapTo(mapObj, (secName) => {
				const tab = formCtrl.ui.tabs.get(tabName);
				if (!tab)
					console.warn(
						"[ USER ERROR ] -> Tab not found for section lookup:",
						tabName
					);
				const section = tab.sections.get(secName);
				if (!section) console.warn("[ USER ERROR ] -> Section not found:", secName);
				return section;
			}),
		//every value will be tranforms from "elm.setVisible(bool)" to eg: "is_SiuInvolved.setVisible(true/false))"
		changeVisibilityOf: (mapObj, bool) =>
			Object.values(mapObj).forEach((elm) => elm?.setVisible(bool)),
		//check if SOME(one) of the checkboxes are marked yes (true) or null
		validate: (arr) => arr.some((val) => val === true),
		isNull: (arr) => arr.some((val) => val === null),
		parse: (data) => {
			if (!data) return;
			if (data && typeof data === "object") {
				return data;
			}
			try {
				return JSON.parse(data);
			} catch (e) {
				// We re-throw so it still "Fails Fast," but with a better message
				throw new Error(
					`[ DATA ERROR ] -> Your JSON configuration is invalid. Check for missing commas or quotes or arrays: ${e.message}`
				);
			}
		},
		// this is a lazy evaluator, it will only evaluate once it is called to be the referee and check if it meets the 2 requirements
		lazyUnlock({ yesValues }, ...check) {
			return () => {
				const values = check.map((fn) => fn()),
					allOptsFilled = values.every(
						(val) => val !== null && String(val).trim() !== "" && val !== undefined
					),
					allCheckIsTrue = values.every((val) => yesValues.includes(val));
				return allOptsFilled && allCheckIsTrue;
			};
		}
	});
}