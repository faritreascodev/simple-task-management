"use client"

import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Plus,
  Trash2,
  Edit,
  Calendar,
  Flag,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertTriangle,
  SortAsc,
  SortDesc,
} from "lucide-react"

interface Task {
  id: string
  title: string
  description: string
  completed: boolean
  priority: "low" | "medium" | "high"
  category: string
  dueDate: string
  createdAt: string
  completedAt?: string
}

const PRIORITY_COLORS = {
  low: "bg-green-100 text-green-800 border-green-200",
  medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  high: "bg-red-100 text-red-800 border-red-200",
}

const PRIORITY_VALUES = {
  low: 1,
  medium: 2,
  high: 3,
}

export default function TodoApp() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "medium" as Task["priority"],
    category: "",
    dueDate: "",
  })
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState<"date" | "priority" | "title">("date")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [showAlert, setShowAlert] = useState("")
  const toast = ({ title, description, variant }: { title: string; description: string; variant?: string }) => {
    if (variant === "destructive") {
      alert(`❌ ${title}\n${description}`)
    } else {
      alert(`✅ ${title}\n${description}`)
    }
  }

  // Cargar tareas del localStorage al iniciar
  useEffect(() => {
    const savedTasks = localStorage.getItem("todo-tasks")
    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks))
      } catch (error) {
        console.error("Error loading tasks:", error)
      }
    }
  }, [])

  // Guardar tareas en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem("todo-tasks", JSON.stringify(tasks))
  }, [tasks])

  // Validación de formulario
  const validateTask = () => {
    if (!newTask.title.trim()) {
      setShowAlert("El título de la tarea es obligatorio")
      return false
    }
    if (newTask.title.length > 100) {
      setShowAlert("El título no puede exceder 100 caracteres")
      return false
    }
    return true
  }

  // Agregar nueva tarea
  const addTask = () => {
    if (!validateTask()) return

    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title.trim(),
      description: newTask.description.trim(),
      completed: false,
      priority: newTask.priority,
      category: newTask.category.trim() || "General",
      dueDate: newTask.dueDate,
      createdAt: new Date().toISOString(),
    }

    setTasks((prev) => [...prev, task])
    setNewTask({
      title: "",
      description: "",
      priority: "medium",
      category: "",
      dueDate: "",
    })
    setIsDialogOpen(false)
    setShowAlert("")

    toast({
      title: "Tarea agregada",
      description: "La tarea se ha agregado exitosamente.",
    })
  }

  // Editar tarea
  const updateTask = () => {
    if (!editingTask || !validateTask()) return

    setTasks((prev) =>
      prev.map((task) =>
        task.id === editingTask.id
          ? {
              ...task,
              title: newTask.title.trim(),
              description: newTask.description.trim(),
              priority: newTask.priority,
              category: newTask.category.trim() || "General",
              dueDate: newTask.dueDate,
            }
          : task,
      ),
    )

    setEditingTask(null)
    setNewTask({
      title: "",
      description: "",
      priority: "medium",
      category: "",
      dueDate: "",
    })
    setIsDialogOpen(false)
    setShowAlert("")

    toast({
      title: "Tarea actualizada",
      description: "La tarea se ha actualizado exitosamente.",
    })
  }

  // Marcar tarea como completada/pendiente
  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
              completedAt: !task.completed ? new Date().toISOString() : undefined,
            }
          : task,
      ),
    )

    const task = tasks.find((t) => t.id === id)
    if (task) {
      toast({
        title: task.completed ? "Tarea marcada como pendiente" : "Tarea completada",
        description: `"${task.title}" ${task.completed ? "está ahora pendiente" : "ha sido completada"}.`,
      })
    }
  }

  // Eliminar tarea
  const deleteTask = (id: string) => {
    const task = tasks.find((t) => t.id === id)
    setTasks((prev) => prev.filter((task) => task.id !== id))

    if (task) {
      toast({
        title: "Tarea eliminada",
        description: `"${task.title}" ha sido eliminada.`,
        variant: "destructive",
      })
    }
  }

  // Abrir diálogo para editar
  const openEditDialog = (task: Task) => {
    setEditingTask(task)
    setNewTask({
      title: task.title,
      description: task.description,
      priority: task.priority,
      category: task.category,
      dueDate: task.dueDate,
    })
    setIsDialogOpen(true)
    setShowAlert("")
  }

  // Cerrar diálogo
  const closeDialog = () => {
    setIsDialogOpen(false)
    setEditingTask(null)
    setNewTask({
      title: "",
      description: "",
      priority: "medium",
      category: "",
      dueDate: "",
    })
    setShowAlert("")
  }

  // Filtrar y ordenar tareas
  const filteredAndSortedTasks = useMemo(() => {
    const filtered = tasks.filter((task) => {
      const matchesFilter =
        filter === "all" || (filter === "pending" && !task.completed) || (filter === "completed" && task.completed)

      const matchesSearch =
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.category.toLowerCase().includes(searchTerm.toLowerCase())

      return matchesFilter && matchesSearch
    })

    filtered.sort((a, b) => {
      let comparison = 0

      switch (sortBy) {
        case "priority":
          comparison = PRIORITY_VALUES[b.priority] - PRIORITY_VALUES[a.priority]
          break
        case "title":
          comparison = a.title.localeCompare(b.title)
          break
        case "date":
        default:
          comparison = new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          break
      }

      return sortOrder === "asc" ? comparison : -comparison
    })

    return filtered
  }, [tasks, filter, searchTerm, sortBy, sortOrder])

  // Estadísticas
  const stats = useMemo(() => {
    const total = tasks.length
    const completed = tasks.filter((t) => t.completed).length
    const pending = total - completed
    const highPriority = tasks.filter((t) => t.priority === "high" && !t.completed).length
    const overdue = tasks.filter((t) => !t.completed && t.dueDate && new Date(t.dueDate) < new Date()).length

    return { total, completed, pending, highPriority, overdue }
  }, [tasks])

  // Verificar si una tarea está vencida
  const isOverdue = (task: Task) => {
    return !task.completed && task.dueDate && new Date(task.dueDate) < new Date()
  }

  // Obtener categorías únicas
  const categories = useMemo(() => {
    const cats = [...new Set(tasks.map((t) => t.category))]
    return cats.filter(Boolean)
  }, [tasks])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">*Gestor de Tareas*</h1>
          <p className="text-gray-600">Organiza tu vida académica y personal de manera eficiente</p>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
              <div className="text-sm text-gray-600">Total</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
              <div className="text-sm text-gray-600">Completadas</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">{stats.pending}</div>
              <div className="text-sm text-gray-600">Pendientes</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{stats.highPriority}</div>
              <div className="text-sm text-gray-600">Alta Prioridad</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{stats.overdue}</div>
              <div className="text-sm text-gray-600">Vencidas</div>
            </CardContent>
          </Card>
        </div>

        {/* Controles */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Búsqueda */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar tareas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Filtros y ordenamiento */}
              <div className="flex flex-wrap gap-2">
                <Select value={filter} onValueChange={(value: any) => setFilter(value)}>
                  <SelectTrigger className="w-40">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    <SelectItem value="pending">Pendientes</SelectItem>
                    <SelectItem value="completed">Completadas</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">Fecha</SelectItem>
                    <SelectItem value="priority">Prioridad</SelectItem>
                    <SelectItem value="title">Título</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                >
                  {sortOrder === "asc" ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
                </Button>

                {/* Botón agregar tarea */}
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={() => setIsDialogOpen(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Nueva Tarea
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>{editingTask ? "Editar Tarea" : "Nueva Tarea"}</DialogTitle>
                    </DialogHeader>

                    {showAlert && (
                      <Alert variant="destructive">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>{showAlert}</AlertDescription>
                      </Alert>
                    )}

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="title">Título *</Label>
                        <Input
                          id="title"
                          placeholder="Título de la tarea"
                          value={newTask.title}
                          onChange={(e) => setNewTask((prev) => ({ ...prev, title: e.target.value }))}
                          maxLength={100}
                        />
                        <div className="text-xs text-gray-500 mt-1">{newTask.title.length}/100 caracteres</div>
                      </div>

                      <div>
                        <Label htmlFor="description">Descripción</Label>
                        <Textarea
                          id="description"
                          placeholder="Descripción detallada (opcional)"
                          value={newTask.description}
                          onChange={(e) => setNewTask((prev) => ({ ...prev, description: e.target.value }))}
                          rows={3}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="priority">Prioridad</Label>
                          <Select
                            value={newTask.priority}
                            onValueChange={(value: any) => setNewTask((prev) => ({ ...prev, priority: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Baja</SelectItem>
                              <SelectItem value="medium">Media</SelectItem>
                              <SelectItem value="high">Alta</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="category">Categoría</Label>
                          <Input
                            id="category"
                            placeholder="ej: Universidad"
                            value={newTask.category}
                            onChange={(e) => setNewTask((prev) => ({ ...prev, category: e.target.value }))}
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="dueDate">Fecha de vencimiento</Label>
                        <Input
                          id="dueDate"
                          type="datetime-local"
                          value={newTask.dueDate}
                          onChange={(e) => setNewTask((prev) => ({ ...prev, dueDate: e.target.value }))}
                        />
                      </div>

                      <div className="flex gap-2 pt-4">
                        <Button onClick={editingTask ? updateTask : addTask} className="flex-1">
                          {editingTask ? "Actualizar" : "Agregar"} Tarea
                        </Button>
                        <Button variant="outline" onClick={closeDialog}>
                          Cancelar
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lista de tareas */}
        <div className="space-y-4">
          {filteredAndSortedTasks.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <div className="text-gray-400 mb-4">
                  <CheckCircle2 className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {tasks.length === 0 ? "No hay tareas" : "No se encontraron tareas"}
                </h3>
                <p className="text-gray-600">
                  {tasks.length === 0
                    ? "Comienza agregando tu primera tarea"
                    : "Intenta ajustar los filtros de búsqueda"}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredAndSortedTasks.map((task) => (
              <Card
                key={task.id}
                className={`transition-all duration-200 hover:shadow-md ${
                  task.completed ? "opacity-75" : ""
                } ${isOverdue(task) ? "border-red-200 bg-red-50" : ""}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    {/* Checkbox */}
                    <div className="pt-1">
                      <Checkbox
                        checked={task.completed}
                        onCheckedChange={() => toggleTask(task.id)}
                        className="h-5 w-5"
                      />
                    </div>

                    {/* Contenido de la tarea */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3
                            className={`font-medium text-lg ${
                              task.completed ? "line-through text-gray-500" : "text-gray-900"
                            }`}
                          >
                            {task.title}
                          </h3>

                          {task.description && (
                            <p className={`text-sm mt-1 ${task.completed ? "text-gray-400" : "text-gray-600"}`}>
                              {task.description}
                            </p>
                          )}

                          {/* Metadatos */}
                          <div className="flex flex-wrap items-center gap-2 mt-3">
                            <Badge className={PRIORITY_COLORS[task.priority]}>
                              <Flag className="h-3 w-3 mr-1" />
                              {task.priority === "low" ? "Baja" : task.priority === "medium" ? "Media" : "Alta"}
                            </Badge>

                            <Badge variant="outline">{task.category}</Badge>

                            {task.dueDate && (
                              <Badge variant={isOverdue(task) ? "destructive" : "secondary"}>
                                <Calendar className="h-3 w-3 mr-1" />
                                {new Date(task.dueDate).toLocaleDateString("es-ES", {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </Badge>
                            )}

                            {isOverdue(task) && (
                              <Badge variant="destructive">
                                <Clock className="h-3 w-3 mr-1" />
                                Vencida
                              </Badge>
                            )}
                          </div>

                          {/* Fecha de creación */}
                          <div className="text-xs text-gray-400 mt-2">
                            Creada:{" "}
                            {new Date(task.createdAt).toLocaleDateString("es-ES", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                            {task.completedAt && (
                              <span className="ml-2">
                                • Completada:{" "}
                                {new Date(task.completedAt).toLocaleDateString("es-ES", {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Acciones */}
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon" onClick={() => openEditDialog(task)} className="h-8 w-8">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteTask(task.id)}
                            className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>Anota todo lo que desees</p>
          <p className="mt-1">Farit Reasco, 2025</p>
        </div>
      </div>
    </div>
  )
}