import { useNavigate } from 'react-router-dom'

export const useAppNavigate = () => {
  const navigate = useNavigate()

  return {
    navigateTo: (path: string) => navigate(path),
    goBack: () => navigate(-1),
  }
}
