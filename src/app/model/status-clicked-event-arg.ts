export class AlimentClickedEventArg {
  readonly alimentName: string;
  readonly alimentValue: string;

  constructor(aliment: string, alimentValue: string){
    this.alimentName = aliment;
    this.alimentValue = alimentValue;
  }
}
