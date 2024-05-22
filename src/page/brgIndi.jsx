import React from 'react'
import { useState } from 'react'
import img2 from '../image/indigence.png'
import Downloadpdf2 from '../component/jsdownload/download2'


function BrgIndi() {
    const [name, setName] = useState('')
  return (
    <div>
      <input  type='text' placeholder='Enter Name' value={name} onChange={(e)=>setName(e.target.value)}/>
      
       <div className='container' id='certificate' style={{position:'relative'}}>
         <img src={img2} alt="" style={{ width: '100%', height:'auto', padding:'60px'}}/>
         <div className='content' style={{position:'absolute', top:'0', left:'0'}}>
          <h1 style={{marginTop:'790px', marginLeft:'350px'}}>{name}</h1>
         </div>
       </div>
     <Downloadpdf2 rootElementId='certificate' downloadFileName='Indigence'/>
    </div>
  )
}

export default BrgIndi;
