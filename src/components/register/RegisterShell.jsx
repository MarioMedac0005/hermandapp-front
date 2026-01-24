export default function RegisterShell({ left, right, footer }) {
  return (
    <div className="w-full max-w-6xl">
      <main className="grid grid-cols-1 gap-7 lg:grid-cols-[320px_1fr] items-start">
        <aside>{left}</aside>
        <section className="min-w-0">{right}</section>
      </main>

      <footer className="mt-6 flex justify-center">{footer}</footer>
    </div>
  );
}
