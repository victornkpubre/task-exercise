import { Task } from '@/models/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Calendar, Clock, MoreHorizontal, Edit, Trash2, Flag } from 'lucide-react';
import { cn } from '@/services/utils';

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

const statusConfig = {
  pending: { label: 'Pending', className: 'status-pending' },
  'in-progress': { label: 'In Progress', className: 'status-in-progress' },
  done: { label: 'Done', className: 'status-done' },
};

const priorityConfig = {
  low: { label: 'Low', color: 'text-blue-500' },
  medium: { label: 'Medium', color: 'text-yellow-500' },
  high: { label: 'High', color: 'text-red-500' },
};

export const TaskItem = ({ task, onEdit, onDelete }: TaskItemProps) => {
  const status = statusConfig[task.status];
  const priority = priorityConfig[task.extras.priority || 'medium'];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
    });
  };

  const isOverdue = task.extras.dueDate && new Date(task.extras.dueDate) < new Date() && task.status !== 'done';

  return (
    <Card className="task-card group">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h3 className={cn(
                "font-medium text-foreground truncate",
                task.status === 'done' && "line-through text-muted-foreground"
              )}>
                {task.title}
              </h3>
              <Badge variant="outline" className={cn("text-xs border", status.className)}>
                {status.label}
              </Badge>
            </div>

            {task.description && (
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {task.description}
              </p>
            )}

            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              {task.extras.priority && (
                <div className="flex items-center gap-1">
                  <Flag className={cn("h-3 w-3", priority.color)} />
                  <span>{priority.label}</span>
                </div>
              )}

              {task.extras.dueDate && (
                <div className={cn(
                  "flex items-center gap-1",
                  isOverdue && "text-destructive"
                )}>
                  <Calendar className="h-3 w-3" />
                  <span>{formatDate(task.extras.dueDate)}</span>
                </div>
              )}

              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{formatDate(task.updatedAt)}</span>
              </div>
            </div>

            {task.extras.tags && task.extras.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-3">
                {task.extras.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem onClick={() => onEdit(task)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onDelete(task.id)}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
};