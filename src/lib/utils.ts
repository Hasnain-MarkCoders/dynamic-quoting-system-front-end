import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export type Filters = {
  ProdWeek?: number
  Status_Desc?: string
  Branch?: string
  Year?: number
  JobNumber?:string
}

export const getFiltersFromUrl = (search: string): Filters => {
  const params = new URLSearchParams(search)
  const result: Filters = {}

  const parseNumber = (key: string): number | undefined => {
    const val = params.get(key)
    if (!val || val.trim() === "") return undefined
    const num = Number(val)
    return isNaN(num) ? undefined : num
  }

  const parseString = (key: string): string | undefined => {
    const val = params.get(key)
    return val && val.trim() !== "" ? val : undefined
  }

  const maybeProdWeek = parseNumber("ProdWeek")
  if (maybeProdWeek !== undefined) result.ProdWeek = maybeProdWeek

  const maybeYear = parseNumber("Year")
  if (maybeYear !== undefined) result.Year = maybeYear

  const maybeStatus = parseString("Status_Desc")
  if (maybeStatus !== undefined) result.Status_Desc = maybeStatus

  const maybeBranch = parseString("Branch")
  if (maybeBranch !== undefined) result.Branch = maybeBranch
  const maybeJobNumber = parseString("JobNumber")
  if (maybeJobNumber !== undefined) result.JobNumber = maybeJobNumber

  return result
}


export const extractLastPart = (url: string, extenstion:string): string => {
  try {
    if (!url || typeof url !== 'string') throw new Error("Invalid URL");
    const parts = url.split('/');
    const lastPart = parts.pop();
    if (!lastPart) throw new Error("No part found after last slash");
    return lastPart+extenstion;
  } catch (err: unknown) {
    const fallback = Math.random().toString(36).substring(2, 10);
    if (err instanceof Error) {
      console.error("extractLastPart Error:", err.message, "Using fallback:", fallback);
    } else {
      console.error("extractLastPart Unknown Error. Using fallback:", fallback);
    }
    return fallback+extenstion;
  }
};
