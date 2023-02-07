import React, { useEffect, useState } from 'react';
import ReactStars from 'react-stars';
import { useParams } from 'react-router-dom';
import { async } from '@firebase/util';
import { db } from '../firebase/firebase';
import { getDoc, doc } from 'firebase/firestore';
import { ThreeCircles } from 'react-loader-spinner';
import Reviews from './Reviews';

function Detail() {
  const { id } = useParams();
  const [data, setData] = useState({
    title: '',
    year: '',
    image: '',
    description: '',
    rating: 0,
    rated: 0,
  });
  const [loading, setLoading] = useState(false);
  const [num,setNum] = useState(0)

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const _doc = doc(db, 'movies', id);
      const _data = await getDoc(_doc);
      setData(_data.data());
      setLoading(false);
    }
    getData();
  }, [num]);
  return (
    <div className="p-4 mt-4 flex flex-col md:flex-row w-full justify-center">
      {loading ? (
        <div className="w-full flex h-96 justify-center items-center">
          <ThreeCircles height={80} color="white" />
        </div>
      ) : (
        <>
          <div className='min-w-52 max-w-xs	'>
            <img
              className="h-96 block w-full  md:sticky top-24"
              src={data.image}
              alt="img"
            />
          </div>
          <div className="md:ml-4 w-full ml-0  md:w-1/2">
            <h1 className="text-3xl font-bold text-gray-500">
              {data.title} <span className="text-xl">({data.year})</span>
            </h1>
            <ReactStars
              size={20}
              half={true}
              value={data.rating / data.rated}
              edit={false}
            />
            <p className="mt-3">{data.description}</p>
            <Reviews id={id} rate={data.rating} setNum={setNum} num={num} rated={data.rated} />
          </div>
        </>
      )}
    </div>
  );
}

export default Detail;
