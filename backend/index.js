const express = require('express');
let bodyParser = require('body-parser');
const router = express.Router();
const app = express();
const PORT = 80;

let bears = { 
    list:[ {id: 1, name: "Winnie", weight: 50},
            {id: 2, name: "Pooh", weight: 60}
        ] 
    }

let students = {
    list: [
        {id: 1, fname: "Ja",surname: "Mo",major: "CoE", GPA: 2.2}
    ]
}

//app.use('/api', router)
app.use('/api', bodyParser.json(), router);
app.use('/api', bodyParser.urlencoded({ extended: false}), router)


//STUDENTS!!
router.route('/students')
    .get((req, res) => res.json(students))
    .post((req, res) => {

        let id = (students.list.length)?students.list[students.list.length-1].id+1:1
        let fname = req.body.fname
        let surname = req.body.surname
        let major = req.body.major
        let GPA = req.body.GPA

        students = { list: [ ...students.list, {id, fname, surname, major, GPA}] }
        res.json(students)

    })


router.route('/students/:std_id')
    .get((req, res) => {

        let ID = students.list.findIndex( item => (item.id === +req.params.std_id))
        if(+req.params.std_id !== +students.list[ID])
        {
            res.json({status: "Fail, get not found!"})
        }
        else
            res.json(students.list[ID])
    })
    .put((req, res) => {

        let ID = students.list.findIndex( item => ( item.id === +req.params.std_id))
    
        if(+req.params.std_id !== +students.list[ID])
        {
            res.json({status: "Fail, Student not found!"})
        }
        else
        {
            students.list[ID].fname = req.body.fname
            students.list[ID].surname = req.body.surname
            students.list[ID].major = req.body.major
            students.list[ID].GPA = req.body.GPA
            res.json(students.list[ID])
        }

           
    })
    .delete((req, res) => {

        let ID = students.list.findIndex( item => ( item.id === +req.params.std_id))

        students.list = students.list.filter( item => item.id !== +req.params.std_id )
        if(+req.params.std_id !== +students.list[ID])
        {
            res.json({status: "Fail, Student not found!"})
        }
        else
            res.json(students.list[ID])

    })



//BEARS!!!
router.route('/bears')
    .get((req, res) => res.json(bears))
    .post((req, res) => {

        let id = (bears.list.length)?bears.list[bears.list.length-1].id+1:1
        let name = req.body.name;
        let weight = req.body.weight;
        bears = { list: [ ...bears.list, {id, name, weight}] }
        res.json(bears.list)
    })

router.route('/bears/:bear_id')

    .get( (req, res) => {
        let id = bears.list.findIndex( (item) => (item.id === +req.params.bear_id) )
        res.json(bears.list[id])
    } )
    .put( (req, res ) => {
        let id = bears.list.findIndex( (item) => (item.id === +req.params.bear_id) )
        bears.list[id].name = req.body.name
        bears.list[id].weight = req.body.weight
        res.json(bears.list)
    })
    .delete( (req, res) => {
        bears.list =bears.list.filter( (item) => item.id !== +req.params.bear_id )
        res.json(bears.list)
    })




app.listen(PORT, ()=> console.log('Server is running at ', PORT))