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
    
    paid.forEach((paidTopic) => {

        paidTopic.topics.forEach((pTopic) => {

            const ptRegex   = /(\d{1,2}min)/g;
            let ptTimeMatch = pTopic.match(ptRegex);
            
            const ptTextRegex = /([0-9][0-9][0-9]\.)(.*)(\d{1,2}min)/;
            let ptTextMatch   = pTopic.match(ptTextRegex); // deleted the g
             
            // let ptResult = pTopic.replace(ptRegex, ' $1');
            // console.log('ptTextMatch', ptTextMatch);

            if (ptTextMatch == null) {
                console.log('PROBLEM');
            } else {
                console.log(ptTextMatch[1], ptTextMatch[2]);
            }

            free.forEach((fTopic) => {

                if (fTopic.indexOf(pTopic) != -1) {

                    // console.log(pTopic, fTopic);

                }

            });

        });

    });

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