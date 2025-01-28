import type { Task } from "../page"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TaskListProps {
  tasks: Task[]
  onDelete: (id: string) => void
  onToggle: (id: string) => void
}

export default function TaskList({ tasks, onDelete, onToggle }: TaskListProps) {
  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div key={task.id} className="flex items-center justify-between p-4 bg-white rounded-lg border">
          <div className="flex items-center gap-3">
            <div
              className={`w-2 h-2 rounded-full ${
                task.category === "Work"
                  ? "bg-blue-500"
                  : task.category === "Food"
                    ? "bg-green-500"
                    : task.category === "Sport"
                      ? "bg-orange-500"
                      : task.category === "Music"
                        ? "bg-purple-500"
                        : "bg-indigo-500"
              }`}
            />
            <div>
              <h3 className={`font-medium ${task.completed ? "line-through text-gray-400" : ""}`}>{task.title}</h3>
              <p className="text-sm text-gray-500">{task.time}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggle(task.id)}
              className="rounded border-gray-300"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(task.id)}
              className="text-gray-500 hover:text-red-500"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

