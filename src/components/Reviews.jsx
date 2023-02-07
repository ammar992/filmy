import React, { useContext, useEffect, useState } from 'react';
import ReactStars from 'react-stars';
import { reviewsRef, db } from '../firebase/firebase';
import {
  addDoc,
  doc,
  updateDoc,
  getDocs,
  where,
  query,
} from 'firebase/firestore';
import { TailSpin, ThreeDots } from 'react-loader-spinner';
import { async } from '@firebase/util';
import swal from 'sweetalert';
import { Appstate } from '../App';
import { useNavigate } from 'react-router-dom';

function Reviews({ id, rate, rated,setNum,num }) {
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [thoughts, setThoughts] = useState('');
  const [addNum,setAddNum] = useState(0);

  const ratings = (e) => {
    setRating(e);
  };

  const nevigate = useNavigate();

  const useAppstate = useContext(Appstate);
  const sendReview = async () => {
    try {
      if (useAppstate.login) {
        setLoading(true);
        await addDoc(reviewsRef, {
          movieId: id,
          name: useAppstate.userName,
          rating: rating,
          thoughts: thoughts,
          timestamp: new Date().getTime(),
        });
        swal({
          title: 'Review Sent',
          icon: 'success',
          buttons: 'flase',
          timer: 3000,
        });

        const ref = doc(db, 'movies', id);
        await updateDoc(ref, {
          rating: rate + rating,
          rated: rated + 1,
        });
        setAddNum(addNum+1);
        setNum(num+1);
        setThoughts('');
        setRating(0);
        setLoading(false);
      } else {
        nevigate('/login');
      }
    } catch (error) {
      swal({
        title: error.message,
        icon: 'error',
        buttons: 'false',
        timer: 3000,
      });
    }
  };
  const getData = async () => {
    setReviewsLoading(true);
    setData([]);
    let quer = query(reviewsRef, where('movieId', '==', id));
    const quersnapshot = await getDocs(quer);
    quersnapshot.forEach((doc) => {
      setData((prev) => [...prev, doc.data()]);
    });
    setReviewsLoading(false);
  };
  useEffect(() => {
    getData();
  }, [addNum]);
  return (
    <div className="mt-4 w-full mt-5 border-t-2 border-gray-600">
      <ReactStars
        size={30}
        half={true}
        edit={true}
        onChange={ratings}
        value={rating}
      />
      <input
        type="text"
        className="p-2 w-full rounded-sm bg-gray-800 outline-none"
        placeholder="Share your thoughts...."
        value={thoughts}
        onChange={(e) => {
          setThoughts(e.target.value);
        }}
      />
      <button
        onClick={sendReview}
        className="bg-green-600 p-2 flex justify-center items-center  rounded-sm font-medium tracking-wider text-lg mt-1 w-full"
      >
        {loading ? <TailSpin height={23} color="white" /> : 'Share'}
      </button>
      {reviewsLoading ? (
        <div className="flex justify-center mt-6">
          <ThreeDots height={15} color="white" />
        </div>
      ) : (
        <div className="mt-4">
          {data.map((d, i) => {
            return (
              <div
                key={i}
                className=" mt-3 bg-gray-800 p-2 border-gray-900 border-b"
              >
                <div className="flex items-center">
                  <p className="text-blue-500 text-xl">{d.name}</p>
                  <p className="ml-3 flex text-sm">
                    {new Date(d.timestamp).toLocaleString()}
                  </p>
                </div>
                <ReactStars
                  size={20}
                  half={true}
                  edit={false}
                  value={d.rating}
                />
                <p>{d.thoughts}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Reviews;
