import { Outlet, useNavigate } from 'react-router'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import { RequireAuthDialog } from '@/components/ui/require-auth-dialog'
import { useAuthDialogStore } from '@/store/useAuthDialogStore'
import ChatBot from '@/components/ui/chat-bot'

export default function MainLayout() {
  const { open, closeDialog } = useAuthDialogStore()
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <Outlet />
      </main>
      <ChatBot />

      <Footer />

      <RequireAuthDialog
        open={open}
        onClose={closeDialog}
        onConfirm={() => {
          closeDialog()
          navigate('/login')
        }}
      />
    </div>
  )
}
