import React, { useState } from 'react';
import axios from 'axios';
import 'lord-icon-element'; 
function ResetPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
const [resStatus,setResStatus]=useState(true)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_URL}/resetpassword`, {
        email,
      });
      if (response.status === 200) {
        setResStatus(false)
        setMessage('Link to reset password was sent to your mail');
        setTimeout(() => {
          setMessage('');
        }, 5000); // Hide message after 5 seconds
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      setMessage('Failed to reset password. Please try again.');
      setTimeout(() => {
        setMessage('');
      }, 5000); // Hide message after 5 seconds
    }
  };

  return (
    <div className="container">

      <div className="row justify-content-center align-items-center ">
        <div className="col-md-12">
       {resStatus?   <form onSubmit={handleSubmit} className='align-items-center ' style={{justifyContent:"center",display:"flex",flexDirection:"column"}}>
          <script src="https://cdn.lordicon.com/lordicon.js"></script>
<lord-icon
    src="https://cdn.lordicon.com/ukwexxlc.json"
    trigger="loop"
    delay="1500"
    state="in-unfold"
    style={{ width: '90px', height: '90px' }}>
</lord-icon>
            <div className="form-group">
            Enter your email and we'll send you a link to reset your password.
<br></br><br></br>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder='Email Address'
              />
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary" style={{ width: '150px' }}>Send Reset Link</button>
            </div>
        
          </form>:message && <div className="mt-3">{message}</div>}
          
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
