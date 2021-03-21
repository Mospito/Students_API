import React, { useEffect, useState } from 'react'
import axios from 'axios'
import useSWR, { mutate } from 'swr'


const URL = `http://localhost/api/students`
const fetcher = (URL) => axios.get(URL).then(res => res.data)

export default function student() {

    // const [students, setStudents] = useState({

    //     list: [
    //         {
    //             id: 1,
    //             fname: "Ja",
    //             surname: "Mo",
    //             major: "CoE",
    //             GPA: 2.2
    //         },
    //         {
    //             id: 2,
    //             fname: "Foo",
    //             surname: "Bar",
    //             major: "CoC",
    //             GPA: 2.4
    //         },
    //     ]
    // });
    // useEffect(() => {
    //     //getStudents()
 
    // }, [])

    const [student, setStudent] = useState('')
    const [fname, setFname] = useState('')
    const [surname, setSurname] = useState('')
    const [major, setMajor] = useState('')
    const [GPA, setGPA] = useState(0)

    // const getStudents = async () => {

    //     let student = await axios.get(URL);

    //     setStudents(student.data);
    // }

    const { data, error } = useSWR(URL, fetcher)
    if (!data) return <div>Loading...</div>
    console.log('Home', data);

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
        //setStudents(students.data)
        mutate(URL)
    }

    const deleteStudent = async (id) => {

        let students = await axios.delete(`${URL}/${id}`)
        //setStudents(students.data)
        mutate(URL)
    }

    const updateStudent = async (id) => {

        let students = await axios.put(`${URL}/${id}`, { fname, surname, major, GPA })
        //setStudents(students.data)
        mutate(URL)
    }



    const printStudents = (students) => {
        console.log('Students: ', students);
        if (students && students.length)
            return (students.map((student, index) =>

            (<li key={index}>

                {/* {item.id}.
                {item.fname}:
                {item.surname}:
                {item.major}:
                {item.GPA} */}
                

                {(student) ? student.fname : '-'} :
                {(student) ? student.surname : '-'} :
                {(student) ? student.major : '-'} :
                {(student) ? student.GPA : 0}

                
                <button onClick={() => getStudent(student.id)}>Get</button>
                <button onClick={() => updateStudent(student.id)}>Update</button>
                <button onClick={() => deleteStudent(student.id)}>Delete</button>

            </li>)

            ))
        else 
        {
            (<h2>No Student</h2>)
        }


    }
    




    return (

        <div> Hello
            <ul>{printStudents(data.list)} </ul>
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