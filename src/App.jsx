import { useState, useCallback, useEffect } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState('');

  let passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (numberAllowed) str = str + '0123456789';
    if (characterAllowed) str = str + '@#$%&*<>{}[]()';

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, characterAllowed]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, characterAllowed]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password).then(function() {
      alert('Password copied to clipboard');
    });
  };

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700">
      <h1 className="text-white text-center">Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          className="outline-none w-full py-1 px-3"
          placeholder="Password"
          value={password}
          readOnly
        />
        <button
          className="outline-none bg-red-300 text-black px-2"
          onClick={copyToClipboard}
        >
          Copy
        </button>
      </div>

      <div className='flex text-sm gap-x-2'>

        <div className='flex items-center gap-x-1'>
          <input
          type='range'
          min={6}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e)=>{setLength(e.target.value)}}
          />
          <label>length:{length}</label>

        </div>
        <div>
        <input
        type='checkbox'
        defaultChecked={numberAllowed}
        id="numberInput"
        onChange={()=>{
          setNumberAllowed(prev=>!prev)}}
        />
        <label htmlFor='numberInput'>Number</label>
        </div>

        <div className='flex items-center gap-x-1'>
        <input
        type='checkbox'
        defaultChecked={characterAllowed}
        id='characterInput'
        onChange={()=>{
          setCharacterAllowed((prev)=>!prev)}}
        />
        <label htmlFor='characterInput'>Character</label>
      </div>

      </div>

    </div>
       
  )
}

export default App
