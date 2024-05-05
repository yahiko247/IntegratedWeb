import React from 'react'
import { useState } from 'react'
import img2 from '../image/certificate.png'
import Downloadpdf from '../component/jsdownload/download'






function BrgCertPage() {
    const [name, setName] = useState('')
  return (
    <div>
      <input  type='text' placeholder='Enter Name' value={name} onChange={(e)=>setName(e.target.value)}/>
      
       <div className='container' id='certificate' style={{position:'relative'}}>
         <img src={img2} alt="" style={{ width: '100%', height:'auto', padding:'60px'}}/>
         <div className='content' style={{position:'absolute', top:'0', left:'0'}}>
          <h1 style={{marginTop:'430px', marginLeft:'340px'}}>{name}</h1>
         </div>
       </div>
     <Downloadpdf rootElementId='certificate' downloadFileName='Certificate'/>
    </div>
  )
}

export default BrgCertPage;
