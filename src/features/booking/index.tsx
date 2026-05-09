import { StaffSelector } from './components/StaffSelector'
import { ServiceSelector } from './components/ServiceSelector'
import { TimeSlotPicker } from './components/TimeSlotPicker'
import { GuestForm } from './components/GuestForm'
import { BookingConfirmation } from './components/BookingConfirmation'
import { useBooking } from './hooks/useBooking'

export default function BookingPage() {
  const {
    step, company, isLoading, error,
    staffList, selectedStaff, handleSelectStaff,
    serviceList, selectedService, handleSelectService,
    selectedDate, setSelectedDate, slots, selectedSlot, loadingSlots, handleSelectSlot,
    handleConfirm, handleBack, handleRestart,
  } = useBooking()

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6">
        <div className="text-center">
          <p className="text-xl font-semibold text-destructive">{error}</p>
          <p className="text-muted-foreground mt-2">Verifique o link e tente novamente.</p>
        </div>
      </div>
    )
  }

  if (isLoading && !staffList.length) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="border-b bg-background px-6 py-4">
        <h1 className="text-xl font-bold">{company?.name ?? 'Agendamento'}</h1>
        <p className="text-sm text-muted-foreground">Agende seu horário online</p>
      </header>

      {/* Progress indicator */}
      <div className="border-b bg-background px-6 py-2">
        <div className="flex gap-1">
          {(['staff', 'service', 'slot', 'guest'] as const).map((s, i) => (
            <div
              key={s}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                ['staff', 'service', 'slot', 'guest', 'confirm'].indexOf(step) >= i
                  ? 'bg-primary'
                  : 'bg-muted'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="mx-auto max-w-2xl p-6">
        {step === 'staff' && (
          <StaffSelector staffList={staffList} onSelect={handleSelectStaff} />
        )}

        {step === 'service' && selectedStaff && (
          <ServiceSelector
            serviceList={serviceList}
            staffName={selectedStaff.name}
            onSelect={handleSelectService}
            onBack={handleBack}
          />
        )}

        {step === 'slot' && selectedStaff && selectedService && (
          <TimeSlotPicker
            selectedDate={selectedDate}
            slots={slots}
            selectedSlot={selectedSlot}
            isLoading={loadingSlots}
            serviceName={selectedService.name}
            staffName={selectedStaff.name}
            onDateChange={setSelectedDate}
            onSlotSelect={handleSelectSlot}
            onContinue={() => handleSelectSlot(selectedSlot!)}
            onBack={handleBack}
          />
        )}

        {step === 'guest' && selectedStaff && selectedService && selectedSlot && (
          <GuestForm
            staffName={selectedStaff.name}
            serviceName={selectedService.name}
            selectedDate={selectedDate}
            selectedSlot={selectedSlot}
            isLoading={isLoading}
            onConfirm={handleConfirm}
            onBack={handleBack}
          />
        )}

        {step === 'confirm' && selectedStaff && selectedService && selectedSlot && company && (
          <BookingConfirmation
            serviceName={selectedService.name}
            staffName={selectedStaff.name}
            selectedDate={selectedDate}
            selectedSlot={selectedSlot}
            companyName={company.name}
            onNewBooking={handleRestart}
          />
        )}
      </main>
    </div>
  )
}
