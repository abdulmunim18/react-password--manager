import React, { useRef, useState, useEffect } from 'react';

const Main = () => {
  const ref = useRef();
  const [form, setform] = useState({ site: "", name: "", pass: "" });
  const [passwordarr, setpasswordarr] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setpasswordarr(JSON.parse(passwords));
    }
  }, []);

  const Showpass = () => {
    if (ref.current.src.includes("icons/eye.png")) {
      ref.current.src = "icons/eyecross.png";
    } else {
      ref.current.src = "icons/eye.png";
    }
  };

  const Savepass = () => {
    const newArr = [...passwordarr, form];
    setpasswordarr(newArr);
    localStorage.setItem("passwords", JSON.stringify(newArr));
  };

  const handlechange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <div className="my-container">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-green-500">&lt;</span>
          Pass
          <span className="text-green-500">Mang / &gt;</span>
        </h1>

        <p className="text-green-900 text-center text-lg">
          Your own password manager
        </p>

        <div className="flex flex-col p-4 text-black gap-5 items-center">
          <input
            value={form.site}
            onChange={handlechange}
            className="rounded-lg border border-green-600 w-full p-4 py-1"
            type="text"
            name="site"
            placeholder="Enter your website URL"
          />
          <div className="flex w-full gap-5">
            <input
              value={form.name}
              onChange={handlechange}
              className="rounded-lg border border-green-600 w-full p-4 py-1"
              type="text"
              name="name"
              placeholder="Enter your name"
            />
            <div className="relative">
              <input
                value={form.pass}
                onChange={handlechange}
                className="rounded-lg border border-green-600 w-full p-4 py-1"
                type="text"
                name="pass"
                placeholder="Enter password"
              />
              <span
                className="absolute right-[1px] top-[3px]"
                onClick={Showpass}
              >
                <img
                  ref={ref}
                  className="p-1 cursor-pointer"
                  width={27}
                  src="icons/eye.png"
                  alt=""
                />
              </span>
            </div>
          </div>

          <button
            onClick={Savepass}
            className="flex justify-center items-center gap-2 bg-green-400 hover:bg-green-300 rounded-full px-8 py-2 w-fit border border-green-900"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Save
          </button>
        </div>

        <div className="password1">
          <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
          {passwordarr.length === 0 && <div>No passwords saved</div>}
          {passwordarr.length !=0 &&<table className="table-auto w-full rounded-md overflow-hidden">
            <thead className='bg-green-800 text-white'>
              <tr>
                <th className='py-2'>Song</th>
                <th className='py-2'>Artist</th>
                <th className='py-2'>Year</th>
              </tr>
            </thead>
            <tbody className='bg-green-100'>
              <tr>
                 <td className='py-2 border border-white text-center w-32'>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                 <td className='py-2 border border-white text-center w-32'>Malcolm Lockyer</td>
                 <td className='py-2 border border-white text-center w-32'>1961</td>
              </tr>
              <tr>
                 <td className='py-2 border border-white text-center w-32'>Witchy Woman</td>
                 <td className='py-2 border border-white text-center w-32'>The Eagles</td>
                 <td className='py-2 border border-white text-center w-32'>1972</td>
              </tr>
              <tr>
                 <td className='py-2 border border-white text-center w-32'>Shining Star</td>
                 <td className='py-2 border border-white text-center w-32'>Earth, Wind, and Fire</td>
                 <td className='py-2 border border-white text-center w-32'>1975</td>
              </tr>
            </tbody>
          </table>}
        </div>
      </div>
    </>
  );
};

export default Main;
