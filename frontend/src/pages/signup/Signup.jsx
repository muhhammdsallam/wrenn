import React, { useState } from 'react';
import GenderCheckbox from './GenderCheckbox';
import { Link } from 'react-router-dom';
import useSignup from '../../hooks/useSignup';

const Signup = () => {
  const [inputs, setInputs] = useState({
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    gender: '',
  });

  const { loading, signup } = useSignup();

  const handleCheckboxChange = (gender) => {
    setInputs({ ...inputs, gender });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); //prevents refreshing when submitting
    await signup(inputs);
  };

  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <h1 className='text-3xl font-semibold text-center text-gray-300'>
          Signup to
          <span className='text-blue-400'> Wrenn</span>
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Full Name</span>
            </label>
            <input
              type='text'
              placeholder='john doe'
              className='w-full input input-bordered h-10'
              value={inputs.fullName}
              onChange={(e) =>
                setInputs({ ...inputs, fullName: e.target.value })
              }
            />
          </div>

          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>username</span>
            </label>
            <input
              type='text'
              placeholder='johndoe'
              className='w-full input input-bordered h-10'
              value={inputs.username}
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              }
            />
          </div>

          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Password</span>
            </label>
            <input
              type='password'
              placeholder='enter password'
              className='w-full input input-bordered h-10'
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
            />
          </div>

          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Confirm Password</span>
            </label>
            <input
              type='password'
              placeholder='enter password'
              className='w-full input input-bordered h-10'
              value={inputs.confirmPassword}
              onChange={(e) =>
                setInputs({ ...inputs, confirmPassword: e.target.value })
              }
            />
          </div>

          <GenderCheckbox
            onCheckboxChange={handleCheckboxChange}
            selectedGender={inputs.gender}
          />

          <div>
            <button
              className='btn btn-block btn-info btn-sm mt-2'
              disabled={loading}
            >
              {loading ? (
                <span className='loading loading-spinner'></span>
              ) : (
                'Signup'
              )}
            </button>
          </div>

          <Link
            to={'/login'}
            className='text-sm hover:underline hover:text-blue-400 mt-4 inline-block'
          >
            Already have an account?
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;

// STARTER CODE FOR SIGNUP COMPONENT

// return (
//   <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
//     <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
//       <h1 className='text-3xl font-semibold text-center text-gray-300'>
//         Signup to
//         <span className='text-blue-400'> ChatApp</span>
//       </h1>
//       <form>
//         <div>
//           <label className='label p-2'>
//             <span className='text-base label-text'>Full Name</span>
//           </label>
//           <input
//             type='text'
//             placeholder='john doe'
//             className='w-full input input-bordered h-10'
//           />
//         </div>

//         <div>
//           <label className='label p-2'>
//             <span className='text-base label-text'>username</span>
//           </label>
//           <input
//             type='text'
//             placeholder='johndoe'
//             className='w-full input input-bordered h-10'
//           />
//         </div>

//         <div>
//           <label className='label p-2'>
//             <span className='text-base label-text'>Password</span>
//           </label>
//           <input
//             type='password'
//             placeholder='enter password'
//             className='w-full input input-bordered h-10'
//           />
//         </div>

//         <div>
//           <label className='label p-2'>
//             <span className='text-base label-text'>Confirm Password</span>
//           </label>
//           <input
//             type='password'
//             placeholder='enter password'
//             className='w-full input input-bordered h-10'
//           />
//         </div>

//         <GenderCheckbox />

//         <div>
//           <button className='btn btn-block btn-info btn-sm mt-2'>
//             Signup
//           </button>
//         </div>

//         <a
//           href='#'
//           className='text-sm hover:underline hover:text-blue-400 mt-4 inline-block'
//         >
//           Already have an account?
//         </a>
//       </form>
//     </div>
//   </div>
// );
