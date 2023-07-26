import React,{useState} from 'react'
import './PasswordReset.css'

const PasswordReset = () => {
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState('')

    const setVal = (e) =>{
        setEmail(e.target.value)
    }

    const sendLink = async(e)=>{
        e.preventDefault();
            setMessage(true)
    }
  return (
   <>
    <section>
        <div className='form_data'>
            <div className='form_heading'>
                <h1>Enter Your Email</h1>
            </div>

        {message ? <p style={{color:"green", fontWeight:"bold"}}>Password reset link send Succsfully in Your Email</p>:""}
            <form>
                <div className='form_input'>
                    <label htmlFor='email'>Email</label>
                    <input type='email' value={email} onChange={setVal} name='email' id='email' placeholder='Enter Your Email Address'/>
                </div>
                <button className='btn' onClick={sendLink}>Send</button>
            </form>
        </div>
    </section>
   
   </>
  )
}

export default PasswordReset