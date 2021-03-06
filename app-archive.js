const freeTopics = document.querySelector('#free-topics');
const paidTopics = document.querySelector('#paid-topics');

const processButton = document.querySelector('#process-topics');
processButton.addEventListener('click', processTopics);

const listElement = document.querySelector('#fpt-list');

function processTopics() {
  
  // console.log('Processing Topics - Button Clicked');

  const freeTopicsInput = freeTopics.value;
  // console.log('freeTopicsInput', freeTopicsInput);
  const freeInfo = processFreeTopics(freeTopicsInput);

  // showTopics(freeInfo);

  const paidTopicsInput = paidTopics.value;
  // console.log('paidTopicsInput', paidTopicsInput);

  processPaidTopics(paidTopicsInput);

  const compArray = compareArrays(freeTopicsInput, paidTopicsInput);
  // console.log('compArray', compArray);
  // console.log('f', freeTopicsInput);
  // console.log('p', paidTopicsInput);

  // integrateTopics(freeTopicsInput, paidTopicsInput);
  // const integratedTopics = integrateTopicsA(freeTopicsInput, paidTopicsInput);

  // showTopics(integratedTopics);

  const integratedTopics = integrateTopicsB(freeTopicsInput, paidTopicsInput, compArray);

  showTopics(integratedTopics);

}

function integrateTopicsB(fti, pti, ca) {

  const mergedTopics = [];

  // showTopics(fti);
  // showTopics(pti);
  // showTopics(ca);

  const ftiArray = fti.split("\n");
  const ptiArray = pti.split("\n");
  const caArray  =  ca.split("\n");

  ptiArray.forEach((topic, index) => {

    const topicRegex = /^(\d{1,3}\.)(.*)(\d{1,2}min)/g
    const topicNumberSegment = (topic.match(topicRegex) || []).map(e => e.replace(topicRegex, '$1'));

    if ((!topicNumberSegment[0]) || (topicNumberSegment[0] === undefined)) {
      console.log(topic);
      mergedTopics.push(topic.split().join().trim());
    } 
    else {

      console.log(topic);

      // get freeTopicsInput elements ////////////////////////////////////////////////////////
      // const ftRegex = /(.*)([0-9][0-9]:[0-9][0-9])/g
      // const ftStringSegment = (ftiArray[index].match(ftRegex) || []).map(e => e.replace(ftRegex, '$1'))[0];
      // const ftTimeSegment   = (ftiArray[index].match(ftRegex) || []).map(e => e.replace(ftRegex, '$2'))[0];
    
      // get paidTopicsInput elements ////////////////////////////////////////////////////////
      const ptRegex = /^(\d{1,3}\.)(.*)(\d{1,2}min)/g
      const ptNumberSegment = (topic.match(ptRegex) || []).map(e => e.replace(ptRegex, '$1'));
      const ptStringSegment = (topic.match(ptRegex) || []).map(e => e.replace(ptRegex, '$2'));
      const ptTimeSegment   = (topic.match(ptRegex) || []).map(e => e.replace(ptRegex, '$3'));

      const timeEval = ftiArray.find((freeTopic) => {
        const ftRegex = /(.*)([0-9][0-9]:[0-9][0-9])/g
        const ftStringSegment = (freeTopic.match(ftRegex) || []).map(e => e.replace(ftRegex, '$1'));
        const ftTimeSegment   = (freeTopic.match(ftRegex) || []).map(e => e.replace(ftRegex, '$2'));
        // console.log('ptStringSegment[0]', ptStringSegment[0].trim());
        // console.log('ftStringSegment[0]', ftStringSegment[0].trim());
        if (ftStringSegment[0] === undefined || ptStringSegment[0] === undefined) {}
        else {
          return ftStringSegment[0].trim().indexOf(ptStringSegment[0].trim()) !== -1;
        }
      });

      const timeSegmentRegex = /(.*)([0-9][0-9]:[0-9][0-9])/g
      const timeString  = (timeEval.match(timeSegmentRegex) || []).map(e => e.replace(timeSegmentRegex, '$1'));
      const timeSegment = (timeEval.match(timeSegmentRegex) || []).map(e => e.replace(timeSegmentRegex, '$2'));

      // console.log(`${ ptNumberSegment[0].trim() } ${ ptStringSegment[0].trim() } t:${ timeSegment[0].trim() }`);
      console.log(`${ ptNumberSegment[0].trim() } ${ ptStringSegment[0].trim() } ${ timeSegment[0].trim() }`);

      mergedTopics.push(`${ ptNumberSegment[0].trim() } ${ ptStringSegment[0].trim() } ${ timeSegment[0].trim() }`);
    }

  });

  return mergedTopics.join("\n");

}

function compareArrays(freeComparison, paidComparison) {

  const paidArray = paidComparison.split("\n");

  // The paids are the ones with the numbers and Sections
  // Dump the sections

  const noPaidSections = getStrippedSections(paidArray);

  function getStrippedSections(paidArray) {
    const _noPaidSections = [];
    const p = paidArray.map((paidTopic) => {
      // if paidTopic doesn't have a number segment, then it is a special topic
      const ptRegex = /(^\d{1,3}\.)(.*)(\d{1,2}min)/g
      const ptNumberSegment = (paidTopic.match(ptRegex) || []).map(e => e.replace(ptRegex, '$1'))[0];
      const ptStringSegment = (paidTopic.match(ptRegex) || []).map(e => e.replace(ptRegex, '$2'))[0];
      const ptTimeSegment   = (paidTopic.match(ptRegex) || []).map(e => e.replace(ptRegex, '$3'))[0];
      if (ptStringSegment !== undefined) {
        _noPaidSections.push(ptStringSegment.trim());
      }
    });
    // console.log(_noPaidSections);
    return _noPaidSections;
  }
  
  const freeArray = freeComparison.split("\n");
  const noFreeSections = getFreeSections(freeArray);
  
  function getFreeSections(freeArray) {

    const _noFreeSections = [];
    const f = freeArray.map((freeTopic) => {
  
      const ftRegex = /(.*)([0-9][0-9]:[0-9][0-9])/g
      const ftStringSegment = (freeTopic.match(ftRegex) || []).map(e => e.replace(ftRegex, '$1'))[0];
      const ftTimeSegment   = (freeTopic.match(ftRegex) || []).map(e => e.replace(ftRegex, '$2'))[0];
  
      // console.log('free', ftStringSegment);
  
      if (ftStringSegment !== undefined) {
        _noFreeSections.push(ftStringSegment.trim());
      }
  
    });
    return _noFreeSections;
  }

  const verifiedSections = verifySections(noFreeSections, noPaidSections);

  function verifySections(noFreeSections, noPaidSections) {
    const comparisonArray = [];
  
    console.log(noPaidSections.length);
    console.log(noFreeSections.length);
  
    let orphanCount = 0;
    const orphans = [];
    
    noPaidSections.map((p, paidIndex) => {
      // console.log(paidTopic, paidIndex);
      noFreeSections.map((f, freeIndex) => {
        // console.log(freeTopic, freeIndex);
  
        if ((paidIndex === freeIndex) && (p.trim() !== f.trim())) {
  
          console.log(`paidTopic:${ p } | L:${ p.length } | freeTopic:${ f } | L:${ f.length }`);
  
          orphanCount++;
          // console.log(`${ paidIndex } ${ paidTopic } | ${ freeIndex } ${ freeTopic } ***`);
          comparisonArray.push(`orphanCount: ${ orphanCount } i:${ paidIndex } ${ p } | i:${ freeIndex } ${ f } ***`);
          orphans.push(`orphanCount: ${ orphanCount } i:${ paidIndex } ${ p } | i:${ freeIndex } ${ f } ***`);
        }
        else if ((paidIndex === freeIndex) && (p.trim() === f.trim())) {
          // console.log(`${ paidIndex } ${ paidTopic } | ${ freeIndex } ${ freeTopic }`);
          // comparisonArray.push(`${ paidIndex } ${ p } | ${ freeIndex } ${ f }`);
          comparisonArray.push(`${ p } | ${ f }`);
        }
  
      });
    });
  
    console.log('orphanCount', orphanCount);
    orphans.map(o => console.log('orphan', o));
  
    if (orphanCount !== 0) {
      console.log('Tend to the non-matching topics!');
    } else {
  
    }
  
    // console.log(comparisonArray);
    // showTopics(comparisonArray.join("\n"));
    
    return comparisonArray.join("\n");
  
  }

  return verifiedSections;

}

function showTopics(topics = 'Showing Default Output') {

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
  // console.log('Processing Paid Topics');
  const movedTimes = movePaidTimes(topics);
  function movePaidTimes(topics) {
    // console.log('Moving Paid Times');
    // console.log('Moving Free Times to end of previous line', topics);
    const ptRegex  = /\n(\d{1,2}min)/g;
    let ptResult = topics.replace(ptRegex, ' $1');

    ptResult = removeBlanks(ptResult);
    ptResult = updatePaidOrphans(ptResult);

    // showTopics(ptResult);

    // console.log('ptResult', ptResult);
    return ptResult;
  }

  return movedTimes;
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

    // showTopics(flaggedOrphans);

    return flaggedOrphans;
  
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

      // console.log("updateFreeOrphans: myResult, line", myResult, line)
      return `orphanCount: ${ line } + ${ flg }`;
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

    const flg = ' ';

    const ftRegex  = /(\d{1,2}min)/g;
    let myResult = ftRegex.test(line);

    if (!myResult) { 
      // console.log("updatePaidOrphans: myResult, line", myResult, line)
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

function integrateTopicsA(freeTopics, paidTopics) {

  const resultsArray = [];

  const paidTopicsArray = paidTopics.split("\n");
  const freeTopicsArray = freeTopics.split("\n");
  
  paidTopicsArray.map((paidTopic) => {
    
    // if paidTopic doesn't have a number segment, then it is a special topic
    const ptRegex = /^(\d{1,3}\.)(.*)(\d{1,2}min)/g
    const ptNumberSegment = (paidTopic.match(ptRegex) || []).map(e => e.replace(ptRegex, '$1'));
    const ptStringSegment = (paidTopic.match(ptRegex) || []).map(e => e.replace(ptRegex, '$2'));
    const ptTimeSegment   = (paidTopic.match(ptRegex) || []).map(e => e.replace(ptRegex, '$3'));
    
    if (ptNumberSegment[0] == undefined) { 
      console.log(paidTopic);
      resultsArray.push(paidTopic);
    }
    else {

      // console.log(paidTopic, ptNumberSegment);

      if (ptStringSegment[0] === undefined) { console.log(paidTopic + "++++++++++") }

      freeTopicsArray.map((freeTopic) => {

        // console.log(freeTopic);

        const ftRegex = /(.*)([0-9][0-9]:[0-9][0-9])/g
        const ftStringSegment = (freeTopic.match(ftRegex) || []).map(e => e.replace(ftRegex, '$1'));
        const ftTimeSegment   = (freeTopic.match(ftRegex) || []).map(e => e.replace(ftRegex, '$2'));

        // Course Content - Manual Fixes...needed a time index
        if (ftStringSegment[0] === undefined) { 
          console.log("ftSegment[0]" + freeTopic + "++++++++++")
          console.log("Some topics are missing a time index.");
        }

        if (ptStringSegment[0].replace("Preview", "").trim() === ftStringSegment[0].replace("Preview", "").trim()) {
          // console.log(`${ paidTopic } ${ ftTimeSegment }`);
          console.log(`${ ptNumberSegment } ${ ptStringSegment } ${ ftTimeSegment }`);
          resultsArray.push(`${ ptNumberSegment } ${ ptStringSegment } ${ ftTimeSegment }`);
        }

      });

    }

  });

  const results = resultsArray.join("\n");
  return results;
}

function integrateTopics(freeTopics, paidTopics) {

  const topicsArray = [];
  const objTopic = {
    section: '',
    videoNumber: '',
    duration: ''
  };

  console.log('Integrating Topics');
  // console.log('freeTopic', freeTopics);
  const freeTopicsArray = freeTopics.split("\n");
  const paidTopicsArray = paidTopics.split("\n");

  freeTopicsArray.map((freeTopic) => { // freeTopics don't have the Sections
    
    // console.log(freeTopic);

    const ftRegex = /(.*)([0-9][0-9]:[0-9][0-9])/g
    const ftStringSegment = (freeTopic.match(ftRegex) || []).map(e => e.replace(ftRegex, '$1'));
    const ftTimeSegment   = (freeTopic.match(ftRegex) || []).map(e => e.replace(ftRegex, '$2'));

    // console.log(ftStringSegment);
    showTopics(ftStringSegment[0]);

    paidTopicsArray.map((paidTopic) => {

      const ptRegex = /^(\d{1,3}\.)(.*)(\d{1,2}min)/g
      const ptNumberSegment = (paidTopic.match(ptRegex) || []).map(e => e.replace(ptRegex, '$1'));
      const ptStringSegment = (paidTopic.match(ptRegex) || []).map(e => e.replace(ptRegex, '$2'));
      const ptTimeSegment   = (paidTopic.match(ptRegex) || []).map(e => e.replace(ptRegex, '$3'));

      // console.log(`${ ptNumberSegment[0] } | ${ paidTopic }`);

      // if (ptNumberSegment[0] === undefined && paidTopic.indexOf('Section') !== -1) {
      //   console.log(paidTopic);
      // }

      if ((ptStringSegment[0] === undefined) || (ftStringSegment[0] === undefined)) {}
      else {
        if ((ptStringSegment[0].replace("Preview", "").trim() === ftStringSegment[0].replace("Preview", "").trim())) {
          console.log(`${ ptNumberSegment[0] } ${ ptStringSegment[0] } ${ ftTimeSegment }`);
        }
      }
    });
  });
}
