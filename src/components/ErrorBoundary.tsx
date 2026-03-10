import { Component, type ErrorInfo, type ReactNode } from "react";
import { Button, buttonVariants } from "#/components/ui/button";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
          <img
            src={`${import.meta.env.BASE_URL}robot.png`}
            alt="Za'atar — Testology mascot looking confused"
            className="mb-8 h-48 w-auto opacity-80 sm:h-64"
          />
          <h1 className="mb-2 text-2xl font-bold text-foreground">
            Oops! Something went wrong
          </h1>
          <p className="mb-6 max-w-md text-muted-foreground">
            Za'atar ran into an unexpected error. Try refreshing the page or
            going back to the home page.
          </p>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => window.location.reload()}>
              Refresh Page
            </Button>
            <a
              href={import.meta.env.BASE_URL}
              className={buttonVariants() + " no-underline"}
            >
              Go Home
            </a>
          </div>
          {this.state.error && (
            <pre className="mt-8 max-w-lg overflow-auto rounded-lg bg-muted p-4 text-left text-xs text-muted-foreground">
              {this.state.error.message}
            </pre>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}
