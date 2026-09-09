import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo);
  }

  public handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  public render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[300px] w-full flex-col items-center justify-center p-6 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-[#FF3B30] dark:bg-red-950/50">
            <AlertTriangle className="h-7 w-7" />
          </div>
          <h3 className="mt-4 font-bold text-base text-[#1C1C1E] dark:text-white">
            {this.props.fallbackTitle || 'Something went wrong'}
          </h3>
          <p className="mt-1 max-w-xs text-xs text-[#8E8E93]">
            {this.state.error?.message || 'An unexpected error occurred while rendering this view.'}
          </p>
          <button
            onClick={this.handleReset}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#007AFF] px-4 py-2 text-xs font-bold text-white shadow-md transition-colors hover:bg-[#0062CC]"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
