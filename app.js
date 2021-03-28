const freeTopics = document.querySelector('#free-topics');
const paidTopics = document.querySelector('#paid-topics');

freeTopics.value = 'Hello';

const processButton = document.querySelector('#process-topics');
processButton.addEventListener('click', loadInfo);

function loadInfo() {

    const paidTopics = loadPaidTopics();
    // console.log('paidTopics', paidTopics);

    const freeTopics = loadFreeTopics();
    // console.log('freeTopics', freeTopics);

    const mixdTopics = meldTopics(paidTopics, freeTopics);

}

function meldTopics(paid, free) {
    
    let paidText = '';
    console.log('paid.length', paid.length);
    
    paid.map((section) => {

        console.log('section.length', section.topics.length);

        section.topics.map((sectionTopic) => {

            const pstTextRegex = /([0-9][0-9][0-9]\.)(.*)(\d{1,2}min)/; // g deleted
            let   pstTextMatch = sectionTopic.match(pstTextRegex);

            // console.log(pstTextMatch);

            (pstTextMatch == null) ? paidText = 'PROBLEM' : paidText = pstTextMatch[2].trim();
            console.log('paidText', paidText);

        });

    });
    
    // let paidText = '';

    // const ptTextRegex = /([0-9][0-9][0-9])(.*)(\d{1,2}min)/g;
    // let   ptTextMatch = p.match(ptTextRegex);
    // (ptTextMatch == null) ? paidText = 'PROBLEM' : paidText = ptTextMatch[2];

    // let paidArray = paid.map((topics) => {
    //     console.log('topics.topics', topics.topics);
    //     return topics.topics;
    // });

    // let freeArray = free.map((topics) => {
    //     console.log('topics', topics);
    //     return topics;
    // });

}

function loadFreeTopics() {

    const freeTopicsArray = freeTopics.value.split("\n");
    // console.log('freeTopics', freeTopicsArray);

    return freeTopicsArray;
}

const listElement = document.querySelector('#fpt-list');

function loadPaidTopics() {

    // console.log('Load Paid Topics');
    const paidTopicsArray = paidTopics.value.split("\n");

    // Sections
    const sections = paidTopicsArray.filter(section => section.indexOf("Section") != -1);
    
    let sectionIndex = 0;
    let section = {};
    let sectionsArray = [];

    paidTopicsArray.forEach((topic) => {
        if (topic == sections[sectionIndex]) {
            section = {
                section: sections[sectionIndex],
                topics: []
            }
            // console.log('Section', sections[sectionIndex]);
            sectionsArray.push(section);
            sectionIndex++;
        } else {
            section.topics.push(topic);
        }        
    });

    // console.log(sectionsArray);
    return sectionsArray;
}