let ai_answer = document.querySelector("#rcnt > style + div")

//questions about the query
let qat = document.querySelector("#rso > div[class]:has(div[class][data-rpos] > div[jsname][data-initq] > div > div[jsname])")

if ((ai_answer || qat) && browser.runtime.getFrameId(window) === 0) {
    chrome.runtime.sendMessage({});
    hide_elements();
};

function hide_elements() {

    //create button
    let div_container = document.createElement("div")
    div_container.id = "hide_button"
    div_container.role = "listitem"
    let button_label = document.createElement("label")
    button_label.innerText = "Hide "
    let hide_button = document.createElement("input")
    hide_button.type = "checkbox"
    hide_button.checked = true

    //add classes by event
    hide_button.addEventListener("change", () => {
        if (hide_button.checked) {
            ai_answer?.classList.add("hidden")
            qat?.classList.add("hidden")
            button_label.classList.add("checked")
        } else {
            ai_answer?.classList.remove("hidden")
            qat?.classList.remove("hidden")
            button_label.classList.remove("checked")
        }
    })
    hide_button.dispatchEvent(new Event('change', { bubbles: true }));


    //insert button
    button_label.appendChild(hide_button)
    div_container.appendChild(button_label)
    let insert_in = document.querySelector("div[role='list']")
    let insert_before = document.querySelector("div[role='list'] > div:first-child")
    if (!document.querySelector("#hide_button")) {
        insert_in.insertBefore(div_container, insert_before)
    } else {
        document.querySelector("#hide_button").replaceWith(div_container)
    }
}