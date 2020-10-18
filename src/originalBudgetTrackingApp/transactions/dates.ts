export const compareObjectsByDate = (a: { date: string }, b: { date: string }) => compareDateStrings(a.date, b.date);
const compareDateStrings = (a: string, b: string) => compareDates(new Date(a), new Date(b));
const compareDates = (a: Date, b: Date) => a.getTime() - b.getTime();
