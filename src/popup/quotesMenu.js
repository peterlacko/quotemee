const list = document.querySelector('.quotes');
const clearButton = document.querySelector('.clear_storage');
const test = document.querySelector('.test');
const filterInput = document.querySelector('.filter');

clearButton.addEventListener('click', clearLocalStorage);
filterInput.addEventListener('keyup', filterQuotes);

function clearLocalStorage() {
    chrome.storage.local.clear();
}

function filterQuotes() {
    const filter = filterInput.value.toUpperCase();
    const li = document.getElementsByTagName('li');
    for (let i = 0; i < li.length; i++) {
        const span = li[i].getElementsByTagName('span')[0];
        if (span.textContent.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = '';
        } else {
            li[i].style.display = 'none';
        }
    }
}

browser.storage.local.get(null).then(processQuotes).catch(setErrorState);

function processQuotes(quotes) {
    const keys = Object.keys(quotes);
    const sortedKeys = keys.sort((a, b) => b.localeCompare(a));
    for (const key of sortedKeys) {
        const li = document.createElement('li');
        const span = document.createElement('span');
        span.className = 'quote_element';
        span.textContent = quotes[key].quote;
        li.appendChild(span);
        list.appendChild(li);
    }
};

function setErrorState(error) {
    test.textContent = 'Error occured: ' + error;
}