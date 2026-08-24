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
            minHeight: "100dvh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "sans-serif",
            textAlign: "center",
            padding: 24,
            background: "#faf9f6",
          }}
        >
          <div>
            <p style={{ fontSize: 18, fontWeight: 600, color: "#17140f", marginBottom: 8 }}>
              Pace
            </p>
            <p style={{ fontSize: 14, color: "#8a8478" }}>
              Something went wrong. Please reload the page.
            </p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
