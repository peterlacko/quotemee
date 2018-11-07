'use strict';

async function saveTextToDb(textSelection) {
    const url = window.location.href;
    const title = document.title;
    const content = await chrome.storage.local.get();
    console.log('oldContent', content);
    const newEntry = {};
    newEntry[String(Date.now())] = {
        quote: textSelection,
        url,
        title
    }
    chrome.storage.local.set(newEntry);
    // let updatedContent = {};

    // if (Object.keys(content).length === 0) {
    //     updatedContent[url] = {
    //         title,
    //         quotes: [textSelection]
    //     }
    // } else {
    //     const { quotes } = content[url];
    //     quotes.push(textSelection);
    //     content[url].quotes = quotes;
    //     updatedContent = content;
    // }
    // console.log('updated cont', updatedContent);

    // chrome.storage.local.set(updatedContent);
}

function init() {
    let currentTextSelection;

    function hideIcon() {
        icon.style.display = 'none';
    }

    function createIcon() {
        // const selectedText = document.getSelection().toString();
        // console.log('selected text', selectedText);
        const elem = document.createElement('div');
        const imageUrl = chrome.extension.getURL('icons/two-quotes-32.png');
        console.log('imageurl', imageUrl);

        elem.setAttribute('class', 'quotemee-icon');
        elem.setAttribute('style', 'background-image: url(' + imageUrl + ')');
        elem.setAttribute('title', 'Click to save selected text');
        elem.addEventListener('click', () => saveTextToDb(currentTextSelection), false);
        elem.addEventListener('click', hideIcon, false);

        document.body.appendChild(elem);
        return elem;
    }

    // console.log('init called');

    function showQuotemeeIcon(e) {
        icon.style.top = e.clientY + window.scrollY + 'px';
        icon.style.left = e.clientX + window.scrollX + 'px';
        icon.style.display = 'block';
        window.setTimeout(() => {
            icon.style.display = 'none';
        }, 4000);
        console.log('showing icon', icon);
    }

    const icon = createIcon();

    function handleSelection(e) {
        const selectedText = document.getSelection().toString();
        if (selectedText.length > 5) {
            currentTextSelection = selectedText;
            showQuotemeeIcon(e);
        }
    }

    document.addEventListener('mouseup', handleSelection, false);
}

document.addEventListener('DOMContentLoaded', () => init(), false);