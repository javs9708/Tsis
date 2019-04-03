export interface Uid {
  puntuationStateC1:boolean;
  puntuationStateC2:boolean;
  puntuationStateC3:boolean;

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
}
