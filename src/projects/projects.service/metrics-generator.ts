export class MetricsGenerator {
  private readonly millisecondsSinceStarted: number;
  private readonly millisecondsInToDo: number;
  private readonly millisecondsInPlanning: number;
  private readonly millisecondsInDevelopment: number;
  private readonly millisecondsSinceCompleted: number;

  constructor(
    millisecondsSinceStarted: number,
    millisecondsInToDo: number,
    millisecondsInPlanning: number,
    millisecondsInDevelopment: number,
    millisecondsSinceCompleted: number,
  ) {
    this.millisecondsSinceStarted = millisecondsSinceStarted;
    this.millisecondsInToDo = millisecondsInToDo;
    this.millisecondsInPlanning = millisecondsInPlanning;
    this.millisecondsInDevelopment = millisecondsInDevelopment;
    this.millisecondsSinceCompleted = millisecondsSinceCompleted;
  }

  generateMetrics = (
    millisecondConvertor: (milliseconds: number) => number,
  ) => ({
    sinceStarted: millisecondConvertor(this.millisecondsSinceStarted),
    inToDo: millisecondConvertor(this.millisecondsInToDo),
    inPlanning: millisecondConvertor(this.millisecondsInPlanning),
    inDevelopment: millisecondConvertor(this.millisecondsInDevelopment),
    sinceCompleted: millisecondConvertor(this.millisecondsSinceCompleted),
  });
}
