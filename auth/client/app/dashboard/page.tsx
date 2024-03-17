import { lusitana } from '@/app/ui/fonts';

export default async function Page() {
  return (
    <main>
      <section>
        <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
            Welcome!
        </h1>
      </section>
    </main>
  )
}

