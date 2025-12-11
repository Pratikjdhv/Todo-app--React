import React from 'react'
import {Check} from 'lucide-react'

const Checkbox = ({label ,checked , onChange}) => {
  return (
    <label className='gap-4 flex items-center cursor-pointer '>
        <input 
        type="checkbox" 
        className='hidden'
        onChange={onChange}
        checked ={checked}
        />
    <div className={`flex gap-2 border-2 border-secondary rounded-md justify-center size-6 items-center ${checked ? 'bg-accent border-none' : 'bg-transperent'}`}>
        {checked && <Check className='text-black size-4' />}
    </div>
        <span
        className={`flex-1 w-full ${checked ? 'line-through text-secondary' : 'text-white'} `}
        >{label}</span>
    </label>
  )
}

export default Checkbox