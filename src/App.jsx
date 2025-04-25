import { useState, useCallback, useEffect, useRef } from 'react'



function App() {

  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "1234567890";
    if (charAllowed) str += "`~!@#$%^&*()-_+<>}{";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass)
  }, [length, numberAllowed, charAllowed, setPassword])


  let passwordRef = useRef(null);

  const copyPasswordInClipboard = useCallback( ()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,999);
    window.navigator.clipboard.writeText(password);
  },[password]

  )

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])



  return (
    <>
      <div className='bg-gray-500 py-5 md:max-w-[60%] lg:max-w-[50%] w-[85%] rounded-lg flex justify-center flex-col mt-48 mx-auto'>
        <h1 className='text-center text-3xl'>Password Generator</h1>
        <div className='py-4 px-9 space-y-5'>
          <div className='flex w-full'>
            <input type="text"
              className='w-full outline-none py-1 px-3'
              placeholder='Password'
              value={password}
              readOnly
              ref={passwordRef}

            />
            <button className='bg-orange-500 px-3 py-1 transition-opacity active:scale-90 hover:opacity-90'
            onClick={copyPasswordInClipboard}
            >copy</button>

          </div>
          <div className='flex gap-2 text-[1.1rem] font-semibold sm:items-center justify-between w-full flex-col sm:flex-row'>
            <div className='flex gap-2 items-center '>
              <input type="range" min={5} max={50}
                value={length}
                className='cursor-pointer'
                onChange={(e) => { setLength(e.target.value) }}
              />
              <label >Length : {length}</label>
            </div>

            <div className='flex gap-2'>
              <input type="checkbox" id="num"
                defaultChecked={numberAllowed}
                onChange={() => {
                  setNumberAllowed((prev) => !prev)}
                }
              />
              <label htmlFor="num">Numbers</label>
            </div>

            <div className='flex gap-2'>
              <input type="checkbox" id="char"
              defaultChecked = {charAllowed}
                onChange={() => {
                  setCharAllowed((prev) => !prev)}
                }
              />
              <label htmlFor="char">Characters</label>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default App
