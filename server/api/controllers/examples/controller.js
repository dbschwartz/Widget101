import ExamplesService from '../../services/examples.service';
import agents from '../../../files/agents'
export class Controller {
  all(req, res) {
    res.json(agents);
  }

  async byId(req, res, next) {
    try {
      const response = await ExamplesService.byId(req.params._id)
      if (response === 'not found') {
        res.status(404).end();
      }
      else {
        res.status(200)
        .json(response)
      }
    }
    catch (err) {
      next(err)
    }
  }

  async create(req, res, next) {
    try {
      const response = await ExamplesService.create(req.body, res, next)
      if (response === 'already created') {
        res.status(400).json({ message: 'record already exists with that id' })
      } else {
        res
          .status(200)
          .json({ message: 'Succesfully Created!', record: response })
      }
    }
    catch (err) {
      next(err)
    }
  }
  async edit(req, res, next) {
    try {
      const response = await ExamplesService.edit(req, res, next)
      if (response === 'no record found') {
        res.status(400).json({ message: 'no record found with that _id to edit' })
      } else {
        res
          .status(200)
          .json({ message: 'Record succesffuly edited!', record: response })
      }
    }
    catch (err) {
      next(err)
    }
  }

}
export default new Controller();
