export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border px-4 py-6 text-muted-foreground">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 text-center text-sm sm:flex-row sm:text-left">
        <p className="m-0">&copy; {year} Testology. All rights reserved.</p>
        <p className="m-0 text-xs">Practice smarter, certify faster.</p>
      </div>
    </footer>
  );
}
