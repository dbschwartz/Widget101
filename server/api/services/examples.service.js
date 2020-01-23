import l from '../../common/logger';
import agents from '../../files/agents.json'
const fs = require('fs')
const merge = require('merge-deep');

class ExamplesService {

  alreadyExists(_id) {
    function recordExists(record) {
      return record._id === _id;
    }
    return agents.some(recordExists)
  }


  edit(req, res, next) {
    
    const _id = Number(req.params._id);
    const editedRecord = req.body;

    function findRecordFn(record) {
      return record._id === _id;
    }
    const foundRecordIndex = agents.findIndex(findRecordFn);
    
    if (foundRecordIndex !== -1) {
      agents[foundRecordIndex] = merge(agents[foundRecordIndex], editedRecord);
      fs.writeFile('./server/files/agents.json', JSON.stringify(agents, null, 2), err => {
        if (err) {
          console.log('Error editing file', err)
          next(err);
        } else {
          console.log('Successfully edited file', agents)
        }
      });
      return agents[foundRecordIndex];
    } else {
      return 'no record found';
    }
    
  }

  byId(_id) {
    _id = Number(_id);
    function findRecord(record) {
      return record._id === _id;
    }
    const foundRecord = agents.find(findRecord);
    if(foundRecord) {
      return foundRecord

    } else {
      return 'not found';
    }
    
  }

  create(newRecord, res, next) {

    if (!this.alreadyExists(newRecord._id)) {
      agents.push(newRecord);
      fs.writeFile('./server/files/agents.json', JSON.stringify(agents, null, 2), err => {
        if (err) {
          console.log('Error writing file', err)
          next(err);
        } else {
          console.log('Successfully wrote file', agents)
        }
      });
      return newRecord
    } else {
      return 'already created';
    }
  }
}

export default new ExamplesService();
