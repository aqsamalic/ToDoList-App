

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import TaskList from "./Components/Task-List"
import CreateTask from "./Components/Create-Task"

export type Task = {
  id: string
  title: string
  time: string
  category: string
  date: string
  completed: boolean
}

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks")
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  const addTask = (task: Task) => {
    setTasks([...tasks, task])
    setIsCreateOpen(false)
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const toggleComplete = (id: string) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const todaysTasks = tasks.filter((task) => task.date === format(selectedDate, "dd MMM"))

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto bg-white min-h-screen shadow-lg">
        {!isCreateOpen ? (
          <div className="p-4">
            <div className="flex items-center justify-between bg-indigo-600 text-white p-4 rounded-lg mb-6">
              <div>
                <div className="flex items-center gap-2">
                  <MoreVertical className="h-5 w-5" />
                  <h1 className="text-xl font-semibold">{format(selectedDate, "d MMM")}</h1>
                </div>
                <p className="text-sm text-indigo-200">{todaysTasks.length} tasks</p>
              </div>
              <Button
                onClick={() => setIsCreateOpen(true)}
                variant="secondary"
                className="bg-white text-indigo-600 hover:bg-indigo-50"
              >
                Add New
              </Button>
            </div>
            <TaskList tasks={todaysTasks} onDelete={deleteTask} onToggle={toggleComplete} />
          </div>
        ) : (
          <CreateTask
            onAdd={addTask}
            onClose={() => setIsCreateOpen(false)}
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
          />
        )}
      </div>
    </div>
  )
}

