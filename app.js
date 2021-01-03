const freeTopics = document.querySelector('#free-topics');
const paidTopics = document.querySelector('#paid-topics');

const processButton = document.querySelector('#process-topics');
processButton.addEventListener('click', processTopics);

const listElement = document.querySelector('#fpt-list');

function processTopics() {
  
  console.log('Processing Topics - Button Clicked');

  const freeTopicsInput = freeTopics.value;
  // console.log('freeTopicsInput', freeTopicsInput);
  processFreeTopics(freeTopicsInput);

  const paidTopicsInput = paidTopics.value;
  // console.log('paidTopicsInput', paidTopicsInput);

  processPaidTopics(paidTopicsInput);

  integrateTopics(freeTopicsInput, paidTopicsInput);

}

function showTopics(topics) {

  const topicsArray = topics.split("\n");

  topicsArray.map((line, index) => {

    const listItemText = document.createTextNode(`${ line }`);
    const listItem     = document.createElement('li');

    listItem.appendChild(listItemText);
    listElement.appendChild(listItem);

  });
}

function removeBlanks(topics) {
  const rbRegex  = /\n\n/g;
  const rbResult = topics.replace(rbRegex, '\n');
  return rbResult;
}

function processPaidTopics(topics) {
  console.log('Processing Paid Topics');
  const movedTimes = movePaidTimes(topics);
  function movePaidTimes(topics) {
    console.log('Moving Paid Times');
    // console.log('Moving Free Times to end of previous line', topics);
    const ptRegex  = /\n(\d{1,2}min)/g;
    let ptResult = topics.replace(ptRegex, ' $1');

    ptResult = removeBlanks(ptResult);
    ptResult = updatePaidOrphans(ptResult);

    showTopics(ptResult);

    console.log('ptResult', ptResult);
    return ptResult;
  }
}

function processFreeTopics(topics) {
  
  // console.log('Processing Free Topics', topics);
  // console.log('Move Times to End of Previous Line');
  const movedTimes = moveFreeTimes(topics);

  // console.log('Account for Preview Topics');
  const flaggedPreviews = updatePreviews(movedTimes);
  
  if (!flaggedPreviews) {
    // console.log('There are no flagged previews');
  } 
  else {

    // console.log('flaggedPreviews', flaggedPreviews);
    // Manual Process - Update preview lines
    // showTopics(flaggedPreviews);
  
    // console.log('Account for Orphaned Lines'); // No time index or video number
    const flaggedOrphans = updateFreeOrphans(flaggedPreviews);
    
    showTopics(flaggedOrphans);
  
  }

  function moveFreeTimes(topics) {
    // console.log('Moving Free Times to end of previous line', topics);
    const ftRegex  = /\n([0-9][0-9]:[0-9][0-9])/g;
    const ftResult = topics.replace(ftRegex, ' $1');
    // console.log('ftResult', ftResult);
    return ftResult;
  }
}

function updateFreeOrphans(topics) {

  // ^((?!hede).)*$
  // ^((?!([0-9][0-9]:[0-9][0-9])).)*$

  // const ftRegex  = /\n([0-9][0-9]:[0-9][0-9])/g;
  // const ftRegex = /(^((?!([0-9][0-9]:[0-9][0-9])).)*$)/g
  // const ftResult = topics.replace(ftRegex, ' $1 ***');

  // console.log(ftResult);

  // return ftResult;

  const topicsArray = topics.split("\n");

  const newArray = topicsArray.map((line) => {

    const flg = ' ***';

    const ftRegex  = /([0-9][0-9]:[0-9][0-9])/g;
    let myResult = ftRegex.test(line);

    if (!myResult) { 
      console.log("updateFreeOrphans: myResult, line", myResult, line)
      return line + flg;
    } else {
      return line;
    }

  });

  // return topics;
  return newArray.join("\n");

}

function updatePaidOrphans(topics) {

  const topicsArray = topics.split("\n");
  const newArray = topicsArray.map((line) => {

    const flg = ' ***';

    const ftRegex  = /(\d{1,2}min)/g;
    let myResult = ftRegex.test(line);

    if (!myResult) { 
      console.log("updatePaidOrphans: myResult, line", myResult, line)
      return line + flg;
    } else {
      return line;
    }

  });

  // return topics;
  return newArray.join("\n");

}

function updatePreviews(topics) {
  const topicsArray = topics.split("\n");
  // console.log('topicsArray', topicsArray);

  const newArray = topicsArray.map((line) => {
    const pmd = 'Possible Missing Description ';
    const flg = '***';
    if((line.indexOf('Preview') !== -1) && (line.length <= 15)) {
      return pmd + line + flg;
    } 
    else {
      return line;
    }
  });
  // console.log(newArray);

  return newArray.join("\n");
}

function integrateTopics(freeTopics, paidTopics) {

  // console.log('Integrating Topics');

}
