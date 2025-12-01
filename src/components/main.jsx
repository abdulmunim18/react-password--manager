import React from 'react'
import { useRef, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Main = () => {
  const ref = useRef();
  const [form, setform] = useState({ site: "", name: "", pass: "" });
  const [passwordarr, setpasswordarr] = useState([]);
  const passwordref = useRef();

  // useEffect(() => {
  //   let passwords = localStorage.getItem("passwords");
  //   if (passwords) {
  //     setpasswordarr(JSON.parse(passwords));
  //   }
  // }, []);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      let parsed = JSON.parse(passwords);

      parsed = parsed.filter(p =>
        p.site.trim() !== "" &&
        p.name.trim() !== "" &&
        p.pass.trim() !== ""
      );

      setpasswordarr(parsed);
      localStorage.setItem("passwords", JSON.stringify(parsed));
    }
  }, []);

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    toast('Copied to clipboard', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
  const Showpass = () => {
    passwordref.current.type = "text";
    if (ref.current.src.includes("icons/eye.png")) {
      ref.current.src = "icons/eyecross.png";
    } else {
      ref.current.src = "icons/eye.png";
      passwordref.current.type = "password";
    }
  };

  const Savepass = () => {
    if(form.site>3 && form.name.length >3 && form.pass.length >3){
    const newArr = [...passwordarr, {...form, id :uuidv4()}];
    setpasswordarr(newArr);
    localStorage.setItem("passwords", JSON.stringify(newArr));
    setform({ site: "", name: "", pass: "" }); // form reset
     toast('Password saved successfully', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    })
    } else {
      toast('Please enter details correctly and more than 3 characters')};
  };
  const Deletepass = (id) => {
    let c = confirm("Are you sure you want to delete this password?");
    if (c){
    setpasswordarr(passwordarr.filter((item)=> item.id !==id))
    localStorage.setItem("passwords", JSON.stringify(passwordarr.filter((item)=> item.id !==id)));
    }
    toast('Password Deleted', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
  const editpass = (id) => {
    setform(passwordarr.filter(i=> i.id ===id)[0])
    setpasswordarr(passwordarr.filter((item)=> item.id !==id))
  };
  //     const Savepass = () => {
    
  //     const newArr = [...passwordarr, form];
  //   setpasswordarr(newArr);
  //   localStorage.setItem("passwords", JSON.stringify(newArr));

  //   setform({ site: "", name: "", pass: "" }); // form reset
  // };
  const handlechange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <div className="p-2 md:px-0 md:my-container">
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
          <div className="flex w-full gap-5 flex-col md:flex-row">
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
                ref={passwordref}
                value={form.pass}
                onChange={handlechange}
                className="rounded-lg border border-green-600 w-full p-4 py-1"
                type="password"
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
          {passwordarr.length != 0 && <table className="table-auto w-full rounded-md overflow-hidden">
            <thead className='bg-green-800 text-white'>
              <tr>
                <th className='py-2'>Site</th>
                <th className='py-2'>Username</th>
                <th className='py-2'>Passwords</th>
                <th className='py-2'>Actions</th>
              </tr>
            </thead>
            <tbody className='bg-green-100'>
              {passwordarr.map((item, index) => {
                return <tr key={index}>
                  <td className='py-2 border border-white text-center w-32'>
                    <div className='flex items-center justify-center '>
                      <a href={item.name} target='_blank'>{item.site}</a>
                      <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.site) }}>
                        <lord-icon
                          style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                          src="https://cdn.lordicon.com/iykgtsbt.json"
                          trigger="hover" >
                        </lord-icon>
                      </div>
                    </div>
                  </td>
                  <td className='py-2 border border-white text-center w-32'>
                    <div className='flex items-center justify-center '>
                      {item.name}
                      <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.name) }}>
                        <lord-icon
                          style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                          src="https://cdn.lordicon.com/iykgtsbt.json"
                          trigger="hover" >
                        </lord-icon>
                      </div>
                    </div>
                  </td>
                  <td className='py-2 border border-white text-center w-32'>
                    <div className='flex items-center justify-center '>
                      {item.pass}
                      <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.pass) }}>
                        <lord-icon
                          style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                          src="https://cdn.lordicon.com/iykgtsbt.json"
                          trigger="hover" >
                        </lord-icon>
                      </div>
                    </div>
                  </td>
                  <td className='py-2 border border-white text-center w-32'>
                    <span className='cursor-pointer mx-1'onClick={()=>{editpass(item.id)}} >
                      <lord-icon
                        src="https://cdn.lordicon.com/gwlusjdu.json"
                        trigger="hover"
                        style={{ "width": "25px", "height": "25px" }}>
                      </lord-icon>
                    </span>
                    <span className='cursor-pointer mx-1'onClick={()=>{Deletepass(item.id)}} >
                      <lord-icon
                        src="https://cdn.lordicon.com/skkahier.json"
                        trigger="hover"
                        style={{ "width": "25px", "height": "25px" }}>
                      </lord-icon>
                    </span>
                  </td>
                </tr>
              })}
            </tbody>
          </table>}
        </div>
      </div>
    </>
  );
};

export default Main;
