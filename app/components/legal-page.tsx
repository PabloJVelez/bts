import { Link } from "react-router";
import { Footer } from "~/components/footer";
import { Header } from "~/components/header";
import { legalNavItems, type LegalPageContent } from "~/lib/legal-content";

type LegalPageProps = {
  page: LegalPageContent;
};

export function LegalPage({ page }: LegalPageProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="border-b border-border bg-secondary/30 py-14 sm:py-18">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-primary/90">
              {page.eyebrow}
            </p>
            <h1 className="mt-4 font-serif text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              {page.title}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {page.description}
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              Effective date: {page.effectiveDate}
            </p>
          </div>
        </section>

        <section className="bg-background py-10 sm:py-14">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[240px_1fr] lg:px-8">
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <nav
                aria-label="Legal pages"
                className="rounded-xl border border-border/80 bg-card p-4 shadow-sm shadow-black/5"
              >
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  Legal
                </p>
                <div className="flex flex-wrap gap-2 lg:flex-col">
                  {legalNavItems.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className={[
                        "rounded-md px-3 py-2 text-sm transition-colors",
                        item.href === `/${page.slug}`
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                      ].join(" ")}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </nav>
            </aside>

            <div className="rounded-xl border border-border/80 bg-card p-6 shadow-sm shadow-black/5 sm:p-8 lg:p-10">
              <div className="space-y-9">
                {page.sections.map((section) => (
                  <section key={section.title}>
                    <h2 className="font-serif text-2xl font-semibold tracking-tight text-foreground">
                      {section.title}
                    </h2>
                    {section.body?.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base"
                      >
                        {paragraph}
                      </p>
                    ))}
                    {section.bullets ? (
                      <ul className="mt-4 space-y-2 text-sm leading-7 text-muted-foreground sm:text-base">
                        {section.bullets.map((bullet) => (
                          <li key={bullet} className="flex gap-3">
                            <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </section>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
