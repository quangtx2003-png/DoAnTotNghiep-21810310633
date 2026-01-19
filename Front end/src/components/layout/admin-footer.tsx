export default function AdminFooter() {
  return (
    <footer className="border-t bg-background text-sm py-3">
      <div className="container mx-auto px-4 text-center text-muted-foreground">
        © {new Date().getFullYear()} Elegance — Built with ❤️
      </div>
    </footer>
  )
}
