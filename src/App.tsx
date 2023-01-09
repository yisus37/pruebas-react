import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [mostrar, setmostrar] = React.useState(false);
  const camaraRef = React.useRef();
/*   const camara=React.useRef(new Camara(document.getElementById("player"))); */
const tomarFoto=()=>{
  navigator.mediaDevices.getUserMedia({video: true})
  .then(stream => {
    // Obtén el elemento <video> en tu aplicación de React
    const videoElement:any = document.querySelector('video');

    // Asigna el flujo de la cámara al elemento <video>
    videoElement.srcObject = stream;
  })
  .catch(error => {
    console.error('Ocurrió un error:', error);
  });
}

  
  return (
    <div className="App">
<h2>Hola Toma Una Foto</h2>
      <div style={{display:mostrar?'flex':'none'}}>
        <video id='player' autoPlay style={{height:'300px'}}></video>
      <button id='btn' style={{height:50,width:50,marginTop:'auto'}} onClick={()=>tomarFoto()}>Tomar Foto</button>
      </div>
      <button id='btn' onClick={()=>setmostrar(!mostrar)}>Foto</button>
    </div>
  );
}

export default App;


class Camara{
  public videoNode:any
  public stream:any
  constructor(refVideo:any){
   this.videoNode=refVideo
   console.log("camara iniciada")
  }
   on(){

    /* navigator.mediaDevices.getUserMedia({
    audio:false,
    video:{width:300,height:300}
   }) */
   if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
    console.log("Let's get this party started")
    navigator.mediaDevices.getUserMedia({video: true})
  }
  }
  off(){
    
  }
}