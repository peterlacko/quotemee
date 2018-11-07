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
    // test.textContent = filterInput.value;
    const filter = filterInput.value.toUpperCase();
    // test.textContent = filterInput.value;
    const li = document.getElementsByTagName('li');
    // test.textContent = 'length' + li.length;
    for (let i = 0; i < li.length; i++) {
        const span = li[i].getElementsByTagName('span')[0];
        if (span.textContent.toUpperCase().indexOf(filter) > -1) {
            // test.textContent = span.textContent.toUpperCase();
            li[i].style.display = '';
        } else {
            // test.textContent = span.textContent.toUpperCase() + '  ', span.textContent.toUpperCase();
            li[i].style.display = 'none';
        }
    }
}

browser.storage.local.get(null).then(processQuotes).catch(setErrorState);

function processQuotes(quotes) {
    // test.textContent = JSON.stringify(result);
    for (const key in quotes) {
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