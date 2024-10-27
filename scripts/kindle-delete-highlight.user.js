// Go to https://read.amazon.com/notebook
// Select your book and fire this script to delete all highlights

// Ref
// https://github.com/iwstkhr/kindle-highlight-deleter

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

function randomAroundX(x) {
    return Math.random() * 200 - 100 + x;
}

(async () => {
    // Select all highlight rows
    //let triggers = [document.querySelector("#kp-notebook-annotations .a-row a.a-popover-trigger")]
    let triggers = document.querySelectorAll("#kp-notebook-annotations .a-row a.a-popover-trigger")

    for (const trigger of triggers) {

        // Show a popup menu.
        trigger.click();
        await sleep(randomAroundX(500));

        // Select the delete highlight item
        let deleteHighlight = document.querySelector("div[class~=a-popover][role=dialog] a#deletehighlight");
        if (!deleteHighlight) {
            console.warn('a#deletehighlight was not found.');
            continue;
        }
        // Get Highlight Name
        const highlightName = deleteHighlight.attributes.getNamedItem('value').value;
        deleteHighlight.click();
        await sleep(randomAroundX(500));

        // Submit the confirmation
        let deleteHighlightAnnounce=document.querySelector("div[class~=a-popover][role=dialog] #deleteHighlight-announce")
        if (!deleteHighlightAnnounce) {
            console.warn('#deleteHighlight was not found.');
            continue;
        }
        deleteHighlightAnnounce.click();

        console.info(`${highlightName} was deleted.`)
        await sleep(randomAroundX(3000));

    }
})();
