const frontPageTopics  = document.querySelector('#front-page-topics');
const coursePageTopics = document.querySelector('#course-page-topics');

const processTopicsButton = document.querySelector("#process-topics");
processTopicsButton.addEventListener('click', processTopics);

const listElement = document.querySelector('#fpt-list');

function getTopics(lines) {
  console.log('Processing Topics');
  return fptLines = lines.split(/\r\n|\r|\n/);
}

// \n(^[^0-9][a-zA-Z0-9_]+$) Archive this!

function processTopics() {
  const movedTimes = moveTimesToPreviousStringEnd(frontPageTopics.value);
  let timeTopics = getTopics(movedTimes);
  // showTopics(timeTopics);
  console.log(timeTopics.length);

  // observetimeTopicArray(timeTopics);

  // Inner Page Processing
  // Remove blank lines
  // Clean up multi-line topics
  let minTopics = moveMinTimesToPreviousStringEnd(coursePageTopics.value);
  minTopics = removeBlanks(minTopics);
  minTopics = getTopics(minTopics);
  // showTopics(minTopics);
  console.log(minTopics.length);

  // observeminTopicArray(minTopics);

  integrateTopics(minTopics, timeTopics);

}

function integrateTopics(minTopics, timeTopics) {

  minTopics.map((minTopic) => {

    if (minTopic.indexOf('Section') !== -1) {
      
      console.log(minTopic);
      
      const listItemText = document.createTextNode(minTopic);
      const listItem = document.createElement('li');

      listItem.appendChild(listItemText);
      listElement.appendChild(listItem);    
    }

    let myRegex = /^(\d{1,3}\.)(.*)(\d{1,2}min)/g    
    const minNumberSegment = (minTopic.match(myRegex) || []).map(e => e.replace(myRegex, '$1'));
    const minStringSegment = (minTopic.match(myRegex) || []).map(e => e.replace(myRegex, '$2'));
    const minTimeIdSegment = (minTopic.match(myRegex) || []).map(e => e.replace(myRegex, '$3'));
    
    timeTopics.map((timeTopic) => {

      let ftRegex = /(.*)([0-9][0-9]:[0-9][0-9])/g
      const ftStringSegment = (timeTopic.match(ftRegex) || []).map(e => e.replace(ftRegex, '$1'));
      const ftTimeIdSegment = (timeTopic.match(ftRegex) || []).map(e => e.replace(ftRegex, '$2'));

      if (minNumberSegment[0] !== undefined && (minStringSegment[0].trim() === ftStringSegment[0].trim())) {
        console.log(`${ minNumberSegment[0] } | ${ ftStringSegment[0] } | ${ ftTimeIdSegment[0] }`);

        const topicItemText = document.createTextNode(minTopic);
        const topicItem = document.createElement('li');
  
        topicItem.appendChild(topicItemText);
        listElement.appendChild(topicItem);  
  
      }

    });

  });

}

function observeminTopicArray(topics) {
  topics.map((topic) => {

    // let reg = /#([\S]+)/igm; // Get hashtags.
    // let string = 'mi alegría es total! ✌🙌\n#fiestasdefindeaño #PadreHijo #buenosmomentos #france #paris';

    // let matches = (string.match(reg) || []).map(e => e.replace(reg, '$1'));
    // console.log(matches);

    let myRegex = /^(\d{1,3}\.)(.*)(\d{1,2}min)/g
    // let myResult = myRegex.exec(topic);
    
    const minNumberSegment = (topic.match(myRegex) || []).map(e => e.replace(myRegex, '$1'));
    const minStringSegment = (topic.match(myRegex) || []).map(e => e.replace(myRegex, '$2'));
    const minTimeIdSegment = (topic.match(myRegex) || []).map(e => e.replace(myRegex, '$3'));

    let myResult = (topic.match(myRegex) || []).map(e => e.replace(myRegex, '$2'));

    console.log(numberSegment, minStringSegment, minTimeIdSegment);

    // console.log('topic', topic);

  });
}

function observetimeTopicArray(topics) {
  topics.map((topic) => {
    console.log('topic', topic);
  });
}

function removeBlanks(topics) {
  // console.log(topics);
  const myResult = topics.replace(/(\r\r\n\n|\r\r|\n\n)/g, "\n");
  // console.log(myResult);
  return myResult;
}

function showTopics(topics) {
  topics.map((line, index) => {

    line = checkPreviews(line);
    checkForTimeIndex(line);

    const listItemText = document.createTextNode(`index: ${ index } ${ line }`);
    const listItem     = document.createElement('li');
    listItem.appendChild(listItemText);
    listElement.appendChild(listItem);
  });
}

function checkForTimeIndex(line) {
  let timeIndexRegex = /([0-9][0-9]:[0-9][0-9])|(\d{1,2}min)/g // Two types of time-indices, move min-times up
  let myResult = timeIndexRegex.test(line);

  if (!myResult) {
    console.log(myResult, line);
  }

}

function checkPreviews(line) {
  const pmd = 'Possible Missing Description ';
  // Check the line, to see if it has the string "Preview"
  if(line.indexOf("Preview") !== -1 && (line.length <= 15)) {
    console.log(pmd, line);
    return pmd + line;
  } else {
    return line;
  }
}

function observeRegex(string) {
  let myRegex = /^([0-9][0-9]:[0-9][0-9])/g
  let myResult = myRegex.exec(string);

  console.log('myResult', myResult);
}

function moveTimesToPreviousStringEnd(string) {
  
  console.log('move times');
  // console.log('input', string);

  const myResult = string.replace(/(\r\n|\r|\n)([0-9][0-9]:[0-9][0-9])/g, " $2");
  // console.log('output', myResult);

  return myResult;
}

function moveMinTimesToPreviousStringEnd(string) {
  
  console.log('move min times');
  // console.log('input', string);

  const myResult = string.replace(/(\r\n|\r|\n)(\d{1,2}min)/g, " $2");
  // console.log('output', myResult);

  return myResult;
}
