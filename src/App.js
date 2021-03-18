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
            <Route path="/admin" component={lazy(() => import(`ui/views/Admin`))} />
            <Route path="/review/:offerId" component={lazy(() => import(`ui/views/ReviewOffer`))} />
            <Route path="/thank-you/:offerId" component={lazy(() => import(`ui/views/ThankYou`))} />
            <Redirect to="/form" />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </ThemeWrapper>
  );
};
