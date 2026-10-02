import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import DashboardLayout from "./components/DashboardLayout";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import MarketingPage from "./pages/MarketingPage";
import TachiDashboard from "./pages/TachiDashboard";

function Workspace() {
  return <DashboardLayout><TachiDashboard /></DashboardLayout>;
}

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/pricing"} component={MarketingPage} />
      <Route path={"/docs"} component={MarketingPage} />
      <Route path={"/changelog"} component={MarketingPage} />
      <Route path={"/blog"} component={MarketingPage} />
      <Route path={"/about"} component={MarketingPage} />
      <Route path={"/security"} component={MarketingPage} />
      <Route path={"/contact"} component={MarketingPage} />
      <Route path={"/app"} component={Workspace} />
      <Route path={"/app/projects"} component={Workspace} />
      <Route path={"/app/extract"} component={Workspace} />
      <Route path={"/app/crawl"} component={Workspace} />
      <Route path={"/app/jobs"} component={Workspace} />
      <Route path={"/app/pages"} component={Workspace} />
      <Route path={"/app/settings"} component={Workspace} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="dark"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
