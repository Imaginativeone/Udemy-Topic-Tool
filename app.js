const freeTopics = document.querySelector('#free-topics');
const paidTopics = document.querySelector('#paid-topics');

const processButton = document.querySelector('#process-topics');
processButton.addEventListener('click', processTopics);

const listElement = document.querySelector('#fpt-list');

function processTopics() {
  // console.log('Processing Topics - Button Clicked');

  const freeTopicsInput = freeTopics.value;
  // console.log('freeTopicsInput', freeTopicsInput);
  processFreeTopics(freeTopicsInput);

  const paidTopicsInput = paidTopics.value;
  // console.log('paidTopicsInput', paidTopicsInput);

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

function processFreeTopics(topics) {
  
  // console.log('Processing Free Topics', topics);
  // console.log('Move Times to End of Previous Line');
  const movedTimes = moveFreeTimes(topics);

  // console.log('Account for Preview Topics');
  const flaggedPreviews = updatePreviews(movedTimes);
  // console.log('flaggedPreviews', flaggedPreviews);

  showTopics(flaggedPreviews);

  // console.log('Account for Orphaned Lines'); // No time index or video number
}

function updatePreviews(topics) {
  const topicsArray = topics.split("\n");
  // console.log('topicsArray', topicsArray);

  const newArray = topicsArray.map((line) => {
    const pmd = 'Possible Missing Description ';
    const flg = '***';
    if((line.indexOf('Preview') !== -1) && (line.length <= 15)) {
      return line = pmd + line + flg;
    } 
    else {
      return line;
    }
  });
  // console.log(newArray);

  return newArray.join("\n");
}

function moveFreeTimes(topics) {
  // console.log('Moving Free Times to end of previous line', topics);
  const ftRegex  = /\n([0-9][0-9]:[0-9][0-9])/g;
  const ftResult = topics.replace(ftRegex, ' $1');
  // console.log('ftResult', ftResult);
  return ftResult;
}

function integrateTopics(freeTopics, paidTopics) {

  // console.log('Integrating Topics');

}
