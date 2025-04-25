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

  const copyPasswordInClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password);
  }, [password]

  )

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])



  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gradient-to-br from-gray-800 to-gray-900 px-4 ">
      <div className="max-w-xl bg-white rounded-2xl shadow-xl p-8 space-y-6 md:max-w-[60%] lg:max-w-[50%] w-full">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          🔐 Password Generator
        </h1>

        <div className="flex items-center gap-4 w-full">
          <input
            type="text"
            className="w-[80%] border border-gray-300 rounded-lg px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordInClipboard}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 active:scale-95 transition"
          >
            Copy
          </button>
        </div>

        <div className="space-y-4">
          {/* Length Slider */}
          <div className="flex items-center justify-between">
            <label className="font-medium text-gray-700">
              Password Length: <span className="font-bold">{length}</span>
            </label>
            <input
              type="range"
              min={5}
              max={50}
              value={length}
              className="w-2/3 accent-blue-600"
              onChange={(e) => setLength(e.target.value)}
            />
          </div>

          {/* Options */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <label className="flex items-center gap-2 text-gray-700">
              <input
                type="checkbox"
                checked={numberAllowed}
                onChange={() => setNumberAllowed((prev) => !prev)}
                className="accent-blue-600 w-5 h-5"
              />
              Include Numbers
            </label>

            <label className="flex items-center gap-2 text-gray-700">
              <input
                type="checkbox"
                checked={charAllowed}
                onChange={() => setCharAllowed((prev) => !prev)}
                className="accent-blue-600 w-5 h-5"
              />
              Include Special Characters
            </label>
          </div>
        </div>
      </div>
    </div>
  );

}

export default App
