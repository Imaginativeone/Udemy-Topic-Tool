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

    // List of arrays
    let p = paid.map((paidTopic, index) => {       
        // console.log('pt', paidTopic.topics);
        return paidTopic.topics;
    });
    // console.log('p', p);
    
    p.forEach((pTopicArray) => {

        console.log('pTopic', pTopicArray);

        pTopicArray.forEach((pTopic) => {

            // console.log('pTopic', pTopic);
            let ptTextRegex = /([0-9][0-9][0-9]\.)(.*)(\d{1,2}min)/;
            let ptTextMatch = pTopic.match(ptTextRegex);

            let paidIndx = ptTextMatch[1];
            let paidText = ptTextMatch[2];
            let paidTime = ptTextRegex[3];

            free.forEach((fTopic) => {
            
                let ftTextRegex = /(.*)([0-9][0-9]:[0-9][0-9])/; // no g
                let ftTextMatch = fTopic.match(ftTextRegex);
                
                if (!ftTextMatch) { 
                    
                } else {

                    let freeText = ftTextMatch[1];
                    let freeTime = ftTextMatch[2];
                    
                    if (pTopic.indexOf(freeText) != -1) {
                        // console.log(`${ paidText } | ${ freeText } | ${ freeTime }`);
                        console.log(`${ paidIndx } | ${ paidText } | ${ freeTime }`);
                    } else {
                        // console.log('PROBLEM: Inexact match - freeText', freeText);
                    }
    
                }
    
            });

        });

    });

    console.log('Done');
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
 
        // let ptTextRegex = /([0-9][0-9][0-9]\.)(.*)(\d{1,2}min)/;
        // let ptTextMatch = pTopic.match(ptTextRegex);

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