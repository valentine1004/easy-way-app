const router = require('express').Router();
const Request = require('../../models/Request');

const {requestValidation} = require('../../validation');

router.post('/', async (req, res) => {
    const {error} = requestValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const request = new Request({
        title: req.body.title,
        description: req.body.description,
        location: req.body.location,
        date: req.body.date,
        priority: req.body.priority,
        patientId: req.body.patientId,
        area: req.body.area,
        doctorId: req.body.doctorId,
        evaluation: req.body.evaluation,
        comment: req.body.comment
    });

    try {
        await request.save();
        res.send({
            request: {
                id: request._id,
                title: request.title,
                description: request.description,
                location: request.location,
                date: request.date,
                priority: request.priority,
                patientId: request.patientId,
                area: request.area,
                doctorId: request.doctorId,
                evaluation: request.evaluation,
                comment: request.comment
            }
        });
    } catch (err) {
        res.status(400).send(err)
    }
});


router.post('/search', async (req, res) => {
    const requests = await Request.find(req.body);
    if (!requests) return res.status(400).send('Requests is not found');
    res.send(requests);
})


module.exports = router;
