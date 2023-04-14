import React from 'react'

const Index = ({type, className, id, onClick, text, icon}) => {
  return (
   <button type={type}
            className={className}
            id= {id}
            onClick = {onClick}
        >
            {icon}
            {text}
   </button>
  )
}

export default Index
