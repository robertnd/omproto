export class Dependant {
  id: number
  names: string
  ds: string
  dob: string
  cover: string
  constructor(
      id: number,
      names: string, 
      ds: string, 
      dob: string,
      cover: string) {

    this.id = id
    this.names = names;
    this.ds = ds;
    this.dob = dob;
    this.cover = cover;
  }
}