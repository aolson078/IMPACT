export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-6 text-center text-xs text-white/60">
      © {new Date().getFullYear()} IMPACT • Built with Next.js & TailwindCSS
    </footer>
  );
}
