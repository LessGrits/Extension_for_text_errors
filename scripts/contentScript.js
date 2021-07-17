const BODY = document.querySelector('body');
const SPACE_CODE = 'Space';

const MENU_LIST = {
    'Cat': ['Dog', 'Rat', 'bat'],
    'Helo': ['hello', 'Help', 'Hell'],
    'heldp': ['help', 'held', 'hello'],
}

const drawPopup = (element, word) => {
    const POPUP = document.createElement('div')
    POPUP.style.width = '100px';
    POPUP.style.height = '100px';
    POPUP.style.position = 'absolute';
    POPUP.style.left = `${element.getBoundingClientRect().left + element.selectionStart * 3}px`;
    POPUP.style.top = `${element.getBoundingClientRect().top + 20}px`;
    POPUP.style.display = 'block';
    POPUP.style.zIndex = '99999';
    POPUP.style.color = '#fff';

    MENU_LIST[word].forEach(proposedWord => {
        const PROPOSED_OPTION_BTN = document.createElement('button');
        PROPOSED_OPTION_BTN.style.width = '100%';
        PROPOSED_OPTION_BTN.innerText = proposedWord;
        PROPOSED_OPTION_BTN.addEventListener('click', () => replaceLastWord(element, word, proposedWord, () => BODY.removeChild(POPUP)))

        POPUP.appendChild(PROPOSED_OPTION_BTN);
    })

    BODY.appendChild(POPUP);

    element.addEventListener('keydown', event => {
        BODY.removeChild(POPUP);
    });
}

const replaceLastWord = (element, oldValue, newValue, removePopup) => {
    element.value = element.value.replace(oldValue, newValue);
    removePopup();
    element.focus()
}

const getLastWord = (sentence) => {
    return sentence.split(' ').slice(-1)[0];
}

document.addEventListener('keydown', event => {
    const TAG_NAME = event.target.tagName
    const ELEMENT = event.target.tagName
    if (ELEMENT && (TAG_NAME === 'INPUT' || TAG_NAME === 'TEXTAREA')) {
        const SENTENCE = event.target.value;
        if (event.code === SPACE_CODE && MENU_LIST.hasOwnProperty(getLastWord(SENTENCE))) {
            drawPopup(event.target, getLastWord(SENTENCE))
        }
    }
})
