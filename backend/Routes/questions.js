const express = require('express')
const jwt = require("jsonwebtoken");
const checkAuth = require('../middlewares/check-auth');
const QuestionPre = require("../models/questionnairepre")
const QuestionSec = require("../models/questionnairesec")

const router = express.Router();

// const text = require('../utils/text')
// const boolean = require('../utils/binary')
const booleanNew = require('../utils/binaryNew')

var crypto = require("crypto");

router.get("/preliminary",checkAuth, async (req, res, next) => {

    // let qn = "qn"
    // booleanNew.elements.forEach((element,i) => {
    //     // var id = crypto.randomBytes(4).toString('hex');
    //     new QuestionPre({...element,name: qn+i}).save()
    // });

    // console.log(req.query)

    const limitRecords = Number(req.query.s)

    // await QuestionPre.deleteMany({ })
    

    const agg = await QuestionPre.aggregate([{ $match: {} }]).sample(limitRecords);
    // console.log(agg)
    

    res.json(agg).status(200)
})

router.get("/secondary",checkAuth, async (req, res, next) => {
    const limitRecords = Number(req.query.s)


    const agg = await QuestionSec.aggregate([{ $match: {} }]).sample(limitRecords);
    res.json(agg).status(200)
})
module.exports = router