export class Report {
  admin: string;
  offName: string;
  dateEnd: string;
  dateStart: string;
  offCode: string;
  probServ: string;
  serScope: string;

  constructor(
    admin: string,
    offName: string,
    dateEnd: string,
    dateStart: string,
    offCode: string,
    probServ: string,
    serScope: string) {
      this.admin = admin;
      this.offName = offName;
      this.offCode = offCode;
      this.dateEnd = dateEnd;
      this.dateStart = dateStart;
      this.probServ = probServ;
      this.serScope = serScope;
  }
}

