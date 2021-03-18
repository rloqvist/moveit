import React, { lazy, Suspense } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import { ThemeWrapper } from "theme/ThemeWrapper";

export const App = () => {
  return (
    <ThemeWrapper>
      <BrowserRouter>
        <Suspense fallback={null}>
          <Switch>
            <Route path="/form" component={lazy(() => import(`ui/views/OfferForm`))} />
            <Redirect to="/form" />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </ThemeWrapper>
  );
};
