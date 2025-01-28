import { useState } from "react"
import { format, addDays, subDays } from "date-fns"
import { Lightbulb, Coffee, Briefcase, Activity, Music, ChevronRight, X, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Task } from "../page"

const CATEGORIES = [
  { id: "idea", name: "Idea", icon: Lightbulb, description: "15 hrs this week" },
  { id: "food", name: "Food", icon: Coffee, description: "2 hrs this week" },
  { id: "work", name: "Work", icon: Briefcase, description: "40 hrs this week" },
  { id: "sport", name: "Sport", icon: Activity, description: "3 hrs this week" },
  { id: "music", name: "Music", icon: Music, description: "2 hrs this week" },
]

interface CreateTaskProps {
  onAdd: (task: Task) => void
  onClose: () => void
  selectedDate: Date
  onDateSelect: (date: Date) => void
}

export default function CreateTask({ onAdd, onClose, selectedDate, onDateSelect }: CreateTaskProps) {
  const [selectedCategory, setSelectedCategory] = useState("")
  const [title, setTitle] = useState("")
  const [time, setTime] = useState("")
  const [startDate, setStartDate] = useState(selectedDate)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !time || !selectedCategory) return

    const [hours, minutes] = time.split(":")
    const date = new Date()
    date.setHours(Number.parseInt(hours), Number.parseInt(minutes))
    const timeString = format(date, "hh:mm a")

    onAdd({
      id: Date.now().toString(),
      title,
      time: timeString,
      category: selectedCategory,
      date: format(selectedDate, "dd MMM"),
      completed: false,
    })
  }

  const dates = Array.from({ length: 6 }, (_, i) => addDays(startDate, i))

  const handlePrevDates = () => {
    setStartDate((prevDate) => subDays(prevDate, 6))
  }

  const handleNextDates = () => {
    setStartDate((prevDate) => addDays(prevDate, 6))
  }

  const handleCategorySelect = (name: string) => {
    setSelectedCategory(name)
  }

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Create Task</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <Button variant="ghost" size="icon" onClick={handlePrevDates} className="text-gray-500 hover:text-gray-700">
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleNextDates} className="text-gray-500 hover:text-gray-700">
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {dates.map((date) => (
            <Button
              key={date.toString()}
              variant={date.toDateString() === selectedDate.toDateString() ? "default" : "outline"}
              className={`rounded-lg flex-1 py-3 px-2 min-w-[60px] ${
                date.toDateString() === selectedDate.toDateString()
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => onDateSelect(date)}
            >
              <div className="text-center">
                <div className="text-lg font-semibold">{format(date, "d")}</div>
                <div className="text-xs">{format(date, "EEE")}</div>
              </div>
            </Button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <h3 className="text-lg font-medium mb-4">Choose activity</h3>
        <div className="space-y-2">
          {CATEGORIES.map(({ id, name, icon: Icon, description }) => (
            <button
              key={id}
              type="button"
              onClick={() => handleCategorySelect(name)}
              className={`w-full flex items-center justify-between p-4 rounded-lg border ${
                selectedCategory === name ? "border-indigo-600 bg-indigo-50" : "bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`h-5 w-5 ${selectedCategory === name ? "text-indigo-600" : "text-gray-500"}`} />
                <div className="text-left">
                  <div className={`font-medium ${selectedCategory === name ? "text-indigo-600" : ""}`}>{name}</div>
                  <div className="text-sm text-gray-500">{description}</div>
                </div>
              </div>
              <ChevronRight className={`h-5 w-5 ${selectedCategory === name ? "text-indigo-600" : "text-gray-400"}`} />
            </button>
          ))}
        </div>

        <div className="space-y-4 pt-4">
          <input
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
          <Button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
            disabled={!selectedCategory || !title || !time}
          >
            Create Task
          </Button>
        </div>
      </form>
    </div>
  )
}

