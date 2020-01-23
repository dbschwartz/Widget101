import l from '../../common/logger';
import db from './examples.db.service';
import agents from '../../files/agents.json'
const fs = require('fs')

class ExamplesService {
  all() {
    l.info(`${this.constructor.name}.all()`);
    return db.all();
  }

  byId(_id) {
    _id = Number(_id);
    function findRecord(record) {
      console.log(record._id, _id);
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
    function recordExists(record) {
      return record._id === newRecord._id;
    }
    const temp = JSON.parse(JSON.stringify(agents));

    if (!temp.some(recordExists)) {
      temp.push(newRecord);
      fs.writeFile('./server/files/agents.json', JSON.stringify(temp, null, 2), err => {
        if (err) {
          console.log('Error writing file', err)
          next(err);
        } else {
          console.log('Successfully wrote file', temp)
        }
      });
      return newRecord
    } else {
      return 'already created';
    }



  }
}

export default new ExamplesService();
