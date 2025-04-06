let globalText = "";
let globalCount = 0;
let isInitialized = false;
let isVisible = false;

function createInnerElem(count) {
    return (
        '<p class="pElem">文字数</p>' +
        '<div id="borderElem"></div>' +
        `<p id="counter" class="pElem">${count}</p>`
    );
}

function countWords(str) {
    const codePoints = Array.from(str);
    const filteredCodePoints = codePoints.filter((codePoint) => {
        const code = codePoint.codePointAt(0).toString(16);
        return code !== "20" && code !== "3000";
    });
    globalCount = filteredCodePoints.length;
    console.log("count:", globalCount);
}

function showCountUI() {
    const div = document.getElementById("count");
    if (div) {
        div.innerHTML = createInnerElem(globalCount);
    } else {
        const newDiv = document.createElement("div");
        newDiv.id = "count";
        newDiv.style.position = "fixed";
        newDiv.style.display = "flex";
        newDiv.style.flexDirection = "row";
        newDiv.style.gap = "5px";
        newDiv.style.bottom = "5px";
        newDiv.style.left = "5px";
        newDiv.style.fontSize = "1rem";
        newDiv.style.borderRadius = "10px";
        newDiv.style.backgroundColor = "#ffffff";
        newDiv.style.padding = "8px";
        newDiv.innerHTML = createInnerElem(globalCount);
        document.body.appendChild(newDiv);
    }

    const border = document.getElementById("borderElem");
    if (border) {
        border.style.backgroundColor = "#6200EA";
        border.style.width = "2px";
    }

    const pElem = document.getElementsByClassName("pElem");
    for (let i = 0; i < pElem.length; i++) {
        pElem[i].style.margin = "0";
        pElem[i].style.color = "#6200EA";
        pElem[i].style.fontWeight = "bold";
    }

    const counter = document.getElementById("counter");
    if (counter) {
        counter.style.width = "2rem";
        counter.style.textAlign = "right";
    }
}

//初期化
function initializeOnce() {
    if (isInitialized) return;

    document.onselectionchange = () => {
        globalText = document.getSelection().toString();
        countWords(globalText);
        if (isVisible) {
            showCountUI();
        }
    };

    document.addEventListener("mouseup", () => {
        globalText = document.getSelection().toString();
        countWords(globalText);
        if (isVisible) {
            showCountUI();
        }
    });

    addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            const div = document.getElementById("count");
            if (div) {
                console.log("remove elem");
                div.remove();
                isVisible = false;
            }
        }
    });

    isInitialized = true;
}

//拡張機能のポップアップからメッセージが送られたら実行する
window.addEventListener("message", (event) => {
    if (event.data.type === "TOGGLE_ELEMENT") {
        initializeOnce();

        isVisible = !isVisible;
        if (isVisible) {
            countWords(globalText);
            showCountUI();
        } else {
            const div = document.getElementById("count");
            if (div) div.remove();
        }
    }
});
