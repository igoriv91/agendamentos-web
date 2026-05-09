import { Building2, Users, ShieldOff, TrendingUp } from 'lucide-react'
import { PageLayout } from '@/shared/components/layout/PageLayout'
import { Header } from '@/shared/components/layout/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { formatCurrency } from '@/shared/lib/formatCurrency'
import { CompaniesTable } from './components/CompaniesTable'
import { useAdminCompanies } from './hooks/useAdminCompanies'

export default function AdminPage() {
  const { companies, stats, isLoading, handleBlock, handleActivate } = useAdminCompanies()

  return (
    <PageLayout>
      <Header title="Painel Admin" subtitle="Gerenciamento de empresas e assinaturas" />
      <div className="p-6 space-y-6">

        {/* Stats cards */}
        {stats && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              icon={Building2}
              label="Total de empresas"
              value={stats.totalCompanies}
            />
            <StatCard
              icon={Users}
              label="Empresas ativas"
              value={stats.activeCount}
              valueClass="text-green-600"
            />
            <StatCard
              icon={ShieldOff}
              label="Empresas bloqueadas"
              value={stats.blockedCount}
              valueClass="text-destructive"
            />
            <StatCard
              icon={TrendingUp}
              label="Receita mensal"
              value={formatCurrency(stats.monthlyRevenue)}
              valueClass="text-primary"
            />
          </div>
        )}

        <div>
          <h2 className="text-base font-semibold mb-3">Empresas cadastradas</h2>
          <CompaniesTable
            companies={companies}
            isLoading={isLoading}
            onBlock={handleBlock}
            onActivate={handleActivate}
          />
        </div>
      </div>
    </PageLayout>
  )
}

interface StatCardProps {
  icon: React.ElementType
  label: string
  value: number | string
  valueClass?: string
}

const StatCard = ({ icon: Icon, label, value, valueClass }: StatCardProps) => (
  <Card>
    <CardHeader className="pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
        <Icon className="h-4 w-4" />{label}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <p className={`text-2xl font-bold ${valueClass ?? ''}`}>{value}</p>
    </CardContent>
  </Card>
)
