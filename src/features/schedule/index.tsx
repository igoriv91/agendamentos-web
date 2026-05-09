import { useEffect, useState } from 'react'
import { PageLayout } from '@/shared/components/layout/PageLayout'
import { Header } from '@/shared/components/layout/Header'
import { AppButton } from '@/shared/components/custom/AppButton'
import { staffApi } from '@/features/staff/staff.api'
import type { Staff } from '@/features/staff/types/staff.types'
import { StaffFilter } from './components/StaffFilter'
import { CalendarView } from './components/CalendarView'
import { AppointmentDetail } from './components/AppointmentDetail'
import { AppointmentFormDialog } from './components/AppointmentFormDialog'
import { AppointmentEditDialog } from './components/AppointmentEditDialog'
import { useSchedule } from './hooks/useSchedule'
import type { Appointment, CalendarEvent } from './types/appointment.types'

export default function SchedulePage() {
  const {
    events, isLoading,
    currentDate, setCurrentDate,
    staffFilter, setStaffFilter,
    selectedAppointment, setSelectedAppointment,
    newSlot, setNewSlot,
    handleRangeChange, reload,
  } = useSchedule()

  const [staffList, setStaffList]           = useState<Staff[]>([])
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null)

  useEffect(() => { staffApi.list().then(setStaffList) }, [])

  const handleSelectEvent = (event: CalendarEvent) => {
    setSelectedAppointment(event.resource)
  }

  return (
    <PageLayout>
      <Header
        title="Agenda"
        subtitle="Visualize e gerencie os agendamentos"
        actions={
          <AppButton onClick={() => setNewSlot({ start: new Date(), end: new Date() })}>
            Novo Agendamento
          </AppButton>
        }
      />

      <div className="flex flex-col gap-3 p-4 flex-1 min-h-0">
        <StaffFilter
          staffList={staffList}
          selected={staffFilter}
          onChange={setStaffFilter}
        />

        {isLoading ? (
          <div className="flex flex-1 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        ) : (
          <div className="flex-1 min-h-0" style={{ height: 'calc(100vh - 200px)' }}>
            <CalendarView
              events={events}
              currentDate={currentDate}
              onNavigate={setCurrentDate}
              onRangeChange={handleRangeChange}
              onSelectEvent={handleSelectEvent}
              onSelectSlot={(slot) => setNewSlot(slot)}
            />
          </div>
        )}
      </div>

      <AppointmentDetail
        appointment={selectedAppointment}
        onClose={() => setSelectedAppointment(null)}
        onDone={reload}
        onEdit={(appt) => setEditingAppointment(appt)}
      />

      <AppointmentEditDialog
        appointment={editingAppointment}
        onClose={() => setEditingAppointment(null)}
        onSuccess={reload}
      />

      <AppointmentFormDialog
        slot={newSlot}
        onClose={() => setNewSlot(null)}
        onSuccess={reload}
      />
    </PageLayout>
  )
}
