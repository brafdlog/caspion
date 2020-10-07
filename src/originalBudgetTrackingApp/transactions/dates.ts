export const formatDate = (date: Date) => `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;

export const compareObjects = (a: { date: string }, b: { date: string }) => compareStrings(a.date, b.date);
export const compareStrings = (a: string, b: string) => compare(new Date(a), new Date(b));
export const compare = (a: Date, b: Date) => a.getTime() - b.getTime();
