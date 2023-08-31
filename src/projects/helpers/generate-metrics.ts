interface Intervals {
  millisecondsSinceStarted: number;
  millisecondsInToDo: number;
  millisecondsInPlanning: number;
  millisecondsInDevelopment: number;
  millisecondsSinceCompleted: number;
}

export const metricsGenerator = ({
  millisecondsSinceStarted,
  millisecondsInToDo,
  millisecondsInPlanning,
  millisecondsInDevelopment,
  millisecondsSinceCompleted,
}: Intervals) => {
  return (millisecondConvertor: (milliseconds: number) => number) => ({
    sinceStarted: millisecondConvertor(millisecondsSinceStarted),
    inToDo: millisecondConvertor(millisecondsInToDo),
    inPlanning: millisecondConvertor(millisecondsInPlanning),
    inDevelopment: millisecondConvertor(millisecondsInDevelopment),
    sinceCompleted: millisecondConvertor(millisecondsSinceCompleted),
  });
};
