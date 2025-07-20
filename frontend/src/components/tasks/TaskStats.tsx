import { Task } from '@/models/types';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Clock, Play, BarChart3 } from 'lucide-react';

interface TaskStatsProps {
  tasks: Task[];
}

export const TaskStats = ({ tasks }: TaskStatsProps) => {
  const stats = {
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'pending').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    done: tasks.filter(t => t.status === 'done').length,
  };

  const completionRate = stats.total > 0 ? Math.round((stats.done / stats.total) * 100) : 0;

  const statCards = [
    {
      title: 'Total Tasks',
      value: stats.total,
      icon: BarChart3,
      description: 'All tasks',
      className: 'border-blue-200 bg-blue-50/50',
      iconColor: 'text-blue-600',
    },
    {
      title: 'Pending',
      value: stats.pending,
      icon: Clock,
      description: 'Not started',
      className: 'border-yellow-200 bg-yellow-50/50',
      iconColor: 'text-yellow-600',
    },
    {
      title: 'In Progress',
      value: stats.inProgress,
      icon: Play,
      description: 'Active tasks',
      className: 'border-blue-200 bg-blue-50/50',
      iconColor: 'text-blue-600',
    },
    {
      title: 'Completed',
      value: stats.done,
      icon: CheckCircle,
      description: `${completionRate}% complete`,
      className: 'border-green-200 bg-green-50/50',
      iconColor: 'text-green-600',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {statCards.map((stat) => (
        <Card key={stat.title} className={stat.className}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
              </div>
              <stat.icon className={`h-8 w-8 ${stat.iconColor}`} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};