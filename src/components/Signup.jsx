import React, { useState } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { addDoc } from 'firebase/firestore';
import { usersRef } from '../firebase/firebase';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

// import {
//   getAuth,
//   RecaptchaVerifier,
//   signInWithPhoneNumber,
// } from 'firebase/auth';
import app from '../firebase/firebase';
import swal from 'sweetalert';
import { async } from '@firebase/util';

const auth = getAuth();

function Login() {
  const [loading, setLoading] = useState(false);
  const [otpsent, setOtpSent] = useState(false);
  const [OTP, setOTP] = useState('');
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  // const generateRecaptha = () => {
  //   window.recaptchaVerifier = new RecaptchaVerifier(
  //     'recaptcha-container',
  //     {
  //       size: 'invisible',
  //       callback: (response) => {
  //         // reCAPTCHA solved, allow signInWithPhoneNumber.
  //       },
  //     },
  //     auth
  //   );
  // };

  const handle = (e) => {
    const { name, value } = e.target;
    setData((pre) => {
      return { ...pre, [name]: value };
    });
  };

  // const requestOTP = () => {
  //   setLoading(true);
  //   generateRecaptha();
  //   const appVerifier = window.recaptchaVerifier;
  //   signInWithPhoneNumber(auth, `+92${data.number}`, appVerifier)
  //     .then((confirmationResult) => {
  //       window.confirmationResult = confirmationResult;
  //       swal({
  //         title: 'OTP Sent',
  //         icon: 'success',
  //         buttons: 'ok',
  //         timer: 3000,
  //       });
  //       setLoading(false);
  //       setOtpSent(true);
  //     })
  //     .catch((error) => {
  //       // Error; SMS not sent
  //       // ...
  //     });
  // };

  const Register = () => {
    try {
      // window.confirmationResult.confirm(OTP).then((result) => {
      //   uploadData();
      //   swal({
      //     title: 'Registered',
      //     icon: 'success',
      //     buttons: 'ok',
      //     timer: 3000,
      //   });
      //   setLoading(false);
      //   navigate('/login');
      // });
      setLoading(true);
      createUserWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
          const user = userCredential.user;
          uploadData();
          swal({
            title: 'Registered',
            icon: 'success',
            buttons: 'ok',
            timer: 3000,
          });
          navigate('/login');
        })
        .catch((error) => {
          swal({
            title: error.message,
            icon: 'fail',
            buttons: 'ok',
            timer: 3000,
          });
          setLoading(false);
        });
    } catch (error) {
      swal({
        title: error.message,
        icon: 'fail',
        buttons: 'ok',
        timer: 3000,
      });
    }
  };
  const uploadData = async () => {
    try {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(data.password, salt);
      await addDoc(usersRef, {
        name: data.name,
        email: data.email,
        password: hash,
      });
    } catch (error) {
      swal({
        title: error.message,
        icon: 'error',
        buttons: 'ok',
        timer: 3000,
      });
    }
  };
  return (
    <div className="flex items-center justify-center flex-col mt-6">
      <h1 className="text-2xl tracking-wider font-bold">Sign Up</h1>

      {otpsent ? (
        <>
          <div class="p-2 w-full md:w-1/3">
            <div class="relative ">
              <label
                for="message"
                class="leading-7 font-small text-2xl label text-gray-300"
              >
                OTP
              </label>
              <input
                type="number"
                id="number"
                onChange={(e) => {
                  setOTP(e.target.value);
                }}
                name="number"
                value={OTP}
                class="w-full  text-white  rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div class="p-2 w-full">
              <button
                // onClick={verifyOTP}
                class="flex mx-auto text-white bg-lime-500 border-0 py-2 px-8 focus:outline-none hover:bg-lime-600 rounded text-lg"
              >
                {loading ? (
                  <TailSpin height={25} color="white" />
                ) : (
                  'Confirm OTP'
                )}
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div class="p-2 w-full md:w-1/3">
            <div class="relative ">
              <label
                for="message"
                class="leading-7 font-small text-sm text-gray-300"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                onChange={handle}
                name="name"
                value={data.name}
                class="w-full  text-white  rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
          <div class="p-2 w-full md:w-1/3">
            <div class="relative ">
              <label
                for="message"
                class="leading-7 font-small text-sm text-gray-300"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                onChange={handle}
                name="email"
                value={data.email}
                class="w-full  text-white  rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>

          <div class="p-2 w-full md:w-1/3">
            <div class="relative ">
              <label
                for="message"
                class="leading-7 font-small text-sm text-gray-300"
              >
                Password
              </label>
              <input
                type={`password`}
                id="password"
                name="password"
                value={data.password}
                onChange={handle}
                class="w-full  text-white  rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
          <div class="p-2 w-full">
            <button
              // onClick={requestOTP}
              onClick={Register}
              class="flex mx-auto text-white bg-lime-500 border-0 py-2 px-8 focus:outline-none hover:bg-lime-600 rounded text-lg"
            >
              {loading ? <TailSpin height={25} color="white" /> : 'Register'}
            </button>
          </div>
          <div>
            <p>
              Already have an account
              <Link to={`/login`}>
                <span className="text-blue-500"> Login</span>
              </Link>
            </p>
          </div>
        </>
      )}
      <div id="recaptcha-container"></div>
    </div>
  );
}

export default Login;
