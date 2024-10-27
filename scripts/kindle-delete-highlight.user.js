// Go to https://read.amazon.com/notebook
// Select your book and fire this script to delete all highlights

// Ref
// https://github.com/iwstkhr/kindle-highlight-deleter

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

function randomAroundX(x) {
    return Math.random() * 200 - 100 + x;
}


// Select all highlight rows
//let triggers = [document.querySelector("#kp-notebook-annotations .a-row a.a-popover-trigger")]
let triggers = document.querySelectorAll("#kp-notebook-annotations .a-row a.a-popover-trigger")

for (const trigger of triggers) {

    // Show a popup menu.
    trigger.click();
    await sleep(randomAroundX(500));

    // Select the delete highlight item
    let objectType = "highlight"
    let deleteHighlightOrNote = document.querySelector("div[class~=a-popover][role=dialog] a#deletehighlight");
    if (!deleteHighlightOrNote) {
        objectType = "note"
        deleteHighlightOrNote = document.querySelector("div[class~=a-popover][role=dialog] a#deletenote");
        if (!deleteHighlightOrNote) {
            console.warn('a#deletehighlight or a#deletenote was not found.');
            continue;
        }
    }
    // Get Highlight Name
    const highlightName = deleteHighlightOrNote.attributes.getNamedItem('value').value;
    deleteHighlightOrNote.click();
    await sleep(randomAroundX(500));

    // Submit the confirmation
    let subSelector
    if (objectType === "highlight") {
        subSelector = "#deleteHighlight-announce"
    } else {
        subSelector = "#deleteNote-announce"
    }
    let deleteModal = document.querySelector(`div[class~=a-popover][role=dialog] ${subSelector}`);
    if (!deleteModal) {
        console.warn(`${objectType} ${subSelector} was not found.`);
        continue;
    }
    deleteModal.click();

    console.info(`${highlightName} was deleted.`)
    await sleep(randomAroundX(100));

}

