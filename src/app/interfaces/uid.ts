export interface Uid {
  puntuationStateC1:boolean;
  puntuationStateC1LD:boolean;
  puntuationStateC2:boolean;
  puntuationStateC2LD:boolean;
  puntuationStateC3:boolean;
  puntuationStateC3LD:boolean;

  uid:string;
}
export interface Usuarios {
  data:any;
}
export interface Candidatos {
  id:string;
  data:any;
}

export interface Comentarios{
  candidate:string;
  comment:string;
  uid:string;
  nombre:string;
  date:number;
  photo:string;
}
