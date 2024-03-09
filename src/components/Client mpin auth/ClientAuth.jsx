import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';
import axios from 'axios';
// import './mpin.css';
// import { useDispatch } from 'react-redux';
// import { setuserMpinData } from '../../redux/reducers/authReducer';

function ClientAuth() {
  const [mPin, setMPin] = useState('');
  const navigate = useNavigate();
  //   const dispatch = useDispatch();
  const mPinInputRef = useRef(null);

  useEffect(() => {
    mPinInputRef.current.focus();
  }, []);

  const handleInputChange = (e) => {
    setMPin(e.target.value);
  };
  const fetchData = async () => {
    const mpinapi = `http://103.67.238.230:1385/SysMpin/authenticateSysmpin?mPin=${mPin}`;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer your_token_here',
      'x-api-key': mPin,
    };

    try {
      const response = await axios.post(mpinapi, { mPin }, { headers });
      //   dispatch(setuserMpinData(response.data));

      const apidata = response.data?.Data;
      const apiMpin = apidata?.mPin;

      if (apiMpin === mPin) {
        navigate('/login');
        // toast.success('Mpin Verified !');
      } else {
        // toast.error('Invalid MPIN');
        setMPin('');
      }
    } catch (error) {
      //   toast.error('Invalid MPIN');
      console.error('Error fetching data:', error);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await fetchData();
    } catch (error) {
      console.log('Error : ', error);
    }
  };

  return (
    <>
      <section>
        <div className="grid grid-cols-1 lg:grid-cols-2 ">
          <div className="relative flex items-end px-4 pb-10 sm:px-6 sm:pb-16 md:justify-center lg:px-8 lg:pb-24 max-[390px]:hidden ">
            <div className="">
              <img
                className="h-full w-full ml-14 mt-44 object-cover object-top"
                src="https://img.freepik.com/premium-photo/graphic-software-small-business-companion_927851-5607.jpg?w=740"
                alt=""
              />
            </div>
          </div>
          <div className=" flex flex-1 flex-col justify-center mt-10 px-6  lg:px-8 ">
            <div className="sm:mx-auto lg:w-6/12 sm:max-w-sm ">
              <img
                className="mx-auto w-auto sm:w-full"
                src="https://sysproerp.in/includes/site/assets/images/logo-footer.png"
                alt="Company logo"
              />
              <h3 className="flex items-center justify-center text-xl font-bold">{/* {ClientType} */}</h3>
              {/* <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign in to your account
              </h2> */}
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <div className="flex items-center justify-between">
                    {/* <label htmlFor="mPin" className=" text-sm font-medium leading-6 text-gray-900 login-txt ">
                      M-Pin
                    </label> */}
                  </div>
                  <div className="mt-2">
                    <input
                      ref={mPinInputRef}
                      name="mPin"
                      type="text"
                      value={mPin}
                      onChange={handleInputChange}
                      placeholder="Enter your M-pin here..."
                      required
                      className="login-inputs block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 rounded-3xl"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  {/* <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-3xl bg-[#004787] px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-[#004787]/80 "
                  >
                    Sign in
                  </button> */}
                  <button type="submit" onClick={handleSubmit} className="bn632-hover bn18 w-full ">
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ClientAuth;
