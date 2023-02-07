import React, { useEffect, useState } from 'react';
import ReactStars from 'react-stars';
import { ThreeDots } from 'react-loader-spinner';
import { async } from '@firebase/util';
import { doc, getDocs } from 'firebase/firestore';
import { moviesRef } from '../firebase/firebase';
import { Link } from 'react-router-dom';

function Card() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const getData = async () => {
    setLoading(true);
    const _data = await getDocs(moviesRef);
    // const _datafire = _data.docs.map(doc=>doc.data());
    _data.forEach((doc) => {
      setData((pre) => {
        return [...pre, { ...doc.data(), id: doc.id }];
      });
    });
    // setData(_datafire);
    setLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex justify-center items-center flex-wrap w-11/12 m-auto mt-5">

      {loading ? (
        <div className="h-96 flex justify-center items-center w-full">
          <ThreeDots color="white" />
        </div>
      ) : (
        data.map((d, i) => {
          return (
            <Link to={`/detail/${d.id}`}>
              <div
                key={i}
                className="card p-2 w-64 mx-8 mb-6 hover:-translate-y-2 cursor-pointer font-medium transition-all duration-700 "
              >
                <div className=" max-w-sm">
                  <img
                    className="h-60  md:h-72 mb-3 h-48  w-full"
                    src={d.image}
                    alt="img"
                  />
                </div>
                <p>{d.title}</p>
                <p className="flex items-center">
                  <span className="mr-2">Ratings:</span>
                  <ReactStars size={20} half={true} value={d.rating/d.rated} edit={false} />
                </p>
                <p>{d.year}</p>
              </div>
            </Link>
          );
        })
      )}
    </div>
  );
}

export default Card;
