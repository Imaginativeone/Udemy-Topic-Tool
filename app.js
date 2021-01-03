const freeTopics = document.querySelector('#free-topics');
const paidTopics = document.querySelector('#paid-topics');

const processButton = document.querySelector('#process-topics');
processButton.addEventListener('click', processTopics);

function processTopics() {
  // console.log('Processing Topics - Button Clicked');

  const freeTopicsInput = freeTopics.value;
  // console.log('freeTopicsInput', freeTopicsInput);
  processFreeTopics(freeTopicsInput);

  const paidTopicsInput = paidTopics.value;
  // console.log('paidTopicsInput', paidTopicsInput);

  integrateTopics(freeTopicsInput, paidTopicsInput);

}

function processFreeTopics(topics) {
  
  console.log('Processing Free Topics', topics);
  console.log('Move Times to End of Previous Line');
  
  const movedTimes = moveFreeTimes(topics);

  console.log('Account for Preview Topics');
  console.log('Account for Orphaned Lines'); // No time index or video number
}

function moveFreeTimes(topics) {

  console.log('Moving Free Times to end of previous line', topics);

  const ftRegex  = /\n([0-9][0-9]:[0-9][0-9])/g;
  const ftResult = topics.replace(ftRegex, ' $1');

  console.log('ftResult', ftResult);

}

function integrateTopics(freeTopics, paidTopics) {

  console.log('Integrating Topics');

}
