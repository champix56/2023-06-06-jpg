// import { EditorController } from "../controllers/EditorController.js";
import { ThumbnailController } from "../controllers/ThumbnailController.js";
import { listeImgs, listeMemes } from "../coreLib/dataInstance.js";

export const routes = [
  {
    name: "editor",
    pathName: "/meme",
    viewUrl: "/views/editor.html",
    pathRegex: /^\/meme(\/(?<id>\d{0,})?)?\/?$/,
    // controller:new EditorController()
  },
  {
    name: "thumb",
    pathName: "/thumbnail",
    viewUrl: "/views/thumbnail.html",
    pathRegex: /^\/thumbnail\/?$/,
    controller: new ThumbnailController(listeMemes, listeImgs),
  },
  {
    name: "home",
    pathName: "/",
    viewUrl: "/views/home.html",
    pathRegex: /^\/?$/,
  },
  {
    name: "404",
    templateText:
      "<h1>On t'a de dit de pas venir sur ce liens</h1><hr/><h3>ERROR : 404 NOT FOUND</h3>",
    pathRegex: /^\/404\/?$/,
  },
];
