import { useEffect, useState } from 'react'
import axios from 'axios'
import useSWR, { mutate } from 'swr'


const URL = `http://localhost/api/students`
//const fetcher = url => axios.get(url).then(res => res.data)

export default function student() {

    const [students, setStudents] = useState({

        list: [
            {
                id: 1,
                fname: "Ja",
                surname: "Mo",
                major: "CoE",
                GPA: 2.2
            },
            {
                id: 2,
                fname: "Foo",
                surname: "Bar",
                major: "CoC",
                GPA: 2.4
            },
        ]
    });

    //const { data, error } = useSWR(URL, fetcher)
    // if(!data)
    // {
    //     return <div>Loading...</div>
    // }
    // if(error)
    // {
    //     return <div>failed to load</div>
    // }
    const [student, setStudent] = useState([])
    const [fname, setFname] = useState('')
    const [surname, setSurname] = useState('')
    const [major, setMajor] = useState('')
    const [GPA, setGPA] = useState(0)

    useEffect(() => {
        getStudents()
    }, [])

    const getStudents = async () => {

        let student = await axios.get(URL);

        setStudents(student.data);
    }

    const getStudent = async (id) => {

        let student = await axios.get(`${URL}/${id}`);
        setStudent({
            fname: student.data.fname,
            surname: student.data.surname,
            major: student.data.major,
            GPA: student.data.GPA,

        });
    }

    const addStudent = async (fname, surname, major, GPA) => {

        let students = await axios.post(URL, { fname, surname, major, GPA });
        setStudents(students.data)
    }

    const deleteStudent = async (id) => {

        let students = await axios.delete(`${URL}/${id}`)
        setStudents(students.data)
    }

    const updateStudent = async (id) => {

        let students = await axios.put(`${URL}/${id}`, {fname, surname, major, GPA})
        setStudents(students.data)
    }



    const printStudents = () => {

        return students.list.map((item, index) =>

            <li key={index}>

                {item.id}.
                {item.fname}:
                {item.surname}:
                {item.major}:
                {item.GPA}

                <button onClick={() => getStudent(item.id)}>Get</button>
                <button onClick={() => updateStudent(item.id)}>Update</button>
                <button onClick={()=> deleteStudent(item.id)}>Delete</button>

            </li>

        )


    }




    return (



        <div> Hello
            {printStudents()}
            <ul>
                name: {student.fname} :
                surname: {student.surname} :
                major: {student.major} :
                GPA: {student.GPA}
            </ul>
            <div>
                <h2>Add Student</h2>
                    Name : <input type="text" onChange={(e) => setFname(e.target.value)}></input>
                    SurName : <input type="text" onChange={(e) => setSurname(e.target.value)}></input>
                    Major : <input type="text" onChange={(e) => setMajor(e.target.value)}></input>
                    GPA : <input type="text" onChange={(e) => setGPA(e.target.value)}></input>
                <button onClick={() => addStudent(fname, surname, major, GPA)}>Add</button>
            </div>
        </div>
    )
}