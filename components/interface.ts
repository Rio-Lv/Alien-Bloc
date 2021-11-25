/**
 * @interface {i:__,x:__,y:__,z:__}
 */
export interface Anchor {
  i: number;
  x: number;
  y: number;
  z: number;
}
export interface coord {
  x: number;
  y: number;
}
/**
 * @interface -properties: mode , anchors , setAnchors , looseAnchors , setLooseAnchors
 */
export interface canvasProps {
  mode: string;
  anchors: Anchor[];
  index: number;
  setIndex: Function;
  setAnchors: Function;
  looseAnchors: Anchor[];
  setLooseAnchors: Function;
  moving: number;
  setMoving: Function;
  children: any;
}

export interface rendererProps {
  anchors: Anchor[];
  clusters: number[][];
}
/**
 * @interface -move is empty and is default
 */
export const modes = {
  add: "Control",
  remove: "d",
  move: "Space character",
  cluster: "Shift",
  hide: "h",
};
