import { useCallback, useState, useEffect } from 'react'


function App() {
  const [length, setLength] = useState(8)
  const [numAllowed, setNumAllowed] = useState(false)
  const [chAllowed, setChAllowed] = useState(false)
  const [password, setPassword] = useState("fsdfdsf")

  

  const genPassword = useCallback(() => {
    let pass = ""
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numAllowed) { characters = characters + "1234567890" };   // to add/remove nums and special characters in password 
    if (chAllowed) { characters = characters + "!@#$%^&*-+" }

    for (let i = 0; i <= length-1; i++) {
      let element = Math.floor((Math.random() * characters.length) + 1)
      pass += characters.charAt(element);

    }
    setPassword(pass);
  }, [length, numAllowed, chAllowed, setPassword])


  useEffect(() => {
    genPassword()
  }, [length, numAllowed, chAllowed, genPassword])

  const copyToCB = useCallback(() => {
    window.navigator.clipboard.writeText(password)
  },
[password])


  return (
    <>
      <main className='bg-violet-800 h-screen w-screen pt-15  mx-auto  '>

        <div className=" bg-slate-300  max-w-4xl p-24  rounded-xl   mx-auto " >

          <h1 className='text-center text-4xl font-bold text-violet-800 my-3'>Password Generator</h1>

          <div className='flex  justify-center items-center py-5 '>
            <input  
            value={password} 
            className='text-xl text-center my-1 px-12 py-3 rounded-xl bg-white text-amber-500' 
            type="text" 
            readOnly />
            <button onClick={copyToCB} 
            className='bg-violet-800 px-5 py-3.5 mx-4 rounded-xl cursor-pointer text-white font-bold active:bg-amber-900 ' 
            >Copy</button>

          </div>

          <div className=' flex justify-center py-3 gap-2.5'>
            <input onChange={(e) => { setLength(e.target.value) }} value={length} type="range" min={6} max={16} className='cursor-pointer' />
            <h1>length: {length}</h1>

            <input onChange={() => { setNumAllowed((prev) => !prev) }} type="checkbox" defaultChecked={numAllowed} />
            <label>Numbers</label>

            <input onChange={() => { setChAllowed((prev) => !prev) }} type="checkbox" defaultChecked={chAllowed} />
            <label>Characters</label>
          </div>

        </div>

      </main>
    </>
  )
}

export default App
