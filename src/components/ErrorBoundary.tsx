import React, { Component, ReactNode, ErrorInfo } from 'react';

interface ErrorBoundaryProps {
  fallback: ReactNode;
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Atualiza o estado para que a próxima renderização mostre o fallback UI
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Você também pode registrar o erro em um serviço de relatórios de erros
    console.log(error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      // Você pode renderizar qualquer UI alternativa
      return this.props.fallback;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
