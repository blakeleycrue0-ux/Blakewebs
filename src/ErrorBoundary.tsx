import { Component, type ReactNode } from "react";

export default class ErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error(error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "sans-serif",
            textAlign: "center",
            padding: 24,
            background: "#f9fafb",
          }}
        >
          <div>
            <p style={{ fontSize: 18, fontWeight: 600, color: "#0a1b33", marginBottom: 8 }}>
              Blakewebs
            </p>
            <p style={{ fontSize: 14, color: "#64748b" }}>
              Estamos actualizando la página. Vuelve a intentarlo en unos minutos.
            </p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
