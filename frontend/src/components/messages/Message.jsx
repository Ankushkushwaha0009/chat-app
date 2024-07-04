import React from 'react'  ;

const Message = () => {
  return (
    <div className='chat chat-end'>
       <div className='chat-image avatar'>
          <div className='w-10 rounded-full'>
                <img alt='Tailwind Css chat bubble component' 
                src = ""
                />
          </div>
       </div>
       <div className={`chat-bubble text-white bg-blur-500`}> Hi! What is upp? </div>
       <div className={`chat-bubble text-white bg-blur-500`}> 2:42 </div>
    </div>
  )
}

export default Message ; 


