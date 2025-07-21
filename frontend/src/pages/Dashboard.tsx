import { useState, useEffect, useCallback } from 'react';
import { Task, TaskFilters, User } from '@/core/models';
import { getTasks, deleteTask } from '@/services/task';
import { Header } from '@/components/layout/Header';
import { TaskStats } from '@/components/tasks/TaskStats';
import { TaskFiltersComponent } from '@/components/tasks/TaskFilters';
import { TaskItem } from '@/components/tasks/TaskItem';
import { TaskForm } from '@/components/tasks/TaskForm';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Plus, Sparkles, CheckSquare } from 'lucide-react';

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

export const Dashboard = ({ user, onLogout }: DashboardProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [filters, setFilters] = useState<TaskFilters>({ status: 'all' });
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const { toast } = useToast();

  const loadTasks = useCallback(async () => {
    const userTasks = await getTasks();
    
    if(userTasks){
      setTasks(userTasks);
    }
    else {
      onLogout()
    }
  }, [onLogout]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  useEffect(() => {
    let filtered = tasks;

    // Filter by status
    if (filters.status && filters.status !== 'all') {
      filtered = filtered.filter(task => task.status === filters.status);
    }

    // Filter by search
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(task => 
        task.title.toLowerCase().includes(searchLower) ||
        task.description.toLowerCase().includes(searchLower) ||
        (task.extras.tags && task.extras.tags.some(tag => 
          tag.toLowerCase().includes(searchLower)
        ))
      );
    }

    setFilteredTasks(filtered);
  }, [tasks, filters]);

  const handleTaskSaved = () => {
    loadTasks();
    setSelectedTask(undefined);
  };

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setIsTaskFormOpen(true);
  };

  const handleDeleteTask = async (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      await deleteTask(taskId);
      loadTasks();
      toast({
        title: "Task deleted",
        description: `"${task.title}" has been deleted successfully.`,
      });
    }
  };

  const handleNewTask = () => {
    setSelectedTask(undefined);
    setIsTaskFormOpen(true);
  };

  const getInsights = () => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.status === 'done').length;
    const inProgressTasks = tasks.filter(t => t.status === 'in-progress').length;
    const overdueTasks = tasks.filter(t => 
      t.extras.dueDate && 
      new Date(t.extras.dueDate) < new Date() && 
      t.status !== 'done'
    ).length;

    let insight = '';
    if (totalTasks === 0) {
      insight = "Welcome! Start by creating your first task.";
    } else if (completedTasks === totalTasks) {
      insight = "🎉 Amazing! You've completed all your tasks!";
    } else if (overdueTasks > 0) {
      insight = `⚠️ You have ${overdueTasks} overdue task${overdueTasks > 1 ? 's' : ''}. Consider updating their status.`;
    } else if (inProgressTasks > completedTasks) {
      insight = "💪 Good progress! You have more active tasks than completed ones.";
    } else {
      insight = `📊 You've completed ${Math.round((completedTasks / totalTasks) * 100)}% of your tasks. Keep it up!`;
    }

    return insight;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} onLogout={onLogout} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-foreground">
                Welcome back, {user.name.split(' ')[0]}!
              </h2>
              <p className="text-muted-foreground mt-2 flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                {getInsights()}
              </p>
            </div>
            <Button onClick={handleNewTask} className="btn-primary">
              <Plus className="h-4 w-4 mr-2" />
              New Task
            </Button>
          </div>

          <TaskStats tasks={tasks} />
        </div>

        <div className="space-y-6">
          <TaskFiltersComponent 
            filters={filters} 
            onFiltersChange={setFilters} 
          />

          {filteredTasks.length === 0 ? (
            <div className="text-center py-12">
              <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
                <CheckSquare className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">
                {tasks.length === 0 ? 'No tasks yet' : 'No tasks match your filters'}
              </h3>
              <p className="text-muted-foreground mb-4">
                {tasks.length === 0 
                  ? 'Create your first task to get started organizing your work.'
                  : 'Try adjusting your search or filter criteria.'
                }
              </p>
              {tasks.length === 0 && (
                <Button onClick={handleNewTask} className="btn-primary">
                  <Plus className="h-4 w-4 mr-2" />
                  Create your first task
                </Button>
              )}
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onEdit={handleEditTask}
                  onDelete={handleDeleteTask}
                />
              ))}
            </div>
          )}
        </div>

        <TaskForm
          task={selectedTask}
          open={isTaskFormOpen}
          onOpenChange={setIsTaskFormOpen}
          onTaskSaved={handleTaskSaved}
        />
      </main>
    </div>
  );
};