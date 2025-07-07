import React, { useEffect, useState } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import axios from "axios"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { X } from "lucide-react"
import { useDebounce } from "use-debounce"



type FilterOptionType = string[] | number[]

type FilterMap = {

  key: string
  label: string
   type: "select" | "text"
  options?: () => Promise<FilterOptionType> | FilterOptionType}

const FILTERS: FilterMap[] = [
  {
    key: "ProdWeek",
    label: "Production Week",
    options: async () => {
      const res = await axios.get("https://anton.markcoders.com/dynamic_qouting_system/api/filter-options")
      return res.data.ProdWeek ?? []
    },
    type:"select"
  },
  {
    key: "Status_Desc",
    label: "Status",
    options: async () => {
      const res = await axios.get("https://anton.markcoders.com/dynamic_qouting_system/api/filter-options")
      return res.data.Status_Desc ?? []
    },
    type:"select"

  },
  {
    key: "Branch",
    label: "Branch",
    options: async () => {
      const res = await axios.get("https://anton.markcoders.com/dynamic_qouting_system/api/filter-options")
      return res.data.Branch ?? []
    },
    type:"select"

  },
  {
    key: "Year",
    label: "Year",
    options: () => {
      const now = new Date().getFullYear()
      return Array.from({ length: 5 }, (_, i) => now - i)
    },
    type:"select"

  },
  {
    key: "JobNumber",
    label: "Job Number",
    type: "text",
  },
]

const FilterBar: React.FC = () => {
  const [filters, setFilters] = useState<Record<string, FilterOptionType>>({})
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [jobNumberInput, setJobNumberInput] = useState(searchParams.get("JobNumber") ?? "")
const [debouncedJobNumber] = useDebounce(jobNumberInput, 400)

useEffect(() => {
  if (debouncedJobNumber) {
    setParam("JobNumber", debouncedJobNumber)
  } else {
    removeParam("JobNumber")
  }
}, [debouncedJobNumber])

  useEffect(() => {
    const loadFilters = async () => {
      const newFilters: Record<string, FilterOptionType> = {}
      for (const filter of FILTERS) {
            if (filter.type === "select" && filter.options) {
        try {
          const result = await filter.options()
          newFilters[filter.key] = result
        } catch {
          newFilters[filter.key] = []
        }
      }
      }
      setFilters(newFilters)
    }

    loadFilters()
  }, [])

  const setParam = (key: string, val: string) => {
    const params = new URLSearchParams(searchParams)
    params.set(key, val)
    navigate({ search: params.toString() })
  }

  const removeParam = (key: string) => {
    const params = new URLSearchParams(searchParams)
    params.delete(key)
    navigate({ search: params.toString() })
  }

  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-4">
        {FILTERS.map(({ key, label, type }) => {
  const selected = searchParams.get(key) ?? ""
  const options = filters[key] ?? []

  if (type === "select") {
    return (
      <div key={key} className="relative">
        <Select onValueChange={(val) => setParam(key, val)} value={selected}>
          <SelectTrigger className={`w-full pr-2`}>
            <SelectValue placeholder={`Select ${label}`} />
          </SelectTrigger>
          <SelectContent>
            {options.map((opt) => (
              <SelectItem key={opt} value={String(opt)}>
                {opt}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {selected && (
          <button
            onClick={() => removeParam(key)}
            className="absolute right-2 top-1/2 bg-red-400  -translate-y-1/2 p-1 hover:bg-red-600 rounded-full"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        )}
      </div>
    )
  }

  // Text field for JobNumber
  return (
    <div key={key} className="relative">
      <input
        type="text"
        value={jobNumberInput}
        onChange={(e) => setJobNumberInput(e.target.value)}
        placeholder={label}
        className="w-full border rounded-md px-3 py-2 pr-10 text-sm focus:outline-none"
      />
      {jobNumberInput && (
        <button
          onClick={() => setJobNumberInput("")}
          className="absolute right-2 top-1/2 bg-red-400  -translate-y-1/2 p-1 hover:bg-red-600 rounded-full"
        >
          <X className="h-4 w-4 text-muted-foreground" />
        </button>
      )}
    </div>
  )
})}
      </div>
    </div>
  )
}

export default FilterBar
