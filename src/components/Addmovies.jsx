import React, { useContext, useState } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { addDoc } from 'firebase/firestore';
import { moviesRef } from '../firebase/firebase';
import { async } from '@firebase/util';
import swal from 'sweetalert';
import { Appstate } from '../App';
import { useNavigate } from 'react-router-dom';

function Addmovies() {
  const [data, setData] = useState({
    title: '',
    year: '',
    description: '',
    image: '',
  });

  const nevigate = useNavigate();
  const useAppstate = useContext(Appstate);

  const handle = (e) => {
    const { name, value } = e.target;
    setData((pre) => {
      return { ...pre, [name]: value };
    });
  };

  const [loading, setLoading] = useState(false);

  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    setData({
      title: '',
      year: '',
      description: '',
      image: '',
    });
    try {
      if (useAppstate.login) {
        await addDoc(moviesRef, data);
        swal({
          title: 'Successfully Added',
          icon: 'success',
          buttons: 'ok',
          timer: 3000,
        });
        setLoading(false);
      } else {
        nevigate('/login');
      }
    } catch (error) {
      swal({
        title: 'err',
        icon: 'error',
        buttons: 'ok',
        timer: 3000,
      });
    }
  };

  return (
    <div>
      <section class="text-gray-600 body-font relative">
        <form onSubmit={submitForm}>
          <div class="container px-5 py-8 mx-auto">
            <div class="flex flex-col text-center w-full mb-12">
              <h1 class="sm:text-3xl text-xl font-medium title-font mb-1 text-white">
                Add Movies
              </h1>
            </div>
            <div class="lg:w-1/2 md:w-2/3 mx-auto">
              <div class="flex flex-wrap -m-2">
                <div class="p-2 w-1/2">
                  <div class="relative">
                    <label
                      for="name"
                      class="leading-7 text-sm font-medium text-white"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={data.title}
                      name="title"
                      onChange={handle}
                      class="w-full bg-white  rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>
                <div class="p-2 w-1/2">
                  <div class="relative">
                    <label
                      for="email"
                      class="leading-7 text-sm font-medium text-2xl text-white"
                    >
                      Year
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={data.year}
                      name="year"
                      onChange={handle}
                      class="w-full  text-white  rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>
                <div class="p-2 w-full">
                  <div class="relative">
                    <label
                      for="message"
                      class="leading-7 font-medium text-sm text-white"
                    >
                      Image Link
                    </label>
                    <textarea
                      id="message"
                      name="image"
                      value={data.image}
                      onChange={handle}
                      class="w-full bg-white h-12 rounded border focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                    ></textarea>
                  </div>
                </div>
                <div class="p-2 w-full">
                  <div class="relative">
                    <label
                      for="message"
                      class="leading-7 font-medium text-sm text-white"
                    >
                      Description
                    </label>
                    <textarea
                      id="message"
                      name="description"
                      value={data.description}
                      onChange={handle}
                      class="w-full bg-white  rounded border  focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                    ></textarea>
                  </div>
                </div>
                <div class="p-2 w-full">
                  <button
                    onClick={submitForm}
                    class="flex mx-auto text-white bg-lime-500 border-0 py-2 px-8 focus:outline-none hover:bg-lime-600 rounded text-lg"
                  >
                    {loading ? (
                      <TailSpin height={25} color="white" />
                    ) : (
                      'Submit'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Addmovies;
