import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [mostrar, setmostrar] = React.useState(false);
  const camaraRef = React.useRef<any>();
  const streamRef = React.useRef<any>();
  const [fotoRef,setFotoRef]=React.useState('')
  const camara=React.useRef(new Camara(document.querySelector('video')));

const onCamara=()=>{
  navigator.mediaDevices.getUserMedia({video: true})
  .then(stream => {
    // Obtén el elemento <video> en tu aplicación de React
    camaraRef.current = document.querySelector('video');
    // Asigna el flujo de la cámara al elemento <video>
    camaraRef.current.srcObject = stream;
    streamRef.current=stream
  })
  .catch(error => {
    console.error('Ocurrió un error:', error);
  });
}
const offCamara=()=>{
  tomarFoto()
  camaraRef.current.pause()
  if(streamRef.current){
     streamRef.current.getTracks()[0].stop()
  }
}

const tomarFoto=()=>{
  let canvas:any = document.createElement('canvas')
  canvas.setAttribute('width',300)
  canvas.setAttribute('height',300)
  let context=canvas.getContext('2d')
  context.drawImage(camaraRef.current,0,0,canvas.width,canvas.height)
  
  const foto=context.canvas.toDataURL();
  canvas=null
  context=null
  setFotoRef(foto)
  console.log(foto)

}


  
  return (
    <div className="App">
<h2>Hola Toma Una Foto</h2>
      <div style={{display:mostrar?'flex':'none'}}>
        <video id='player' autoPlay style={{height:'300px'}}></video>
      <button id='btn' style={{height:50,width:50,marginTop:'auto'}} onClick={()=>onCamara()}>Abrir</button>
      <button style={{height:50,width:50,marginTop:'auto'}} onClick={()=>offCamara()}>Tomar Foto</button>
      </div>
      <button id='btn' onClick={()=>setmostrar(!mostrar)}>Foto</button>
      <img src={fotoRef}></img>
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

    navigator.mediaDevices.getUserMedia({
    audio:false,
    video:{width:300,height:300}
   }).then(s=>{

    console.log(this.videoNode)
    console.log(this.videoNode.srcObject)
    this.videoNode.srcObject=s
    this.stream=s
   })

  }
  off(){
    
  }
}