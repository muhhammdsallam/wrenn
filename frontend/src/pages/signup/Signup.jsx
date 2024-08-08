import React from 'react';
import GenderCheckbox from './GenderCheckbox';

const Signup = () => {
  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <h1 className='text-3xl font-semibold text-center text-gray-300'>
          Signup to
          <span className='text-blue-400'> ChatApp</span>
        </h1>
        <form>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Full Name</span>
            </label>
            <input
              type='text'
              placeholder='john doe'
              className='w-full input input-bordered h-10'
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
            />
          </div>

          <GenderCheckbox />

          <div>
            <button className='btn btn-block btn-info btn-sm mt-2'>
              Signup
            </button>
          </div>

          <a
            href='#'
            className='text-sm hover:underline hover:text-blue-400 mt-4 inline-block'
          >
            Already have an account?
          </a>
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
