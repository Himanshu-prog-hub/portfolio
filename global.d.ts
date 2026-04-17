import 'three-globe';
import { Object3DNode } from '@react-three/fiber';
import ThreeGlobe from 'three-globe';
import { AmbientLight, DirectionalLight, PointLight } from 'three';

declare module '@react-three/fiber' {
  interface ThreeElements {
    threeGlobe: Object3DNode<ThreeGlobe, typeof ThreeGlobe>;
    ambientLight: Object3DNode<AmbientLight, typeof AmbientLight>;
    directionalLight: Object3DNode<DirectionalLight, typeof DirectionalLight>;
    pointLight: Object3DNode<PointLight, typeof PointLight>;
  }
}
