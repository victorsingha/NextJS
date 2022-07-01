import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'

class mdlReq {
  public Email = "";
  public Password = "";
}

const Landing: NextPage = () => {
  let obj = new mdlReq();
  let obj2:any;
  const [Req, SetReq] = useState(obj);
  const [IsSubmit, SetIsSubmit] = useState(false);
  const [Users, SetUsers] = useState(obj2);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    SetReq({ ...Req, [name]: value });
  }

  const submit = () => {
    SetIsSubmit(true);
    if (validateEmail(Req.Email) != "") return;
    if (validatePassword(Req.Password) != "") return;
    SetReq({...Req,"Email":"Login Success!"})
    fetchUser()
  }
  const validateEmail = (value: any) => {
    if (!value) return "Email is Required"
    return "";
  }
  const validatePassword = (value: any) => {
    if (!value) return "Password is Required"
    if (value.length < 3) return "Password should be minimum 3 letter"
    return "";
  }

 async function fetchUser(){
    const res = await fetch("http://localhost:3000/api/user");
    const json = res.json
    SetUsers(res)
    console.log(json)
  }

  useEffect(()=>{
    fetchUser
  },[])

  return (
    <div>
      <main className={styles.main}>
      <pre>{JSON.stringify(Users, undefined, 2)}</pre>
        <pre>{JSON.stringify(Req, undefined, 2)}</pre>
        <section>
          <input name="Email" type="text" value={Req.Email} onChange={handleChange} />
          <p>{IsSubmit?validateEmail(Req.Email):""}</p>
          <input name="Password" type="text" value={Req.Password} onChange={handleChange} />
          <p>{IsSubmit?validatePassword(Req.Password):""}</p>
          <button onClick={submit}>Submit</button>
        </section>
      </main>
    </div>
  )
}

export default Landing
