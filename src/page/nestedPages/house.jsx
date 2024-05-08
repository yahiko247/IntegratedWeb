import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import {db} from '../../firebase/firebase'
import {collection, getDocs, addDoc, deleteDoc, doc} from 'firebase/firestore'

function HousePage() {

    //hook state for storing data
    const [newName, setNewName] = useState("")
    const [newAge, setNewAge] = useState(0)
    const [newLastName, setNewLastName] = useState("")
    const [newMiddleName, setNewMiddleName] = useState("")
    const [newBirth, setNewBirth] = useState("")
    const [newContact, setNewContact] = useState(0)
    const [newProvince, setNewProvince] = useState("")
    const [newBarangay, setNewBarangay] = useState("")
    const [newZone, setNewZone] = useState(0)
    const [newMunicipal, setNewMunicipal] = useState("")


    //hook for reading data
    const [users, setUsers] = useState([]);
    const userCollectionReference = collection(db, "users_data")

    //Store data to database
    const createUser = async () => {
        await addDoc(userCollectionReference, {name: newName, middle: newMiddleName, lastname: newLastName, age: newAge, birth: newBirth, contact: newContact, municipal:newMunicipal, barangay: newBarangay, zone: newZone, province: newProvince})
    }
    //delet users from database
    const deleteUser = async (id) => {
        const userDoc = doc(db,"users_data", id)
        await deleteDoc(userDoc);
    }


//read data from database
    useEffect(()=> {
        const getUsers = async () => {
            const data = await getDocs(userCollectionReference);
            setUsers(data.docs.map((doc)=>({...doc.data(), id: doc.id})))
        };

        getUsers();
    },[])
  return (
    <div className=''>
        <input type="text"placeholder='Name...' onChange={(event) => {setNewName(event.target.value)}}/>
        <input type="text" placeholder='Middle...'onChange={(event) => {setNewMiddleName(event.target.value)}}/>
        <input type="text" placeholder='Lastname...'onChange={(event) => {setNewLastName(event.target.value)}}/>
        <input type="number" placeholder='Age...'onChange={(event) => {setNewAge(event.target.value)}}/>
        <input type="text" placeholder='date of birth...'onChange={(event) => {setNewBirth(event.target.value)}}/>
        <input type="number" placeholder='contact...'onChange={(event) => {setNewContact(event.target.value)}}/>
        <input type="text" placeholder='municipal...'onChange={(event) => {setNewMunicipal(event.target.value)}}/>
        <input type="text" placeholder='barangay...'onChange={(event) => {setNewBarangay(event.target.value)}}/>
        <input type="number" placeholder='Zone...'onChange={(event) => {setNewZone(event.target.value)}}/>
        <input type="text" placeholder='province...'onChange={(event) => {setNewProvince(event.target.value)}}/>
        <button type='button' className='btn btn-success' onClick={createUser}>Add residents</button>
        
        {users.map((user)=> {
            return(<div>{""}
            <h1>Name: {user.firstname}</h1>
            <h1>M: {user.Middlename}</h1>
            <h1>LastName: {user.lastname}</h1>
            <h1>Age: {user.Age}</h1>
            <h1>Birthday: {user.birthday}</h1>
            <h1>contact: {user.contact_number}</h1>
            <h1>municipality: {user.municipality}</h1>
            <h1>barangay: {user.barangay}</h1>
            <h1>zone: {user.zone}</h1>
            <h1>province: {user.province}</h1>
            <button onClick={() =>{deleteUser(user.id)}}>delete</button>
            </div>);
           
           
        })}
       
     
    </div>
  )
}

export default HousePage
