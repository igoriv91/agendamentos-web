import { PageLayout } from '@/shared/components/layout/PageLayout'
import { Header } from '@/shared/components/layout/Header'
import { AppButton } from '@/shared/components/custom/AppButton'
import { DataTable } from '@/shared/components/custom/DataTable'
import { useStaff } from './hooks/useStaff'
import { getStaffColumns } from './components/StaffColumns'

export default function StaffPage() {
  const { staff, isLoading, handleDelete, navigateToCreate, navigateToEdit } = useStaff()
  const columns = getStaffColumns(navigateToEdit, handleDelete)

  return (
    <PageLayout>
      <Header
        title="Atendentes"
        subtitle="Gerencie os atendentes da sua empresa"
        actions={<AppButton onClick={navigateToCreate}>Novo Atendente</AppButton>}
      />
      <div className="p-4 md:p-6">
        <DataTable columns={columns} data={staff} isLoading={isLoading} />
      </div>
    </PageLayout>
  )
}
