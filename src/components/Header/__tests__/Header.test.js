import { render, screen, fireEvent } from "@testing-library/react";
import { GlobalProvider } from "../../../contexts/GlobalContext";
import Header from "../Header";

import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

describe("Header", () => {
  const history = createMemoryHistory();  
  render(
    <Router history={history}>
      <GlobalProvider>
        <Header />
      </GlobalProvider>
    </Router>
  );
  const aboutItem = screen.getAllByTestId("header");
  it("should render the header", () => {
      
  });
});
