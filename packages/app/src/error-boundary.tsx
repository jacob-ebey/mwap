import * as React from "react";
import { Component, Fragment } from "react";

export class ErrorBoundary extends Component<{}, { error: Error }> {
  constructor(props) {
    super(props);
    this.state = { error: undefined };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.error) {
      if (process.env.NODE_ENV === "development") {
        return (
          <Fragment>
            <h1>Something went wrong.</h1>
            <pre>
              <code>{this.state.error.toString()}</code>
            </pre>
          </Fragment>
        );
      }

      return <h1>Internal server error</h1>;
    }

    return this.props.children;
  }
}
