// https://github.com/shadcn-ui/taxonomy/blob/main/app/(auth)/layout.tsx
interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return <div className="min-h-screen">{children}</div>
}