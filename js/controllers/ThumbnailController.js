import  router  from "../coreLib/router.js";
import { listeImgs, listeMemes } from "../coreLib/dataInstance.js";

export class ThumbnailController {
  images;
  memes;
  wrapper;
  constructor(memes = listeMemes, images = listeImgs) {
    this.memes = memes;
    this.images = images;
  }
  refresh = () => {
    if (undefined === this.wrapper) {
      console.log("%c%s", "color:red", "le wrapper est pas definit")
      return
    }
    const listWrapper=this.wrapper.querySelector("#liste-memes")
    const modelSVG=listWrapper.querySelector('#meme-model')
    
    this.memes.map(m=>{
        //recup de l'image du meme
        const img=this.images.find(i=>i.id===m.imageId)
        const memeNode=modelSVG.cloneNode(true);
        memeNode.id='meme-'+m.id;
        const aSection=memeNode.querySelector('a')
        aSection.href='/memes/'+m.id
        aSection.addEventListener('click',evt=>{
            evt.preventDefault()
            router.currentRoute=`/meme/${m.id}`
        })
        const sectionsvg=memeNode.querySelector('svg')
        if(undefined!=img){
            sectionsvg.setAttribute('viewBox','0 0 '+img.w+' '+img.h)
            sectionsvg.querySelector('image').setAttribute('xlink:href',img.url)
        }
        else{sectionsvg.querySelector('image').remove()}
        const sectionText=sectionsvg.querySelector('text')
        sectionText.innerHTML=m.text
        sectionText.setAttribute('font-size',m.fontSize)
        sectionText.setAttribute('font-weight',m.fontWeight)
        sectionText.setAttribute('fill',m.color)
        listWrapper.appendChild(memeNode)
    })
    modelSVG.style.display='none'

  };
}
