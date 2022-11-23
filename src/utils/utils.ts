import { JobType } from "../redux/jobSlice";

export class Utils {
  static countDate = (createdAt: string, updatedAt: string): string => {
    const createdData: Date = new Date(createdAt);
    const updatedData: Date = new Date(updatedAt);
    const differInSecs: number =
      (updatedData.getTime() - createdData.getTime()) / 1000;
    const days: number = differInSecs / 86400;
    const end: string = days > 1 ? "days" : "day";
    return `${Math.floor(days)} ${end}`;
  };

  static compareTags = (first: string[], second: string[]): boolean => {
    for (const element of first) {
      if (!second.includes(element)) return false;
    }
    return true;
  };

  static sortJobs = (list: JobType[], selectedTags: string[]): JobType[] => {
    const res: JobType[] = [];
    for (const job of list) {
      const { benefits, employment_type } = job;
      const jobTags = benefits.concat(employment_type);
      if (Utils.compareTags(selectedTags, jobTags)) {
        res.push(job);
      }
    }
    return res;
  };

  static parseDescription = (date: string): string[][] => {
    const parsedData: string[][] = [];
    const parsedText = date
      .split(/\r\n|\t|\r|\n/g)
      .map((item) => item.trimStart().trimEnd())
      .filter((item) => item !== "");
    for (let i = 0; i < parsedText.length; i++) {
      const current = parsedText[i];
      const next = parsedText[i + 1];
      if (current.includes(":") && !next.includes(":")) {
        parsedData.push([current, next]);
        i = parsedText.indexOf(next);
        continue;
      }
      parsedData.push([current]);
    }
    return parsedData;
  };

  static parseSalary = (data: string): string => data.replaceAll("k", " 000");

  static createPhoneNumber = (numbers: string): string => {
    let result = "+ xx(xx)-xx-xxxx";
    for (let i = 0; i < numbers.length; i++) {
      result = result.replace("x", numbers[i]);
    }
    return result;
  };
}
