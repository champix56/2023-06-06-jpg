import router from "../coreLib/router.js";
import { listeImgs, listeMemes } from "../coreLib/dataInstance.js";
import { Memes, Meme } from "../coreLib/meme.js";
import { ConfirmBox } from "../composantsWeb/modal.js";
let temporaryImg=undefined
export class EditorController {
  images;
  memes;
  wrapper;
  #oldCurrent;
  #current;
  #currentImage;
  #params = {};
  set params(param) {
    if (undefined !== param.id) {
      this.#current = this.memes.find((m) => m.id === parseInt(param.id));
      if (undefined === this.#current) {
        router.currentRoute = "/404";
      } else {
        this.#oldCurrent = new Meme();
        Object.assign(this.#oldCurrent, this.#current);
        this.#currentImage = this.images.find(
          (i) => i.id === this.#current.imageId
        );
      }
    } else {
      this.#current = new Meme();
      this.#oldCurrent = new Meme();
    }
  }
  constructor(memes = listeMemes, imgs = listeImgs) {
    this.images = imgs;
    this.memes = memes;
  }
  #fillSelect() {
    const select = this.wrapper.querySelector("select");
    select.innerHTML = "";

    const option = document.createElement("option");
    option.value = -1;
    option.innerHTML = "pas d'image";
    select.appendChild(option);

    this.images.map((i) => {
      const imgOpt = option.cloneNode(true);
      imgOpt.value = i.id;
      imgOpt.innerHTML = i.titre;
      select.appendChild(imgOpt);
    });
  }
  refresh = () => {
    if (undefined === this.wrapper) {
      console.log(
        `%c%s`,
        "color:red;font-weight:900",
        "EditorController.js -> wrapper not set"
      );
      return;
    }
    const formNode = this.wrapper.querySelector("form");
    formNode.addEventListener("submit", (evt) => {
      evt.preventDefault();
      new ConfirmBox(() => {
        this.#current.save();
      }).show("Save", "Voulez vous enregistrer");
    });
    formNode.addEventListener("reset", (evt) => {
      new ConfirmBox(() => {
        Object.assign(this.#current, this.#oldCurrent);
      }).show("Effacer", "Voulez revenir a la version d'origine");
    });
    formNode.addEventListener("change", (evt) => {
      console.log(this.#current);
      this.#refreshSVG();
    });

    formNode["titre"].value = this.#current.titre;
    formNode["titre"].addEventListener("input", (evt) => {
      this.#current.titre = evt.target.value;
    });
    this.#fillSelect();
    formNode["image"].value = this.#current.imageId;
    formNode["image"].addEventListener("change", (evt) => {
      this.#current.imageId = Number(evt.target.value);
      this.#currentImage = this.images.find(
        (i) => i.id === this.#current.imageId
      );
    });

    formNode["text"].value = this.#current.text;
    formNode["text"].addEventListener("input", (evt) => {
      this.#current.text = evt.target.value;
    });

    formNode["x"].value = this.#current.x;
    formNode["x"].addEventListener("input", (evt) => {
      this.#current.x = Number(evt.target.value);
    });

    formNode["y"].value = this.#current.y;
    formNode["y"].addEventListener("input", (evt) => {
      this.#current.y = Number(evt.target.value);
    });
    formNode["fontSize"].value = this.#current.fontSize;
    formNode["fontSize"].addEventListener("input", (evt) => {
      this.#current.fontSize = Number(evt.target.value);
    });
    formNode["fontWeight"].value = this.#current.fontWeight;
    formNode["fontWeight"].addEventListener("input", (evt) => {
      this.#current.fontWeight = evt.target.value;
    });
    formNode["color"].value = this.#current.color;
    formNode["color"].addEventListener("input", (evt) => {
      this.#current.color = evt.target.value;
    });
    formNode["underline"].checked = this.#current.underline;
    formNode["underline"].addEventListener("change", (evt) => {
      this.#current.underline = evt.target.checked;
    });
    formNode["italic"].checked = this.#current.italic;
    formNode["italic"].addEventListener("change", (evt) => {
      this.#current.italic = evt.target.checked;
    });
    formNode["frameSizeX"].value = this.#current.frameSizeX;
    formNode["frameSizeX"].addEventListener("input", (evt) => {
      this.#current.frameSizeX = Number(evt.target.value);
    });
    formNode["frameSizeY"].value = this.#current.frameSizeY;
    formNode["frameSizeY"].addEventListener("input", (evt) => {
      this.#current.frameSizeY = Number(evt.target.value);
    });
    temporaryImg=this.wrapper.querySelector('svg image')
    this.#refreshSVG();
  };
  #refreshSVG = () => {
    const svgNode = this.wrapper.querySelector("svg");
    
    const text = svgNode.querySelector("text");
    text.innerHTML = this.#current.text
    text.setAttribute("font-size", this.#current.fontSize)
    text.setAttribute("font-weight", this.#current.fontWeight)
    text.setAttribute("x", this.#current.x)
    text.setAttribute("y", this.#current.y)
    text.setAttribute("fill", this.#current.color)
    text.setAttribute("text-decoration",this.#current.underline ? "underline" : "none")
    text.setAttribute("font-style", this.#current.italic ? "italic" : "normal");

    if (undefined !== this.#currentImage) {
        svgNode.setAttribute(
          "viewBox",
          `${-this.#current.frameSizeX/2} ${-this.#current.frameSizeY/2} ${this.#currentImage.w+(this.#current.frameSizeX/2)} ${this.#currentImage.h+(this.#current.frameSizeY/2)}`
        );
        const imgNode=svgNode
          .querySelector("image")
          if(null !==imgNode)
          {
              imgNode.setAttribute("xlink:href", this.#currentImage.url)
      }
          else{
              temporaryImg.setAttribute("xlink:href", this.#currentImage.url)
              svgNode.insertBefore(temporaryImg,text)
          }
      }
      else{
          svgNode.setAttribute(
              "viewBox",
              "0 0 100 100"
            );
            svgNode
              .querySelector("image").remove()
      }
  };
}
