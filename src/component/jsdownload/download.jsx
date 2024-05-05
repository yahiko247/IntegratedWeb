import React from "react";
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";

const Downloadpdf = ({rootElementId, downloadFileName}) => {
    const  DownloadFileDocument =()=>{
        const input = document.getElementById(rootElementId)
        html2canvas(input).then((canvas)=>{
            const imgData = canvas.toDataURL("image/png")
            const pdf = new jsPDF("l", "pt", "a4")
            pdf.addImage(imgData, "JPEG", 10, 50)
            pdf.save(`${downloadFileName}`)
        })
    }
    return <div>
        <button type="button" class="btn btn-success" onClick={DownloadFileDocument}>Download file</button>
    </div>
};
export default Downloadpdf;