import { useState } from 'react';
import { toast } from 'react-toastify';
import { forgotPasswordApi } from '../../apis/Api';

export default function ForgetPassword() {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');

  const handleForgotClick = () => {   
    console.log("forgot password clicked!");  //forgot response
    setShowModal(true);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const forgotPassword = (e) => {
    e.preventDefault();
    const data = {
      email: email,
    };

    // Rename the inner function to something else
    forgotPasswordApi(data)
      .then((res) => {
        if (res.data.success === true) {
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error(err.response?.data?.message || 'Internal server error');
      });

    setShowModal(false);  //close the model after showing
    
  }; 

  return (
    <>
      <div onClick={handleForgotClick} className="text-right text-sky-500 hover:text-sky-400 cursor-pointer">
        Forget Password?
      </div>

      {showModal && (
        <div className="modal" id='#mymodal'>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <span className="text-base font-semibold leading-6 text-gray-900">Enter Your Email</span>
                </h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleEmail}
                  className="form-control mb-3"
                  style={{ color: 'black' }} // Set text color to black
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Close
                </button>
                <button type="button" className="btn btn-primary" onClick={forgotPassword}>
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
