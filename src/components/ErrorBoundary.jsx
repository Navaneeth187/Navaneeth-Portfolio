import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service like Sentry here
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center max-w-2xl mx-auto">
          <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6 animate-pulse">
            <AlertTriangle className="text-red-500" size={40} />
          </div>
          <h2 className="text-3xl font-bold text-textMain mb-4">System Fault Detected</h2>
          <p className="text-textMuted text-lg mb-8 leading-relaxed">
            A critical rendering error occurred in this module. This is typically caused by a temporary network failure or API limit.
          </p>
          
          <div className="bg-[#0F111A] border border-red-500/20 p-6 rounded-xl w-full text-left mb-8 overflow-hidden shadow-2xl relative group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500/50 to-transparent"></div>
            <p className="text-red-400 font-mono text-sm break-words">
              Exception: {this.state.error?.message || "Unknown rendering exception"}
            </p>
            {process.env.NODE_ENV === 'development' && this.state.errorInfo && (
              <details className="mt-4 text-textDarker font-mono text-xs cursor-pointer">
                <summary className="hover:text-textMuted transition-colors">View Stack Trace</summary>
                <pre className="mt-2 p-4 bg-background/50 rounded whitespace-pre-wrap overflow-auto max-h-40">
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
          </div>
          
          <button 
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 px-8 py-3 bg-cardBg border border-cardBorder rounded-full text-textMain hover:border-red-500/50 hover:text-red-400 transition-all font-medium focus:outline-none focus:ring-2 focus:ring-red-500/30"
          >
            <RefreshCw size={18} />
            Reboot Subsystem
          </button>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
