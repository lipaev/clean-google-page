//create button
let button_div = document.createElement("div")
button_div.id = "hide_button"
button_div.role = "listitem"
let button_label = document.createElement("label")
button_label.innerText = "Hide "
let button_input = document.createElement("input")
button_input.type = "checkbox"
button_input.checked = true
button_label.appendChild(button_input)
button_div.appendChild(button_label)


if (navigator.userAgent.includes("Android")) {
    //For android
    let ai_answer_andr;

    let iId = setInterval(() => {
        ai_answer_andr = document.querySelectorAll("#rso > div:has(div[role='heading'][aria-level='2'], span[role='heading'][aria-level='2'])")

        if (ai_answer_andr && browser.runtime.getFrameId(window) === 0) {
            chrome.runtime.sendMessage({});
            hide_elements();
            clearInterval(iId)
        };
    }, 20)

    function hide_elements() {
        //add classes by event
        button_input.addEventListener("change", () => {
            if (button_input.checked) {
                for (let el of ai_answer_andr) {
                    let headings = ["AI Overview", "People also ask", "People also search for"]
                    if (headings.includes(
                        el.querySelector("div[role='heading'][aria-level='2']")?.textContent
                    ) || headings.includes(
                        el.querySelector("span[role='heading'][aria-level='2']")?.textContent
                    )) {
                        el?.classList.add("hidden")
                    }
                }
                button_label.classList.add("checked")
            } else {
                for (let el of ai_answer_andr) {
                    let headings = ["AI Overview", "People also ask", "People also search for"]
                    if (headings.includes(
                        el.querySelector("div[role='heading'][aria-level='2']")?.textContent
                    ) || headings.includes(
                        el.querySelector("span[role='heading'][aria-level='2']")?.textContent
                    )) {
                        el?.classList.remove("hidden")
                    }
                }
                button_label.classList.remove("checked")
            }
        })
        button_input.dispatchEvent(new Event('change', { bubbles: true }));

        let insert_in_andr = document.querySelector("#main div[role=list]:has(div[role='listitem'])")
        if (!document.querySelector("#hide_button")) {
            insert_in_andr?.prepend(button_div)
            button_label.classList.add("android")
        } else {
            document?.querySelector("#hide_button").replaceWith(button_div)
        }
    }

} else {
    //For other platforms
    let paa, ai_answer, ai_answer2;

    let iId = setInterval(() => {

        ai_answer = document.querySelector("#rcnt > style + div")
        ai_answer2 = document.querySelector("#rso > div:has(#m-x-content svg[aria-hidden='true'] ~ div[role='heading'])")
        //"People also ask"
        paa = document.querySelector("#rso > div > div:has(div[class][data-rpos] > div[jsname][data-initq] > div > div[jsname])")

        if ((ai_answer || ai_answer2 || paa) && browser.runtime.getFrameId(window) === 0) {
            chrome.runtime.sendMessage({});
            hide_elements();
            clearInterval(iId)
        };

    }, 20)


    function hide_elements() {
        //add classes by event
        button_input.addEventListener("change", () => {
            if (button_input.checked) {
                ai_answer?.classList.add("hidden")
                ai_answer2?.classList.add("hidden")
                paa?.classList.add("hidden")
                button_label.classList.add("checked")
            } else {
                ai_answer?.classList.remove("hidden")
                ai_answer2?.classList.remove("hidden")
                paa?.classList.remove("hidden")
                button_label.classList.remove("checked")
            }
        })
        button_input.dispatchEvent(new Event('change', { bubbles: false }));

        //insert button
        let insert_in = document.querySelector("div[role='list']")
        if (!document.querySelector("#hide_button")) {
            insert_in?.prepend(button_div)
        } else {
            document?.querySelector("#hide_button").replaceWith(button_div)
        }
    }
}
