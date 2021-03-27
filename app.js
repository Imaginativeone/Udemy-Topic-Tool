const freeTopics = document.querySelector('#free-topics');
const paidTopics = document.querySelector('#paid-topics');

freeTopics.value = 'Hello';

const processButton = document.querySelector('#process-topics');
processButton.addEventListener('click', loadPaidTopics);

const listElement = document.querySelector('#fpt-list');

function loadPaidTopics() {

    console.log('Load Paid Topics');
    const paidTopicsArray = paidTopics.value.split("\n");
    // console.log('paidTopicsArray', paidTopicsArray);

    const sections = paidTopicsArray.filter((section) => {
        return (section.indexOf("Section") != -1)
    });
    // console.log('Sections', sections);

    let topicIndex = 0;
    let topicVolume = 0;
    let topicItem = {};

    paidTopicsArray.map((topic, index) => {

        if (topic == sections[topicIndex]) {
            topicVolume = 0;
            topicIndex++;
            console.log(topic, topicVolume);
        } else {
            topicVolume++;
            console.log('topic', topic, 'topicVolume', topicVolume);
        }

    })

}