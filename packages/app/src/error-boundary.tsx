import * as React from "react";
import { Component, Fragment } from "react";

export class ErrorBoundary extends Component<{}, { error: Error }> {
  constructor(props) {
    super(props);
    this.state = { error: undefined };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      console.error(this.state.error);
      if (process.env.NODE_ENV === "development") {
        return (
          <Fragment>
            <h1>Internal Error</h1>
            <button onClick={() => this.setState({ error: undefined })}>
              Reload
            </button>
            <pre style={{ display: "block", overflowX: "auto" }}>
              <code>{this.state.error.toString()}</code>
            </pre>
          </Fragment>
        );
      }

      return <h1>Internal Error</h1>;
    }

    return this.props.children;
  }
}
