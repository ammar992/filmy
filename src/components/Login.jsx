import { async } from '@firebase/util';
import React, { useContext, useState } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { getDoc, getDocs, query, where } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { usersRef } from '../firebase/firebase';
import { Appstate } from '../App';
import bcrypt from 'bcryptjs';

function Login() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const useAppstate = useContext(Appstate);

  const handle = (e) => {
    const { name, value } = e.target;
    setData((pre) => {
      return { ...pre, [name]: value };
    });
  };

  const navigate = useNavigate();

  const login = async () => {
    setLoading(true);
    try {
      const quer = query(usersRef, where('email', '==', data.email));
      const querySnapshort = await getDocs(quer);
      querySnapshort.forEach((doc) => {
        const _data = doc.data();
        const isUser = bcrypt.compareSync(data.password, _data.password);
        if (isUser) {
          useAppstate.setLogin(true);
          useAppstate.setUsername(_data.name);
          swal({
            title: 'logged in',
            icon: 'success',
            buttons: 'flase',
            timer: 3000,
          });
          navigate('/');
        } else {
          swal({
            title: "Email or password doesn't match",
            icon: 'error',
            buttons: 'flase',
            timer: 3000,
          });
        }
      });
    } catch (error) {
      console.log(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center flex-col mt-6">
      <h1 className="text-2xl tracking-wider font-bold">Login</h1>

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
            value={data.number}
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
            type="password"
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
          onClick={login}
          class="flex mx-auto  text-white bg-lime-500 border-0 py-2 px-8 focus:outline-none hover:bg-lime-600 rounded text-lg"
        >
          {loading ? <TailSpin height={25} color="white" /> : 'Login'}
        </button>
      </div>
      <div>
        <p>
          Do not have an account?
          <Link to={`/signup`}>
            <span className="text-blue-500"> Sign Up</span>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
