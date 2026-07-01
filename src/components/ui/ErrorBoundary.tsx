"use client";

import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[50vh] flex items-center justify-center p-8">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 border-2 border-ultra-red flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-heading font-black text-ultra-red">!</span>
            </div>
            <h2 className="text-2xl font-heading font-bold text-white uppercase tracking-tight mb-3">
              Algo correu mal
            </h2>
            <p className="text-gray-500 text-sm font-sans mb-6">
              Ocorreu um erro inesperado. Por favor, tenta recarregar a página.
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false });
                window.location.reload();
              }}
              className="btn-ultra"
            >
              🔄 Recarregar Página
            </button>
            {process.env.NODE_ENV === "development" && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="text-sm text-gray-600 cursor-pointer hover:text-white font-heading font-semibold">
                  Detalhes do erro (dev)
                </summary>
                <pre className="mt-2 text-xs text-ultra-red bg-ultra-dark border border-ultra-gray p-4 overflow-auto max-h-40 font-sans">
                  {this.state.error.message}
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}