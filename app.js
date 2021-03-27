const freeTopics = document.querySelector('#free-topics');
const paidTopics = document.querySelector('#paid-topics');

freeTopics.value = 'Hello';

const processButton = document.querySelector('#process-topics');
processButton.addEventListener('click', loadPaidTopics);

const listElement = document.querySelector('#fpt-list');

function loadPaidTopics() {

    console.log('Load Paid Topics');
    const paidTopicsArray = paidTopics.value.split("\n");

    const sections = paidTopicsArray.filter(section => section.indexOf("Section") != -1);
    
    let sectionIndex = 0;
    let section = {};
    let sectionsArray = [];
    let topicsArray = [];

    paidTopicsArray.forEach((topic) => {

        // console.log('topic', topic);

        if (topic == sections[sectionIndex]) {


            section = {
                title: sections[sectionIndex],
                topicsArray: []
            }

            console.log('Section', sections[sectionIndex]);
            sectionsArray.push(section);
            sectionIndex++;
            
        } else {

            section.topicsArray.push(topic);
            // section.topics = topicsArray;

        }
        
    });
    
    console.log(sectionsArray);
}