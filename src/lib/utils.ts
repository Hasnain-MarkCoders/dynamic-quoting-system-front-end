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

  return result
}
