import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { GlobalHeader } from "@/components/GlobalHeader";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">404 · Not found</div>
        <h1 className="mt-3 text-2xl font-semibold text-ink">This page does not exist</h1>
        <p className="mt-2 text-sm text-ink-soft">The opportunity or section you're looking for may have been moved.</p>
        <Link to="/" className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          Back to Opportunities
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold text-ink">Something went wrong</h1>
        <p className="mt-2 text-sm text-ink-soft">{error.message}</p>
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="mt-6 rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "SCHOTT | Prometheus — Business Development Intelligence" },
      { name: "description", content: "Prometheus — SCHOTT's AI Market Hunter for evidence-backed MedTech opportunities, with source traceability and timing classification." },
      { property: "og:title", content: "SCHOTT | Prometheus — Business Development Intelligence" },
      { name: "twitter:title", content: "SCHOTT | Prometheus — Business Development Intelligence" },
      { property: "og:description", content: "Prometheus — SCHOTT's AI Market Hunter for evidence-backed MedTech opportunities, with source traceability and timing classification." },
      { name: "twitter:description", content: "Prometheus — SCHOTT's AI Market Hunter for evidence-backed MedTech opportunities, with source traceability and timing classification." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/aaae8798-af88-4a20-830c-a4074f5a0755/id-preview-b495214b--60b388b5-32a5-4276-b36a-4e6ead15f3c6.lovable.app-1780055931624.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/aaae8798-af88-4a20-830c-a4074f5a0755/id-preview-b495214b--60b388b5-32a5-4276-b36a-4e6ead15f3c6.lovable.app-1780055931624.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Instrument+Serif&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>
        <div className="flex min-h-screen w-full flex-col bg-background">
          <GlobalHeader />
          <div className="flex flex-1 min-h-0 w-full">
            <AppSidebar />
            <main className="flex min-w-0 flex-1 flex-col">
              <Outlet />
            </main>
          </div>
        </div>
        <Toaster theme="dark" position="bottom-right" />
      </SidebarProvider>
    </QueryClientProvider>
  );
}
