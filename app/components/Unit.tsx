'use client'
import toast, { Toaster } from 'react-hot-toast';

const notify = () => toast('Here is your toast.');

const Unit = () => {
  return (
    <div className='mt-10 bg-red-500'>
      <button onClick={notify}>Make me a toast</button>
      <Toaster />
    </div>
  );
};

export default Unit;
