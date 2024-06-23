import React, { useState } from 'react'
import Avatar from '../components/Avatar'
import styles from './CreateAvatar.module.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Button from '../components/Button'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const femaleAvatarList = [{
    src: "w-1.svg",
    id: "0648ec21-ea8e-4998-8678-6f1fcb25cb9b",
},
{
    src: "w-2.svg",
    id: "2242f309-ef04-475b-bf7d-asdada1231ghn",
},
{
    src: "w-3.svg",
    id: "57eee8dd-2746-49f6-123as-s7casda69efa"
},
{
    src: "w-4.svg",
    id: "asdad123-2746-49f6-8e15-asdd12ee2asd"
},
{
    src: "w-5.svg",
    id: "57eee8dd-asdada1231-,23asdaasda!1231"
},
{
    src: "w-6.svg",
    id: "gbsasdf1-2746-49f6-8e15-vsa3142413sd"
},
{
    src: "w-7.svg",
    id: "57eee8dd-2746-49f6-8e15-ads1e1dcsasd"
},

]

const maleAvatarList = [{
    src: "m-1.svg",
    id: "57eee8dd-2746-49f6-8e15-asdas!!asav"
},
{
    src: "m-2.svg",
    id: "1231asds-2746-asda1-8e15-1231asdadhh"
},
{
    src: "m-3.svg",
    id: "57eee8dd-2746-49f6-8e15-gasd12312312"
},
{
    src: "m-4.svg",
    id: "asda1231-2746-49f6-31ef-asdad12efb,,g"
},
{
    src: "m-5.svg",
    id: "57eee8dd-2746-49f6-2dw3-7cb3d69efa97"
},
{
    src: "m-6.svg",
    id: "asdasd12-2746-49f6-2dw3-asdad12321ads"
},
{
    src: "m-7.svg",
    id: "57eee8dd-2746-1232-asda-67i5hdfgdg3sd"
},
]





export default function CreateAvatar() {

    const [selectedAvatar, setSelectedAvatar] = useState(null);
    const {user, updateUser} = useAuth();
    const navigate = useNavigate();


    function handleClick(src){
        setSelectedAvatar(src);
    }

    function handleSubmit(e){
        e.preventDefault();
        const newUser = {...user, avatar: selectedAvatar}
        console.log(newUser);
        updateUser(user.id, newUser);
        navigate("/");


    }

  return (
   <div>
       <Header/>
            <form onSubmit={handleSubmit}> 
                <div className={styles.CreateAvatar}>
                    <h1>Hey {user.name}!</h1>
                    <h2>Choose an Avatar:</h2>
                    <div className={styles.avatarList}>
                    {femaleAvatarList.map((element) =>
                        <Avatar 
                            img={element.src}
                            key={element.id}
                            selectedAvatar={selectedAvatar}
                            onHandleClick={() => handleClick(element.src)}
                            id={element.id}
                        />
                    )}
                    </div>
                    <div className={styles.avatarList}>
                    {maleAvatarList.map((element) =>
                        <Avatar 
                            img={element.src}
                            key={element.id}
                            selectedAvatar={selectedAvatar}
                            onHandleClick={() => handleClick(element.src)}
                            id={element.id}
                        />
                    )}
                    </div>
                    {selectedAvatar && <Button type="select">Select</Button>}
                    
                </div>
            </form>
        <Footer/>
    </div> 
  )
}
