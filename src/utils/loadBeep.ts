import somBeep from '../assets/audios/videoplayback.mp3'

export function loadBeep(){
  const audio = new Audio(somBeep)

  audio.load()


  return () =>{
    audio.currentTime = 0
    audio.play().catch(error => console.log('Erro ao carregar o audio', error))
  }

}